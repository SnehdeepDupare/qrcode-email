import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must include atleast 2 characters!" })
    .max(50),
  email: z.string().email(),
  subject: z
    .string()
    .min(10, { message: "Subject must include atleast 10 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must include atleast 10 characters" }),
});
