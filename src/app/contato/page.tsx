
import { NavbarHeader } from "@/components/site/Navbar";
import ContactPage from "@/components/site/contact/ContactPage";
import Footer from "@/components/template/Footer";

import Pagina from "@/components/template/Pagina";
import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://biomapengenharia.com/"),
    title: {
      default: "Contato",
      template: `%s | Biomap Topografia & Locações`,
      absolute: "Contato | Biomap Topografia & Locações "
    },
  
  }

export default function Contact() {

 return (
    <Pagina externa>
        <NavbarHeader />
        <ContactPage />
        <Footer />
    </Pagina>
 )

    
}
