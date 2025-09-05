import React from 'react'
import Dashboard from '@/components/Pages/Dashboard/Dashboard'
import HeaderTwo from '@/components/Shared/HeaderTwo'
import NewHeaderMain from '@/components/Shared/HeaderMainAuthCheck'
import HeaderMain from '@/components/Shared/HeaderMain';
import LiveCasino from '@/components/Pages/LiveCasino/LiveCasino';

import { auth } from "@/lib/auth";

export default async function page() {

  const session = await auth();

  return (
      <>   
          {/* <HeaderTwo /> */}
          <HeaderMain session={session} />
          <LiveCasino session={session} />
      </>
  )
}
