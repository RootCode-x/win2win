import React from 'react'
import ExchangeHistory from '@/components/Pages/Exchange/ExchangeHistory';
import HeaderSportsBook from '@/components/Shared/HeaderSportsBook';

import { auth } from "@/lib/auth";

export default async function page() {

  const session = await auth();

  return (
      <>   
          {/* <HeaderTwo /> */}
          <HeaderSportsBook session={session} />
          <ExchangeHistory session={session} />
      </>
  ) 
}
