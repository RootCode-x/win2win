import React from 'react'
import Chats from '@/components/Pages/Chats/ChatWith'
import HeaderSportsBook from '@/components/Shared/HeaderSportsBook'
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation'; 

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/login');
    return null; 
  }

  return (
      <>   
          {/* <HeaderTwo /> */}
          <HeaderSportsBook session={session} />
          <Chats session={session} />
      </>
  )
}
