"use client"
import Image from "next/image";
import styles from './casinocss.module.css';
import { useState, useEffect, Suspense, useCallback } from "react";
import {api_path} from '../../../lib/api_path';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');
import { Tab } from "@headlessui/react";
import { tabThree, sports, casino, slot, tablegame, lottery, fishing, crush } from "@/../public/data/tabThree";
import { IconSearch } from "@tabler/icons-react";
import Link from 'next/link'


export default function LiveCasino({ session }) {  

    const router = useRouter();
    const handleClick = async (gameuuid) => {
   
        if (!session) {
          alert('Please login to your account');
          router.push('/login'); // Use Next.js router for navigation
          return;
        }

        if (session.user.currency < 0) {
          alert('Insufficient funds. Please deposit to proceed.');       
          return;
        }
      
        const currency = 'BDT';
        const game_uuid = gameuuid;
        const player_id = session.user.id;
        const player_name = session.user.user_id;
        const session_id = uuidv4();
      
        try {
          const postData = {
                            currency,
                            game_uuid,
                            player_id,
                            player_name,
                            session_id,
                        };
          const response = await axios.post(`${api_path}/casino/casinogames`, postData);
          console.log(response); 

          const data = response.data;          
          const url = data.url;
          const windowFeatures = `width=${window.screen.availWidth},height=${window.screen.availHeight},menubar=no,toolbar=no,location=no,resizable=yes,status=no`;
      
          // Open game URL in a new window
          window.open(url, '_blank', windowFeatures);

          // window.location.href = url;  // it will open  the same page....

        } catch (error) {
          console.error('Error initializing game:', error);
          // Handle API request errors gracefully (e.g., display an error message)
        }
      };
 

      async function GameList(){
    
          return( <>
            {gameData.map((game, index) => ( 
                <div key={index} className={`${styles.custom_card} col-xl-3 col-md-3 col-xs-6 col-6 p2-bg p-2 rounded-3 mb-1`}>
                    <img className="card-image" src={game.image} alt={game.name} />
                    <div className={styles.cardOverlay}>
                        <div className={styles.playButton}>
                            <button type="button" className={styles.slotPlayButton} onClick={() => handleClick(game.uuid)}>
                                Play
                            </button>
                            {/* <button type="button" className={styles.slotDemoButton}>Demo</button> */}
                        </div>
                    </div>
                    <div className={styles.title}>{game.name}</div>
                </div>
            ))}
            </>
          );
        }


    const [getProvider, setProvider] = useState([]);
    const [getfetchGameType, setGameType] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [selectedGameType, setSelectedGameType] = useState(null)
    const [currentPageProvider, setCurrentPageProvider] = useState(1);
    const [currentPageGameType, setCurrentPageGameType] = useState(1);


    const fetchData = async (page, providerName = null, gameType = null) => {
        setIsLoading(true);
        try {
        let url = `${api_path}/casino/casinogames?type=live%20dealer`;
        if (providerName) {
            url = `${api_path}/casino/casinogames?sortByProvider=${providerName}&page=${page}`;
        } else if (gameType) {
            url = `${api_path}/casino/casinogames?sortByGame=${gameType}&page=${page}`;
        }

        const response = await axios.get(url);
        const { data, currentPage, totalPages } = response.data; 

        if (data.length === 0) {
            setGameData([]);
            setIsLoading(false);
            setError("No data found");
            return;
        }{
            setError("");
        }

        setGameData((prevData) => [...prevData, ...data]);
        setCurrentPage(currentPage);
        setCurrentPageProvider(currentPage);
        setCurrentPageGameType(currentPage);
        setIsLoading(false);
        } catch (error) {
        // Handle error
        setIsLoading(false);
        }
    };


    const fetchProvider = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`${api_path}/casino/casinogames?providerlist=true`);
        setProvider(response.data);
        setIsLoading(false);
        } catch (error) {
        setError(error.message);
        setIsLoading(false);
        }
    };

    const fetchGameType = async () => {
        setIsLoading(true);
        try {
        const response = await axios.get(`${api_path}/casino/casinogames?gametypelist=true`);
        console.log(response.data);  
        setGameType(response.data);
        setIsLoading(false);
        } catch (error) {
        setError(error.message);
        setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
        fetchProvider();
        fetchGameType();
    }, []);

    const handleScroll = () => {
        if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
        if (selectedProvider) {
            const nextPage = currentPage + 1;
          //  fetchData(nextPage, selectedProvider);
        } else if (selectedGameType) {
            const nextPage = currentPage + 1;
           // fetchData(nextPage, null, selectedGameType);
        } else {
            const nextPage = currentPage + 1;
         //   fetchData(nextPage);
        }
        }
    };
    

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage, currentPageProvider, currentPageGameType, selectedProvider, selectedGameType]);
    


    // Update selectedProvider and currentPageProvider when a provider button is clicked
    const handleProviderClick = useCallback(async (providerName) => {
        setGameData([]); // Clear existing data
        setCurrentPageProvider(1); // Reset current page for provider
        setSelectedGameType(null); // Clear selectedGameType
        setSelectedProvider(providerName); // Set selectedProvider
        fetchData(1, providerName);
    }, []);


    // Update selectedGameType and currentPageGameType when a game type button is clicked
    const handleGameTypeClick = useCallback(async (gameType) => {
        setGameData([]); // Clear existing data
        setCurrentPageGameType(1); // Reset current page for game type
        setSelectedProvider(null); // Clear selectedProvider
        setSelectedGameType(gameType); // Set selectedGameType
        fetchData(1, null, gameType);
    }, []);

    
    const handleSearch = async () => {
        if (!searchQuery) return;
        setIsLoading(true);
        try {
        const response = await axios.get(`${api_path}/casino/casinogames?searchGame=${searchQuery}`);
        const searchData = response.data.data;

        if (searchData.length === 0) {
            setGameData([]);
            setIsLoading(false);
            setError("No matching games found");
            return;
        } else {
            setError("");
        }

        setGameData(searchData);
        setIsLoading(false);
        } catch (error) {
        setError("An error occurred while searching.");
        setIsLoading(false);
        }
    };

    //  Game type show starts here
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const toggleSearchInput = () => {
        setIsSearchActive(!isSearchActive);
        if (!isSearchActive) {
            setSearchQuery('');
        }
    };

   
    const [activeItem, setActiveItem] = useState(tabThree[0]);
    
    const handleTabClick = (itemName) => {
        setActiveItem(itemName);
    };

    const getItemStyle = (itemName) => {
        return {
            border: `1px solid ${activeItem === itemName ? '#35C31E' : '#2C3655'}`,
        };
    };


    return (
        <section className="">
            <div className="">

                     <Tab.Group>
                        <Tab.List  className={`tablinks  gap-5 flex-wrap mb-5 mb-md-5 ${styles.scrollableContainer}`}>
                            {tabThree.map((tabThreeSingle) => (
                                <Tab className="nav-links" key={tabThreeSingle.buttonName}>
                                    <span onClick={() => handleTabClick(tabThreeSingle)}
                                        style={getItemStyle(tabThreeSingle) } className={`tablink clickable-active2 d-flex align-items-center gap-2 py-2 px-2 p3-bg ${styles.navtabBgcolor} ${styles.navtabBgTitle}`}>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={tabThreeSingle.imgSrc}
                                            alt="Icon"
                                        />
                                    </span>
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels>

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
                                                                                <div className="top_matches__innercount-item clickable-active rounded-3  text-center">
                                                                                    <span onClick={() => handleProviderClick('Evolution2')}
                                                                                        className="fs-seven d-block mb-2 text-nowrap">
                                                                                           <Image  src="/images/providersnew/Evolution.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                    </span>
                                                                                    <span className="fw-bold d-block text-nowrap">EVOLUTION</span>
                                                                                </div>
                                                                                <div className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('Ezugi')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Eguzi.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }}  /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">  EZUGI  </span>
                                                                                </div>
                                                                            
                                                                                <div className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('PragmaticPlayLive')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Pragmatic Play.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">PRAGMATIC</span>
                                                                                </div>
                                                                                <div className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span   onClick={() => handleProviderClick('Vivogaming')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Vivo Gaming.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">VIVO GAMING</span>
                                                                                </div>
                                                                                <div className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('HoGaming')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Hot Gaming.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">HOT GAMING</span>
                                                                                </div>
                                                                              
                                                                               <div  className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span onClick={() => handleProviderClick('ZeusPlay')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Andar Bahar.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span  className="fw-bold d-block text-nowrap">ANDAR BAHAR</span>
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
                                                                                    <Link href="/sportsbook">  <Image  src="/images/providersnew/Cricket.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> </Link>
                                                                                    </span>
                                                                                    <span className="fw-bold d-block text-nowrap"> <Link href="/sportsbook">CRICKET </Link></span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span
                                                                                        className="fs-seven d-block mb-2 text-nowrap">
                                                                                       <Link href="/sportsbook">      
                                                                                        <Image  src="/images/providersnew/Football.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                        </Link>
                                                                                        </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap"><Link href="/sportsbook">FOOTBALL</Link></span>
                                                                                </div>
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span
                                                                                        className="fs-seven d-block mb-2 text-nowrap">
                                                                                      <Link href="/sportsbook">    <Image  src="/images/providersnew/Badminton.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} />
                                                                                      </Link>
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap"><Link href="/sportsbook">BADMINTON</Link></span>
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
                                                                            <div className="top_matches__innercount d-flex align-items-center gap-2 ">
                                                                             
                                                                                
                                                                               <div className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span onClick={() => handleProviderClick('JiliGames')}  className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/JILI.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">Jili</span>
                                                                                </div> 
                                                                                
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('PGSoft')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/PG SOFT.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">PG SOFT</span>
                                                                                </div>

                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('PragmaticPlay')}  className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Pragmatic Play.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">PRAGMATIC</span>
                                                                                </div>

                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('Platipus')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/Platipus.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">PLATIPUS</span>
                                                                              </div>

                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('Spadegaming')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/JDB.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">JDB</span>
                                                                                </div>

                                                                            
                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('OneTouch')}  className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/ONE TOUCH.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">ONE TOUCH</span>
                                                                                </div>

                                                                                
                                                                            
                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('Evoplay')}  className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/EVO PLAY.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">EVO PLAY</span>
                                                                                </div>

                                                                              <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span  onClick={() => handleProviderClick('Fugaso')}  className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/ENDORPHINA.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span
                                                                                        className="fw-bold d-block text-nowrap">Endorphina</span>
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
                                                                                    <span onClick={() => handleProviderClick('OneTouch')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/LIVE TABLES.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
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
                                                                                    <span onClick={() => handleProviderClick('Lotto Instant Win')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/LOTTERY TICKET.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
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
                                                                                    <span onClick={() => handleProviderClick('KAGaming')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/KA FISH.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
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
                                                                                    <span onClick={() => handleProviderClick('Spribe')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/SPRIBE.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
                                                                                     </span>
                                                                                    <span className="fw-bold d-block text-nowrap">SPRIBE</span>
                                                                                </div>
     
                                                                                <div
                                                                                    className="top_matches__innercount-item clickable-active  rounded-3  text-center">
                                                                                    <span onClick={() => handleProviderClick('Aviatrix')} className="fs-seven d-block mb-2 text-nowrap">
                                                                                            <Image  src="/images/providersnew/AVIATRIX.png" width={120} height={120} alt="Icon"  style={{ minHeight: '100px', maxWidth: '100px' }} /> 
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







                                    {/* <div className="scrollable-container">
                                        <div className={styles.scrollableContainer}>
                                        <button  className="cmn-btn p-1 rounded-3 mb-2">Live Casino</button>    
                                            <button  key="1"  className={styles.pillButton}  onClick={() => handleProviderClick('Evolution2')} >Evolution</button>    
                                            <button  key="2"  className={styles.pillButton}  onClick={() => handleProviderClick('Ezugi')} >Ezugi</button>      
                                            <button  key="3"  className={styles.pillButton}  onClick={() => handleProviderClick('Vivogaming')} >Vivogaming</button>      
                                            <button  key="4"  className={styles.pillButton}  onClick={() => handleProviderClick('PragmaticPlayLive')} >Pragmatic</button>
                                            <button  key="5"  className={styles.pillButton}  onClick={() => handleProviderClick('HoGaming')} >Hot Gaming</button>    
                                        </div>
                                    </div>  

                                   <div className="scrollable-container">
                                        <div className={styles.scrollableContainer}>
                                            <button  key="1"  className="cmn-btn p-1 rounded-3 mb-2">Slot Games</button>    
                                            <button  key="2"  className={styles.pillButton}  onClick={() => handleProviderClick('Jili')} >Jili</button>    
                                            <button  key="3"  className={styles.pillButton}  onClick={() => handleProviderClick('PGSOFT')} >PG-SOFT</button>      
                                            <button  key="4"  className={styles.pillButton}  onClick={() => handleProviderClick('Pragamitcplay')} >PT</button>      
                                            <button  key="5"  className={styles.pillButton}  onClick={() => handleProviderClick('Platus')} >Platus</button>
                                        </div>
                                    </div>  
                                    <div className="scrollable-container">
                                        <div className={styles.scrollableContainer}>
                                        <button  className="cmn-btn p-1 rounded-3 mb-2">Games</button>    
                                            {getfetchGameType.map((gameType, index) => (                   
                                            <button key={index}  className={styles.pillButton}  onClick={() => handleGameTypeClick(gameType)} >{gameType}</button>                
                                            ))}
                                        </div>
                                    </div>   */}
                                    <div className={styles.scrollableContainer}>
                                        <div className={styles.pillButtons} >
                                            <div className={styles.searchInputContainer} >
                                                {/* <button className="cmn-btn p-1 rounded-3 mb-2"  style={{ 
                                                border:'1px solid #121D41 !important', background: 'linear-gradient(151deg, rgba(8,15,37,1) 0%, rgba(35,54,115,1) 100%)' }}  onClick={handleSearch} >Search</button>  */}
                                                <input type="text" style={{ width: '300px', height: '35px', border: '1px solid #323030' }}  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Games..." />
                                                <button onClick={handleSearch}>
                                                      <IconSearch height={30} width={30}/>
                                                </button>             
                                                 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{padding:'10px'}}>                                  
                                      <Suspense fallback={'loading....'}>
                                          <GameList />
                                      </Suspense>                                    
                                    </div>

                </div>
        </section>
    )
}
