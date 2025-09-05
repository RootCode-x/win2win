import Login from "@/components/Pages/Login/Login";
import HeaderMainAuthCheckNoSideMobile from "@/components/Shared/HeaderMainAuthCheckNoSideMobile";
import LogRegHeader from "@/components/Shared/LogRegHeader";
import { auth } from "@/lib/auth";
import React from "react";
import LoginMobile from "./LoginMobile";
import LoginDesktop from "./LoginDesktop";
import styles from "./loginMobile.module.css";
export default async function page() {
  const session = await auth();
  return (
    <>
      {/* <HeaderMainAuthCheckNoSideMobile session={session} /> */}

      <div className={styles.loginMobile}>
        <LoginMobile />
      </div>
      <div className={styles.loginDesktop}>
        <LoginDesktop />
      </div>
    </>
  );
}
