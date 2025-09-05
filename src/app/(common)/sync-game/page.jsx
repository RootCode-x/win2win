import React from 'react'
import Deposit from '@/components/Pages/Deposit/Deposit';
import HeaderSportsBook from '@/components/Shared/HeaderSportsBook';
import SyncGame from '@/components/Pages/LiveCasino/SyncGame';
import { auth } from "@/lib/auth";

export default async function page() {

  const session = await auth();

  return (
      <>   
          <HeaderSportsBook session={session} />
          <SyncGame session={session} />
      </>
  ) 
}
