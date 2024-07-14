import { NavbarHeader } from "@/components/site/Navbar";
import ServicesPage from "@/components/site/services/ServicesPage";
import Footer from "@/components/template/Footer";
import Pagina from "@/components/template/Pagina";
import { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://biomapengenharia.com/"),
    title: {
      default: "Serviços",
      template: `%s | Biomap Topografia & Locações`,
      absolute: "Serviços | Biomap Topografia & Locações "
    },
  
  }

export default function Services() {

 return (
    <Pagina externa>
        <NavbarHeader />
        <ServicesPage />
        <Footer />
    </Pagina>
 )

    
}
