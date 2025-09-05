"use client"
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import {api_path} from '@/lib/api_path';
const axios = require('axios');
import { useRouter } from 'next/router';
export default function ChatsList() {  

  const [agentData, setAgentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const router = useRouter();
  const { id } = router.query; // Get ID from URL parameter
  const userId = id; // Get ID from URL parameter
console.log('uer id check', userId);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${api_path}/chat/broadcast?agentList=true`, {
          next: { revalidate: 3600 }, 
        });
        setAgentData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

    return (
        <section className="top_matches">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 gx-0 gx-sm-4">
                        <div className="top_matches__main pt-20">
                            <div className="row w-100 pt-md-5">
                                <div className="col-12">
                                  <div className="row">                                  
                                      <div className="card-body">
                                          <h4 className="text-center">Agent List</h4>
                                          <div className="table-responsive">
                                                  <table className="table table-dark text-center g1-bg table-sm table-bordered table-hover table-stripped" >
                                                      <thead className="g1-bg">
                                                         <tr>
                                                             <th>SL</th>
                                                             <th>Agent ID</th>
                                                             <th>Connect</th>
                                                          </tr>
                                                      </thead>
                                                   <tbody> 
                                                      {agentData.length > 0 ? (
                                                            agentData.map((agentDetails, index) => ( 
                                                                <tr key={index}>
                                                                     <td><span >{index + 1}</span></td>
                                                                    <td>{agentDetails.user_id}</td>
                                                                    <td>

                                                                    <Link href={`/chat-with/${agentDetails.user_id}`}>
                                                                        
                                                                            <Image className="rounded-5" src="/images/chat_dots.png" height={30} width={30} alt="Icon" />
                                                                            <span className="fs-eight g1-bg px-1 rounded-5 position-absolute ">{agentDetails.user_id}</span>
                                                                     
                                                                        </Link>
                                                                    </td>
                                                                </tr>         
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3">Loading...</td>
                                                            </tr>
                                                        )}
                                                      </tbody>                                                    
                                              </table>
                                          </div>
                                      </div>
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
