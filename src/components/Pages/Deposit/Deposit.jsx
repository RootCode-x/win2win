"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { imagesData, amountData } from '@/../public/data/dashBoard';
import axios from 'axios';
import { fetchExchangeRate } from './FetchExchangeRate';
import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Deposit({ session }) {  
  const router = useRouter();
  const [activePaymentMethod, setActivePaymentMethod] = useState(imagesData[0]);
  const [selectedAmount, setSelectedAmount] = useState(amountData[0].amount);
  const [bKashNumber, setBKashNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [depositMethods, setDepositMethods] = useState([]); // State to store fetched methods
  const [deposit_amount, setdeposit_amount] = useState('');
  const [userDetails, setuserDetails] = useState('');
  const [loading, setLoading] = useState(true); 
  const [isDisabled, setIsDisabled] = useState(false);


  useEffect(() => {
      async function fetchRate() {
          const rate = await fetchExchangeRate();
          setExchangeRate(rate);
      }
      fetchRate();
  }, []);

  const calculateBDT = (amount) => {
    if (exchangeRate) {
        return (amount * exchangeRate).toFixed(2);
    }
    return null;
};

  const handlePaymentMethodClick = (paymentMethod) => {
    setActivePaymentMethod(paymentMethod);
  };

  const handleAmountClick = (amount) => {
    setdeposit_amount(amount);
    setSelectedAmount(amount);
  };

  const getItemStyle = (item, type) => {
    if (type === 'paymentMethod') {
        return {
            border: `2px solid ${activePaymentMethod === item ? '#008000' : '#FF8A14'}`,
        };
    } else if (type === 'depositAmount') {
        return {
            border: `2px solid ${selectedAmount === item ? '#008000' : '#FF8A14'}`,
        };
    }
  };

  const handleCopyMobileNumber = (mobileNumber) => {
    navigator.clipboard.writeText(mobileNumber)
      .then(() => toast.success('Copied this number: ' + mobileNumber))
      .catch((error) => console.error('Error copying mobile number:', error));
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

    if (session.user.id) {
      fetchInitialData();
    }
  }, [session.user.id]);


  const handleDeposit = async (e) => {
    e.preventDefault();
  
    if (!selectedAmount) {
      toast.error('Please select an amount!');
      return;
    }
  
    if (!activePaymentMethod.wallet_method) {
      toast.error('Please select a payment method!');
      return;
    }
  
    if (!transactionId) {
      toast.error('Please fill in the transaction ID!');
      return;
    }
  
    if (!bKashNumber) {
      toast.error('Please fill in your send number!');
      return;
    }
    setIsDisabled(true);
    try {
      const sendAmountInBDT = calculateBDT(selectedAmount);
      const postData = {
        posttype: 'deposit_now',
        user_id: session.user.user_id,
        agent_id: activePaymentMethod.user_id,
        selected_method: activePaymentMethod.wallet_method,
        wallet_type: activePaymentMethod.wallet_type,
        send_amount: deposit_amount, // Assuming you meant selectedAmount instead of deposit_amount
        agent_wallet: activePaymentMethod.agent_wallet,
        send_amount_in_bdt: deposit_amount, // Use calculated BDT value
        sender_number: bKashNumber,
        trxid: transactionId
      };
  
      const response = await axios.post(`${api_path}/deposit/deposit`, postData);
      toast.success('Successfully sent deposit request. Please wait for approval.');
      router.push("/deposit-list");
      setIsDisabled(false);
    } catch (error) {
      //console.error('Error depositing:', error);

      // Extract error message from the server response if available
      const errorMessage = error.response?.data?.error || 'An error occurred while processing your deposit. Please try again.';
      toast.error(errorMessage);
      setIsDisabled(false);
    }
  };
  
useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const depositMethodsResponse = await axios.get(`${api_path}/deposit/deposit?depositMethod=true&agent_id=${session.user.agent_id}`, {
          next: { revalidate: 3600 }, 
        });
         setDepositMethods(depositMethodsResponse.data);

        // Fetch exchange rate
        const exchangeRate = await fetchExchangeRate();
        setExchangeRate(exchangeRate);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
                                  <div className="pay_method__paymethod p-6 p-lg-6 p2-bg rounded-8">
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

                              {depositMethods.length > 0 && ( 
                                      <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                          <div style={{
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                              padding: '5px 10px',
                                              border: '2px solid #080F25',
                                              width:'100%',
                                          }}>
                                              <span style={{ color: 'white', fontWeight: '900' }}> Deposit  </span>
                                              <span style={{ color: 'white', fontWeight: '900' }}> <Link   style={{ textAlign: 'right', float:'right' }} href="/withdraw"  className="py-2 px-3  p1-color  y2-bg  rounded-2 ">Withdraw</Link></span>
                                          </div>
                                 {                                     
                                      /* <div className="pay_method__paymethod-title d-flex align-items-center gap-3 mb-6 mb-md-8">
                                          <i className="ti ti-credit-card fs-four g1-color"></i>
                                          <h5 className="n10-color">Payment methods</h5>
                                        </div> */}

<div className="pay_method__paymethod-alitem mt-1">
  <div className="row gx-2 gy-2"> {/* Reduced gutter spacing */}
    {depositMethods.map((paymentMethod) => (
      <div
        className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 col-xxl-2"
        key={paymentMethod._id} style={{width:"100%", }}
      >
        <div
          onClick={() => setActivePaymentMethod(paymentMethod)}
          style={{
            ...getItemStyle(paymentMethod, 'paymentMethod'),
            padding: '10px', // Reduced padding
          }}
          className="pay_method__paymethod-item pay-methods p-1 rounded-3 cpoint"
        >
          {paymentMethod.wallet_method === 'bKash' && (
            <Image
              src="/images/mbank/bkash.png"
              height={50} // Smaller height
              width={50} // Smaller width
              alt={paymentMethod.wallet_method}
            />
          )}
          {paymentMethod.wallet_method === 'Nagad' && (
            <Image
              src="/images/mbank/nagad_wallet.png"
              height={50}
              width={50}
              alt={paymentMethod.wallet_method}
            />
          )}
          {paymentMethod.wallet_method === 'Rocket' && (
            <Image
              src="/images/mbank/rockets.png"
              height={50}
              width={50}
              alt={paymentMethod.wallet_method}
            />
          )}
          <div className="text-center mt-2" style={{ fontSize: '12px' }}> {/* Reduced font size */}
            <span style={{ color: '#2EAF21' }}> &nbsp; {paymentMethod.wallet_method} &nbsp; </span>
            {paymentMethod.wallet_type}
            <span style={{ color: '#FAE906', fontWeight: '700' }}> &nbsp; {paymentMethod.agent_wallet} &nbsp;</span>
            <button
              onClick={() => handleCopyMobileNumber(paymentMethod.agent_wallet)}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px',
              }}
            >
              <Image
                src="/images/copy_button.png"
                height={12} // Reduced height
                width={12} // Reduced width
                alt="copy number"
              />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

                                      </div>
                                    )}

                                  <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                      <div className="pay_method__paymethod-title mb-5 mb-md-6">
                                          <h5 className="n10-color">Choose Deposit Amount</h5>
                                      </div>
                                      <div  className="pay_method__paymethod-items d-flex align-items-center gap-4 gap-sm-5 gap-md-6">
                                         {amountData.map((singleData) => (
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
                                      {/* <div className="pay_method__paymethod-title pt-5 mb-5 mb-md-6">
                                              <h5 className="n10-color">Deposit Details</h5>
                                      </div> */}
                                      <div className="pay_method__formarea pt-5">
                                          <form onSubmit={handleDeposit}>
                                              <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                           
                                              
                                                <div className="d-flex w-100 p1-bg rounded-8 ">
                                                      <input
                                                          type="text"
                                                          name="deposit_amount"
                                                          placeholder="৳"
                                                          value={deposit_amount}
                                                          onChange={(e) => setdeposit_amount(e.target.value)}
                                                      />
                                                  </div>
                                                
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '5px 10px',
                                                    width:'100%',
                                                }}>
                                                    <span style={{ color: 'white', fontWeight: '900' }}> Phone Number  </span>
                                                </div>
                                                  <div className="d-flex w-100 p1-bg rounded-8">
                                                      <input
                                                          type="text"
                                                          name="sender_number"
                                                          placeholder="01XXXXXXXXXX"
                                                          value={bKashNumber}
                                                          onChange={(e) => setBKashNumber(e.target.value)}
                                                      />
                                                  </div>






                                                  {/* <span style={{ color: 'white', fontWeight: '900' }}> Transaction ScreenShot  </span>
                                                  <div style={{    border: "2px solid gray",borderRadius: "px",marginBottom: "2px",padding: "2px",width: "100%", backgroundColor:"white",}} >
                                                  <input type="file" class="fileInput" accept="image/png, image/jiffy, image/jpeg, image/jpg" id="depositReceipt" name="depositReceipt"></input>
</div> */}

                                          
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'space-between',
                                                      alignItems: 'center',
                                                      padding: '5px 10px',
                                                      width:'100%',
                                                  }}>
                                                      <span style={{ color: 'white', fontWeight: '900' }}> Transaction ID  </span>
                                                  </div>
                                                  <div className="d-flex w-100 p1-bg rounded-8">
                                                      <input
                                                          type="text"
                                                          name="trxid"
                                                          placeholder=" Transaction ID"
                                                          value={transactionId}
                                                          onChange={(e) => setTransactionId(e.target.value)}
                                                      />
                                                  </div>

                                                  
                                              </div>

                                              
                                              
                                              {/* <div className="d-flex align-items-center justify-content-between mb-7 mb-md-10">
                                                  <span>Total</span>
                                                  <span>{selectedAmount} TK</span>
                                              </div> 
                                               {exchangeRate && (
                                                  <div className="d-flex align-items-center justify-content-between mb-7 mb-md-10">
                                                      <span>Total (BDT)</span>
                                                      <span>BDT {calculateBDT(selectedAmount)} TK</span>
                                                  </div>
                                              )}  */}
                                               
                                              

                                              <button type="submit"  className="py-2 px-3 p1-color  y2-bg  rounded-2 w-100" disabled={isDisabled}>
                                               {isDisabled ? 'Processing...' : 'Deposit'}
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
