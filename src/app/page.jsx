import HeroSlider from "@/components/Pages/Home/HeroSlider";
import MatchSlider from "@/components/Pages/Home/MatchSlider";
import Casino from "@/components/Pages/Home/Casino";
import { auth } from "@/lib/auth";
import Marquees from "../components/Pages/Home/Marquee";
import TopGames from "@/components/Pages/Home/TopGames";
import MainFooter from "@/components/Shared/MainFooter";
import MiddlePositionImage from "@/components/homePage/MiddlePositionImage";
import BottomSection from "@/components/homePage/BottomSection";
import Bottom from "@/components/homePage/Bottom";
import MenuSlider from "@/components/homePage/MenuSlider";
import FavoriteGames from "@/components/homePage/FavoritesGames";
import Favorite from "@/components/homePage/Favorite";
import styles from "./page.module.css";
import HeaderSportsBook from "@/components/Shared/HeaderSportsBook";
export default async function page() {
  const session = await auth();

  return (
    <>
      <HeaderSportsBook session={session} />
      <HeroSlider />
      <Marquees />
      {/* Menu slider for home page for mobile version */}

      <MenuSlider />
      <MiddlePositionImage />
      <div className={styles.bothFavorite}>
        <Favorite />
        <FavoriteGames />
      </div>

      <Bottom session={session} />
      {/* <Casino session={session} /> */}

      {/* <TopGames />
      <MatchSlider />
      <SportsBook session={session} />
      <MainFooter /> */}
    </>
  );
}
