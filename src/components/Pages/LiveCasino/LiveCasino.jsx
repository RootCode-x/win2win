"use client"
import Image from "next/image";
import styles from './casinocss.module.css';
import { useState, useEffect, Suspense, useCallback } from "react";
import {api_path} from '../../../lib/api_path';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

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
          console.log(response.data); // You can handle success response here

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
        fetchData(nextPage, selectedProvider);
      } else if (selectedGameType) {
        const nextPage = currentPage + 1;
        fetchData(nextPage, null, selectedGameType);
      } else {
        const nextPage = currentPage + 1;
        fetchData(nextPage);
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
                
      
      

    return (
        <section className="top_matches">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 gx-0 gx-sm-4">
                        <div className="top_matches__main pt-20">
                            <div className="row w-100 pt-md-5">
                                <div className="col-12">

                                    <div className={styles.scrollableContainer}>
                                        <div className={styles.pillButtons} >
                                            <div className={styles.searchInputContainer} id="searchButtonStyle">
                                                <button className="cmn-btn p-1 rounded-3 mb-2" id="searchButton"  onClick={handleSearch} >Search</button> 
                                                <input type="text" id="searchButtonStyle" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Games..." />
                                                                
                                            </div>
                                            <button  className="cmn-btn p-1 rounded-3 mb-2">Providers</button>    
                                            {getProvider.map((providerName, index) => (                   
                                                    <button key={index} className={styles.pillButton} onClick={() => handleProviderClick(providerName)}>
                                                        {providerName}
                                                    </button>                
                                                ))}

                                        </div>
                                    </div>
                            
                                    <div className="scrollable-container">
                                        <div className={styles.scrollableContainer}>
                                        <button  className="cmn-btn p-1 rounded-3 mb-2">Games</button>    
                                            {getfetchGameType.map((gameType, index) => (                   
                                            <button key={index}  className={styles.pillButton}  onClick={() => handleGameTypeClick(gameType)} >{gameType}</button>                
                                            ))}
                                        </div>
                                    </div>  
                                    
                                    {/* <div className="top_matches__title d-flex align-items-center gap-2 mb-4 mb-md-5">
                                        <Image src="/images/icon/sweden.png" width={32} height={32} alt="Icon" />
                                        <h3>Live Casino</h3>
                                    </div> */}
                                    <div className="row">                                  
                                    <Suspense fallback={'loading....'}>
                                        <GameList />
                                    </Suspense>                                    
                                  </div>
                                 </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}
