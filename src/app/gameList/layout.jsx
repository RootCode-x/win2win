import { Inter } from "next/font/google";

import "@/../../public/scss/style.scss";
import Bottom from "@/components/homePage/Bottom";
import HeaderSportsBook from "@/components/Shared/HeaderSportsBook";
import { auth } from "@/lib/auth";
import FooterLastForMobile from "@/components/homePage/FooterLast";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <>
      <HeaderSportsBook session={session} />
      {children}
      <FooterLastForMobile session={session} />
    </>
  );
}
