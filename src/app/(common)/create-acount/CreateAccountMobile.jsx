"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroSlider from "@/components/Pages/Home/HeroSlider";
import { useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/action";
import Alert from "@/components/Shared/Alert";
import styles from "./registrationMobile.module.css";
import stylesForModal from "@/components/Pages/CreateAcount/regform_style.module.css";
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

  const [isDisabled, setIsDisabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState(generateCode());
  const [userCode, setUserCode] = useState("");

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

    if (filteredValue.length > 2) {
      searchSponsor(filteredValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsDisabled(true);

    if (userCode === verificationCode) {
      // toast.success("Verification successful");
    } else {
      toast.error("Verification failed. Please enter the correct code.");

      setIsDisabled(false);
      return;
    }

    const formData = new FormData(e.target);
    const response = await register(undefined, formData);
    if (response?.error) {
      toast.error(response.error);

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
    <section className="">
      <Toaster />
      <HeroSlider />
      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="regtype" value="byself" />
          <div className={styles.formGroup}>
            <label htmlFor="1" className={styles.formGroupLabel}>
              Username
            </label>
            <input
              className={styles.loginInput}
              name="full_name"
              data-name="1"
              placeholder="USER ID"
              value={userId}
              onInput={handleInputChange}
              type="text"
              id="1"
              data-listener-added_da55015d="true"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="2" className={styles.formGroupLabel}>
              Phone
            </label>
            <input
              className={styles.loginInput}
              name="mobile"
              data-name="2x"
              placeholder="Phone"
              type="number"
              id="2"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="3" className={styles.formGroupLabel}>
              Password
            </label>
            <input
              className={styles.loginInput}
              name="password"
              data-name="3g"
              placeholder="Password"
              type="password"
              id="3"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="4" className={styles.formGroupLabel}>
              Confirm Pas
            </label>
            <input
              className={styles.loginInput}
              name="passwordRepeat"
              data-name="4"
              placeholder="Confirm Password"
              type="password"
              id="4"
            />
          </div>
          <div className={styles.formGroupForSelect}>
            <label htmlFor="4" className={styles.formGroupLabel}>
              Country
            </label>
            <select
              name="country"
              id="country"
              required=""
              className={styles.loginInputForSelect}
            >
              <option value="">Select Country</option>
              <option value="Afghanistan">Afghanistan</option>
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
          <input type="hidden" name="currency_name" value="BDT" />

          {isSearching ? (
            <input
              className={styles.loginInput}
              name="agentid"
              placeholder="Loading..."
              disabled
            />
          ) : (
            <div className={styles.formGroup}>
              <label htmlFor="agentid" className={styles.formGroupLabel}>
                Promo Code
              </label>
              <input
                className={styles.loginInput}
                type="text"
                id="agentid"
                name="agentid"
                required
                placeholder="Promo Code"
                value={sponsorName?.agent_id ?? promoCode ?? agentid}
                onChange={(e) => setAgentId(e.target.value)} // Make it editable
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="sponsor" className={styles.formGroupLabel}>
              sponsor
            </label>
            <input
              className={styles.loginInput}
              type="text"
              name="sponsor"
              placeholder="Enter Referrer ID"
              value={referrerId}
              onChange={handleInputSponserChange}
              id="sponsor"
            />
          </div>

          <div className={`${styles.verificationSection}`}>
            <div className={`${styles.verificationRow}`}>
              <label htmlFor="code" className={styles.formGroupLabel}>
                Code
              </label>
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
            {isDisabled ? "Processing..." : "Create Account"}{" "}
          </button>
        </form>
        <p
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          I&apos;m 18 years old, and agree to &quot;terms and conditions&quot;.
        </p>
      </div>
      {showModal && (
        <div className={`${stylesForModal.modal_custom}`}>
          <div className={`${stylesForModal.modal_custom_content}`}>
            <h4>Successfully Registered at Luckbuzz99</h4>
            <p className={`${stylesForModal.success}`}>
              IMPORTANT! Please Save your User ID and password.
            </p>
            <div className={`${stylesForModal.login_details}`}>
              <p>User ID: {userData.userid} </p>
              <p>Password: {userData.password} </p>
            </div>
            <div className={`${stylesForModal.modal_custom_actions}`}>
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
            <p className={`${stylesForModal.footnote}`}>
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
    </section>
  );
}
