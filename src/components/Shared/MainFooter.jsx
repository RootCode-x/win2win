"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { IconArrowBadgeRight, IconBrandTelegram, IconBrandWhatsapp, IconBrandGithubFilled, IconBrandBehance, IconBrandFacebookFilled, IconBrandDiscordFilled, IconCurrencyBitcoin, IconBrandInstagram, IconDownload } from "@tabler/icons-react";

export default function MainFooter() {
    return (
        <footer className="footer_section p2-bg ">
            <div className="container-fluid">
                <div className="row pb-5 pt-5 ">
                    <div className="col-12">
                        <div className="footer_section__main">
                            <div className="row gy-8">

                            <div className="col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                                    <div className="footer_section__community">

                                         <ul className="d-flex align-items-center flex-wrap pb-3" valign="middle" >
                                        Download Our APP Version!  
                                            <li align="left" className="iconstyle d-flex " >
                                            &nbsp;&nbsp;&nbsp; <Link className="py-2 px-3 m-1 p1-color  y2-bg  rounded-2" href="#">
                                                 Download
                                                </Link>
                                            </li>
                                        </ul> 
                                       
                                         <ul className="d-flex align-items-center flex-wrap gap-1">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                            
                                                <Image  src="/images/signature/ambassadors-david-de-gea.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '110px' }} />
                                                <span style={{ fontSize: '4px' }}>Quinton de Kock</span>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/signature/ambassadors-monami-ghosh.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '110px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/signature/ambassadors-quinton-de-kock.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '110px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/signature/ambassadors-sunny-leone.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '110px' }} />
                                                </Link>
                                            </li>
                                         </ul> 


                                        <ul className="d-flex align-items-center flex-wrap pb-3">
                                            <li align="left" className="iconstyle d-flex ">
                                                Payment Methods
                                            </li>
                                        </ul> 

                                        <ul className="d-flex align-items-center flex-wrap gap-1">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/bkash.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/nagad_wallet.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/rockets.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/surecash.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/upay.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                        </ul>

                                        <ul className="d-flex align-items-center flex-wrap gap-1 pt-5">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/skrill.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/gpay.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/neteller.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/paypal.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/paytm.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                        </ul>
                                        <ul className="d-flex align-items-center flex-wrap gap-1 pt-5">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/mastercard.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/visa.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/amex.jpg" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/phonepe.png" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/binance.jpg" width={55} height={30} alt="Icon"  style={{ minHeight: '30px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                        </ul>

                                        <ul className="d-flex align-items-center flex-wrap pt-5">
                                            <li align="left" className="iconstyle d-flex ">
                                                Certification
                                            </li>
                                        </ul> 

                                       <ul className="d-flex align-items-center flex-wrap gap-1  pt-2 ">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/gaming_iTechLabs.png" width={55} height={20} alt="Icon"  style={{ minHeight: '20px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/safe1_2.png" width={55} height={20} alt="Icon"  style={{ minHeight: '20px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/gaming_Casino_Analyzer.png" width={55} height={20} alt="Icon"  style={{ minHeight: '20px', maxWidth: '52px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/gaming_license.png" width={55} height={20} alt="Icon"  style={{ minHeight: '20px', maxWidth: '52px' }} /> 
                                                </Link>
                                            </li>
                                        </ul>

                                        <ul className="d-flex align-items-center flex-wrap pt-5">
                                            <li align="left" className="iconstyle d-flex ">
                                                Follow Us
                                            </li>
                                        </ul> 

                                        <ul className="d-flex align-items-center flex-wrap gap-3  pt-2">
                                            <li>
                                                <Link target='_blank' className="footer_section__community-sitem n4-coloLink" href="https://www.facebook.com/">
                                                    <IconBrandFacebookFilled className="fs-three footericon" style={{color:'#106AFF'}} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="footer_section__community-sitem n4-coloLink"
                                                    href="#">
                                                    <IconBrandInstagram className="fs-three footericon" style={{color:'#FC09D9'}} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="footer_section__community-sitem n4-coloLink"
                                                    href="#">
                                                    <IconBrandWhatsapp className="fs-three footericon"  style={{color:'#39BF4C'}}/>
                                                </Link>
                                            </li>     
                                            <li>
                                                <Link className="footer_section__community-sitem n4-coloLink"
                                                    href="#">
                                                    <IconBrandTelegram className="fs-three footericon" style={{color:'#36AAE0'}} />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="footer_section__community-sitem n4-coloLink"
                                                    href="#">
                                                    <IconDownload className="fs-three footericon" style={{color:'#FDF803'}} />
                                                </Link>
                                            </li>
                                        </ul> 
                                    </div>
                                </div>

                                 {/* 
                                 <div className="col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                                    <div className="footer_section__sports">
                                        <h4 className="mb-5 mb-md-6">Payment Methods</h4>
                                        <ul className="d-flex flex-column gap-5">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/bkash.png" width={100} height={40} alt="Icon"  style={{ minHeight: '40px', maxWidth: '100px' }} />
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/nagad_wallet.png" width={100} height={40} alt="Icon"  style={{ minHeight: '40px', maxWidth: '100px' }} /> 
                                                </Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">
                                                <Image  src="/images/mbank/rockets.png" width={100} height={40} alt="Icon"  style={{ minHeight: '40px', maxWidth: '100px' }} /> 
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                               <div className="col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2">
                                    <div className="footer_section__promotions">
                                        <h4 className="mb-5 mb-md-6">Promotions</h4>
                                        <ul className="d-flex flex-column gap-5">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="/promotions">Sports Promotions</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Tournaments</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Achievements</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Bonus Shop</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div> 
                                <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                    <div className="footer_section__help">
                                        <h4 className="mb-5 mb-md-6">Help</h4>
                                        <ul className="d-flex flex-column gap-5">
                                          
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Bet Slip Check</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Deposit/
                                                    Withdrawals</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Sports results</Link>
                                            </li>
                                        

                                        </ul>
                                    </div>
                                </div>*/}
                                {/* <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3">
                                    <div className="footer_section__security">
                                        <h4 className="mb-5 mb-md-6">Security and Privacy</h4>
                                        <ul className="d-flex flex-column gap-5">
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Privacy Policy</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Terms & Conditions</Link>
                                            </li>
                                            {/* <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Cookie Policy</Link>
                                            </li>
                                            <li className="iconstyle d-flex align-items-center">
                                                <IconArrowBadgeRight className="fs-five rtawin" />
                                                <Link className="fs-ten n4-color" href="#">Sports results</Link>
                                            </li> 
                                        </ul>
                                    </div>
                                </div> 
                                
                                */}
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div class="row">
                    <div class="col">
                        <h4>BettClub Bangladesh</h4>
                        <p><a href="https://fastbat.co/">BettClub</a>, the premier online gaming platform tailored specifically for Bangladeshi players. At BettClub, we provide an exceptional gaming experience with a wide variety of games, outstanding customer service, and robust security measures. Whether you are an experienced player or new to the world of online gaming, BettClub offers something for everyone, making it the ultimate destination for online gaming in Bangladesh.</p>
                        <h4>Games Available on BettClub</h4>
                        <p>BettClub offers a diverse range of games to cater to all types of players. From classic gaming house games to the latest innovations, we have it all. Our platform is designed to provide endless entertainment and opportunities to win big.</p>
                        <h4>Cricket Betting</h4>
                        <p>Cricket is a beloved sport in Bangladesh, and BettClub offers comprehensive cricket betting options. You can place bets on your favorite teams and matches, enjoying the thrill of the game while having the chance to win significant rewards. Our cricket betting platform is user-friendly and offers competitive odds to enhance your betting experience.</p>
                        <h4>Sportsbook</h4>
                        <p>Our sportsbook covers a wide range of sports, including football, basketball, tennis, and more. With competitive odds and an easy-to-use interface, placing bets on your favorite sports has never been easier. Whether you are a fan of local leagues or international tournaments, BettClubs sportsbook has you covered.</p>
                        <h4>Live Casino</h4>
                        <p>Experience the excitement of a real casino from the comfort of your home with BettClubs live casino games. Interact with professional dealers and other players in real-time as you play games like blackjack, roulette, baccarat, and more. Our live casino provides an immersive gaming experience that brings the thrill of the casino floor to your screen.</p>
                        <h4>Slots</h4>
                        <p>Our extensive collection of slot games features various themes and styles to keep you entertained. From classic slots to modern video slots, there is something for every slot enthusiast at BettClub. Spin the reels and chase big wins with our exciting slot games.</p>
                        <h4>Table Games</h4>
                        <p>Enjoy a wide range of table games, including poker, blackjack, roulette, and baccarat. Our table games offer a realistic and engaging gaming experience, whether you prefer strategic gameplay or fast-paced action.</p>
                        <h4>Crash</h4>
                        <p>Crash games are fast-paced and thrilling, offering the chance to cash out before the multiplier crashes. It is a game of timing and strategy that can lead to big wins. At BettClub, our crash games are designed to provide an adrenaline rush and the opportunity for substantial rewards.</p>
                        <h4>Fishing</h4>
                        <p>Our fishing games are both fun and rewarding. Cast your virtual line and catch various fish to win prizes and bonuses. Fishing games at BettClub combine entertainment with the excitement of winning, making them a popular choice among our players.</p>
                        <h4>Lottery</h4>
                        <p>Try your luck with our lottery games. With various lotteries available, you have multiple chances to win big. Our lottery games are easy to play and offer substantial prizes, adding an extra layer of excitement to your gaming experience.</p>
                    </div>
                    <div class="col">
                        <h4>Languages and Services</h4>
                        <p>At BettClub, we cater to our diverse audience by offering services in multiple languages, ensuring that players can enjoy our platform in their preferred language.</p>
                        <h4>English</h4>
                        <p>Our platform is fully available in English, providing a seamless experience for English-speaking players. All games, customer support, and services are accessible in English to ensure clarity and ease of use.</p>
                       
                        <h4>Safety and Security</h4>
                        <p>Safety and security are our top priorities at BettClub. We use advanced encryption technologies to protect your personal and financial information. Our games are regularly audited for fairness, ensuring a transparent and trustworthy gaming environment. We are committed to providing a safe and secure platform where you can enjoy your favorite games without any worries.</p>
                        <h4>Customer Supports</h4>
                        <p>Our dedicated customer support team is here to assist you with any questions or issues you may have. We offer multiple support channels to ensure you can get the help you need, whenever you need it.</p>
                        <h4>Phone</h4>
                        <p>You can reach our support team via phone for immediate assistance. Our support representatives are knowledgeable and ready to help you resolve any issues or answer your queries promptly.</p>
                        <h4>Email</h4>
                        <p>For less urgent inquiries, you can email us, and we will respond promptly. Our email support is efficient and designed to provide comprehensive assistance with any issues or questions you may have.</p>
                        <h4>Live Chat</h4>
                        <p>Our live chat feature provides real-time support, allowing you to get help whenever you need it. Our live chat agents are friendly, professional, and dedicated to ensuring your gaming experience is smooth and enjoyable.</p>
                        <h4>Mobile Compatibility</h4>
                        <p>BettClub is fully optimized for mobile devices. Whether you use a smartphone or tablet, you can enjoy all our games and services on the go without any compromise in quality or performance. Our mobile platform is user-friendly and designed to provide a seamless gaming experience, no matter where you are.</p>
                        <h4>Easy Sign Up Process</h4>
                        <p>Signing up on BettClub is quick and easy. Follow the steps below to get started:</p>
                        <h4>How to Sign Up on BettClub</h4>
                        <p>Simply click the Sign Up button, fill in your details, and you will be ready to start playing in no time. Our registration process is straightforward and designed to get you into the game quickly and efficiently.</p>
                        <h4>Easy Login Process</h4>
                        <p>Logging into your BettClub account is straightforward and hassle-free.</p>
                        <h4>How to Login into BettClub</h4>
                        <p>Click the Login button, enter your credentials, and you will have instant access to all your favorite games. Our login process is secure and designed to provide quick access to your account.</p>
                        <h4>Trust and Fair</h4>
                        <p>At BettClub, we pride ourselves on being a fair and trustworthy platform. Our games are tested for fairness, and we adhere to strict regulations to ensure a safe and honest gaming environment. You can trust BettClub to provide a fair and transparent gaming experience.</p>
                    </div>
                    <div class="col">
                        <h4>Bonuses and Promotions in BettClub</h4>
                        <p>We offer a variety of bonuses and promotions to enhance your gaming experience. Our promotions are designed to reward both new and regular players, providing extra value and excitement.</p>
                        <h4>Welcome Bonuses</h4>
                        <p>New players are greeted with generous welcome bonuses to get started on the right foot. Our welcome bonuses are designed to boost your initial deposit and give you more chances to win.</p>
                        <h4>Reload and Weekly Promotions</h4>
                        <p>Regular players can take advantage of reload bonuses and weekly promotions to boost their bankroll. Our reload bonuses are designed to reward your loyalty and keep the excitement going.</p>
                        <h4>Special Bonuses</h4>
                        <p>Keep an eye out for special bonuses and seasonal promotions that offer extra rewards and incentives. Our special bonuses are designed to add extra value and excitement to your gaming experience.</p>
                        <h4>Payment Options</h4>
                        <p>We provide a variety of payment options to ensure convenient and secure transactions. Our payment methods are designed to be fast, reliable, and secure, making it easy for you to deposit and withdraw funds.</p>
                        <h4>Nagad</h4>
                        <p>Use Nagad for quick and easy deposits and withdrawals. Nagad is a popular payment method in Bangladesh, offering seamless transactions.</p>
                        <h4>Rocket</h4>
                        <p>Rocket offers another convenient payment method for our players. With Rocket, you can make secure deposits and withdrawals with ease.</p>
                        <h4>Bkash</h4>
                        <p>Bkash is a popular payment option in Bangladesh, providing seamless transactions. Use Bkash for fast and secure deposits and withdrawals.</p>
                        <h4>Upay</h4>
                        <p>Upay is available for secure and efficient financial transactions. With Upay, you can easily manage your funds on BettClub.</p>
                        <h4>Bank Transfer</h4>
                        <p>For larger transactions, bank transfer is a reliable option. Our bank transfer option provides a secure and straightforward way to manage your funds.</p>
                        <h4>BettClub Mobile App and APK</h4>
                        <p>Download the BettClub mobile app or APK for the ultimate gaming experience on your mobile device. With the BettClub app, you can enjoy all the features of our platform on the go. The app is designed to be user-friendly, providing a seamless and immersive gaming experience whether you are using a smartphone or tablet.</p>
                        <h4>Affiliate Program</h4>
                        <p>Join our affiliate program and start earning commissions by promoting BettClub. Our program offers competitive rates and comprehensive support to help you succeed. As an affiliate, you will have access to a range of marketing materials and tools to help you attract new players to BettClub. Our affiliate program is designed to be straightforward and rewarding, making it easy for you to earn money by promoting our platform.</p>
                    </div>
                    </div>                                     */}

                {/* <div className="row">
                    <div className="col-12 px-0 mx-0">
                        <div className="brand-slider n6-bg pt-7 pb-7">
                            <div className="footer_section__slider swiper-wrapper d-flex align-items-center">
                                <Swiper
                                    className="slider_hero"
                                    loop
                                    speed={2000}
                                    autoplay={{
                                        delay: 0,
                                    }}
                                    slidesPerView="auto"
                                    modules={[Autoplay]}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 3,
                                            spaceBetween: 5,
                                        },
                                        480: {
                                            slidesPerView: 4,
                                            spaceBetween: 10,
                                        },
                                        575: {
                                            slidesPerView: 5,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 7,
                                            spaceBetween: 20,
                                        },
                                        991: {
                                            slidesPerView: 8,
                                            spaceBetween: 20,
                                        },
                                        1199: {
                                            slidesPerView: 10,
                                            spaceBetween: 20,
                                        },
                                        1499: {
                                            slidesPerView: 13,
                                            spaceBetween: 24,
                                        },
                                        1799: {
                                            slidesPerView: 15,
                                            spaceBetween: 24,
                                        },
                                    }}>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={104} height={30} src="/images/icon/visa.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={55} height={30} src="/images/icon/netent.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={39} height={30} src="/images/icon/mastercard.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={82} height={29} src="/images/icon/skrill.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={55} height={30} src="/images/icon/maestro.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/webmoney.png" width={117} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/neteller.png" width={178} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/debit.png" width={66} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/pragmathic-play.png" width={97} height={32} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/play-go.png" width={84} height={32} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/gamomat.png" width={100} height={32} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/paysafecard.png" width={180} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={120} height={30} src="/images/icon/netent.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={39} height={30} src="/images/icon/mastercard.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={82} height={29} src="/images/icon/skrill.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image width={55} height={30} src="/images/icon/maestro.png" alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/webmoney.png" width={117} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/neteller.png" width={178} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/debit.png" width={66} height={30} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/pragmathic-play.png" width={97} height={32} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/play-go.png" width={84} height={32} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="footer_section__slider-brand swiper-slide px-4">
                                            <Image src="/images/icon/gamomat.png" width={100} height={32} alt="Brand" />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </footer >
    )
}
