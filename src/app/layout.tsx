
import Providers from '@/components/Providers'
import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
// import { GoogleAnalytics } from '@next/third-parties/google'
import { Suspense } from 'react'
import { FacebookPixelEvents } from '../components/pixel-events'
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: {
    default: "Biomap Topografia & Locações",
    template: `%s | Biomap Topografia & Locações`,
  },
  description: "Empresa especializada em topografia moderna, projetos de engenharia e locações de equipamentos topográficos.",
  

}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
 
    <html lang="pt-br" className="bg-[#121212] text-white">
      <head>
        <script 

        dangerouslySetInnerHTML={{
__html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MM9C6LX')
`
        }}
        
        />
      </head>
         <Providers>
      <body>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MM9C6LX"
height="0" width="0" ></iframe>

        {children}
        <Suspense fallback={null}>
          <FacebookPixelEvents />
        </Suspense>
        <Analytics />
        {/* <GoogleAnalytics gaId="G-XYZ" /> */}
        </body>
      
        </Providers>
    </html>
  )
}
