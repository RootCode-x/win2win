"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function DepositList({ session }) {  

  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [userDetails, setuserDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [depositReport, setDepositReport] = useState('');
      
          
      useEffect(() => {
        const fetchDepositReport = async () => {
          setIsLoading(true);
          try {
            const response = await axios.get(`${api_path}/deposit/deposit?report=true&user_id=${session.user.user_id}`, {
              next: { revalidate: 3600 }, // Cache revalidation in seconds
            });
            const data = await response.data;
            setDepositReport(data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching sportsbook data:', error);
          } finally {
            setIsLoading(false); // Always hide loader after fetching (success or error)
          }
        };

        fetchDepositReport();
      }, []);


        // Function to format the date
        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
            };

            const timeString = date.toLocaleString('en-US', options);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);

            return `${timeString.toLowerCase()} ${day}/${month}/${year}`;
        };


  return (
      <section className="">
           <Toaster />
          <div className="">
              <div className="row">
                  <div className="col-12 gx-0 gx-sm-4">
                      <div className="pt-15">
                          <div className="row p-5 ">
                              <div className="col-12">

                                
                              <div className="pay_method__tabletwo">
                                  <h4>Deposit History</h4>
                                  <div style={{ overflowX: 'auto' }} className="pay_method__table-scrollbar">
                                      <table className="w-100 text-center p2-bg">
                                          <tr>
                                              {/* <th className="text-nowrap">Transaction ID</th> */}
                                              <th className="text-nowrap">Date</th>
                                              <th className="text-nowrap">Method type</th>
                                              <th className="text-nowrap">Amount </th>
                                              {/* <th className="text-nowrap">Amount BDT</th> 
                                              <th className="text-nowrap">From</th>
                                              <th className="text-nowrap">TO</th>
                                             <th className="text-nowrap">Agent ID</th> */}
                                              <th className="text-nowrap">Status</th>
                                          </tr>
                                        
                                      {depositReport.length > 0 ? (
                                          depositReport.map((deposit, index) => (
                                              <tr key={index}>
                                                  {/* <td className="text-nowrap">{deposit.trxid}</td>  */}
                                                  <td className="text-nowrap">{formatDate(deposit.createdAt)}</td> 
                                                  <td className="text-nowrap">{deposit.selected_method}</td>
                                                  <td className="text-nowrap">{deposit.send_amount}</td> 
                                                  {/* <td className="text-nowrap">{deposit.send_amount_in_bdt}</td>  
                                                  <td className="text-nowrap">{deposit.sender_number}</td> 
                                                  <td className="text-nowrap">{deposit.agent_wallet}</td> 
                                                  <td className="text-nowrap">{deposit.agent_id}</td>  */}
                                                  <td className={`text-nowrap ${deposit.status === 'pending' ? 'r1-color' : 'g1-color'} fw-normal cpoint`}>{deposit.status}</td>
                                              </tr>
                                          ))
                                      ) : (
                                          <tr>
                                              <td colSpan="5">Nohing found..</td>
                                          </tr>
                                      )}


                                      </table>
                                  </div>
                              </div>


                                
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
}
