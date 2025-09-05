"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconRecharging,IconGift, IconAdjustmentsHorizontal, IconMessageDots, IconMenu2, IconX, IconUserCircle, IconMoodHappy, IconFileTypePdf, IconAt, IconPhotoPlus, IconSend } from "@tabler/icons-react";
import { useState, useEffect } from "react";
//import HeaderTwoChat from './HeaderTwoChat';
import Language from './Language';
import SideNav from './SideNav';
import NavItem from './NavItem';
//import AuthButtons from './AuthButtons';
import {api_path} from '../../lib/api_path';


export default function HeaderMainAuthCheck({ session }) {
   
    const [isCardExpanded, setIsCardExpanded] = useState(false);
    const [isMiddleExpanded, setIsMiddleExpanded] = useState(false);

    const toggleCard = () => {
        setIsCardExpanded(!isCardExpanded);
    };
    const toggleMiddle = () => {
        setIsMiddleExpanded(!isMiddleExpanded);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isCardExpanded && !event.target.closest(".navbar-toggler")) {
                setIsCardExpanded(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [isCardExpanded]);
    
    useEffect(() => {
        const handleClickOutsideMiddle = (event) => {
            if (isMiddleExpanded && !event.target.closest(".left-nav-icon")) {
                setIsMiddleExpanded(false);
            }
        };

        document.body.addEventListener("click", handleClickOutsideMiddle);
        return () => {
            document.body.removeEventListener("click", handleClickOutsideMiddle);
        };
    }, [isMiddleExpanded]);


    const [userDetails, setuserDetails] = useState('');
    
    useEffect(() => {
        const fetchInitialData = async () => {
          try {

            if (!session) { // Check for both session and user ID
            return; // Early return if session or user ID is missing
            }
            
            const response = await fetch(`${api_path}/user_info/${session.user.id}`, {
                next: { revalidate: 3600 }, // Set revalidation for 1 hour
              });

               // setuserDetails(response.data);
            const data = await response.json();
            setuserDetails(data); 
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error (e.g., display error message)
          }
        };
      
        if (session) { // Check if user ID is available before fetching
          fetchInitialData();
        }
      }, []);

      
    return (
        <>
            <header className="header-section2 header-section">
                <nav className="navbar navbar-expand-lg position-relative py-md-3 py-lg-6 workready">
                    <div className={`collapse navbar-collapse justify-content-between  ${isCardExpanded ? "show" : "hide"}`} id="navbar-content">
                        <ul
                            className="navbar-nav2fixed  navbar-nav d-flex align-items-lg-center gap-4 gap-sm-5  py-2 py-lg-0 align-self-center p2-bg">
                            <NavItem />
                            <li className="dropdown show-dropdown d-block d-sm-none">
                                <div className="d-flex align-items-center flex-wrap gap-3">
                                {!session ? (
                                    <>  <Link href="/login" className="cmn-btn second-alt px-xxl-11 rounded-2">Login </Link> </> 
                                ) : (
                                    <> <Link href="/deposit" className="cmn-btn second-alt px-xxl-11 rounded-2">Deposit</Link> </> 
                                )}
                                </div>
                            </li>
                        </ul>
                    </div>


                    {!session ? (
                        <>
                            <div className="right-area custom-pos position-relative d-flex gap-0 gap-lg-7 align-items-center me-5 me-xl-10">
                                <Language />
                                <Link href="/login" className="cmn-btn d-none px-xxl-11 d-sm-block d-lg-none d-xl-block" style={{ backgroundColor:'#c3871e',border:'3px solid #c3871e !important' }} >Login</Link>
                                {/* <Link href="/create-acount" className="cmn-btn d-none px-xxl-11 d-sm-block d-lg-none d-xl-block">Sign Up</Link> */}
                            </div>
                            <button onClick={toggleCard} className="navbar-toggler mt-1 mt-sm-2 mt-lg-0" type="button" data-bs-toggle="collapse" aria-label="Navbar Toggler"
                                data-bs-target="#navbar-content" aria-expanded="true" id="nav-icon3">
                                <span></span><span></span><span></span><span></span>
                            </button>
                        </>                   
                    ) : (
                    <div className="right-area custom-pos custom-postwo position-relative d-flex  align-items-center me-xl-10 align-items-center">
                        {/* <div className="text-end d-none d-sm-block">
                            <span className="fs-seven mb-1 d-block">Your balance</span>
                            <span className="fw-bold d-block"> ${userDetails.currency} </span>
                        </div>
                        <div className="text-end d-block d-sm-none">
                            //  <span className="fs-seven mb-1 d-block">Balance</span> 
                            <span className="fw-bold d-block"> ${userDetails.currency} </span>
                        </div> */}
                     
                        <div className="d-flex align-items-center gap-2 mt-1">
                            {/* <button type="button" className="py-1 px-2 n11-bg rounded-5 position-relative">
                                <IconGift height={24} width={24} className="ti ti-gift fs-four" />
                                <span className="fs-eight g1-bg px-1 rounded-5 position-absolute end-0 top-0">2</span>
                            </button> */}
                            <div className="cart-area search-area d-flex">
                                {/* <HeaderTwoChat session={session}/> */}
                                  
                                 <Link href="/deposit" className="py-1 px-2 n11-bg rounded-5  d-none  d-sm-none d-lg-block d-xl-block">   
                                 <Image className="logo"  width={24} height={24}  src="/images/deposits.png" alt="Logo" />
                                </Link> 
                                <Link href="/chats" className="py-1 px-2 n11-bg rounded-5"> 
                                <IconMessageDots height={24} width={24} className="slide-toggle2 ti ti-message-dots fs-four" />
                                </Link> 
                                {/* <Link href="https://www.t.me/fastbet_supports" className="py-1 px-2 n11-bg rounded-5"> 
                                <IconMessageDots height={24} width={24} className="slide-toggle2 ti ti-message-dots fs-four" />
                                </Link>  */}

                                
                                <Link href="/dashboard" className="py-1 px-2 n11-bg rounded-5"> 
                                  <IconUserCircle height={24} width={24} className="ti ti-user-circle fs-four" />
                                </Link>
                            </div>
                        </div>
                        <button onClick={toggleCard} className="navbar-toggler navbar-toggler-two mt-1 mt-sm-2 mt-lg-0" type="button" data-bs-toggle="collapse" aria-label="Navbar Toggler"
                            data-bs-target="#navbar-content" aria-expanded="true" id="nav-icon3">
                            <span></span><span></span><span></span><span></span>
                        </button>
                    </div>
                    )}
                </nav>
                <div id="div10" className="navigation left-nav-area box3  position-fixed">
                    <div
                        className="logo-area slide-toggle3 trader-list position-fixed top-0 d-flex align-items-center justify-content-center pt-6 pt-md-8 gap-sm-4 gap-md-5 gap-lg-7 px-4 px-lg-8">
                        <i className="ti ti-menu-deep left-nav-icon n8-color order-2 order-lg-0 d-none">
                        </i>
                        <Link className="navbar-brand d-center text-center gap-1 gap-lg-2 ms-lg-4" href="index.html">
                            <Image className="logo"  width={170} height={60}  src="/images/providersnew/fastbet.png?V=1" alt="Logo" />
                        </Link>
                    </div>
                    <div id="div10" className="navigation left-nav-area box3  position-fixed">
                    <div
                        className="logo-area slide-toggle3 trader-list position-fixed top-0 d-flex align-items-center justify-content-center pt-6 pt-md-8 gap-sm-4 gap-md-5 gap-lg-7 px-4 px-lg-8">
                        <i className="ti ti-menu-deep left-nav-icon n8-color order-2 order-lg-0 d-none">
                        </i>
                        <Link className="navbar-brand d-center text-center gap-1 gap-lg-2 ms-lg-4" href="/">
                            <Image className="logo" width={170} height={60} src="/images/providersnew/fastbet.png?V=1" alt="Logo" />
                         
                        </Link>
                    </div>
                    <div className={`nav_aside px-5 p2-bg ${isMiddleExpanded ? "show" : "hide"}`}>
                        <div className="nav-clsoeicon d-flex justify-content-end">
                            <IconX onClick={toggleMiddle} width={32} height={32} className="ti ti-x left-nav-icon n8-color order-2 order-lg-0 d-block d-lg-none fs-three" />
                        </div>
                        <SideNav />
                    </div>
                </div>

                </div>
            </header >
            <button onClick={toggleMiddle} type="button" className="middle-iconfixed position-fixed top-50 start-0 left-nav-icon">
                <IconAdjustmentsHorizontal width={38} height={38} className="ti ti-adjustments-horizontal n8-color d-block d-lg-none fs-two" />
            </button>
        </>
    )
}
