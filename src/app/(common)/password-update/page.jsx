import React from 'react'
import PasswordUpdate from '@/components/Pages/Profile/PasswordUpdate'
import HeaderSportsBook from '@/components/Shared/HeaderSportsBook';
import { auth } from "@/lib/auth";

export default async function page() {

  const session = await auth();

  return (
      <>   
        
        
          <HeaderSportsBook session={session} />
          <PasswordUpdate session={session}/>
      </>
  )
}
 