import { auth } from "@/lib/auth";
import NewHeaderMain from './HeaderMainAuthCheck';
import HeaderTwo from '@/components/Shared/HeaderTwo'

const HeaderMain = async () => {

    const session = await auth();
 
    return (
        <>
          <NewHeaderMain session={session}/>
        </>
    
    )
  }

  export default HeaderMain