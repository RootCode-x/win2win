import React from "react";
import Dashboard from "@/components/Pages/Dashboard/Dashboard";
import HeaderSportsBook from "@/components/Shared/HeaderSportsBook";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import FooterLastForMobile from "@/components/homePage/FooterLast";
import styles from "@/components/homePage/FooterLast.module.css";
export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/login");
    return null;
  }

  return (
    <div>
      <HeaderSportsBook session={session} />
      <Dashboard session={session} />

      <FooterLastForMobile session={session} />
    </div>
  );
}
