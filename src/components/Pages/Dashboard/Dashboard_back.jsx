"use client";
import React, { useState, useEffect } from "react";
import {
  IconWallet,
  IconCreditCard,
  IconCreditCardOff,
  IconLogout,
  IconUser,
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
  const [userDetails, setuserDetails] = useState("");
  const [depositReport, setDepositReport] = useState("");
  const [witdrawReport, setWitdrawReport] = useState("");
  const [state, profileUpdateAction] = useFormState(profileUpdate, undefined);
  const [passwordUpdates, passwordUpdateAction] = useFormState(
    passwordUpdate,
    undefined
  );
  const [tppasswordUpdates, tppasswordUpdateAction] = useFormState(
    tppasswordUpdate,
    undefined
  );

  const [showPassword, setShowPassword] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState(""); // Withdraw amount state
  const [chargedAmount, setChargedAmount] = useState(""); // Withdraw amount state
  const [convertedAmount, setConvertedAmount] = useState(null); // Converted amount state

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    async function fetchRate() {
      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
    }
    fetchRate();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          `${api_path}/user_info/${session.user.id}`,
          {
            next: { revalidate: 3600 }, // Set revalidation for 1 hour
          }
        );

        // setuserDetails(response.data);
        const data = await response.json();
        setuserDetails(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., display error message)
      }
    };

    if (session.user.id) {
      // Check if user ID is available before fetching
      fetchInitialData();
    }
  }, [session.user.id]);

  useEffect(() => {
    const fetchDepositReport = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api_path}/deposit/deposit?report=true&user_id=${session.user.user_id}`,
          {
            next: { revalidate: 3600 }, // Cache revalidation in seconds
          }
        );
        const data = await response.data;
        setDepositReport(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sportsbook data:", error);
      } finally {
        setIsLoading(false); // Always hide loader after fetching (success or error)
      }
    };

    fetchDepositReport();
  }, []);

  useEffect(() => {
    const fetchDepositReport = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api_path}/withdraw/withdraw?report=true&user_id=${session.user.user_id}`,
          {
            next: { revalidate: 3600 }, // Cache revalidation in seconds
          }
        );
        const data = await response.data;
        setWitdrawReport(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sportsbook data:", error);
      } finally {
        setIsLoading(false); // Always hide loader after fetching (success or error)
      }
    };

    fetchDepositReport();
  }, []);

  const handleClick = (itemName) => {
    setActiveItem(itemName);
  };

  // const getItemStyle = (itemName) => {
  //     return {
  //         backgroundColor: activeItem === itemName ? '#0F1B42' : '',
  //     };
  // };

  const [imageActiveItem, setActiveimageItem] = useState(paymentMehotdData[0]);

  const handleImageClick = (itemName) => {
    setActiveimageItem(itemName);
  };
  const getImageItemStyle = (itemName) => {
    return {
      border: `1px solid ${
        imageActiveItem === itemName ? "#35C31E" : "#2C3655"
      }`,
    };
  };

  const [agentData, setAgentData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api_path}/chat/broadcast?allAgentList=true`,
          {
            next: { revalidate: 3600 },
          }
        );
        setAgentData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleWithdrawAmountChange = (e) => {
    const amount = e.target.value;
    setWithdrawAmount(amount);

    const after_charge = amount - (amount * 0) / 100;
    setChargedAmount(after_charge);

    if (exchangeRate) {
      const converted = (after_charge * exchangeRate).toFixed(2);
      setConvertedAmount(converted);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    new FormData(e.target);

    setIsLoading(true);
    const formData = {
      posttype: "withdraw_now",
      user_id: session.user.user_id,
      agent_id: session.user.agent_id,
      WithdrawMethod: imageActiveItem.alt,
      mobile_no: e.target.mobile_no.value,
      trans_pass: e.target.trans_pass.value,
      withdraw_amount: withdrawAmount,
      chargedAmount: chargedAmount,
      net_withdraw_amount: convertedAmount,
    };

    try {
      const response = await axios.post(
        `${api_path}/withdraw/withdraw`,
        formData
      );
      if (response.data) {
        toast.success(response.data.message);
        e.target.reset();
      } else {
        toast.error("Something went wrong please try again...");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();
  const [activePaymentMethod, setActivePaymentMethod] = useState(imagesData[0]);
  const [selectedAmount, setSelectedAmount] = useState(amountData[0].amount);
  const [bKashNumber, setBKashNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [depositMethods, setDepositMethods] = useState([]); // State to store fetched methods

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
    setSelectedAmount(amount);
  };

  const getItemStyle = (item, type) => {
    if (type === "paymentMethod") {
      return {
        border: `2px solid ${
          activePaymentMethod === item ? "#FF8A14" : "#2C3655"
        }`,
      };
    } else if (type === "depositAmount") {
      return {
        border: `2px solid ${selectedAmount === item ? "#FF8A14" : "#2C3655"}`,
      };
    }
  };

  const handleCopyMobileNumber = () => {
    navigator.clipboard
      .writeText(activePaymentMethod.agent_wallet)
      .then(() => alert("Mobile number copied to clipboard"))
      .catch((error) => console.error("Error copying mobile number:", error));
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!selectedAmount) {
      alert("Please select Amount!");
      return;
    }

    if (!activePaymentMethod.wallet_method) {
      alert("Payment method required !");
      return;
    }

    if (!transactionId) {
      alert("Please fill in transaction id fields!");
      return;
    }
    if (!bKashNumber) {
      alert("Please  fill your send number");
      return;
    }

    try {
      const sendAmountInBDT = calculateBDT(selectedAmount);
      const postData = {
        posttype: "deposit_now",
        user_id: session.user.user_id,
        agent_id: activePaymentMethod.user_id,
        selected_method: activePaymentMethod.wallet_method,
        wallet_type: activePaymentMethod.wallet_type,
        send_amount: selectedAmount,
        agent_wallet: activePaymentMethod.agent_wallet,
        send_amount_in_bdt: selectedAmount,
        sender_number: bKashNumber,
        trxid: transactionId,
      };
      const response = await axios.post(
        `${api_path}/deposit/deposit`,
        postData
      );
      console.log(response.data); // You can handle success response here
      alert("Successfully deposit request sent.Please Wait for apporval..");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error depositing:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const depositMethodsResponse = await axios.get(
          `${api_path}/deposit/deposit?depositMethod=true&agent_id=${session.user.agent_id}`,
          {
            next: { revalidate: 3600 },
          }
        );
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

  const [gameData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page) => {
    setIsLoading(true);
    const response = await axios.get(
      `${api_path}/bet/bets?bettingHistory=true&&player_id=${session.user.id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    const newData = response.data;
    setData((prevData) => [...prevData, ...newData]);
    setCurrentPage(page);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  // Function to format the date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const timeString = date.toLocaleString("en-US", options);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${timeString.toLowerCase()} ${day}/${month}/${year}`;
  };

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
            <div className="col-12 gx-0 gx-sm-4">
              <div className="" style={{ margin: "105px 0 0 0" }}>
                <Tab.Group>
                  <div className="row gy-6 gy-xxl-0 singletab">
                    <div className="col-xxl-3">
                      <div className="pay_method__scrol">
                        <Tab.List className="tablinks pay_method__scrollbar p2-bg p-1 p-md-1 rounded-4 d-flex align-items-center justify-content-center flex-xxl-column gap-3 gap-xxl-2">
                          {dashboardTabs.map((singleTabs) => (
                            <Tab
                              onClick={() => handleClick(singleTabs)}
                              style={getItemStyle(singleTabs)}
                              className="nav-links p-3 rounded-3 cpoint d-inline-block outstles"
                              key={singleTabs.id}
                            >
                              <span className="tablink d-flex align-items-center gap-2 outstles">
                                {singleTabs.icon}
                                {singleTabs.tabname}
                              </span>
                            </Tab>
                          ))}

                          <form action={handleLogout}>
                            <button>
                              {" "}
                              <span className="tablink d-flex align-items-center gap-2 outstles">
                                <IconLogout className="ti ti-logout fs-five n5-color" />
                                Log Out
                              </span>
                            </button>
                          </form>
                        </Tab.List>
                      </div>
                    </div>
                    <div className="col-xxl-9">
                      <Tab.Panels className="tabcontents">
                        <Tab.Panel>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                            <div className="pay_method__paymethod-title mb-5 mb-md-6">
                              <h5 className="n10-color">User Dashboard</h5>
                            </div>
                            <div className="pay_method__formarea">
                              <div
                                style={{ fontWeight: "900", color: "#35C31E" }}
                                className="d-flex align-items-center justify-content-between "
                              >
                                User Balance : ৳ {userDetails.currency}
                              </div>

                              <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                <div
                                  className="d-flex w-100 p1-bg ps-3 rounded-8"
                                  style={{ padding: "10px" }}
                                >
                                  User ID : {userDetails.user_id}
                                </div>
                                <div
                                  className="d-flex w-100 p1-bg rounded-8"
                                  style={{ padding: "10px" }}
                                >
                                  Email : {userDetails.email}
                                </div>
                              </div>
                              <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                <div
                                  className="d-flex w-100 p1-bg ps-3 rounded-8"
                                  style={{ padding: "10px" }}
                                >
                                  Full Name : {userDetails.first_name}{" "}
                                  {userDetails.last_name}
                                </div>
                                <div
                                  className="d-flex w-100 p1-bg rounded-8"
                                  style={{ padding: "10px" }}
                                >
                                  Mobile : {userDetails.mobile}
                                </div>
                              </div>

                              <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                <div
                                  className="d-flex w-100 p1-bg ps-3 rounded-8"
                                  style={{ padding: "10px" }}
                                >
                                  City : {userDetails.city}
                                </div>
                                <div
                                  className="d-flex w-100 p1-bg ps-3 rounded-8"
                                  style={{ padding: "10px" }}
                                >
                                  <div className="d-flex  p1-bg rounded-8 w-50">
                                    State : {userDetails.state}
                                  </div>
                                  <div className="d-flex p1-bg rounded-8 w-50">
                                    Zip : {userDetails.zip}
                                  </div>
                                </div>
                              </div>

                              <div
                                style={{ fontWeight: "900", color: "#35C31E" }}
                                className="d-flex align-items-center justify-content-between mb-3"
                              >
                                Referral Link:
                                <div className="d-flex align-items-center">
                                  <input
                                    type="text"
                                    readOnly
                                    value={`https://bettclub.com/create-acount?s=${userDetails.user_id}`}
                                    className="form-control me-2"
                                    style={{ backgroundColor: "white" }}
                                  />
                                  <button
                                    onClick={copyToClipboard}
                                    className="btn btn-success"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          {depositMethods.length > 0 && ( // Render only if methods are fetched
                            <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                              <div className="pay_method__paymethod-title d-flex align-items-center gap-3 mb-6 mb-md-8">
                                <i className="ti ti-credit-card fs-four g1-color"></i>
                                <h5 className="n10-color">Payment methods</h5>
                              </div>
                              <div className="pay_method__paymethod-alitem">
                                <div className="row gx-4 gy-4">
                                  {depositMethods.map((paymentMethod) => (
                                    <div
                                      className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 col-xxl-2"
                                      key={paymentMethod._id}
                                    >
                                      <div
                                        onClick={() =>
                                          setActivePaymentMethod(paymentMethod)
                                        }
                                        style={getItemStyle(
                                          paymentMethod,
                                          "paymentMethod"
                                        )}
                                        className="pay_method__paymethod-item pay-methods p-2 rounded-3 cpoint"
                                      >
                                        {paymentMethod.wallet_method ===
                                          "bKash" && (
                                          <Image
                                            src="/images/mbank/bkash.png"
                                            height={70}
                                            width={172}
                                            alt={paymentMethod.wallet_method}
                                          />
                                        )}
                                        {paymentMethod.wallet_method ===
                                          "Nagad" && (
                                          <Image
                                            src="/images/mbank/nagad_wallet.png"
                                            height={70}
                                            width={172}
                                            alt={paymentMethod.wallet_method}
                                          />
                                        )}
                                        {paymentMethod.wallet_method ===
                                          "Rocket" && (
                                          <Image
                                            src="/images/mbank/rockets.png"
                                            height={70}
                                            width={172}
                                            alt={paymentMethod.wallet_method}
                                          />
                                        )}
                                        <div className="text-center mt-3">
                                          {" "}
                                          {/* New separate element */}
                                          Cashout balance to this
                                          <br />
                                          <span style={{ color: "#2EAF21" }}>
                                            {" "}
                                            &nbsp; {
                                              paymentMethod.wallet_method
                                            }{" "}
                                            &nbsp;{" "}
                                          </span>
                                          {paymentMethod.wallet_type}
                                          <span style={{ color: "red" }}>
                                            {" "}
                                            &nbsp; {
                                              paymentMethod.agent_wallet
                                            }{" "}
                                            &nbsp;
                                          </span>
                                          <button
                                            onClick={handleCopyMobileNumber}
                                          >
                                            <Image
                                              src="/images/copy_button.png"
                                              height={16}
                                              width={16}
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
                              <h5 className="n10-color">
                                Choose Deposit Amount
                              </h5>
                            </div>
                            <div className="pay_method__paymethod-items d-flex align-items-center gap-4 gap-sm-5 gap-md-6">
                              {amountData.map((singleData) => (
                                <div
                                  onClick={() =>
                                    handleAmountClick(singleData.amount)
                                  }
                                  style={getItemStyle(
                                    singleData.amount,
                                    "depositAmount"
                                  )}
                                  className={`pay_method__paymethod-item ${
                                    selectedAmount === singleData.amount
                                      ? "amount-active"
                                      : ""
                                  } p-2 rounded-3 cpoint`}
                                  key={singleData.id}
                                >
                                  <div className="py-3 px-5 px-md-6 n11-bg rounded-3">
                                    <span className="fs-ten fw-bold mb-2">
                                      {singleData.amount}
                                    </span>
                                    <span className="fs-seven d-block">
                                      {singleData.bonus}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="pay_method__paymethod-title pt-5 mb-5 mb-md-6">
                              <h5 className="n10-color">
                                Enter your payment details
                              </h5>
                            </div>
                            <div className="pay_method__formarea">
                              <form onSubmit={handleDeposit}>
                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                  <div className="d-flex w-100 p1-bg rounded-8">
                                    <input
                                      type="text"
                                      name="sender_number"
                                      placeholder="Enter Your Wallet Number"
                                      value={bKashNumber}
                                      onChange={(e) =>
                                        setBKashNumber(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="d-flex w-100 p1-bg rounded-8">
                                    <input
                                      type="text"
                                      name="trxid"
                                      placeholder="Enter Transaction ID"
                                      value={transactionId}
                                      onChange={(e) =>
                                        setTransactionId(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-7 mb-md-10">
                                  <span>Total</span>
                                  <span>{selectedAmount} TK</span>
                                </div>

                                {/* {exchangeRate && (
                                                                        <div className="d-flex align-items-center justify-content-between mb-7 mb-md-10">
                                                                            <span>Total (BDT)</span>
                                                                            <span>BDT {calculateBDT(selectedAmount)} TK</span>
                                                                        </div>
                                                                    )}
                                                                     */}
                                <button
                                  type="submit"
                                  className="py-2 px-5  g1-bg  rounded-2 w-100"
                                >
                                  Deposit
                                </button>
                              </form>
                            </div>
                          </div>
                        </Tab.Panel>

                        <Tab.Panel>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8 mb-8 mb-md-10">
                            <div className="pay_method__paymethod-title d-flex align-items-center gap-3 mb-6 mb-md-8">
                              <i className="ti ti-credit-card fs-four g1-color"></i>
                              <h5 className="n10-color">Withdraw</h5>
                            </div>
                            <div className="pay_method__paymethod-alitem">
                              <div className="row gx-4 gy-4">
                                {paymentMehotdData.map((imagpaymentMehotd) => (
                                  <div
                                    className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 col-xxl-2"
                                    key={imagpaymentMehotd.id}
                                  >
                                    <div
                                      onClick={() =>
                                        handleImageClick(imagpaymentMehotd)
                                      }
                                      style={getImageItemStyle(
                                        imagpaymentMehotd
                                      )}
                                      className="pay_method__paymethod-item pay-methods p-2 rounded-3 cpoint"
                                    >
                                      <Image
                                        src={imagpaymentMehotd.src}
                                        height={70}
                                        width={172}
                                        alt={imagpaymentMehotd.alt}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                            <div className="pay_method__paymethod-title mb-5 mb-md-6">
                              <h5
                                className="n10-color"
                                style={{ color: "#35C31E" }}
                              >
                                {" "}
                                Current Balance: {userDetails.currency} TK
                              </h5>
                            </div>

                            <div className="pay_method__paymethod p-4 p-lg-2 p2-bg rounded-8">
                              <div className="pay_method__formarea">
                                <form onSubmit={handleSubmit}>
                                  <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                    <div className="d-flex p1-bg rounded-8 w-100">
                                      <input
                                        type="text"
                                        name="mobile_no"
                                        value=""
                                        placeholder="Your Withdraw Receiver Number"
                                      />
                                    </div>
                                    <div className="d-flex align-items-center gap-6 w-100">
                                      <div className="d-flex  p1-bg rounded-8 w-50">
                                        <input
                                          type="text"
                                          name="withdraw_amount"
                                          placeholder="Withdraw Amount"
                                          value={withdrawAmount}
                                          onChange={handleWithdrawAmountChange}
                                        />
                                      </div>
                                      <div className="d-flex p1-bg rounded-8 w-50">
                                        <input
                                          type="password"
                                          name="trans_pass"
                                          placeholder="Transaction Password"
                                        />
                                      </div>
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
                                                                )} */}
                                  <button
                                    type="submit"
                                    className="py-2 px-5 g1-bg rounded-2 w-100"
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Processing..." : "Withdraw"}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__table">
                            <h4>Withdraw History</h4>
                            <div
                              style={{ overflowX: "auto" }}
                              className="pay_method__table-scrollbar"
                            >
                              <table className="w-100 text-center p2-bg">
                                <tr>
                                  <th className="text-nowrap">
                                    Transaction ID
                                  </th>
                                  <th className="text-nowrap">Date</th>
                                  <th className="text-nowrap">Method type</th>
                                  <th className="text-nowrap">Amount </th>
                                  <th className="text-nowrap">Amount </th>
                                  <th className="text-nowrap">Amount BDT</th>
                                  <th className="text-nowrap">From</th>
                                  <th className="text-nowrap">Agent ID</th>
                                  <th className="text-nowrap">Status</th>
                                </tr>

                                {witdrawReport.length > 0 ? (
                                  witdrawReport.map((deposit, index) => (
                                    <tr key={index}>
                                      <td className="text-nowrap">
                                        {deposit.trxid}
                                      </td>
                                      <td className="text-nowrap">
                                        {formatDate(deposit.createdAt)}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.selected_method}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.withdraw_amount}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.chargedAmount}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.withdraw_amount_in_bdt}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.sender_number}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.agent_id}
                                      </td>
                                      <td
                                        className={`text-nowrap ${
                                          deposit.status === "Pending"
                                            ? "r1-color"
                                            : "g1-color"
                                        } fw-normal cpoint`}
                                      >
                                        {deposit.status}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="5">Nohing found..</td>{" "}
                                    {/* Adjust colspan based on the number of data columns */}
                                  </tr>
                                )}
                              </table>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__tabletwo">
                            <h4>Deposit History</h4>
                            <div
                              style={{ overflowX: "auto" }}
                              className="pay_method__table-scrollbar"
                            >
                              <table className="w-100 text-center p2-bg">
                                <tr>
                                  <th className="text-nowrap">
                                    Transaction ID
                                  </th>
                                  <th className="text-nowrap">Date</th>
                                  <th className="text-nowrap">Method type</th>
                                  <th className="text-nowrap">Amount </th>
                                  {/* <th className="text-nowrap">Amount BDT</th> */}
                                  <th className="text-nowrap">From</th>
                                  <th className="text-nowrap">TO</th>
                                  <th className="text-nowrap">Agent ID</th>
                                  <th className="text-nowrap">Status</th>
                                </tr>

                                {depositReport.length > 0 ? (
                                  depositReport.map((deposit, index) => (
                                    <tr key={index}>
                                      <td className="text-nowrap">
                                        {deposit.trxid}
                                      </td>
                                      <td className="text-nowrap">
                                        {formatDate(deposit.createdAt)}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.selected_method}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.send_amount}
                                      </td>
                                      {/* <td className="text-nowrap">{deposit.send_amount_in_bdt}</td>  */}
                                      <td className="text-nowrap">
                                        {deposit.sender_number}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.agent_wallet}
                                      </td>
                                      <td className="text-nowrap">
                                        {deposit.agent_id}
                                      </td>
                                      <td
                                        className={`text-nowrap ${
                                          deposit.status === "pending"
                                            ? "r1-color"
                                            : "g1-color"
                                        } fw-normal cpoint`}
                                      >
                                        {deposit.status}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="5">Nohing found..</td>{" "}
                                    {/* Adjust colspan based on the number of data columns */}
                                  </tr>
                                )}
                              </table>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__tabletwo">
                            <h4>Bet History</h4>
                            <div
                              style={{ overflowX: "auto" }}
                              className="pay_method__table-scrollbar"
                            >
                              <table className="w-100 text-center p2-bg">
                                <tr>
                                  <th className="text-nowrap">Amount</th>
                                  <th className="text-nowrap">Currency</th>
                                  <th className="text-nowrap">Game Name</th>
                                  <th className="text-nowrap">Game Type</th>
                                  <th className="text-nowrap">
                                    Transaction ID
                                  </th>
                                  <th className="text-nowrap">Date</th>
                                </tr>

                                {gameData.length > 0 ? (
                                  gameData.map((item, index) => (
                                    <tr key={index}>
                                      <td className="text-nowrap">
                                        {item.amount}
                                      </td>
                                      <td className="text-nowrap">
                                        {item.currency}
                                      </td>
                                      <td className="text-nowrap">
                                        {item.amount}
                                      </td>
                                      <td className="text-nowrap">
                                        {item.type}
                                      </td>
                                      <td className="text-nowrap">
                                        {item.amount}
                                      </td>
                                      <td className="text-nowrap">
                                        {formatDate(item.createdAt)}
                                      </td>
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
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                            <div className="pay_method__paymethod-title mb-5 mb-md-6">
                              <h5 className="n10-color">About You</h5>
                              {state?.error && (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {state.error}
                                </div>
                              )}

                              {state?.success && (
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  {state.message}
                                </div>
                              )}
                            </div>
                            <div className="pay_method__formarea">
                              <form action={profileUpdateAction}>
                                <input
                                  type="hidden"
                                  name="user_id"
                                  value={userDetails.user_id}
                                />
                                <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                  <div className="w-100">
                                    <label className="mb-3">
                                      First Name (Given Name)
                                    </label>
                                    <input
                                      className="n11-bg rounded-8"
                                      type="text"
                                      placeholder="First Name"
                                      name="first_name"
                                      onChange={(e) =>
                                        setuserDetails({
                                          ...userDetails,
                                          first_name: e.target.value,
                                        })
                                      }
                                      value={userDetails.first_name}
                                    />
                                  </div>
                                  <div className="w-100">
                                    <label className="mb-3">Last Name</label>
                                    <input
                                      className="n11-bg rounded-8"
                                      type="text"
                                      name="last_name"
                                      onChange={(e) =>
                                        setuserDetails({
                                          ...userDetails,
                                          last_name: e.target.value,
                                        })
                                      }
                                      value={userDetails.last_name}
                                      placeholder="Last Name"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                  <div className="w-100">
                                    <label className="mb-3">
                                      Date of Birth
                                    </label>
                                    <input
                                      className="n11-bg rounded-8"
                                      type="text"
                                      name="dob"
                                      onChange={(e) =>
                                        setuserDetails({
                                          ...userDetails,
                                          dob: e.target.value,
                                        })
                                      }
                                      value={userDetails.dob}
                                      placeholder="EX : DD/MM/YYYY"
                                    />
                                  </div>
                                  <div className="w-100">
                                    <label className="mb-3">Phone Number</label>
                                    <input
                                      className="n11-bg rounded-8"
                                      type="text"
                                      name="mobile"
                                      onChange={(e) =>
                                        setuserDetails({
                                          ...userDetails,
                                          mobile: e.target.value,
                                        })
                                      }
                                      value={userDetails.mobile}
                                      placeholder="EX : +614XXXXXXXX"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                  <div className="w-100">
                                    <label className="mb-3">Address</label>
                                    <input
                                      className="n11-bg rounded-8"
                                      type="text"
                                      name="address"
                                      onChange={(e) =>
                                        setuserDetails({
                                          ...userDetails,
                                          address: e.target.value,
                                        })
                                      }
                                      value={userDetails.address}
                                      placeholder="Address..."
                                    />
                                  </div>
                                  <div className="w-100">
                                    <label className="mb-3 d-block">
                                      Select Currency
                                    </label>

                                    <select
                                      className="n11-bg extrastyle rounded-8 w-100 py-3 pe-5"
                                      name="country_currency"
                                      id="currency"
                                      required=""
                                    >
                                      <option value="">Select Currency</option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "AFN"
                                        }
                                        value="AFN"
                                      >
                                        AFN
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "BDT"
                                        }
                                        value="BDT"
                                      >
                                        BDT
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "USD"
                                        }
                                        value="USD"
                                      >
                                        USD
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "INR"
                                        }
                                        value="INR"
                                      >
                                        INR
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "LKR"
                                        }
                                        value="LKR"
                                      >
                                        LKR
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "NPR"
                                        }
                                        value="NPR"
                                      >
                                        NPR
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "RON"
                                        }
                                        value="RON"
                                      >
                                        RON
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "PKR"
                                        }
                                        value="PKR"
                                      >
                                        PKR
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "UAH"
                                        }
                                        value="UAH"
                                      >
                                        UAH
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "ZNK"
                                        }
                                        value="ZNK"
                                      >
                                        ZNK
                                      </option>
                                      <option
                                        selected={
                                          userDetails.country_currency === "MWK"
                                        }
                                        value="MWK"
                                      >
                                        MWK
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap flex-md-nowrap gap-5 gap-md-6 mb-5">
                                  <div className="w-100">
                                    <label className="mb-3">
                                      City / Region
                                    </label>
                                    <input
                                      className="n11-bg rounded-8"
                                      type="text"
                                      name="city"
                                      value={userDetails.city}
                                      onChange={(e) =>
                                        setuserDetails({
                                          ...userDetails,
                                          city: e.target.value,
                                        })
                                      }
                                      placeholder="City / Region..."
                                    />
                                  </div>
                                  <div className="w-100">
                                    <label className="mb-3">Country</label>

                                    <select
                                      className={`${styles.select_dropdown} w-100 p2-bg  rounded-3 mb-1`}
                                      name="country"
                                      id="country"
                                      required=""
                                    >
                                      <option value="">Select Country</option>
                                      <option
                                        value="Afghanistan"
                                        selected={
                                          userDetails.country === "Afghanistan"
                                        }
                                      >
                                        Afghanistan
                                      </option>
                                      <option
                                        value="Bangladesh"
                                        selected={
                                          userDetails.country === "Bangladesh"
                                        }
                                      >
                                        Bangladesh
                                      </option>
                                      <option
                                        value="India"
                                        selected={
                                          userDetails.country === "India"
                                        }
                                      >
                                        India
                                      </option>
                                      <option
                                        value="Sri Lanka"
                                        selected={
                                          userDetails.country === "Sri Lanka"
                                        }
                                      >
                                        Sri Lanka
                                      </option>
                                      <option
                                        value="Nepal"
                                        selected={
                                          userDetails.country === "Nepal"
                                        }
                                      >
                                        Nepal
                                      </option>
                                      <option
                                        value="Romania"
                                        selected={
                                          userDetails.country === "Romania"
                                        }
                                      >
                                        Romania
                                      </option>
                                      <option
                                        value="Ukraine"
                                        selected={
                                          userDetails.country === "Ukraine"
                                        }
                                      >
                                        Ukraine
                                      </option>
                                      <option
                                        value="Pakistan"
                                        selected={
                                          userDetails.country === "Pakistan"
                                        }
                                      >
                                        Pakistan
                                      </option>
                                      <option
                                        value="Niger"
                                        selected={
                                          userDetails.country === "Niger"
                                        }
                                      >
                                        Niger
                                      </option>
                                      <option
                                        value="USA"
                                        selected={userDetails.country === "USA"}
                                      >
                                        USA
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="d-flex gap-2 align-items-start align-items-xl-center mb-5">
                                  <input
                                    type="checkbox"
                                    id="demoCheckbox"
                                    name="checkbox"
                                    value="1"
                                  />
                                  <label className="fs-seven">
                                    I authorize to collect and transmit my
                                    personal information for identity
                                    verification or{" "}
                                    <span className="g1-color">
                                      {" "}
                                      similar uses as defined
                                    </span>{" "}
                                    in order to confirm my ability to use the
                                    website.
                                  </label>
                                </div>
                                <button
                                  align="right"
                                  className="cmn-btn py-3 px-10"
                                >
                                  Save
                                </button>
                              </form>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                            <div className="pay_method__paymethod-title mb-5 mb-md-6">
                              <h5 className="n10-color">
                                Change your Password
                              </h5>
                              {passwordUpdates?.error && (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {passwordUpdates.error}
                                </div>
                              )}
                              {passwordUpdates?.success && (
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  {passwordUpdates.message}
                                </div>
                              )}
                            </div>
                            <div className="pay_method__formarea">
                              <form action={passwordUpdateAction}>
                                <input
                                  type="hidden"
                                  name="user_id"
                                  value={userDetails.user_id}
                                />
                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                  <div className="d-flex w-100 p1-bg rounded-8">
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="oldPassword"
                                      placeholder="Enter Your old Password"
                                    />
                                  </div>
                                  <div className="d-flex w-100 p1-bg rounded-8">
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="newPassword"
                                      placeholder="Enter your new password"
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label>
                                    <input
                                      type="checkbox"
                                      onChange={toggleShowPassword}
                                    />
                                    Show Password
                                  </label>
                                </div>
                                <button
                                  type="submit"
                                  className="py-4 px-5 n11-bg rounded-2 w-100"
                                >
                                  Update Password
                                </button>
                              </form>
                            </div>

                            <div className="pay_method__paymethod-title mb-5 mb-md-6 pt-20">
                              <h5 className="n10-color">
                                Change your transaction Password
                              </h5>
                              {tppasswordUpdates?.error && (
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {tppasswordUpdates.error}
                                </div>
                              )}
                              {tppasswordUpdates?.success && (
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  {tppasswordUpdates.message}
                                </div>
                              )}
                            </div>
                            <div className="pay_method__formarea">
                              <form action={tppasswordUpdateAction}>
                                <input
                                  type="hidden"
                                  name="user_id"
                                  value={userDetails.user_id}
                                />
                                <div className="d-flex align-items-center gap-5 gap-md-6 mb-5 flex-wrap flex-md-nowrap">
                                  <div className="d-flex w-100 p1-bg rounded-8">
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="oldPassword"
                                      placeholder="Enter Your old Password"
                                    />
                                  </div>
                                  <div className="d-flex w-100 p1-bg rounded-8">
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="newPassword"
                                      placeholder="Enter your new password"
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label>
                                    <input
                                      type="checkbox"
                                      onChange={toggleShowPassword}
                                    />
                                    Show Password
                                  </label>
                                </div>
                                <button
                                  type="submit"
                                  className="py-4 px-5 n11-bg rounded-2 w-100"
                                >
                                  Update Password
                                </button>
                              </form>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                            <div className="pay_method__paymethod-title d-flex align-items-center gap-3 mb-6 mb-md-8">
                              <IconBellRinging
                                width={28}
                                height={28}
                                className="ti ti-bell-ringing fs-four"
                              />
                              <h5 className="n10-color">
                                Notifications settings{" "}
                              </h5>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">Email Notifications</h6>
                                <span className="fs-seven n4-color">
                                  Receive weekly email notifications.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">Phone Notifications</h6>
                                <span className="fs-seven n4-color">
                                  Receive weekly Phone notifications.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">New tasks</h6>
                                <span className="fs-seven n4-color">
                                  Receive weekly New tasks notifications.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">Billing and payments</h6>
                                <span className="fs-seven n4-color">
                                  Lorem ipsum dolor sit amet consectetur. Id.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center border-0">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">
                                  Updates and announcements
                                </h6>
                                <span className="fs-seven n4-color">
                                  Lorem ipsum dolor sit amet consectetur.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>
                        <Tab.Panel>
                          <div className="pay_method__paymethod p-4 p-lg-6 p2-bg rounded-8">
                            <div className="pay_method__paymethod-title d-flex align-items-center gap-3 mb-6 mb-md-8">
                              <IconBellRinging
                                width={28}
                                height={28}
                                className="ti ti-bell-ringing fs-four"
                              />
                              <h5 className="n10-color">
                                Notifications settings{" "}
                              </h5>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">Email Notifications</h6>
                                <span className="fs-seven n4-color">
                                  Receive weekly email notifications.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">Phone Notifications</h6>
                                <span className="fs-seven n4-color">
                                  Receive weekly Phone notifications.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">New tasks</h6>
                                <span className="fs-seven n4-color">
                                  Receive weekly New tasks notifications.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center pb-5 pb-md-6 mb-5 mb-md-6">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">Billing and payments</h6>
                                <span className="fs-seven n4-color">
                                  Lorem ipsum dolor sit amet consectetur. Id.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="pay_method__Notiitem d-flex align-items-center gap-3 justify-content-between align-items-center border-0">
                              <div className="pay_method__Notiitem-text">
                                <h6 className="mb-3">
                                  Updates and announcements
                                </h6>
                                <span className="fs-seven n4-color">
                                  Lorem ipsum dolor sit amet consectetur.
                                </span>
                              </div>
                              <div className="pay_method__Notiitem-switcher">
                                <label className="switch">
                                  <input type="checkbox" />
                                  <div className="slider">
                                    <div className="circle"></div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </div>
                  </div>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// import { useState } from 'react'
// import { Tab } from '@headlessui/react'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//   let [categories] = useState({
//     Recent: [
//       {
//         id: 1,
//         title: 'Does drinking coffee make you smarter?',
//         date: '5h ago',
//         commentCount: 5,
//         shareCount: 2,
//       },
//       {
//         id: 2,
//         title: "So you've bought coffee... now what?",
//         date: '2h ago',
//         commentCount: 3,
//         shareCount: 2,
//       },
//     ],
//     Popular: [
//       {
//         id: 1,
//         title: 'Is tech making coffee better or worse?',
//         date: 'Jan 7',
//         commentCount: 29,
//         shareCount: 16,
//       },
//       {
//         id: 2,
//         title: 'The most innovative things happening in coffee',
//         date: 'Mar 19',
//         commentCount: 24,
//         shareCount: 12,
//       },
//     ],
//     Trending: [
//       {
//         id: 1,
//         title: 'Ask Mthing: 10 answers to your questions about coffee',
//         date: '2d ago',
//         commentCount: 9,
//         shareCount: 5,
//       },
//       {
//         id: 2,
//         title: "The worst advice we've ever heard about coffee",
//         date: '4d ago',
//         commentCount: 1,
//         shareCount: 2,
//       },
//     ],
//   })

//   return (
//     <div className="w-full max-w-md px-2 py-16 sm:px-0">
//       <Tab.Group>
//         <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
//           {Object.keys(categories).map((category) => (
//             <Tab
//               key={category}
//               className={({ selected }) =>
//                 classNames(
//                   'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
//                   'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                   selected
//                     ? 'bg-white text-blue-700 shadow'
//                     : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
//                 )
//               }
//             >
//               {category}
//             </Tab>
//           ))}
//         </Tab.List>
//         <Tab.Panels className="mt-2">
//           {Object.values(categories).map((posts, idx) => (
//             <Tab.Panel
//               key={idx}
//               className={classNames(
//                 'rounded-xl bg-white p-3',
//                 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
//               )}
//             >
//               <ul>
//                 {posts.map((post) => (
//                   <li
//                     key={post.id}
//                     className="relative rounded-md p-3 hover:bg-gray-100"
//                   >
//                     <h3 className="text-sm font-medium leading-5">
//                       {post.title}
//                     </h3>

//                     <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
//                       <li>{post.date}</li>
//                       <li>&middot;</li>
//                       <li>{post.commentCount} comments</li>
//                       <li>&middot;</li>
//                       <li>{post.shareCount} shares</li>
//                     </ul>

//                     <a
//                       href="#"
//                       className={classNames(
//                         'absolute inset-0 rounded-md',
//                         'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
//                       )}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </Tab.Panel>
//           ))}
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   )
// }
