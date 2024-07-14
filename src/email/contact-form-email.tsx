/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
  phone: string,
  name:string,
  adress: string,
};

export default function ContactFormEmail({
  name,
  phone,
  adress,
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem via Site Biomap</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Você recebeu a seguinte mensagem do via formulário de contato
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>E-mail: {senderEmail}</Text>
              <Text>Nome: {name}</Text>
              <Text>Whatsapp: {phone}</Text>
              <Text>Endereço: {adress}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
