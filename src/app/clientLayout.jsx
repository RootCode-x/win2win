"use client";

// import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ClientLayout = async ({ children }) => {
  // useRouter;
  // const session = await auth();
  // const router = useRouter();
  // if (session) {
  //   return (
  //     <>
  //       {" "}
  //       <HeaderSportsBook session={session} /> {children}
  //     </>
  //   );
  // } else {
  //   router.push("/login");
  // }
  return <> {children}</>;
};

export default ClientLayout;
