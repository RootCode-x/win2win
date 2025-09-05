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

export default function SportsBook({session}) {

    const [sportsBookData, setSportsBook] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // For displaying a loader

    useEffect(() => {
        const fetchSportsbookData = async () => {
          try {
            const response = await axios.get(`${api_path}/sportsbook/init?init=true&userid=${session.user.user_id}`, {
              next: { revalidate: 3600 }, 
            });
            const data = await response.data.data;
            setSportsBook(data);
          } catch (error) {
            console.error('Error fetching sportsbook data:', error);
          } finally {
            setIsLoading(false); // Always hide loader after fetching (success or error)
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
                                    {/* <div className="top_matches__title d-flex align-items-center gap-2 mb-4 mb-md-5">
                                        <h3>Sportsbook</h3>
                                    </div> */}
                                    <div className="top_matches__content">
                                        {isLoading ? (
                                          <div className="loader"> 
                                            Loading...
                                            <Image src="/loader.svg" alt="" style={{maxHeight:'80px'}} fill />
                                          </div>
                                        ) : (
                                          <Suspense fallback={'loading.....'}>
                                              <iframe src={sportsBookData.url} width="100%" height="800" title="Embedded Content" />
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
