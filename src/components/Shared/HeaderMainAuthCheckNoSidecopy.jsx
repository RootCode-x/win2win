"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconGift,
  IconAdjustmentsHorizontal,
  IconMessageDots,
  IconMenu2,
  IconX,
  IconUserCircle,
  IconMoodHappy,
  IconFileTypePdf,
  IconRefresh,
  IconAt,
  IconPhotoPlus,
  IconSend,
  IconDoorExit,
  IconTransferIn,
  IconTransferOut,
  IconPackage,
  IconWorldDownload,
  IconUsers,
  IconUserStar,
  IconHome2,
} from "@tabler/icons-react";

import { useState, useEffect } from "react";
import HeaderTwoChat from "./HeaderTwoChat";
import Language from "./Language";
import SideNav from "./SideNav";
import NavItem from "./NavItem";
import AuthButtons from "./AuthButtons";
import { api_path } from "../../lib/api_path";
import { handleLogout } from "@/lib/action";
import styles from "./rightMenu.module.css";

export default function HeaderMainAuthCheckNoSidecopy({ session }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState(null); // Error state
  const [showBalance, setShowBalance] = useState(false);
  const [latestBalance, setLatestBalance] = useState(0);
  const [userDetails, setuserDetails] = useState("");

  const toggleCard = () => {
    setIsCardExpanded(!isCardExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbarToggler = event.target.closest(".navbar-toggler");
      const balanceSection = event.target.closest(".walletSection");

      if (!navbarToggler && !balanceSection) {
        setIsCardExpanded(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isCardExpanded]);

  const fetchInitialData = async () => {
    try {
      if (!session) return;
      const response = await fetch(`${api_path}/user_info/${session.user.id}`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();
      setuserDetails(data);
      setLatestBalance(data.currency);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchInitialData();
    }
  }, []);

  //   const handleShowBalance = async () => {
  //     setShowBalance(false);
  //     await fetchInitialData();
  //     setShowBalance(true);
  //     setTimeout(() => {
  //       setShowBalance(false);
  //     }, 5000);
  //   };

  const handleRefreshBalance = async () => {
    setShowBalance(false);
    await fetchInitialData();
    setShowBalance(true);
    setTimeout(() => {
      setShowBalance(false);
    }, 5000);
  };

  return (
    <>
      <header className="header-section2 header-section">
        <nav className="navbar navbar-expand-lg position-relative py-md-3 py-lg-6 workready">
          <div
            className={`collapse navbar-collapse justify-content-between  ${
              isCardExpanded ? "show" : "hide"
            }`}
            id="navbar-content"
          >
            <ul
              style={{ maxHeight: "450px" }}
              className="navbar-nav2fixed  navbar-nav d-flex align-items-lg-center gap-4 gap-sm-5  py-2 py-lg-0 align-self-center "
            >
              {/* <li className="dropdown show-dropdown row d-block d-sm-none" key='0011'>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 20px',
                                    borderRadius: '50px',
                                    backgroundColor: '#FCFF00',
                                    border: '2px solid #080F25',
                                    overflow: 'hidden'
                                }}>
                                    <span style={{ color: 'black', fontWeight: '900' }}>MOURSHED</span>
                                    <span style={{ color: 'black', fontWeight: '900' }}>100TK</span>
                                </div>
                            </li> */}
              <NavItem />
              <li className="dropdown show-dropdown d-block d-sm-none d-md-none">
                <div className={styles.sidebar}>
                  <div className={styles.profileSection}>
                    <div className={styles.profileInfo}>
                      <Image
                        src="/images/fastbet.png"
                        alt="Profile"
                        width={60}
                        height={60}
                        className={styles.profileImg}
                      />
                      <div className={styles.profileText}>
                        {session?.user?.user_id ? (
                          <h4>{session.user.user_id}</h4>
                        ) : (
                          <h4></h4>
                        )}
                      </div>
                    </div>

                    <div className={styles.walletSection}>
                      <div className={styles.walletInfo}>
                        {session?.user?.currency ? (
                          <h4
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              cursor: "pointer",
                            }}
                          >
                            {loading ? (
                              <IconAdjustmentsHorizontal />
                            ) : showBalance ? (
                              <>
                                ৳{" "}
                                {Number(
                                  latestBalance || session.user.currency
                                ).toFixed(2)}{" "}
                                <span style={{ fontSize: "9px" }}>
                                  Loading..
                                </span>
                              </>
                            ) : (
                              <>
                                ৳{" "}
                                {Number(
                                  latestBalance.toFixed(2) ||
                                    session.user.currency
                                ).toFixed(2)}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <IconRefresh
                                  size={18}
                                  strokeWidth={2}
                                  className="text-blue-500"
                                  onClick={handleRefreshBalance}
                                />
                              </>
                            )}
                          </h4>
                        ) : (
                          <h4>৳ ***</h4>
                        )}
                        {error && <span></span>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.menuGrid}>
                    <Link href="/deposit">
                      <div className={styles.menuItem}>
                        <IconTransferIn />
                        <span>Deposit</span>
                      </div>
                    </Link>
                    <Link href="/withdraw">
                      <div className={styles.menuItem}>
                        <IconTransferOut />
                        <span>Withdraw</span>
                      </div>
                    </Link>

                    <Link href="/">
                      <div
                        className={styles.menuItem}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <IconHome2 size={32} />
                        <span>Home</span>
                      </div>
                    </Link>

                    <Link href="/Luckbuzz99.apk">
                      <div className={styles.menuItem}>
                        <IconWorldDownload />
                        <span>Download</span>
                      </div>
                    </Link>

                    <Link href="/dashboard">
                      <div
                        className={styles.menuItem}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <IconUserStar size={32} />
                        <span>Profile</span>
                      </div>
                    </Link>

                    <form action={handleLogout}>
                      <div className={styles.menuItem}>
                        <IconDoorExit />
                        <button>Log Out</button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <div className="d-flex align-items-center flex-wrap gap-3">
                                    {!session ? (
                                        <>  <Link href="/login" className="py-2 px-5  p1-color  y1-bg  rounded-2 " >Login</Link> </> 
                                    ) : (
                                        <> 
                                        <Link  style={{background:'#2078E6', border:'1px solid #2078E6 !important',  borderRadius: '50px' }} href="/deposit" className="cmn-btn second-alt ">Deposit</Link> 

                                        <Link  style={{background:'#2078E6', border:'1px solid #2078E6 !important' ,  borderRadius: '50px'}} href="/withdraw" className="cmn-btn second-alt ">Withdraw</Link> 

                                        <Link  style={{background:'#2078E6', border:'1px solid #2078E6 !important',  borderRadius: '50px' }} href="/deposit" className="cmn-btn second-alt ">Home</Link> 
                                         <Link  style={{background:'#2078E6', border:'1px solid #2078E6 !important',  borderRadius: '50px' }} href="/deposit" className="cmn-btn second-alt ">Profile</Link> 
                                         <Link  style={{background:'#2078E6', border:'1px solid #2078E6 !important',  borderRadius: '50px' }} href="/deposit" className="cmn-btn second-alt ">Sportsbook</Link> 
                                         <Link  style={{background:'#2078E6', border:'1px solid #2078E6 !important' ,  borderRadius: '50px'}} href="/deposit" className="cmn-btn second-alt ">Download</Link> 
                                        <form action={handleLogout}>
                                            <button style={{background:'#DF2641', border:'1px solid #DF2641 !important',  borderRadius: '50px' }} className="cmn-btn second-alt "> 
                                                Log Out
                                            </button>
                                        </form>
                                        </> 
                                    )}
                                </div>

                                 */}
              </li>
            </ul>
          </div>

          {!session ? (
            <>
              <div className="right-area custom-pos position-relative d-flex gap-0 gap-lg-7 align-items-center me-5 me-xl-10">
                <div className="langu position-relative">
                  <div className="langu__head mt-3 mt-sm-2 mt-md-1">
                    <Link
                      href="/create-acount"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "8px 12px",
                        margin: "4px",
                        borderRadius: "8px",
                      }}
                    >
                      Signup
                    </Link>
                    <Link
                      href="/login"
                      style={{
                        backgroundColor: "yellow",
                        color: "black",
                        padding: "8px 12px",
                        margin: "4px",
                        borderRadius: "8px",
                      }}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>

              {/* <button onClick={toggleCard} className="navbar-toggler mt-1 mt-sm-2 mt-lg-0" type="button" data-bs-toggle="collapse" aria-label="Navbar Toggler"
                              data-bs-target="#navbar-content" aria-expanded="true" id="nav-icon3">
                              <span></span><span></span><span></span><span></span>
                          </button> */}
            </>
          ) : (
            <div className="right-area custom-pos custom-postwo position-relative d-flex   align-items-center  me-xl-10 align-items-center">
              {/* <div className="text-end d-none d-sm-block">
                            <span className="fs-seven mb-1 d-block">Your balance</span>
                            <span className="fw-bold d-block"> ${userDetails.currency} </span>
                        </div>
                        <div className="text-end d-block d-sm-none">
                            //<span className="fs-seven mb-1 d-block">Balance</span>
                            <span className="fw-bold d-block"> ${userDetails.currency} </span>
                        </div> */}

              <div className="d-flex align-items-center gap-2 mt-1">
                {/* <button type="button" className="py-1 px-2 n11-bg rounded-5 position-relative">
                                <IconGift height={24} width={24} className="ti ti-gift fs-four" />
                                <span className="fs-eight g1-bg px-1 rounded-5 position-absolute end-0 top-0">2</span>
                            </button> */}
                <div className="cart-area search-area d-flex">
                  {/* <HeaderTwoChat session={session}/> */}

                  <Link
                    href="/deposit"
                    className="py-1 px-2 n11-bg rounded-5  d-none  d-sm-none d-lg-block d-xl-block"
                  >
                    <Image
                      className="logo"
                      width={24}
                      height={24}
                      src="/images/deposits.png"
                      alt="Logo"
                    />
                  </Link>

                  <Link href="/chats" className="py-1 px-2 n11-bg rounded-5">
                    <IconMessageDots
                      height={24}
                      width={24}
                      className="slide-toggle2 ti ti-message-dots fs-four"
                    />
                  </Link>

                  {/* <Link href="https://www.t.me/fastbet_supports" className="py-1 px-2 n11-bg rounded-5"> 
                                <IconMessageDots height={24} width={24} className="slide-toggle2 ti ti-message-dots fs-four" />
                                </Link>  */}
                  <Link
                    href="/dashboard"
                    className="py-1 px-2 n11-bg rounded-5  d-none  d-sm-none d-lg-block d-xl-block"
                  >
                    <IconUserCircle
                      height={24}
                      width={24}
                      className="ti ti-user-circle fs-four"
                    />
                  </Link>
                </div>
              </div>
              <button
                onClick={toggleCard}
                className="navbar-toggler navbar-toggler-two mt-1 mt-sm-2 mt-lg-0"
                type="button"
                data-bs-toggle="collapse"
                aria-label="Navbar Toggler"
                data-bs-target="#navbar-content"
                aria-expanded="true"
                id="nav-icon3"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </nav>
        <div
          id="div10"
          className="navigation left-nav-area box3  position-fixed"
        >
          <div className="logo-area slide-toggle3 trader-list position-fixed top-0 d-flex align-items-center justify-content-center pt-6 pt-md-8 gap-sm-4 gap-md-5 gap-lg-7 px-4 px-lg-8">
            <i className="ti ti-menu-deep left-nav-icon n8-color order-2 order-lg-0 d-none"></i>
            <Link
              className="navbar-brand d-center text-center gap-1 gap-lg-2 ms-lg-4"
              href="/"
            >
              {/* <Image className="logo"  width={170} height={60}  src="/images/providersnew/fastbet.png?V=3" alt="Logo" /> */}
            </Link>
          </div>
          <div
            id="div10"
            className="navigation left-nav-area box3  position-fixed"
          >
            <div className="logo-area slide-toggle3 trader-list position-fixed top-0 d-flex align-items-center justify-content-center pt-6 pt-md-8 gap-sm-4 gap-md-5 gap-lg-7 px-4 px-lg-8">
              <i className="ti ti-menu-deep left-nav-icon n8-color order-2 order-lg-0 d-none"></i>
              <Link
                className="navbar-brand d-center text-center gap-1 gap-lg-2 ms-lg-4"
                href="/"
              >
                <Image
                  className="logo"
                  width={170}
                  height={60}
                  src="/images/providersnew/fastbet.png?V=3"
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
