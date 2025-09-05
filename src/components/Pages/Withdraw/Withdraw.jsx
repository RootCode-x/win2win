"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
//import { fetchExchangeRate } from './FetchExchangeRate';
import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';
import {paymentMehotdData, withdrawAmountData } from '@/../public/data/dashBoard';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Withdraw({ session }) {  

  const router = useRouter();
  const [withdrawAmount, setWithdrawAmount] = useState('');  
  const [loading, setLoading] = useState(true); 
  const [userDetails, setuserDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chargedAmount, setChargedAmount] = useState(''); 
  const [selectedAmount, setSelectedAmount] = useState(withdrawAmountData[0].amount);
  console.log('assadsadsajdassjah  ' + session.user.agent_id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const latestUserDetails = await fetchUserData();

    if (!latestUserDetails) {
      toast.error('Error fetching user data.');
      return;
    }

    if (latestUserDetails.exposure > 0) {
      toast.error('Turn over not filled up.');
      return; 
    }

    new FormData(e.target);

    setIsLoading(true);
    const formData = {
        posttype: 'withdraw_now',
        user_id: session.user.user_id,
        agent_id: session.user.agent_id,
        WithdrawMethod: imageActiveItem.alt,
        mobile_no: e.target.mobile_no.value,
        trans_pass: e.target.trans_pass.value,
        withdraw_amount: withdrawAmount,
        chargedAmount: chargedAmount,
        net_withdraw_amount: withdrawAmount,
    };

    try {
        const response = await axios.post(`${api_path}/withdraw/withdraw`, formData);
        if (response.data) {
            toast.success(response.data.message);
            router.push("/withdraw-list");
        } else {
            toast.error('Something went wrong please try again...');
        }
      } catch (error) {
          toast.error(error.response.data.error);
      } finally {
          setIsLoading(false);
      }
    };
    
    const handleWithdrawAmountChange = (e) => {
      const amount = e.target.value;
      setWithdrawAmount(amount);
      const after_charge = amount - (amount * 0 / 100);
      setChargedAmount(after_charge);
    };

    const [imageActiveItem, setActiveimageItem] = useState(paymentMehotdData[0]);

    const handleImageClick = (itemName) => {
        setActiveimageItem(itemName);
    };
    const getImageItemStyle = (itemName) => {
        return {
            border: `2px solid ${imageActiveItem === itemName ? '#008000' : '#FF8A14'}`,
        };
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
          return data;
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };
    
      if (session.user.id) {
        fetchInitialData();
      }
    }, [session.user.id]);


    // const getItemStyle = (item, type) => {
    //     return {
    //         border: `1px solid ${selectedAmount === item ? '#35C31E' : '#2C3655'}`,
    //     };
        
    // };




    const getItemStyle = (item, type) => {
        if (type === 'paymentMethod') {
            return {
                border: `2px solid ${selectedAmount === item ? '#008000' : '#FF8A14'}`,
            };
        } else if (type === 'depositAmount') {
            return {
                border: `2px solid ${selectedAmount === item ? '#008000' : '#FF8A14'}`,
            };
        }
      };









    const handleAmountClick = (amount) => {
        setWithdrawAmount(amount);
        setSelectedAmount(amount);
    };

      // Function to fetch the latest user data
    const fetchUserData = async () => {
        try {
        const response = await fetch(`${api_path}/user_info/${session.user.id}`);
        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
        }
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

                                  <div className="tabcontents pb-3">
                                      <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                          <div className="pay_method__formarea">
                                              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', color:'#F7FF00' }}>
                                                  <div style={{ textAlign: 'left', width: '50%', color:"white", }}>Total Wallet Balance:</div>
                                                  <div style={{ textAlign: 'right', width: '50%' }}>
                                                  {loading ? (
                                                      <h5>..</h5>
                                                  ) : (
                                                      <h5 style={{ width: '100%', color:'#FF8A14' }}>৳ { userDetails.currency.toFixed(2) }</h5>
                                                  )}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                        

                                    <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8 mb-8 mb-md-10">
                                        <div className="pay_method__paymethod-title d-flex align-items-center gap-3 mb-6 mb-md-8">
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '5px 10px',
                                                    border: '2px solid #080F25',
                                                    width:'100%',
                                                }}>
                                                    <span style={{ color: 'white', fontWeight: '900' }}> Withdraw  </span>
                                                    <span style={{ color: 'white', fontWeight: '900' }}> <Link   style={{ textAlign: 'right', float:'right' }} href="/deposit"  className="py-2 px-3  p1-color  y2-bg  rounded-2 ">Deposit</Link></span>
                                                </div>
                                         </div>
                                          <div className="pay_method__paymethod-alitem">
                                                <div className="row gx-2 gy-2">
                                                    {paymentMehotdData.map((imagpaymentMehotd) => (
                                                        <div className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 col-xxl-2" key={imagpaymentMehotd.id}>
                                                            <div onClick={() => handleImageClick(imagpaymentMehotd)}
                                                                style={getImageItemStyle(imagpaymentMehotd)} className="pay_method__paymethod-item pay-methods p-2 rounded-3 cpoint">
                                                                <Image src={imagpaymentMehotd.src} height={70} width={50} alt={imagpaymentMehotd.alt} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                          </div>
                                      </div>

                                      <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                          <div className="pay_method__paymethod p-4 p-lg-2 p2-bg rounded-8">
                                          <div className="pay_method__paymethod-title mb-5 mb-md-6">
                                            <h5 className="n10-color">Choose Withdraw Amount</h5>
                                        </div>
                                          <div  className="pay_method__paymethod-items d-flex align-items-center gap-4 gap-sm-5 gap-md-6 pb-5">
                                            {withdrawAmountData.map((singleData) => (
                                                <div
                                                    onClick={() => handleAmountClick(singleData.amount)}
                                                    style={getItemStyle(singleData.amount, 'depositAmount')}
                                                    className={`pay_method__paymethod-item ${
                                                        selectedAmount === singleData.amount ? 'amount-active' : ''
                                                    } p-2 rounded-3 cpoint`}
                                                    key={singleData.id}
                                                >
                                                    {singleData.amount}
                                                </div>
                                            ))}
                                        </div>


                                          <div className="pay_method__formarea">
                                             <form onSubmit={handleSubmit}>
                                                  <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                                      <div className="d-flex p1-bg rounded-8 w-100">
                                                      <input
                                                                  type="text"
                                                                  name='withdraw_amount'
                                                                  placeholder="Min Amount 500 & Max Amount 25000"
                                                                  value={withdrawAmount}
                                                                  onChange={handleWithdrawAmountChange}
                                                              />
                                                      </div>
                                                      
                                                      <div className="d-flex p1-bg rounded-8 w-100">
                                                         <input type="text" name='mobile_no' value={userDetails.mobile} placeholder="Your Withdraw Receiver Number" />
                                                      </div>

                                                      <div className="d-flex p1-bg rounded-8 w-100">
                                                       <input type="password" name='trans_pass' placeholder="Transaction Password" />
                                                      </div>
                                                  </div>
                                    
                                                  {/* <div className="w-100">
                                                      <select  className="n11-bg extrastyle rounded-8 w-100 py-3 pe-5"  name="agent_id"  id="currency" required="">
                                                      <option value="">Select Agent</option>
                                                          {agentData.length > 0 ? (
                                                              agentData
                                                              .filter(agentDetails => agentDetails.user_id === session.user.agent_id)
                                                              .map((agentDetails, index) => (
                                                              <option key={index} value={agentDetails.user_id}>
                                                                  {agentDetails.user_id}
                                                              </option>
                                                              ))
                                                          ) : (
                                                          <option value="loading">loading..</option>
                                                          )}
                                                      </select>
                                                  </div> */}

                                                  <div className="d-flex align-items-center justify-content-between mb-2 mt-2 mb-md-5">
                                                      <span>Total</span>
                                                      <span>BDT {withdrawAmount}</span>
                                                  </div>

                                                  {/* <div className="d-flex align-items-center justify-content-between mb-2  mb-md-5">
                                                      <span>Net Total</span>
                                                      <span>BDT {chargedAmount} Tk</span>
                                                  </div> */}

                                                  {/* {exchangeRate && (
                                                      <div className="d-flex align-items-center justify-content-between mb-2  mb-md-5">
                                                          <span>Total (BDT)</span>
                                                          <span>BDT {chargedAmount} TK</span>  
                                                          <span>BDT {convertedAmount} TK</span>
                                                      </div>
                                                  )} 
                                                    <button
                                                        type="submit"
                                                        className="py-2 px-3 p1-color y2-bg rounded-2 w-100"
                                                        disabled={isLoading} // Disable only during loading
                                                        onClick={handleSubmit}
                                                    >
                                                        {isLoading ? 'Processing...' : 'Withdraw'}
                                                    </button>
                                                   */}
                                                    {loading ? (
                                                        <div className="text-center">
                                                            <span>Loading...</span>
                                                        </div>
                                                        ) : userDetails.exposure !== 0 ? (
                                                        <button
                                                            type="button"
                                                            className="py-2 px-3 p1-color y2-bg rounded-2 w-100"
                                                            onClick={() => toast.error('Turnover is not filled up.')}
                                                            style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                                                        >Withdraw</button>
                                                        ) : (
                                                        <button type="submit" className="py-2 px-3  p1-color  y2-bg  rounded-2 w-100" disabled={isLoading}>
                                                            {isLoading ? 'Processing...' : 'Withdraw'}
                                                        </button>
                                                        )}
                                              </form>
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
