import { auth } from "@/lib/auth";
import HeaderMainAuthCheckNoSide from "./HeaderMainAuthCheckNoSide";
import HeaderTwo from "@/components/Shared/HeaderTwo";
import HeaderMainAuthCheckNoSideMobile from "./HeaderMainAuthCheckNoSideMobile";
import styles from "./header.module.css";
const HeaderSportsBook = async () => {
  const session = await auth();

  return (
    <>
      <HeaderMainAuthCheckNoSide session={session} />

      <div className={styles.headerMainAuthCheckNoSideMobile}>
        <HeaderMainAuthCheckNoSideMobile session={session} />
      </div>
    </>
  );
};

export default HeaderSportsBook;
