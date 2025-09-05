"use client";

import Image from "next/image";
import React from "react";
import styles from "./FavoritesGames.module.css";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { games } from "../Pages/Home/Casino";
import Link from "next/link";

const FavoriteGames = () => {
  return (
    <>
      <div
        style={{
          marginTop: "20px",
        }}
        className={styles.favoriteGames}
      >
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
          <p>Favorites Games</p>
        </div>
        <Link href={"https://api.casinoxy.com/"}>
          <div className={styles.custom_scrollbarX}>
            <div className={styles.item_containerX}>
              <Image
                src={"/imagew/imagew1.png"}
                alt={""}
                width={144}
                height={400}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#292927",
                }}
              >
                <p style={{ paddingLeft: "5px", marginTop: "2px" }}>
                  Money coming
                </p>
              </div>
            </div>
            <div className={styles.item_containerX}>
              <Image
                src={"/imagew/imagew2.png"}
                alt={""}
                width={144}
                height={400}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#292927",
                }}
              >
                <p style={{ paddingLeft: "5px", marginTop: "2px" }}>
                  Boxing king
                </p>
              </div>
            </div>
            <div className={styles.item_containerX}>
              <Image
                src={"/imagew/imagew3.png"}
                alt={""}
                width={144}
                height={400}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#292927",
                }}
              >
                <p style={{ paddingLeft: "5px", marginTop: "2px" }}>
                  Super Element
                </p>
              </div>
            </div>
            <div className={styles.item_containerX}>
              <Image
                src={"/imagew/imagew4.png"}
                alt={""}
                width={144}
                height={400}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#292927",
                }}
              >
                <p style={{ paddingLeft: "5px", marginTop: "2px" }}>
                  Fortune Boom
                </p>
              </div>
            </div>
            <div className={styles.item_containerX}>
              <Image
                src={"/imagew/imagew5.png"}
                alt={""}
                width={144}
                height={400}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#292927",
                }}
              >
                <p style={{ paddingLeft: "5px", marginTop: "2px" }}>
                  Fortune Gems 2
                </p>
              </div>
            </div>
            <div className={styles.item_containerX}>
              <Image
                src={"/imagew/imagew6.png"}
                alt={""}
                width={144}
                height={400}
                style={{ borderRadius: "5px" }}
              />
              <div
                style={{
                  height: "30px",
                  width: "100%",
                  backgroundColor: "#292927",
                }}
              >
                <p style={{ paddingLeft: "5px", marginTop: "2px" }}>
                  Wild Bounty Showdown
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FavoriteGames;
