"use client";
import React, { useState, useEffect, useRef } from "react";

import { IoIosArrowForward } from "react-icons/io";
import styles from "./headerMobile.module.css"; // Import the CSS module
import Image from "next/image";
import { MdOutlineMessage } from "react-icons/md";
import { ImDownload2 } from "react-icons/im";
import Link from "next/link";
import { mainDrawerItems } from "./mainDrawerItems";
export default function HeaderMainAuthCheckNoSideMobile({ session }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubDrawerOpen, setIsSubDrawerOpen] = useState(false);
  const [subDrawerItems, setSubDrawerItems] = useState([]);
  const [itemName, setItemName] = useState({});
  const mainDrawerRef = useRef(null);
  const subDrawerRef = useRef(null);

  const drawerItems2 = [
    {
      src: "/imagew/QuvlT9dAXVUp.png",
      alt: "Promotions Icon",
      label: "Promotions",
      link: "/promotions",
    },
    {
      src: "/imagew/eo80xi8S6Eyw.png",
      alt: "Referral Program Icon",
      label: "Referral Program",
      link: "/dashboard",
    },
    {
      src: "/imagew/clRhIQc9KpFV.png",
      alt: "VIP Club Icon",
      label: "VIP CLUB",
      link: "/dashboard",
    },
  ];
  const drawerItems3 = [
    {
      src: "/imagew/RADNXIMvJ6WH.png",
      alt: "Promotions Icon",
      label: "Affiliate",
      link: "/dashboard",
    },
    {
      src: "/imagew/m3ikv5gs8WfE.png",
      alt: "Referral Program Icon",
      label: "24/7 LiveChat",
      link: "/",
    },
    {
      src: "/imagew/rlpb02XgR2U1.png",
      alt: "VIP Club Icon",
      label: "Brand ambassador",
      link: "/",
    },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setIsSubDrawerOpen(false); // Close sub-drawer when toggling main drawer
  };

  const openSubDrawer = (subItems) => {
    setSubDrawerItems(subItems);
    setIsSubDrawerOpen(true);
  };

  // Close drawers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(isSubDrawerOpen);
      if (
        mainDrawerRef.current &&
        !mainDrawerRef.current.contains(event.target) &&
        !subDrawerRef.current
      ) {
        setIsDrawerOpen(false);
        setIsSubDrawerOpen(false);
      }

      if (
        mainDrawerRef.current &&
        !mainDrawerRef.current.contains(event.target) &&
        subDrawerRef.current &&
        !subDrawerRef.current.contains(event.target)
      ) {
        setIsDrawerOpen(false);
        setIsSubDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => toggleDrawer()}
              className={styles.menuButton}
            >
              <div
                style={{
                  backgroundColor: "red",
                  width: "20px",
                  height: "2px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ff8a14",
                    width: "20px",
                    height: "2px",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#ff8a14",
                    width: "17px",
                    height: "2px",
                    marginTop: "2px",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#ff8a14",
                    width: "14px",
                    height: "2px",
                    marginTop: "2px",
                  }}
                ></div>
              </div>
            </button>

            <Link href="/">
              <Image
                src="/images/providersnew/fastbet.png"
                alt={"item.alt"}
                width={104}
                height={60}
              />
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ textAlign: "center" }}>
                <ImDownload2 style={{ color: "#ff8a14" }} />
              </p>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "-8px",
                  fontSize: "12px",
                  color: "#ff8a14",
                }}
              >
                App
              </p>
            </div>
            <div>
              <p style={{ textAlign: "center" }}>
                <MdOutlineMessage style={{ color: "#ff8a14" }} />
              </p>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "-8px",
                  fontSize: "12px",
                  color: "#ff8a14",
                }}
              >
                Help
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Drawer */}
      <div
        ref={mainDrawerRef}
        className={`${styles.drawer} ${
          isDrawerOpen ? styles.drawerOpen : styles.drawerClosed
        }`}
        style={{ overflowY: "auto" }}
      >
        <ul className={styles.drawerList} style={{ zIndex: "100" }}>
          <Link href={"/"}>
            <li className={styles.drawerItem}>
              <div className={styles.drawerItemMain}>
                <span className={styles.drawerItemLabel}>
                  <Image
                    src={"/imagew/ZAjtpA9lasdR.png"}
                    alt="Profile"
                    width={30}
                    height={60}
                  />
                  Home
                </span>
              </div>
            </li>
          </Link>
          {mainDrawerItems.map((item, index) => (
            <li key={index} className={styles.drawerItem}>
              <div
                className={styles.drawerItemMain}
                onClick={() => {
                  item.subItems ? openSubDrawer(item.subItems) : null;

                  setItemName(item.label);
                }}
              >
                <span className={styles.drawerItemLabel}>
                  <Image src={item.icon} alt="Profile" width={30} height={60} />

                  {item.label}
                </span>
                {item.subItems && <IoIosArrowForward />}
              </div>
            </li>
          ))}

          <div>
            {drawerItems2.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className={styles.drawerItem}>
                  <div className={styles.drawerItemMain}>
                    <span className={styles.drawerItemLabel}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={30}
                        height={60}
                      />
                      {item.label}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </div>

          <div>
            {drawerItems3.map((item, index) => (
              <Link key={index} href={item.link}>
                <li key={index} className={styles.drawerItem}>
                  <div className={styles.drawerItemMain}>
                    <span className={styles.drawerItemLabel}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={30}
                        height={60}
                      />
                      {item.label}
                    </span>
                  </div>
                </li>
              </Link>
            ))}
          </div>
        </ul>
      </div>

      {/* Sub-Drawer */}
      {isSubDrawerOpen && (
        <div
          ref={subDrawerRef}
          className={`${styles.subDrawer} ${styles.drawerOpen}`}
          style={{ overflowY: "auto" }}
        >
          <ul className={styles.drawerList}>
            {subDrawerItems.map((subItem, index) => (
              <Link
                key={index}
                href={itemName === "Sports" ? linkForSpotsItem : "https://api.casinoxy.com/"}
              >
                <li key={index} className={styles.drawerItem}>
                  <div className={styles.subDrawerItemMain}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Image
                        src={subItem.img}
                        alt="Profile"
                        width={41.59}
                        height={60}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      {subItem.itemName}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const linkForSpotsItem =
  "https://skyiframes.3iframe.com/home";
