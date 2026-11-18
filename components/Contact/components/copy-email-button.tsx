"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/portfolio/components/icons";

type CopyEmailButtonProps = {
  email: string;
};

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-[4px] border px-3.5 py-2 text-xs font-mono font-medium transition-colors cursor-pointer ${
        copied
          ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "border-border bg-background text-foreground hover:border-accent hover:text-accent"
      }`}
    >
      {copied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      <span>{copied ? "Copied to clipboard" : "Copy email"}</span>
    </button>
  );
}
