"use server";

import EmailTemplate from "@/components/EmailTemplate";
import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  data: z.infer<typeof contactSchema>,
  qrSrc: string
) => {
  const result = contactSchema.safeParse(data);

  if (result.success) {
    const { name, email, subject, message } = result.data;

    try {
      const data = await resend.emails.send({
        from: "Contact <contact@snehdeepdupare.in>",
        to: "duparesnehdeep@gmail.com",
        subject: subject,
        react: EmailTemplate({
          name: name,
          email: email,
          message: message,
          qrSrc: qrSrc,
        }),
        reply_to: email,
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  if (result.error) {
    return {
      success: false,
      error: result.error,
    };
  }
};
