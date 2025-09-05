"use client"
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import {api_path} from '../../../lib/api_path';
const axios = require('axios');

export default function ChatsList({ session }) {  
  const user_id = session.user.agent_id;
  const [agentData, setAgentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${api_path}/chat/broadcast?agentList=true&user_id=${user_id}`, {
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
                        <div className=" pt-20">
                            <div className="row w-100 pt-md-5">
                                <div className="col-12">
                                  <div className="row">                                  
                                      <div className="card-body">
                                          <h4 className="text-center">Online Support</h4>
                                          <div className="table-responsive">
                                                  <table className="table table-dark text-center g1-bg table-sm table-bordered table-hover table-stripped" >
                                                      <thead className="g1-bg">
                                                         <tr>
                                                             <th>Active Reprentative</th>
                                                             <th>Connect</th>
                                                          </tr>
                                                      </thead>
                                                   <tbody> 
                                                         {agentData.length > 0 ? (
                                                            agentData.map((agentDetails, index) => ( 
                                                                <tr key={index}>
                                                                    {/* <td>{agentDetails.user_id}</td> */}
                                                                    <td>Active Team</td>
                                                                    <td>
                                                                     <Link href={`/chat-with?userId=${agentDetails.user_id}`}>
                                                                            <Image className="rounded-5" src="/images/chat_dots.png" height={30} width={30} alt="Icon" />
                                                                            <span className="fs-eight r1-bg px-1 rounded-5 position-absolute ">{agentDetails.unreadCount}</span>
                                                                     </Link>
                                                                    </td>
                                                                </tr>         
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3">Loading...</td>
                                                            </tr>
                                                        )} 

                                                            {/* <tr>
                                                                <td colSpan="3">  
                                                                  <a href='https://www.t.me/fastbet_supports'>https://www.t.me/fastbet_support </a> 
                                                                  
                                                                </td>
                                                            </tr> */}
                                                     
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
