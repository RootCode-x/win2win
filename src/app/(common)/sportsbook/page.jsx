import HeaderSportsBook from '@/components/Shared/HeaderSportsBook';
import SportsBook from '@/components/Pages/SportsBook/SportsBook';
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
            <HeaderSportsBook session={session} />
            <SportsBook session={session} />
        </>
    )
}