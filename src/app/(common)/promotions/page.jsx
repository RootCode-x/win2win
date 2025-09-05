import Promotions from '@/components/Pages/Promotions/Promotions'
import React from 'react'
import HeaderSportsBook from '@/components/Shared/HeaderSportsBook';
import { auth } from "@/lib/auth";

export default async function page() {

  const session = await auth();
  return (
      <>
          <HeaderSportsBook session={session} />
          <Promotions /> 
      </>
  )
}
