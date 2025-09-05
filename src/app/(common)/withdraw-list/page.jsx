import React from "react";
import Dashboard from "@/components/Pages/Dashboard/Dashboard";
import Withdraw from "@/components/Pages/Withdraw/WithdrawList";
import HeaderSportsBook from "@/components/Shared/HeaderSportsBook";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
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
      <Withdraw session={session} />
      <FooterLastForMobile session={session} />
    </>
  );
}
