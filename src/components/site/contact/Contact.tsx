"use client";

import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
export default function Contact() {
  const { ref } = useSectionInView("Contact");
  
  const { pending } = useFormStatus();
  const [ recpVal, setRecapVal ] = useState(null)

const recaptchaSiteKey = process.env.GOOGLE_RECAPTCHA_SITE_KEY

    const [formData, setFormData] = useState({
      name: "",
      senderEmail: "",
      phone: "",
      adress: "",
      message: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

      console.log(formData)
    };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] flex flex-col justify-center text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <h1 className="text-3xl font-bold text-green-600 mt-4">Solicitar Orçamento</h1>

      {/* <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:example@gmail.com">
          example@gmail.com
        </a>{" "}
        or through this form.
      </p> */}

      <form
        className="mt-10 flex flex-col dark:text-black "
        action={async (formData) => {
          // const { data, error } = await sendEmail(formData);

          // if (error) {
          //   toast.error(error);
          //   return;
          // }

          // toast.success("Solicitação enviada com sucesso!");

          try {
            const { data, error } = await sendEmail(formData);

            if (error) {
              toast.error(error);
              return;
            }
  
          
            // Redefina o estado do formulário
            setFormData({
              name: "",
              senderEmail: "",
              phone: "",
              adress: "",
              message: "",
            });
          
            toast.success("Solicitação enviada com sucesso!");
          } catch (err) {
            console.log(err);
            // return res.status(400).json({ message: err.message });
          }

        }}
      >
        <input
          className="h-14 px-4 mb-2 rounded-lg borderBlack bg-[#1B1A1A] text-gray-200 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="name"
          type="text"
          required
          maxLength={500}
          placeholder="Seu nome"
          value={formData.name} // Defina o valor a partir do estado
          onChange={handleInputChange} // Adicione um evento de alteração
        />
        <input
          className="h-14 px-4 mb-2 rounded-lg borderBlack bg-[#1B1A1A] text-gray-200 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Seu e-mail"
          value={formData.senderEmail} // Defina o valor a partir do estado
          onChange={handleInputChange} // Adicione um evento de alteração
        />

    <input
          className="h-14 px-4 mb-2 rounded-lg borderBlack bg-[#1B1A1A] text-gray-200 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="phone"
          type="phone"
          required
          maxLength={500}
          placeholder="Whatsapp"
          value={formData.phone} // Defina o valor a partir do estado
          onChange={handleInputChange} // Adicione um evento de alteração
        />

<input
          className="h-14 px-4 mb-2 rounded-lg borderBlack bg-[#1B1A1A] text-gray-200 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="adress"
          type="text"
          required
          maxLength={500}
          placeholder="Cidade e Estado"
          value={formData.adress} // Defina o valor a partir do estado
          onChange={handleInputChange} // Adicione um evento de alteração
        />
        <textarea
          className="h-32 mb-2 rounded-lg borderBlack p-4 bg-[#1B1A1A] text-gray-200 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Conte-nos o que precisa?..."
          required
          maxLength={5000}
          value={formData.message} // Defina o valor a partir do estado
          onChange={handleInputChange} // Adicione um evento de alteração
        />

<div className="flex justify-center w-full py-2">
<div className="mb-4">
<ReCAPTCHA 
          sitekey="6LfHPEwoAAAAAHzGSOEju9DOwPDsDK-Y5uj819qq"
          onChange={(recapVal) => setRecapVal(recapVal)}
          theme="dark"
          size="compact"
        
          />
</div>
</div>
          <div className=" w-full max-w-lg-">
        <div className="bg-black- w-full flex justify-center items-center  text-center">
         
          <button
      type="submit"
      className="group flex items-center justify-center  text-center gap-2 h-[3rem] w-full bg-gray-900 text-white rounded-lg outline-none transition-all focus:scale-105 hover:scale-105 hover:bg-green-800 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
      disabled={pending || !recpVal}
    >
      {pending ? (
        <div className="h-5 w-full animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Enviar Solicitação{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
          </div>
            
        </div>
        
      </form>
    </motion.section>
  );
}
