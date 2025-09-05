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
import { profileUpdate, passwordUpdate, tppasswordUpdate, handleLogout } from "@/lib/action";
import { useFormState } from "react-dom";


export default function PasswordUpdate({ session }) {  

  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [userDetails, setuserDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [state, profileUpdateAction] = useFormState(profileUpdate, undefined);
  const [passwordUpdates, passwordUpdateAction] = useFormState(passwordUpdate, undefined);
  const [tppasswordUpdates, tppasswordUpdateAction] = useFormState(tppasswordUpdate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
                                            <h5 className="n10-color">Change your Password</h5>
                                            {passwordUpdates?.error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {passwordUpdates.error}
                                                </div>
                                            )}
                                            {passwordUpdates?.success && (
                                                <div className="alert alert-success" role="alert">
                                                    {passwordUpdates.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="pay_method__formarea">
                                            <form action={passwordUpdateAction}>
                                                <input type="hidden" name="user_id" value={userDetails.user_id} />
                                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                                    <div className="d-flex w-100 p1-bg rounded-8">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="oldPassword"
                                                            placeholder="Enter Your old Password"
                                                        />
                                                    </div>
                                                    <div className="d-flex w-100 p1-bg rounded-8">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="newPassword"
                                                            placeholder="Enter your new password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>
                                                        <input type="checkbox" onChange={toggleShowPassword} />
                                                        Show Password
                                                    </label>
                                                </div>
                                                <button type="submit" className="py-4 px-5 n11-bg rounded-2 w-100">
                                                    Update Password
                                                </button>
                                            </form>
                                        </div>
                                        
                                        <div className="pay_method__paymethod-title mb-5 mb-md-6 pt-20">
                                            <h5 className="n10-color">Change your transaction Password</h5>
                                            {tppasswordUpdates?.error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {tppasswordUpdates.error}
                                                </div>
                                            )}
                                            {tppasswordUpdates?.success && (
                                                <div className="alert alert-success" role="alert">
                                                    {tppasswordUpdates.message}
                                                </div>
                                            )}
                                        </div>
                                        <div className="pay_method__formarea">
                                            <form action={tppasswordUpdateAction}>
                                                <input type="hidden" name="user_id" value={userDetails.user_id} />
                                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                                    <div className="d-flex w-100 p1-bg rounded-8">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="oldPassword"
                                                            placeholder="Enter Your old Password"
                                                        />
                                                    </div>
                                                    <div className="d-flex w-100 p1-bg rounded-8">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="newPassword"
                                                            placeholder="Enter your new password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>
                                                        <input type="checkbox" onChange={toggleShowPassword} />
                                                        Show Password
                                                    </label>
                                                </div>
                                                <button type="submit" className="py-4 px-5 n11-bg rounded-2 w-100">
                                                    Update Password
                                                </button>
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
