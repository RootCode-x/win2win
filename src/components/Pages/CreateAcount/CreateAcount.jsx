"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  IconBrandGoogle,
  IconBrandTwitterFilled,
  IconBrandFacebookFilled,
} from "@tabler/icons-react";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/action";
import Alert from "../../Shared/Alert";
import styles from "./regform_style.module.css";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { api_path } from "@/lib/api_path";

export default function CreateAcount({ referrerId, promoCode }) {
  const [state, formAction] = useFormState(register, undefined);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [SponserId, setSponserId] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IssetError, setError] = useState(false);

  const [verificationCode, setVerificationCode] = useState(generateCode());
  const [userCode, setUserCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setRegistrationSuccess(true);
      setUserData(state.responseData); // Set the user data
      setShowModal(true); // Open modal on successful registration
      // router.push("/login");
    }
  }, [state?.success, router]);

  let alertComponent = null;

  if (state && state.error) {
    // Show custom error alert
    alertComponent = <Alert message={state.error} type="danger" />;
  } else if (registrationSuccess) {
    // Show success alert if registration was successful
    alertComponent = (
      <Alert message="Registration Successful!" type="success" />
    );
  }

  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("UserID & Password is copied to clipboard!");
    <Alert
      message="UserID & Password is copied to clipboard!"
      type="success"
    />;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setUserId(filteredValue);
  };

  const handleInputSponserChange = (event) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, "");
    setSponserId(filteredValue);
    if (filteredValue.length > 2) {
      searchSponsor(filteredValue);
    }
  };

  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateMobileNumber = (number) => {
    const mobileNumberPattern = /^(017|018|019|016|015)\d{8}$/;
    return mobileNumberPattern.test(number);
  };

  const handleMobileChange = (event) => {
    const value = event.target.value;
    setMobileNumber(value);

    if (!validateMobileNumber(value)) {
      setErrorMessage(
        "Invalid mobile number. Must start with 017, 018, 019, 016, or 015 and contain 11 digits."
      );
    } else {
      setErrorMessage(""); // Clear the error if valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    setError(null);

    if (userCode === verificationCode) {
      // toast.success("Verification successful");
      setIsVerified(true);
    } else {
      toast.error("Verification failed. Please enter the correct code.");
      setIsVerified(false);
      setError(null);
      setIsLoading(false);
      setIsDisabled(false);
      return;
    }

    const formData = new FormData(e.target);
    const response = await register(undefined, formData);
    if (response?.error) {
      toast.error(response.error);
      setError(response.error);
      setIsLoading(false);
      setIsDisabled(false);
      return;
    }

    toast.success("Successfully created account.");
    setRegistrationSuccess(true);
    setUserData(response.responseData); // Set the user data
    setShowModal(true); // Open modal on successful registration
    // router.push("/login");
  };

  const [sponsorName, setSponsorName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [agentid, setAgentId] = useState("MA1615");
  // Function to search sponsor name

  const searchSponsor = async (referrerId) => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `${api_path}/commonData?referrerId=${referrerId}`
      );
      const data = response.data;
      console.log(data);
      setSponsorName(data);
    } catch (error) {
      console.error("Error fetching sponsor:", error);
      setSponsorName("Error searching sponsor");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (referrerId) {
      searchSponsor(referrerId);
    }
  }, [referrerId]);

  // Function to generate a random 4-digit code
  function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
  }

  // Handle the code input change
  const handleCodeInput = (e) => {
    setUserCode(e.target.value);
  };

  // Regenerate a new code when the verification code is clicked
  const refreshCode = () => {
    setVerificationCode(generateCode());
  };

  return (
    <section className="login_section pt-120 p3-bg">
      <Toaster />
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col-6">
            <div className="login_section__thumb d-none d-lg-block">
              <Image
                className="w-100"
                width={720}
                height={900}
                src="/images/reg-banner.jpg?v=1.3"
                alt="Image"
              />
            </div>
          </div>
          <div className="col-lg-6 col-xl-5">
            <div className="login_section__loginarea">
              <div className="row justify-content-start">
                <div className="col-xxl-10">
                  <div className="pt-7">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className={`tab-pane fade ${
                          activeTab === "home" ? "show active" : ""
                        }`}
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="pb-10 pt-2 mb-7 mt-2 mt-lg-0 px-4 px-sm-10">
                          <h4 className="mb-6 mb-md-8">Create new account</h4>
                          {alertComponent}

                          <div className="login_section__form">
                            <form onSubmit={handleSubmit}>
                              <input
                                type="hidden"
                                name="regtype"
                                value="byself"
                              />
                              <div className="mb-5 mb-md-6">
                                <input
                                  className="n11-bg"
                                  name="full_name"
                                  data-name="Input 2"
                                  placeholder="USER ID"
                                  value={userId}
                                  onInput={handleInputChange}
                                  type="text"
                                  id="Input-2"
                                  data-listener-added_da55015d="true"
                                />
                              </div>
                              {/* <div className="mb-5 mb-md-6">
                                                            <input className="n11-bg" name="email" data-name="Input 1" placeholder="Email" type="email" id="Input" />
                                                        </div> */}
                              <div className="mb-5 mb-md-6">
                                <input
                                  className="n11-bg"
                                  minLength="11"
                                  maxLength="11"
                                  name="mobile"
                                  data-name="Input 1"
                                  placeholder="Mobile Example: 01****"
                                  type="number"
                                  id="Input"
                                />
                              </div>
                              <div className="mb-5 mb-md-6">
                                <input
                                  className="n11-bg"
                                  name="password"
                                  data-name="Input 3"
                                  placeholder="Password"
                                  type="password"
                                  id="Input-3"
                                />
                              </div>
                              <div className="mb-5 mb-md-6">
                                <input
                                  className="n11-bg"
                                  name="passwordRepeat"
                                  data-name="Input 3"
                                  placeholder="Confirm Password"
                                  type="password"
                                  id="Input-3"
                                />
                              </div>

                              <div className="mb-5 mb-md-6">
                                <select
                                  className={`${styles.select_dropdown} w-100 p2-bg  rounded-3 mb-1`}
                                  name="country"
                                  id="country"
                                  required=""
                                >
                                  <option value="">Select Country</option>
                                  <option value="Afghanistan">
                                    Afghanistan
                                  </option>
                                  <option selected value="Bangladesh">
                                    Bangladesh
                                  </option>
                                  <option value="India">India</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Niger">Niger</option>
                                  <option value="USA">USA</option>
                                </select>
                              </div>
                              <input
                                type="hidden"
                                name="currency_name"
                                value="BDT"
                              />
                              <div className="mb-5 mb-md-6">
                                {isSearching ? (
                                  <input
                                    className="n11-bg"
                                    name="agentid"
                                    placeholder="Loading..."
                                    disabled
                                  />
                                ) : (
                                  <input
                                    className="n11-bg"
                                    type="text"
                                    id="Input-2"
                                    name="agentid"
                                    required
                                    placeholder="Promo Code"
                                    value={
                                      sponsorName?.agent_id ??
                                      promoCode ??
                                      agentid
                                    }
                                    onChange={(e) => setAgentId(e.target.value)} // Make it editable
                                  />
                                )}
                              </div>

                              <div className="mb-5 mb-md-6">
                                <input
                                  className="n11-bg"
                                  type="text"
                                  name="sponsor"
                                  placeholder="Enter Referrer ID"
                                  value={referrerId}
                                  onChange={handleInputSponserChange}
                                />
                              </div>

                              <div className={`${styles.verificationSection}`}>
                                <div className={`${styles.verificationRow}`}>
                                  <input
                                    type="text"
                                    placeholder="Enter verification code"
                                    value={userCode}
                                    onChange={handleCodeInput}
                                    maxLength="4"
                                    required
                                    className={`${styles.verificationInput}`}
                                  />
                                  <span
                                    className={`${styles.verificationCode}`}
                                    onClick={refreshCode}
                                  >
                                    {verificationCode}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="py-2 px-3 m-1 p1-color  y2-bg  rounded-2  w-100"
                                disabled={isDisabled}
                              >
                                {" "}
                                {isDisabled
                                  ? "Processing..."
                                  : "Create Account"}{" "}
                              </button>
                            </form>
                          </div>

                          <span className="d-center gap-1">
                            Already a member?{" "}
                            <Link className="g1-color" href="/login">
                              Login
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className={`${styles.modal_custom}`}>
            <div className={`${styles.modal_custom_content}`}>
              <h4>Successfully Registered at Luckbuzz99</h4>
              <p className={`${styles.success}`}>
                IMPORTANT! Please Save your User ID and password.
              </p>
              <div className={`${styles.login_details}`}>
                <p>User ID: {userData.userid} </p>
                <p>Password: {userData.password} </p>
              </div>
              <div className={`${styles.modal_custom_actions}`}>
                <button
                  className="cmn-btn  d-sm-block "
                  onClick={() =>
                    handleCopy(
                      `ID: ${userData.userid}\nPassword: ${userData.password}`
                    )
                  }
                >
                  Copy{" "}
                </button>
                <a
                  className="cmn-btn  d-sm-block "
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                    `ID: ${userData.userid}\nPassword: ${userData.password}`
                  )}`}
                  download="login-details.txt"
                >
                  Download
                </a>
              </div>
              <p className={`${styles.footnote}`}>
                We recommend that you fill in your profile data to have the
                possibility to restore access to the account in case you forget
                your login or password.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
