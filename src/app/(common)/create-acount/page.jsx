"use client";
import CreateAcount from "./CreateAcount";
import LogRegHeader from "@/components/Shared/LogRegHeader";
import { useSearchParams } from "next/navigation";
import CreateAccountForMobile from "./CreateAccountMobile";
import styles from "./registrationMobile.module.css";

export default function Page() {
  const searchParams = useSearchParams();
  const s = searchParams.get("s");
  const promoCode = searchParams.get("p");
  console.log("promoCode" + promoCode);
  return (
    <>
      {/* <LogRegHeader /> */}

      <div></div>
      <div className={styles.registrationMobile}>
        <CreateAccountForMobile referrerId={s} promoCode={promoCode} />
      </div>
      <div className={styles.registrationDesktop}>
        <CreateAcount referrerId={s} promoCode={promoCode} />
      </div>
    </>
  );
}
