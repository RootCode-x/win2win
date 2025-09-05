import React from "react";
import Profile from "@/components/Pages/Profile/Profile";
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
      <HeaderSportsBook session={session} />
      <Profile session={session} />

      <FooterLastForMobile session={session} />
    </>
  );
}
