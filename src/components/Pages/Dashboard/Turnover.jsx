"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Deposit({ session }) {  
  const router = useRouter();

  const [userDetails, setuserDetails] = useState('');
  const [loading, setLoading] = useState(true); 



  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
          const response = await fetch(`${api_path}/user_info/${session.user.id}`, {
            next: { revalidate: 3600 }, // Set revalidation for 1 hour
          });

        const data = await response.json();
        setuserDetails(data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    if (session.user.id) {
      fetchInitialData();
    }
  }, [session.user.id]);


  return (
    <section className="">
      <Toaster />
   <div className="">
       <div className="row">
           <div className="col-12 gx-0 gx-sm-4">
               <div className="pt-15">
                   <div className="row p-5 ">
                       <div className="col-12">

                           <div className="tabcontents pb-3">
                                <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                    <div className="pay_method__formarea">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color:'#F7FF00' }}>
                                            <div style={{ textAlign: 'left', width: '50%' }}>Turn Over Due Amount:</div>
                                            <div style={{ textAlign: 'right', width: '50%' }}>
                                            {loading ? (
                                                <h5>..</h5>
                                            ) : (
                                                <h5 style={{ width: '100%', color:'#F7FF00' }}>৳ { userDetails.exposure.toFixed(2) }</h5>
                                            )}
                                            </div>
                                        </div>
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
);
}
