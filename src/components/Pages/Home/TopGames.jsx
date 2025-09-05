"use client";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { tabThree, sports, casino, slot, tablegame, lottery, fishing, crush } from "@/../public/data/tabThree";
import { useState } from 'react';
import styles from './casinocss.module.css';
export default function TopGames() {
    
    const [activeItem, setActiveItem] = useState(tabThree[0]);
    const handleClick = (itemName) => {
        setActiveItem(itemName);
    };
    const getItemStyle = (itemName) => {
        return {
            border: `1px solid ${activeItem === itemName ? '#35C31E' : '#2C3655'}`,
        };
    };

    return (
        <>
            <section >
                <div >
                    <Tab.Group>
                        <Tab.List  className={`tablinks  gap-5 flex-wrap mb-5 mb-md-5 ${styles.scrollableContainer}`}>
                            {tabThree.map((tabThreeSingle) => (
                                <Tab className="nav-links" key={tabThreeSingle.buttonName}>
                                    <span onClick={() => handleClick(tabThreeSingle)}
                                        style={getItemStyle(tabThreeSingle) } className={`tablink clickable-active2 d-flex align-items-center gap-2 py-3 px-4 p3-bg ${styles.navtabBgcolor} ${styles.navtabBgTitle}`}>
                                        <Image
                                            width={26}
                                            height={26}
                                            src={tabThreeSingle.imgSrc}
                                            alt="Icon"
                                        />
                                        {tabThreeSingle.buttonName}
                                    </span>
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel className="tabitem active">
                                {sports.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                      
                                                                                        <Image  src="/images/providers/sports.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                    </span>
                                                                                    <span className="fw-bold d-block text-nowrap">Cricket</span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span
                                                                                        className="fs-seven d-block mb-2 text-nowrap">
                                                                                           
                                                                                        <Image  src="/images/providers/sports.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">Football</span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span
                                                                                        className="fs-seven d-block mb-2 text-nowrap">
                                                                                        <Image  src="/images/providers/sports.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} />
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">Badminton</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>

                            <Tab.Panel className="tabitem active">
                                {casino.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active rounded-3  text-center">
                                                                                    <span
                                                                                        className="fs-seven d-block mb-2 text-nowrap">
                                                                                           <Image  src="/images/providers/evolution.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                    </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">EVOLUTION</span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/eguzi.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }}  /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">  EZUGI  </span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/vivogaming.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">VIVO GAMING</span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/PRAGMATIC PLAY.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">PRAGMATIC</span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/HOT GAME.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">HOT GAMING</span>
                                                                                </div>
                                                                              
                                                                               <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/andar bahar .png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">ANDAR BAHAR</span>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>

                            <Tab.Panel className="tabitem active">
                                {slot.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">
                                                                             
                                                                                
                                                                               <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/jlili.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">Jili</span>
                                                                                </div> 
                                                                                
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/pg soft.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">PG SOFT</span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/PRAGMATIC PLAY.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">PRAGMATIC</span>
                                                                                </div>

                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/platipus.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">PLATIPUS</span>
                                                                              </div>

                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/JDB.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">JDB</span>
                                                                                </div>

                                                                            
                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/one touch.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">ONE TOUCH</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>

                            <Tab.Panel className="tabitem active">
                                {tablegame.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">

                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/live table.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">LIVE TABLES</span>
                                                                                </div>

                                                                            </div>
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>
                            
                            <Tab.Panel className="tabitem active">
                                {lottery.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">

                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/lottery tickets.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">LOTTERY TICKET</span>
                                                                                </div>

                                                                            </div>
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>
                          
                            <Tab.Panel className="tabitem active">
                                {fishing.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">
                                                                           
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/ka.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">KA FISH</span>
                                                                                </div>

                                                                            </div>
                                                                        </td>

                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>
                            
                            <Tab.Panel className="tabitem active">
                                {crush.map(
                                    ({id}) => (
                                        <div className="top_matches__cmncard p2-bg rounded-3 mb-4" key={id}>
                                            <div className="row gx-0 gy-xl-0 gy-7">
                                                <div className="col-xl-7 col-xxl-8">
                                                    <div className="top_matches__clubdata">
                                                        <div className="table-responsive maintain">
                                                            <table className="table mb-0 pb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="row">
                                                                            <div
                                                                                className="top_matches__innercount d-flex align-items-center gap-2 ">
                                                                               
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/spribe.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">SPRIBE</span>
                                                                                </div>
     
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providers/aviater.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">AVIATRIX</span>
                                                                                </div>
                                                                              
                                                                            </div>
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </Tab.Panel>

                            
                        </Tab.Panels>
                     </Tab.Group>
                 </div>
            </section>
        </>
    );
}