"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/portfolio/utils/validation/contact";

export type ContactActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

/**
 * Escapes HTML characters to prevent XSS / HTML injection in email clients
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strips carriage returns, newlines, tabs, and null bytes to prevent SMTP header injection
 */
function stripHeaderNewlines(value: string): string {
  return value.replace(/[\r\n\t\0]/g, " ").trim();
}

/**
 * Strips ASCII control characters from multi-line messages while preserving normal line breaks
 */
function stripControlCharacters(value: string): string {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

// In-memory sliding window rate limiter for contact form submissions
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 10 * 60 * 1000
): boolean {
  if (!ip || ip === "unknown") return true;

  const now = Date.now();

  // Prune expired records if map exceeds 500 entries
  if (rateLimitMap.size > 500) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function sendContactEmail(
  values: ContactFormValues
): Promise<ContactActionResult> {
  // 1. Server-side validation with Zod
  const validation = contactFormSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false,
      message: "Please review the form fields and correct the highlighted errors.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message, turnstileToken, honeypot } =
    validation.data;

  // 2. Honeypot check: silently drop automated script submissions without error signaling
  if (honeypot && honeypot.trim().length > 0) {
    console.warn(
      "[ContactAction] Honeypot trap triggered. Bot submission silently discarded."
    );
    return {
      success: true,
      message: "Thank you! Your message has been received.",
    };
  }

  // 3. Client IP rate limiting (maximum 5 submissions per 10 minutes)
  try {
    const reqHeaders = await headers();
    const forwardedFor = reqHeaders.get("x-forwarded-for");
    const ip =
      reqHeaders.get("cf-connecting-ip") ||
      reqHeaders.get("x-real-ip") ||
      (forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown");

    const isAllowed = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!isAllowed) {
      return {
        success: false,
        message:
          "Too many requests from this network. Please wait 10 minutes before submitting another message.",
      };
    }
  } catch (err) {
    console.warn(
      "[ContactAction] Unable to resolve client IP for rate limiting:",
      err
    );
  }

  // 4. Cloudflare Turnstile Verification
  const secretKey =
    process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";

  try {
    const turnstileFormData = new URLSearchParams();
    turnstileFormData.append("secret", secretKey);
    turnstileFormData.append("response", turnstileToken);

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: turnstileFormData.toString(),
      }
    );

    const verifyData = (await verifyResponse.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!verifyData.success) {
      return {
        success: false,
        message:
          "Bot verification challenge failed. Please refresh or retry the verification check.",
      };
    }
  } catch (err) {
    console.error("[ContactAction] Turnstile verification error:", err);
    return {
      success: false,
      message: "Security verification service unreachable. Please try again shortly.",
    };
  }

  // 5. Sanitize and escape all input values
  const cleanName = stripHeaderNewlines(name);
  const cleanSubject = stripHeaderNewlines(subject);
  const cleanMessage = stripControlCharacters(message);

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(cleanSubject);
  const safeMessage = escapeHtml(cleanMessage);

  // 6. Check SMTP Configuration
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.SMTP_FROM ||
    `"Portfolio Contact" <${user || "no-reply@darenzhicap.netlify.app"}>`;
  const receiver =
    process.env.CONTACT_RECEIVER_EMAIL || "hicap.darenzjasper@gmail.com";

  if (!host || !user || !pass) {
    console.warn(
      "[ContactAction] SMTP credentials are not configured. Returning simulated success for testing."
    );
    return {
      success: true,
      message:
        "Thank you! Your message was received (test mode active: Turnstile verified, SMTP credentials pending).",
    };
  }

  // 7. Send Email via Nodemailer
  try {
    const isSecure = process.env.SMTP_SECURE === "true" || port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from,
      to: receiver,
      replyTo: `"${cleanName}" <${email}>`,
      subject: `[Portfolio Contact] ${cleanSubject} - from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${email}\nSubject: ${cleanSubject}\n\nMessage:\n${cleanMessage}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="margin-top: 0; color: #0A0F2C; border-bottom: 2px solid #4F5689; padding-bottom: 12px;">New Contact Form Message</h2>
          <p><strong>From:</strong> ${safeName} &lt;<a href="mailto:${safeEmail}">${safeEmail}</a>&gt;</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #1A1E4D; margin-bottom: 8px;">Message:</h3>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #334155;">${safeMessage}</div>
          <footer style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            Sent from personal portfolio contact form (https://darenzhicap.netlify.app)
          </footer>
        </div>
      `,
    });

    return {
      success: true,
      message:
        "Thank you! Your message has been sent successfully. I will get back to you promptly.",
    };
  } catch (error) {
    console.error("[ContactAction] Nodemailer error:", error);
    return {
      success: false,
      message:
        "Failed to dispatch email over SMTP. Please contact me directly via email or LinkedIn.",
    };
  }
}
