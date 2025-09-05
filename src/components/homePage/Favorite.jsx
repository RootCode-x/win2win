import Image from "next/image";
import React from "react";
import styles from "./Favorite.module.css";
import Link from "next/link";
import { linkForSpotsItem } from "../Shared/HeaderMainAuthCheckNoSideMobile";

const Favorite = () => {
  return (
    <div className={styles.image_containerMob}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{ height: "12px", width: "4px", backgroundColor: "#ff8a14" }}
        ></div>
        <p>Favorites</p>
      </div>
      <Link href={linkForSpotsItem}>
        <div className={styles.custom_scrollbar}>
          <div className={styles.item_container}>
            <Image
              src={"/images/home-top/image1.jpg"}
              alt={""}
              width={200}
              height={400}
              style={{ borderRadius: "5px" }}
            />
          </div>

          <div className={styles.item_container}>
            <Image
              src={"/images/home-top/image2.jpg"}
              alt={""}
              width={200}
              height={400}
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className={styles.item_container}>
            <Image
              src={"/images/home-top/image2.jpg"}
              alt={""}
              width={200}
              height={400}
              style={{ borderRadius: "5px" }}
            />
          </div>
          <div className={styles.item_container}>
            <Image
              src={"/images/home-top/image2.jpg"}
              alt={""}
              width={200}
              height={400}
              style={{ borderRadius: "5px" }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Favorite;
