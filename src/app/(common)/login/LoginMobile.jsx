"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { login } from "@/lib/action";
import styles from "./loginMobile.module.css";
import { FaEye } from "react-icons/fa";

export default function LoginMobile() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IssetError, setError] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
  });

  const [verificationCode, setVerificationCode] = useState(generateCode());
  const [userCode, setUserCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    const response = await login(undefined, formData);
    if (response?.error) {
      toast.error(response.error);
      setError(response.error);
      setIsLoading(false);
      setIsDisabled(false);
      return;
    }

    toast.success("Successfully logged in  ....");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginHeader}>
        <Link href={"/"}>
          {" "}
          <Image
            width={100}
            height={900}
            src="/images/providersnew/fastbet.png"
            alt="Image"
          />
        </Link>
      </div>

      <div className={styles.loginForm}>
        <form onSubmit={handleSubmit}>
          <div
            className={styles.formGroup}
            style={{ borderBottom: "2px solid #333" }}
          >
            <label htmlFor="username" className={styles.formGroupLabel}>
              Username
            </label>
            <input
              id="user_id"
              name="user_id"
              type="text"
              placeholder="Username"
              className={styles.loginInput}
              value={formData.user_id}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formGroupLabel}>
              Password
            </label>
            <div className={styles.passwordContainer}>
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.loginInput}
                style={{ marginLeft: "2px" }}
              />
            </div>
          </div>
          <div className={`${styles.verificationSection}`}>
            <div className={`${styles.verificationRow}`}>
              <label htmlFor="code" className={styles.formGroupLabel}>
                Code
              </label>
              <input
                type="text"
                id="code"
                placeholder="Verification code"
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

          <div className={styles.forgotPassword}>
            <Link href="/forgot-password" className={styles.forgotPasswordLink}>
              Forgot password?
            </Link>
          </div>

          <button
            className={styles.loginButton}
            disabled={isDisabled}
            type="submit"
          >
            {" "}
            {isDisabled ? "Processing..." : "Sign In"}
          </button>
        </form>

        <div className={styles.signup}>
          <span>Do not have an account? </span>
          <Link href="/create-acount" className={styles.signupLink}>
            {" "}
           Regestration
          </Link>
        </div>
      </div>
    </div>
  );
}
