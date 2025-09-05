"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./header.module.css";

import { MdEmail } from "react-icons/md";
import {
  FaChevronDown,
  FaFacebook,
  FaHome,
  FaMobileAlt,
  FaPhone,
  FaSignOutAlt,
  FaVoicemail,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";
import Watch from "./Watch";
import { handleLogout } from "@/lib/action";
import { linkForSpotsItem } from "./HeaderMainAuthCheckNoSideMobile";

export default function HeaderMainAuthCheckNoSide({ session }) {
  console.log(session);
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowSportsDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowSportsDropdown(false);
  };

  return (
    <div className={styles.headerMainAuthCheckNoSide}>
      <div
        style={{
          display: "flex",
          alignItems: "center", // Center vertically
          gap: "1rem",
          justifyContent: "space-between",
          padding: "0 50px",
          backgroundColor: "#2d2d2d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              width: "170px",
            }}
          >
            <p>(GMT+6)</p>
            <Watch />
          </div>
          <div
            style={{
              backgroundColor: "#555555e6",
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
            }}
          >
            <Image
              src="/image_new/image01.png"
              alt="Basketball"
              width={23}
              height={50}
            />
            <span>৳ BDT English</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "1.5rem", // Adjust icon size
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FaWhatsapp color="#25D366" />
            <span>Whatsapp</span>
          </div>
          <div
            style={{
              backgroundColor: "#ffffff33",
              width: "1px",
              height: "20px",
            }}
          ></div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FaFacebook color="#1877F2" />
            <span>Facebook</span>
          </div>
          <div
            style={{
              backgroundColor: "#ffffff33",
              width: "1px",
              height: "20px",
            }}
          ></div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <MdEmail color="#EA4335" />

            <span>Email</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center", // Center vertically
          gap: "1rem",
          justifyContent: "space-between",
          padding: "5px 40px",
          background: "linear-gradient(to bottom, #562B00, #814100, #834200)",
         

         // background: "linear-gradient(to bottom, #f81111, rgb(201, 0, 0), #1a1a1a)",


          height: "75px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <Image
              src="/images/fastbet.png"
              alt="Basketball"
              width={144}
              height={50}
              style={{
                top: 0,
                left: 0,
              }}
            />
            <div
              style={{
                backgroundColor: "#ffffff33",
                width: "1px",
                height: "35px",
              }}
            ></div>
            <Image
              src="/image_new/image03.png"
              alt="Basketball"
              width={30}
              height={50}
              style={{
                top: 0,
                left: 0,
              }}
            />
          </div>
        </div>
        {session ? (
          <button
            onClick={() => {
              handleLogout();
            }}
            className={styles.loginButton}
          >
            Logout <FaSignOutAlt />
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <Link href={"/login"}>
              {" "}
              <p className={styles.loginButton}>Login</p>
            </Link>
            <Link href={"/create-acount"}>
              {" "}
              <button className={styles.show_more_btn}>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center", // Center vertically
          gap: "1rem",
          listStyle: "none",
          padding: "5px 40px",
          backgroundColor: "#080808",
          height: "45px",
        }}
      >
        <li>
          <Link className={styles.nav_item} href={"/"}>
            {" "}
            <FaHome style={{ fontSize: "25px" }} />
          </Link>
        </li>

        <li>
          <Link className={styles.nav_item} href={"/"}>
            <FaMobileAlt style={{ fontSize: "20px" }} />
          </Link>
        </li>
        {/* Hover effect on Sports */}
        <li
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
          className={styles.nav_item}
        >
          Sports
          <FaChevronDown style={{ paddingLeft: "5px" }} />
          {/* Dropdown */}
          {showSportsDropdown && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                style={{
                  position: "absolute",
                  top: "25px",
                  left: "-215px",

                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: "1rem",
                  zIndex: 1000,
                  width: "100vw",
                  height: "300px",
                  backgroundImage: 'url("/image_new/image04.jpg")', // Replace with your image path
                  backgroundSize: "cover", // Ensures the image covers the entire area
                  backgroundPosition: "center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents tiling of the image
                }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex", // Arrange items horizontally
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: "2rem",
                    flexWrap: "wrap", // Wrap items for responsiveness
                  }}
                >
                  {/* cricket section*/}

                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      width: "300px", // Matches image width
                      height: "180px", // Adjust height as needed
                    }}
                  >
                    <p
                      style={{
                        borderLeft: "4px orange solid",
                        paddingLeft: "30px",
                        position: "absolute",
                        left: 55,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Exchange
                    </p>
                    <Image
                      src="/image_new/image05.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 10,
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Image
                      src="/image_new/image06.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 15,
                        top: "10px",
                        left: "10px",
                      }}
                    />
                    <Image
                      src="/image_new/image07.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 20,
                        top: "20px",
                        left: "20px",
                      }}
                    />
                  </li>

                  {/* Football Section */}
                  {/* cricket section*/}
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      width: "300px", // Matches image width
                      height: "180px", // Adjust height as needed
                    }}
                  >
                    <p
                      style={{
                        borderLeft: "4px orange solid",
                        paddingLeft: "30px",
                        position: "absolute",
                        left: 55,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      I-Sports
                    </p>
                    <Image
                      src="/image_new/image08.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 10,
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Image
                      src="/image_new/image09.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 15,
                        top: "10px",
                        left: "10px",
                      }}
                    />
                    <Image
                      src="/image_new/image10.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 20,
                        top: "20px",
                        left: "20px",
                      }}
                    />
                  </li>

                  {/* Ei sports Section */}

                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      width: "300px", // Matches image width
                      height: "180px", // Adjust height as needed
                    }}
                  >
                    <p
                      style={{
                        borderLeft: "4px orange solid",
                        paddingLeft: "30px",
                        position: "absolute",
                        left: 55,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      E1Sports
                    </p>
                    <Image
                      src="/image_new/image11.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 10,
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Image
                      src="/image_new/image12.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 15,
                        top: "10px",
                        left: "10px",
                      }}
                    />
                    <Image
                      src="/image_new/image13.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 20,
                        top: "20px",
                        left: "20px",
                      }}
                    />
                  </li>
                  {/* Another Tennis Section */}
                  {/* cricket section*/}
                  <li
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      width: "300px", // Matches image width
                      height: "180px", // Adjust height as needed
                    }}
                  >
                    <p
                      style={{
                        borderLeft: "4px orange solid",
                        paddingLeft: "30px",
                        position: "absolute",
                        left: 55,
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Horsebook
                    </p>
                    <Image
                      src="/image_new/image14.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 10,
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Image
                      src="/image_new/image15.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 15,
                        top: "10px",
                        left: "10px",
                      }}
                    />
                    <Image
                      src="/image_new/image16.png"
                      alt="Basketball"
                      width={250}
                      height={50}
                      style={{
                        position: "absolute",
                        zIndex: 20,
                        top: "20px",
                        left: "20px",
                      }}
                    />
                  </li>
                </ul>
              </div>

              <div className={styles.button_div}>
                <Link href={linkForSpotsItem}>
                  <div
                    style={{
                      display: "flex ",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className={styles.button_under_image}>Play Now</p>
                    <p className={styles.button_under_image}>Play Now</p>
                    <p className={styles.button_under_image}>Play Now</p>
                    <p className={styles.button_under_image}>Play Now</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Casino
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Slot
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Table
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Crash
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Fishing
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Arcade
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"https://api.casinoxy.com/"}>
            Lottery
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"/promotions"}>
            Promotions
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"/dashboard"}>
            VIP
          </Link>
        </li>
        <li>
          <Link className={styles.nav_item} href={"/dashboard"}>
            Referral
          </Link>
        </li>
      </div>
    </div>
  );
}
