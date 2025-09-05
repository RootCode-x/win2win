"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./FooterLast.module.css";
export default function FooterLastForMobile({ session }) {
  return (
    <>
      <div
        className={styles.FooterLastForMobile}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#000", // Ensure it has a background
          zIndex: 10, // Ensure it stays above other elements
        }}
      >
        {session ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "50px",
              backgroundColor: "#000000",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link href={"/"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/footer/imagew1.svg"
                    alt="Luckbuzz99 Logo"
                    width={18}
                    height={50}
                  />
                </div>
                <p style={{ fontSize: "10px", marginTop: "-6px" }}>Home</p>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link href={"/promotions"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/footer/imagew2.svg"
                    alt="Luckbuzz99 Logo"
                    width={18}
                    height={50}
                  />
                </div>
                <p style={{ fontSize: "10px", marginTop: "-6px" }}>
                  Promotions
                </p>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link href={"/deposit"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/footer/imagew3.svg"
                    alt="Luckbuzz99 Logo"
                    width={18}
                    height={50}
                  />
                </div>
                <p style={{ fontSize: "10px", marginTop: "-6px" }}>Deposits</p>
              </Link>
            </div>{" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link href={"/dashboard"}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/footer/imagew4.svg"
                    alt="Luckbuzz99 Logo"
                    width={18}
                    height={50}
                  />
                </div>
                <p style={{ fontSize: "10px", marginTop: "-6px" }}>
                  My Account
                </p>
              </Link>
            </div>{" "}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "50px",
              backgroundColor: "green",
              zIndex: 100,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                backgroundColor: "white",
              }}
            >
              <Image
                src="/flug.png"
                alt="Luckbuzz99 Logo"
                width={15}
                height={50}
              />
              <p
                style={{
                  color: "black",
                  lineHeight: "14px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Bdt <br /> English
              </p>
            </div>{" "}
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ff5a14",
              }}
            >
              <Link href={"/login"}>Log in </Link>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#079409",
              }}
            >
              {" "}
              <Link href={"/create-acount"}>Regestration </Link>
            </div>
          </div>
        )}
      </div>

      {/* For logged in users */}
    </>
  );
}
