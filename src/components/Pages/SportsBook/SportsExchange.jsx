"use client"
import Image from "next/image";
import { swedenData } from "@/../public/data/allPageData";
import { useState, useEffect, Suspense} from "react";
import {api_path} from '../../../lib/api_path';
import {home_path} from '../../../lib/api_path';
import { useRouter } from 'next/navigation';
import { unstable_noStore } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios');

export default function SportsExchange({session}) {

    const [sportsBookData, setSportsBook] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // For displaying a loader

    useEffect(() => {
        const fetchSportsbookData = async () => {
          try {
            const response = await axios.get(`https://domain.site/api/v1/initGame/${session.user.user_id}`, {
              next: { revalidate: 3600 }, 
            });
        
            setSportsBook(response.data.url);

            if (response.data.url) {
              //window.location.href = response.data.url; 
              window.open(response.data.url, '_blank'); 
            }
          } catch (error) {
            console.error('Error fetching sportsbook data:', error);
          } finally {
            setIsLoading(false); 
          }
        };
        fetchSportsbookData();
      }, []);
    
    return (
        <section className="top_matches pb-7 pb-md-9">
            <div className="container-fluid">
                <div className="row">
                    <div className="pt-20">
                        <div className="pt-5">
                            <div className="">
                                <div className="col-12">
                                    <div className="top_matches__content">
                                        {isLoading ? (
                                          <div className="loader"> 
                                            Loading...
                                            <Image src="/loader.svg" alt="" style={{maxHeight:'80px'}} fill />
                                          </div>
                                        ) : (
                                          <Suspense fallback={'loading.....'}>
                                              <iframe src={sportsBookData} width="100%" height="800" title="Embedded Content" />
                                          </Suspense>
                                        )}
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
