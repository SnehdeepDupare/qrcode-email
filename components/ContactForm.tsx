"use client";

import { MouseEventHandler, useState } from "react";
import QRCode from "qrcode";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail } from "@/actions/sendEmail";
import { contactSchema } from "@/lib/validations";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const [qrSrc, setQrSrc] = useState<string>("");

  const onSubmit: SubmitHandler<z.infer<typeof contactSchema>> = async (
    data
  ) => {
    const qr = QRCode.toDataURL(data.message);
    setQrSrc(await qr);

    if (qrSrc) {
      const result = await sendEmail(data, qrSrc);

      if (result?.success && result.data?.data?.id) {
        alert("Email Sent!");
        reset();
        return;
      }
      alert(`${result?.data?.error?.message}`);
      console.log(result?.data?.error?.message);
    }
  };

  return (
    <form
      className="flex flex-col max-w-lg w-full gap-y-8 mt-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          className="input-field"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="mt-1 ml-1 text-sm text-red-400 text-left">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="mt-1 ml-1 text-sm text-red-400 text-left">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Subject"
          className="input-field"
          {...register("subject")}
        />
        {errors.subject?.message && (
          <p className="mt-1 ml-1 text-sm text-red-400 text-left">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          placeholder="Message"
          className="input-field"
          rows={10}
          {...register("message")}
        />{" "}
        {errors.message?.message && (
          <p className="mt-1 ml-1 text-sm text-red-400 text-left">
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-400 rounded-md px-4 py-2 text-white flex justify-center"
        type="submit"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 rounded-full animate-spin border-b-2 border-white" />
        ) : (
          "Send"
        )}
      </button>

      {/* <img src={qrSrc} alt="" /> */}
    </form>
  );
}
