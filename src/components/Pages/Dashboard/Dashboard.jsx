"use client";
import React, { useState, useEffect } from "react";
import {
  IconUsers,
  IconPackage,
  IconWallet,
  IconPointerDollar,
  IconCreditCard,
  IconCreditCardOff,
  IconLogout,
  IconUser,
  IconCopy,
  IconSettings,
  IconBellRinging,
  IconHistory,
} from "@tabler/icons-react";
import { paymentMehotdData, amountData } from "@/../public/data/dashBoard";
import DepositCard from "./DepositCard";
import DepositAmount from "./DepositAmount";
import { Tab } from "@headlessui/react";
import WithdrawalAmount from "./WithdrawalAmount";
import Link from "next/link";
import { dashboardTabs } from "@/../public/data/dashTabs";
import {
  profileUpdate,
  passwordUpdate,
  tppasswordUpdate,
  handleLogout,
} from "@/lib/action";
import { api_path } from "../../../lib/api_path";
import styles from "../../Pages/CreateAcount/regform_style.module.css";
import { useFormState } from "react-dom";
import axios from "axios";
import Image from "next/image";
import { fetchExchangeRate } from "../Deposit/FetchExchangeRate";
import { Toaster, toast } from "react-hot-toast";
import { imagesData } from "@/../public/data/dashBoard";
import { useRouter } from "next/navigation";


export default function Dashboard({ session }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState(dashboardTabs[0]);
  const router = useRouter();
  const [userDetails, setuserDetails] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          `${api_path}/user_info/${session.user.id}`,
          {
            next: { revalidate: 3600 }, // Set revalidation for 1 hour
          }
        );

        const data = await response.json();
        setuserDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (session.user.id) {
      // Check if user ID is available before fetching
      fetchInitialData();
    }
  }, [session.user.id]);

  const refLink = `https://bettclub.com/create-acount?s=${userDetails.user_id}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink).then(() => {
      alert("Referral link copied to clipboard!");
    });
  };

  return (
    <>
      <section className="pay_method pb-120">
        <Toaster />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div style={{ margin: "85px 0 0 0" }}>
                <div class="mt-1">
                  <div className="tabcontents pb-3">
                    <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div style={{ textAlign: "left", width: "50%" }}>
                            USER ID :
                          </div>
                          <div style={{ textAlign: "right", width: "50%" }}>
                            {loading ? (
                              <h5>..</h5>
                            ) : (
                              <h5>{userDetails.user_id}</h5>
                            )}
                          </div>
                        </div> */}
                        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center", // Ensures vertical alignment
  }}
>
  {/* Left Side: Image and Label */}
  <div
    style={{
      textAlign: "left",
      width: "50%",
      display: "flex",
      alignItems: "center",
      gap: "10px", // Space between image and text
    }}
  >
    <img
      src="https://api.casinoxy.com/ico/imagewfcd02.png" // Replace with your image URL
      alt="User Icon"
      style={{ width: "90px", height: "90px" }} // Adjust size as needed
    />
    <span>USER:</span>
  </div>

  {/* Right Side: User ID */}
  <div style={{ textAlign: "right", width: "50%" }}>
    {loading ? <h5>..</h5> : <h5 style={{color:"#FF8A14"}}>{userDetails.user_id}</h5>}
  </div>
</div>

                      </div>
                    </div>
                  </div>

                  <div className="tabcontents pb-3">
                    <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div style={{ textAlign: "left", width: "50%" }}>
                            {" "}
                            Main Wallet :
                          </div>
                          <div style={{ textAlign: "right", width: "50%", }}>
                            {loading ? (
                              <h5>..</h5>
                            ) : (
                              <h5 style={{color:"#FF8A14"}}>৳ {userDetails.currency.toFixed(2)}</h5>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tabcontents pb-3">
                    <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div style={{ textAlign: "left", width: "50%" }}>
                            Referral Link :
                          </div>
                          <div style={{ textAlign: "right", width: "50%" }}>
                            {loading ? (
                              <h5>..</h5>
                            ) : (
                              <div>
                                <input
                                  type="hidden"
                                  readOnly
                                  value={`https://bettclub.com/create-acount?s=${userDetails.user_id}`}
                                  className="form-control me-2"
                                />
                                <IconCopy
                                  onClick={copyToClipboard}
                                  style={{ fontSize: "30px", color: "#FF8A14"}}
                                  className="ti ti-user fs-five n5-color"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tabcontents pb-3  text-center">
                    <div className="pay_method__paymethod p-2 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">





                      <div
  style={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#292927", // Adjust to match your dark background
    padding: "5px",
  }}
