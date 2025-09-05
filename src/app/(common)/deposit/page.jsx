import React from "react";
import Dashboard from "@/components/Pages/Dashboard/Dashboard";
import Deposit from "@/components/Pages/Deposit/Deposit";
import HeaderSportsBook from "@/components/Shared/HeaderSportsBook";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from "@/components/homePage/FooterLast.module.css";
import FooterLastForMobile from "@/components/homePage/FooterLast";
export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/login");
    return null;
  }

  return (
    <>
      {/* <HeaderTwo /> */}
      <HeaderSportsBook session={session} />
      <Deposit session={session} />
      <FooterLastForMobile session={session} />
    </>
  );
}
