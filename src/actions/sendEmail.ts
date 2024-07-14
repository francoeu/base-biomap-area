"use server";

import ContactFormEmail from "@/email/contact-form-email";
import { getErrorMessage, validateString } from "@/lib/utils";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const name = formData.get("name");
  const phone = formData.get("phone");
  const adress = formData.get("adress");

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  if (!validateString(name, 500)) {
    return {
      error: "Invalid name",
    };
  }


  if (!validateString(phone, 100)) {
    return {
      error: "Invalid phone",
    };
  }

  if (!validateString(adress, 300)) {
    return {
      error: "Invalid adress",
    };
  }


  let data;
  try {
    data = await resend.emails.send({
      from: "Novo Orçamento | Site <contato@updates.biomapengenharia.com>",
      to: ["contato@biomapengenharia.com.br", "francoeu.me@gmail.com"],
      subject: "Novo contato via site",
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail,{
        message: message,
        senderEmail: senderEmail,
        name: name,
        phone: phone,
        adress: adress,
      }),
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
