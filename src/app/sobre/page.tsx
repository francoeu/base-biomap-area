import { NavbarHeader } from "@/components/site/Navbar";
import AboutPage from "@/components/site/about/AboutPage";
import Footer from "@/components/template/Footer";
import Pagina from "@/components/template/Pagina";
import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://biomapengenharia.com/"),
    title: {
      default: "Sobre",
      template: `%s | Biomap Topografia & Locações`,
      absolute: "Sobre | Biomap Topografia & Locações "
    },
  
  }

export default function About() {

 return (
    <Pagina externa>
        <NavbarHeader />
        <AboutPage />
        <Footer />
    </Pagina>
 )

    
}
