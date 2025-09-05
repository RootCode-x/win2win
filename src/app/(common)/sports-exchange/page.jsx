import HeaderSportsBook from '@/components/Shared/HeaderSportsBook';
import SportsExchange from '@/components/Pages/SportsBook/SportsExchange';
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation'; 

export default async function page() {
       
    const session = await auth();
    if (!session) {
      redirect('/login');
      return null; 
    }
    
    return (
        <>
            <HeaderSportsBook session={session} />
            <SportsExchange session={session} />
        </>
    )
}