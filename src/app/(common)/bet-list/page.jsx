import React from "react";
import Dashboard from "@/components/Pages/Dashboard/Dashboard";
import BetList from "@/components/Pages/LiveCasino/BetList";
import HeaderSportsBook from "@/components/Shared/HeaderSportsBook";

import { auth } from "@/lib/auth";
import FooterLastForMobile from "@/components/homePage/FooterLast";

export default async function page() {
  const session = await auth();

  return (
    <>
      {/* <HeaderTwo /> */}
      <HeaderSportsBook session={session} />
      <BetList session={session} />
      <FooterLastForMobile session={session} />
    </>
  );
}
