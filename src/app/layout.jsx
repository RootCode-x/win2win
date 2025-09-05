import { Inter } from "next/font/google";
import Script from "next/script";
//import "./globals.css";
//import Navbar from "@/components/navbar/Navbar";
import "@/../../public/scss/style.scss";
//import MainFooter from "@/components/Shared/MainFooter";
//import FooterCard from "@/components/Shared/FooterCard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default:
      "Welcome to Win2win, where your journey to becoming a billionaire begins!  ",
    template: "%s | Win2win",
  },
  description:
    "Welcome to Win2win, where your journey to becoming a billionaire begins!  Wondering what Win2win is all about? It's an immersive platform where sports betting meets the excitement of casino games. Here, you can place bets on your favorite sports events while also enjoying a diverse array of casino offerings. From high-stakes sports wagering to chasing the allure of winning jackpots, Win2win brings the excitement of both worlds together under one roof. So, if you're ready to embark on an adventure where every outcome leaves you wondering what's next, Win2win is the place to be.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/66f132884cbc4814f7dd72aa/1i8f2qq41';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} cz-shortcut-listen="true">
        <main>{children}</main>
      </body>
    </html>
  );
}
