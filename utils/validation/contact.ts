import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name (at least 2 characters)." })
    .max(100, { message: "Name must be 100 characters or fewer." }),
  email: z.email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .trim()
    .min(3, { message: "Please include a subject (at least 3 characters)." })
    .max(150, { message: "Subject must be 150 characters or fewer." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please enter a message (at least 10 characters)." })
    .max(3000, { message: "Message must be 3000 characters or fewer." }),
  turnstileToken: z
    .string()
    .min(1, { message: "Please complete the verification check." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
