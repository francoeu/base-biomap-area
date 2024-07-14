import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useState } from "react";

function NewsLetterSection() {
  // Inicialize o estado para armazenar o email
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); // Para controlar se o usuário se inscreveu com sucesso
  const axiosAuth = useAxiosAuth();
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL
  // Função para atualizar o estado quando o email for digitado
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz uma solicitação POST para o servidor com o email
      const res = await fetch(`${apiUrl}/api/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // const res = await axios.post(`/api/subscribers/`);

      if (res.status === 201) {
        // O email foi registrado com sucesso
        setIsSubscribed(true);
      } else {
        // Lidar com erros de envio, por exemplo, exibindo uma mensagem de erro
        console.error("Erro ao se inscrever");
        console.error(res);
      }
    } catch (error) {
      console.error("Erro ao se inscrever", error);
    }
  };

  return (
    <section className="relative- pt-4 sm:pt-0 sm:p-3 sm:p-10- w-full bg-black- flex justify-center content-center items-center">
      <div className="w-full max-h-min md:w-full md:max-w-6xl- mx-auto px-4 sm:px-6 text-center bg-[#035630] rounded-xl">
        <div className="py-6 md:py-12-">
          {isSubscribed ? (
            // Exibe uma mensagem de sucesso após a inscrição bem-sucedida
            <>
              <h1 className="mb-5 text-3xl md:text-4xl font-bold text-white">
                Inscrição concluída com sucesso!
              </h1>
              <p className="mb-4 text-sm md:text-md font-normal text-gray-200">
                Obrigado por se inscrever na nossa Newsletter.
              </p>
            </>
          ) : (
            // Exibe o formulário de inscrição
            <>
              <h1 className="mb-5 text-3xl md:text-4xl font-bold text-white">
                Inscreva-se na nossa Newsletter
              </h1>
              <h1 className="mb-4 text-sm md:text-md font-normal text-gray-200">
                Receba curadoria especial com notícias, conteúdos e ofertas especiais selecionadas a dedo para você.
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="bg-white w-full m-auto flex justify-between items-center max-w-xl rounded-md">
                  <input
                    type="email"
                    placeholder="É só digitar seu e-mail"
                    name="email"
                    autoComplete="email"
                    className="w-6/12 text-xs pr-2 pl-2 py-3 ml-2 mt-2- rounded-md text-gray-900 font-semibold hover:border-white bg-white"
                    value={email} // Associe o valor do input ao estado "email"
                    onChange={handleEmailChange} // Use a função para atualizar o estado quando o email for digitado
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center md:px-14 py-3 my-2 mr-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent- border- rounded-lg bg-black"
                  >
                    <span className="justify-center text-xs px-2">INSCREVER-SE</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewsLetterSection;