>
  {/* Vertical Line */}
  <div
    style={{
      width: "4px",
      height: "100%",
      backgroundColor: "red",
      marginRight: "2px", // Spacing between the line and text
    }}
  ></div>

  {/* Text */}
  <span style={{ color: "#FF8A14", fontSize: "16px" }}>| Funds</span>
</div>








                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <div className="col-3 col-md-2 mb-3">
  <Link href="/deposit">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd03.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Deposit</p>
  </Link>
</div>


                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/withdraw">
                              <div class="icon-container">
                                <IconPointerDollar className="ti ti-credit-card fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Withdraw</p>
                            </Link>
                          </div> */}

<div className="col-3 col-md-2 mb-3">
  <Link href="/withdraw">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd04.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Withdraw</p>
  </Link>
</div>


                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/deposit-list">
                              <div class="icon-container">
                                <IconHistory className="ti ti-history fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Deposit History</p>
                            </Link>
                          </div> */}










                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/withdraw-list">
                              <div class="icon-container">
                                <IconCreditCardOff className="ti ti-credit-card-off fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Withdraw History</p>
                            </Link>
                          </div> */}



                        </div>
                      </div>
                    </div>
                  </div>







                  <div className="tabcontents pb-3  text-center">
                    <div className="pay_method__paymethod p-2 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">


                        
                      <div
  style={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#292927", // Adjust to match your dark background
    padding: "5px",
  }}
>
  {/* Vertical Line */}
  <div
    style={{
      width: "4px",
      height: "100%",
      backgroundColor: "red",
      marginRight: "2px", // Spacing between the line and text
    }}
  ></div>

  {/* Text */}
  <span style={{ color: "#FF8A14", fontSize: "16px" }}>| History</span>
</div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                         <div className="col-3 col-md-2 mb-3">
  <Link href="/deposit-list">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd07.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Deposit History</p>
  </Link>
</div>
<div className="col-3 col-md-2 mb-3">
  <Link href="/withdraw-list">
    <div className="icon-container">

      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd07.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Withdraw History</p>
  </Link>
</div>
                          
<div className="col-3 col-md-2 mb-3">
  <Link href="/bet-list">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd07.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Bet History</p>
  </Link>
</div>

                         
                        </div>
                      </div>
                    </div>
                  </div>






















                  <div className="tabcontents pb-3  text-center">
                    <div className="pay_method__paymethod p-2 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">


                      <div
  style={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#292927", // Adjust to match your dark background
    padding: "5px",
  }}
>
  {/* Vertical Line */}
  <div
    style={{
      width: "4px",
      height: "100%",
      backgroundColor: "red",
      marginRight: "2px", // Spacing between the line and text
    }}
  ></div>

  {/* Text */}
  <span style={{ color: "#FF8A14", fontSize: "16px" }}>| Profile</span>
</div>



                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/bet-list">
                              <div class="icon-container">
                                <IconHistory className="ti ti-history fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Bet History</p>
                            </Link>
                          </div> */}











                          

                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/turn-over">
                              <div class="icon-container">
                                <IconHistory className="ti ti-history fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Turn Over</p>
                            </Link>
                          </div> */}


<div className="col-3 col-md-2 mb-3">
  <Link href="/turn-over">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd05.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Turn Over</p>
  </Link>
</div>














<div className="col-3 col-md-2 mb-3">
  <Link href="/profile">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd08.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Profile</p>
  </Link>
</div>




{/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/password-update">
                              <div class="icon-container">
                                <IconSettings className="ti ti-settings fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Password Update</p>
                            </Link>
                          </div> */}






<div className="col-3 col-md-2 mb-3">
  <Link href="/password-update">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd09.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Password Update</p>
  </Link>
</div>



                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/deposit">
                              <div class="icon-container">
                                <IconUsers className="ti ti-dollar fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Referral</p>
                            </Link>
                          </div> */}

















                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/deposit">
                              <div class="icon-container">
                                <IconPackage className="ti ti-dollar fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Claim Voucher</p>
                            </Link>
                          </div> */}
















                          
                        </div>
                      </div>
                    </div>
                  </div>






                  <div className="tabcontents pb-3  text-center">
                    <div className="pay_method__paymethod p-2 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">



                      <div
  style={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#292927", // Adjust to match your dark background
    padding: "5px",
  }}
