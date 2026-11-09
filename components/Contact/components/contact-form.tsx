"use client";

import { useEffect, useRef, useState, useTransition, type SubmitEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { AnimatePresence, motion } from "motion/react";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/portfolio/utils/validation/contact";
import {
  sendContactEmail,
  type ContactActionResult,
} from "@/portfolio/app/actions/contact";
import { useThemeStore } from "@/portfolio/utils/store/theme-store";
import { ArrowRightIcon, CloseIcon } from "@/portfolio/components/icons";

export default function ContactForm() {
  const theme = useThemeStore((s) => s.theme);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [result, setResult] = useState<ContactActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      turnstileToken: "",
    },
  });

  // Listen for custom event from TicketSupport "Request walkthrough / demo" CTA
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{
        subject?: string;
        message?: string;
      }>;
      if (customEvent.detail) {
        if (customEvent.detail.subject) {
          setValue("subject", customEvent.detail.subject, {
            shouldValidate: true,
          });
        }
        if (customEvent.detail.message) {
          setValue("message", customEvent.detail.message, {
            shouldValidate: true,
          });
        }
      }
    };

    window.addEventListener("portfolio:prefill-contact", handlePrefill);
    return () =>
      window.removeEventListener("portfolio:prefill-contact", handlePrefill);
  }, [setValue]);

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data: ContactFormValues) => {
      setResult(null);

      startTransition(async () => {
        const res = await sendContactEmail(data);
        setResult(res);

        if (res.success) {
          reset({
            name: "",
            email: "",
            subject: "",
            message: "",
            turnstileToken: "",
          });
          turnstileRef.current?.reset();
        } else {
          setValue("turnstileToken", "", { shouldValidate: false });
          turnstileRef.current?.reset();
        }
      });
    })(e);
  };

  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    "1x00000000000000000000AA";

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="rounded-xl border border-border bg-surface p-6 md:p-8 flex flex-col gap-5"
    >
      {/* Name & Email Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-small font-mono text-muted"
          >
            Your Name <span className="text-accent">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            {...register("name")}
            className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-body text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {errors.name ? (
            <p className="text-xs text-red-500 font-mono mt-0.5">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-small font-mono text-muted"
          >
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
            {...register("email")}
            className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-body text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {errors.email ? (
            <p className="text-xs text-red-500 font-mono mt-0.5">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Subject Field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="text-small font-mono text-muted"
        >
          Subject <span className="text-accent">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="Role inquiry / TicketSupport walkthrough"
          {...register("subject")}
          className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-body text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {errors.subject ? (
          <p className="text-xs text-red-500 font-mono mt-0.5">
            {errors.subject.message}
          </p>
        ) : null}
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-small font-mono text-muted"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your team, the project, or what you'd like to discuss..."
          {...register("message")}
          className="w-full rounded-md border border-border bg-background p-3.5 text-body text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-y"
        />
        {errors.message ? (
          <p className="text-xs text-red-500 font-mono mt-0.5">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {/* Cloudflare Turnstile Verification Gate */}
      <div className="flex flex-col gap-1.5 py-1">
        <div className="overflow-hidden rounded-md min-h-[65px]">
          <Turnstile
            ref={turnstileRef}
            siteKey={turnstileSiteKey}
            options={{
              theme: theme === "dark" ? "dark" : "light",
              size: "flexible",
            }}
            onSuccess={(token) => {
              setValue("turnstileToken", token, { shouldValidate: true });
            }}
            onExpire={() => {
              setValue("turnstileToken", "", { shouldValidate: true });
            }}
            onError={() => {
              setValue("turnstileToken", "", { shouldValidate: true });
            }}
          />
        </div>
        {errors.turnstileToken ? (
          <p className="text-xs text-red-500 font-mono">
            {errors.turnstileToken.message}
          </p>
        ) : null}
      </div>

      {/* Submission Feedback Banner */}
      <AnimatePresence initial={false}>
        {result ? (
          <motion.div
            key="result-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className={`rounded-md p-4 text-small border overflow-hidden ${
              result.success
                ? "border-accent/40 bg-accent/10 text-foreground"
                : "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{result.message}</p>
              <button
                type="button"
                onClick={() => setResult(null)}
                aria-label="Dismiss notice"
                className="grid place-items-center size-6 rounded text-muted hover:text-foreground cursor-pointer"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-small font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        <span>{isPending ? "Sending message..." : "Send Message"}</span>
        <ArrowRightIcon
          className={`size-4 transition-transform ${
            isPending ? "animate-pulse" : ""
          }`}
        />
      </button>
    </form>
  );
}
