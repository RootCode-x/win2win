"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
//import { fetchExchangeRate } from './FetchExchangeRate';
import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';
import {paymentMehotdData, amountData } from '@/../public/data/dashBoard';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import { useFormState } from "react-dom";
import styles from "../../Pages/CreateAcount/regform_style.module.css";
import { profileUpdate, passwordUpdate, tppasswordUpdate, handleLogout } from "@/lib/action";

export default function Profile({ session }) {  

  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [state, profileUpdateAction] = useFormState(profileUpdate, undefined);
  const [passwordUpdates, passwordUpdateAction] = useFormState(passwordUpdate, undefined);
  const [tppasswordUpdates, tppasswordUpdateAction] = useFormState(tppasswordUpdate, undefined);
  const [userDetails, setuserDetails] = useState('');


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
  
    if (session.user.id) { // Check if user ID is available before fetching
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

                                 <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                        <div className="pay_method__paymethod-title mb-5 mb-md-6">
                                            <h5 className="n10-color">Profile Update</h5>
                                            {state?.error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {state.error}
                                                </div>
                                            )}
                                            
                                            {state?.success && (
                                                <div className="alert alert-success" role="alert">
                                                    {state.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="pay_method__formarea">
                                            <form action={profileUpdateAction}>
                                                <input  type="hidden" name="user_id" value={userDetails.user_id} />
                                                <div
                                                    className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                                    <div className="w-100">
                                                        <label className="mb-3">First Name (Given Name)</label>
                                                        <input className="n11-bg rounded-8" type="text" placeholder="First Name" 
                                                        name="first_name"  onChange={(e) => setuserDetails({ ...userDetails, first_name: e.target.value })} value={userDetails.first_name}  />
                                                    </div>
                                                    <div className="w-100">
                                                        <label className="mb-3">Last Name</label>
                                                        <input className="n11-bg rounded-8" type="text"
                                                            name="last_name"  onChange={(e) => setuserDetails({ ...userDetails, last_name: e.target.value })} value={userDetails.last_name}  placeholder="Last Name" />
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                                    <div className="w-100">
                                                            <label className="mb-3">Date of Birth</label>
                                                            <input className="n11-bg rounded-8" type="text"
                                                                name="dob"  onChange={(e) => setuserDetails({ ...userDetails, dob: e.target.value })} value={userDetails.dob}   placeholder="EX : DD/MM/YYYY" />
                                                    </div>
                                                        <div className="w-100">
                                                            <label className="mb-3">Phone Number</label>
                                                            <input className="n11-bg rounded-8" type="text"
                                                                name="mobile"  onChange={(e) => setuserDetails({ ...userDetails, mobile: e.target.value })} value={userDetails.mobile}   placeholder="EX : +614XXXXXXXX" />
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                                    <div className="w-100">
                                                        <label className="mb-3">Address</label>
                                                        <input className="n11-bg rounded-8" type="text"
                                                            name="address"  onChange={(e) => setuserDetails({ ...userDetails, address: e.target.value })} value={userDetails.address} 
                                                            placeholder="Address..." />
                                                    </div>
                                                    <div className="w-100">
                                                        <label className="mb-3 d-block">Select Currency</label>
                                                    
                                                        <select  className="n11-bg extrastyle rounded-8 w-100 py-3 pe-5"  name="country_currency"  id="currency" required="">
                                                            <option value="">Select Currency</option>
                                                            <option selected={userDetails.country_currency === "AFN"}  value="AFN">AFN</option>
                                                            <option selected={userDetails.country_currency === "BDT"}  value="BDT">BDT</option>
                                                            <option selected={userDetails.country_currency === "USD"}  value="USD">USD</option>
                                                            <option selected={userDetails.country_currency === "INR"}  value="INR">INR</option>
                                                            <option selected={userDetails.country_currency === "LKR"}  value="LKR">LKR</option>
                                                            <option selected={userDetails.country_currency === "NPR"}  value="NPR">NPR</option>
                                                            <option selected={userDetails.country_currency === "RON"}  value="RON">RON</option>
                                                            <option selected={userDetails.country_currency === "PKR"}  value="PKR">PKR</option>
                                                            <option selected={userDetails.country_currency === "UAH"}  value="UAH">UAH</option>
                                                            <option selected={userDetails.country_currency === "ZNK"}  value="ZNK">ZNK</option>
                                                            <option selected={userDetails.country_currency === "MWK"}  value="MWK">MWK</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                                    <div className="w-100">
                                                        <label className="mb-3">City / Region</label>
                                                        <input className="n11-bg rounded-8" type="text"
                                                        name="city" value={userDetails.city}    onChange={(e) => setuserDetails({ ...userDetails, city: e.target.value })}
                                                        placeholder="City / Region..." />
                                                    </div>
                                                    <div className="w-100">
                                                        <label className="mb-3">Country</label>
                                                        
                                                        <select  className={`${styles.select_dropdown} w-100 p2-bg  rounded-3 mb-1`}  
                                                        name="country"  id="country" required="">
                                                                <option value="">Select Country</option>
                                                                <option value="Afghanistan"  selected={userDetails.country === "Afghanistan"}>Afghanistan</option>
                                                                <option value="Bangladesh" selected={userDetails.country === "Bangladesh"}>Bangladesh</option>
                                                                <option value="India" selected={userDetails.country === "India"}>India</option>
                                                                <option value="Sri Lanka" selected={userDetails.country === "Sri Lanka"}>Sri Lanka</option>
                                                                <option value="Nepal" selected={userDetails.country === "Nepal"}>Nepal</option>
                                                                <option value="Romania" selected={userDetails.country === "Romania"}>Romania</option>
                                                                <option value="Ukraine" selected={userDetails.country === "Ukraine"}>Ukraine</option>
                                                                <option value="Pakistan" selected={userDetails.country === "Pakistan"}>Pakistan</option>
                                                                <option value="Niger" selected={userDetails.country === "Niger"}>Niger</option>
                                                                <option value="USA" selected={userDetails.country === "USA"}>USA</option>
                                                        </select>
                                                        
                                                    </div>
                                                </div>
                                                {/* <div className="d-flex gap-2 align-items-start align-items-xl-center mb-5">
                                                    <input type="checkbox" id="demoCheckbox" name="checkbox"
                                                        value="1" />
                                                    <label className="fs-seven">I authorize to collect and transmit my personal information for identity verification or <span className="g1-color"> similar uses as defined</span> in order to confirm my ability to use the website.</label>
                                                </div> */}
                                                
                                                 <div className=" mb-5" align="right">
                                                     <button align="right" className="py-2 btn-block px-3 m-1 p1-color  y2-bg  rounded-2">Update</button>
                                                </div>
                                               
                                            </form>
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
