"use client";
import React, { useState } from "react";

import Image from "next/image";
import styles from "./menuSlider.module.css";
import { mainDrawerItems } from "../Shared/mainDrawerItems";
import Link from "next/link";
import { linkForSpotsItem } from "../Shared/HeaderMainAuthCheckNoSideMobile";

const MenuSlider = () => {
  const [singleMenuItem, setSingleMenuItems] = useState(mainDrawerItems[0]);
  console.log(singleMenuItem);
  return (
    <div className={styles.exclusive}>
      <div className={styles.custom_scrollbar}>
        {mainDrawerItems?.map((item, index) => (
          <div
            key={index}
            className={styles.item_container}
            onClick={() => setSingleMenuItems(item)}
          >
            <Image
              src={item.icon}
              alt={item.alt || ""}
              width={34}
              height={64}
            />
            <p className={styles.item_label}>{item.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{ height: "12px", width: "4px", backgroundColor: "#ff8a14" }}
          ></div>
          <p>{singleMenuItem.label}</p>
        </div>

        {singleMenuItem.label === "Exclusive" ? (
          <Link href={"https://api.casinoxy.com/"}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={"/imagew/exclusive2.jpg"}
                alt={singleMenuItem?.alt || ""}
                width={299}
                height={169}
                style={{ borderRadius: "4px" }}
              />
            </div>
          </Link>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.subItems_grid}>
              {singleMenuItem?.subItems?.map((item, index) => (
                <Link
                  key={index}
                  href={
                    singleMenuItem.label === "Sports"
                      ? linkForSpotsItem
                      : "https://api.casinoxy.com/"
                  }
                >
                  <div className={styles.sub_item_container}>
                    <div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Image
                          src={item.img}
                          alt={item.alt || ""}
                          width={34}
                          height={64}
                        />
                      </div>
                      <p className={styles.sub_item_label}>{item?.itemName}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSlider;
