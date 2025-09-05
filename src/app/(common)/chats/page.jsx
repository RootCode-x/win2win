import React from 'react'
import HeaderSportsBook from '@/components/Shared/HeaderSportsBook'
import Chats from '@/components/Pages/Chats/ChatsList'
import { redirect } from 'next/navigation'; // Import redirect function
import { auth } from "@/lib/auth"; // Your custom auth function

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/login');
    return null; 
  }
  
  return (
    <>   
      <HeaderSportsBook session={session} />
      <Chats session={session} />
    </>
  )
}
