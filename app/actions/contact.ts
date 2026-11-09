"use server";

import nodemailer from "nodemailer";
import { contactFormSchema, type ContactFormValues } from "@/portfolio/utils/validation/contact";

export type ContactActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

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

  const { name, email, subject, message, turnstileToken } = validation.data;

  // 2. Cloudflare Turnstile Verification
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

  // 3. Check SMTP Configuration
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"Portfolio Contact" <${user || "no-reply@darenzhicap.netlify.app"}>`;
  const receiver =
    process.env.CONTACT_RECEIVER_EMAIL || "hicap.darenzjasper@gmail.com";

  if (!host || !user || !pass) {
    console.warn(
      "[ContactAction] SMTP credentials are not configured. Returning simulated success for testing."
    );
    // If running in development with Turnstile test keys and user hasn't supplied SMTP credentials yet
    return {
      success: true,
      message:
        "Thank you! Your message was received (test mode active: Turnstile verified, SMTP credentials pending).",
    };
  }

  // 4. Send Email via Nodemailer
  try {
    const isSecure =
      process.env.SMTP_SECURE === "true" || port === 465;

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
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio Contact] ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="margin-top: 0; color: #0A0F2C; border-bottom: 2px solid #4F5689; padding-bottom: 12px;">New Contact Form Message</h2>
          <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #1A1E4D; margin-bottom: 8px;">Message:</h3>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #334155;">${message}</div>
          <footer style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            Sent from personal portfolio contact form (https://darenzhicap.netlify.app)
          </footer>
        </div>
      `,
    });

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully. I will get back to you promptly.",
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