>
  {/* Vertical Line */}
  <div
    style={{
      width: "4px",
      height: "100%",
      backgroundColor: "red",
      marginRight: "2px", // Spacing between the line and text
    }}
  ></div>

  {/* Text */}
  <span style={{ color: "#FF8A14", fontSize: "16px" }}>| Contact Us</span>
</div>




                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/dashboard">
                              <div class="icon-container">
                                <IconUser className="ti ti-user fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Dashboard</p>
                            </Link>
                          </div> */}
                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/profile">
                              <div class="icon-container">
                                <IconUser className="ti ti-user fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Profile</p>
                            </Link>
                          </div> */}




<div className="col-3 col-md-2 mb-3">
  <Link href="#">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd12.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Whatsapp</p>
  </Link>
</div>
<div className="col-3 col-md-2 mb-3">
  <Link href="#">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd13.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Facebook</p>
  </Link>
</div>

<div className="col-3 col-md-2 mb-3">
  <Link href="#">
    <div className="icon-container">
      {/* <IconCreditCard className="ti ti-credit-card fs-five n5-color" /> */}
      <Image 
        src="https://api.casinoxy.com/ico/imagewfcd14.png" 
        alt="Deposit Icon"
        width={50}
        height={100} 
      />
    </div>
    <p className="mb-0 b-black">Email</p>
  </Link>
</div>






                         

                          
                        </div>
                      </div>
                    </div>
                  </div>











                  <div className="tabcontents pb-3  text-center">
                    <div className="pay_method__paymethod p-2 p-lg-6 p2-bg rounded-8">
                      <div className="pay_method__formarea">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/dashboard">
                              <div class="icon-container">
                                <IconUser className="ti ti-user fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Dashboard</p>
                            </Link>
                          </div> */}
                          {/* <div class="col-3 col-md-2 mb-3">
                            <Link href="/profile">
                              <div class="icon-container">
                                <IconUser className="ti ti-user fs-five n5-color" />
                              </div>
                              <p class="mb-0 b-black">Profile</p>
                            </Link>
                          </div> */}











                         

                          <div class="col-3 col-md-2 mb-3">
                            <form action={handleLogout}>
                              {" "}
                              <br></br>
                              <IconLogout className="ti ti-logout fs-five n5-color" />
                              <button>
                                {" "}
                                <span className="tablink d-flex align-items-center gap-2 outstles">
                                  Log Out
                                </span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                                <div className="pay_method__paymethod-title mb-5 mb-md-6">
                                    <h5 className="n10-color">User Dashboard</h5>
                                </div>
                                <div className="pay_method__formarea">
                                        <div style={{fontWeight:'900', color:'#35C31E'}} className="d-flex align-items-center justify-content-between ">
                                            User Balance : ৳ {userDetails.currency}   
                                        </div>

                                        <div
                                            className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                            <div className="d-flex w-100 p1-bg ps-3 rounded-8"  style={{ padding:'10px'}}>
                                                User ID : {userDetails.user_id}
                                            </div>
                                            <div className="d-flex w-100 p1-bg rounded-8"  style={{ padding:'10px'}}>
                                                Email : {userDetails.email}
                                            </div>
                                        </div>
                                            <div
                                            className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                            <div className="d-flex w-100 p1-bg ps-3 rounded-8"  style={{ padding:'10px'}}>
                                                Full Name :    {userDetails.first_name}  {userDetails.last_name}
                                            </div>
                                            <div className="d-flex w-100 p1-bg rounded-8"  style={{ padding:'10px'}}>
                                                Mobile :    {userDetails.mobile}
                                            </div>
                                        </div>

                                        <div
                                            className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                                <div className="d-flex w-100 p1-bg ps-3 rounded-8"  style={{ padding:'10px'}}>
                                                    City :  {userDetails.city}
                                            </div>
                                            <div className="d-flex w-100 p1-bg ps-3 rounded-8"  style={{ padding:'10px'}}>
                                                <div className="d-flex  p1-bg rounded-8 w-50">
                                                    State :    {userDetails.state}
                                                </div>
                                                <div className="d-flex p1-bg rounded-8 w-50">
                                                Zip :    {userDetails.zip}
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                                 */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
