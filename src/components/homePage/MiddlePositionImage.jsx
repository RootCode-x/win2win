import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import FavoriteGames from "./FavoritesGames";

const MiddlePositionImage = () => {
  return (
    <>
      <div className={styles.image_container}>
        <div className={styles.image_div}>
          <div>
            <div className={styles.image_top}>
              {" "}
              <p> Favorite </p>
              <div>
                <FaLongArrowAltLeft />
                <FaLongArrowAltRight style={{ marginLeft: "8px" }} />
              </div>
            </div>
            <div>
              <Image
                src={"/images/home-top/image1.jpg"}
                height={400}
                width={800}
                alt="img"
              />
            </div>
          </div>
          <div>
            <div className={styles.image_top}>
              <p> Favorite </p>
              <div>
                <FaLongArrowAltLeft />
                <FaLongArrowAltRight style={{ marginLeft: "8px" }} />
              </div>
            </div>
            <div>
              <Image
                src={"/images/home-top/image2.jpg"}
                height={400}
                width={800}
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiddlePositionImage;
