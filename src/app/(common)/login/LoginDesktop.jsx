"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { login } from "@/lib/action";
import styles from "@/components/Pages/CreateAcount/regform_style.module.css";

export default function Login() {
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
                src="/images/banner.jpg?v=1.1"
                alt="Image"
              />
            </div>
          </div>
          <div className="col-lg-6 col-xl-5">
            <div className="login_section__loginarea">
              <div className="row justify-content-start">
                <div className="col-xxl-10">
                  <div className="pb-10 pt-8 mb-7 mt-12 mt-lg-0 px-4 px-sm-10">
                    <h3 className="mb-6 mb-md-8">Login</h3>
                    <div className="login_section__form">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-5 mb-md-6">
                          <input
                            className="n11-bg"
                            name="user_id"
                            placeholder="Enter User ID"
                            type="text"
                            value={formData.user_id}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-5 mb-md-6">
                          <input
                            className="n11-bg"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
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
                          className="p1-color y1-bg px-5 py-3 mb-6 w-100"
                          disabled={isDisabled}
                        >
                          {isDisabled ? "Processing..." : "Sign In"}
                        </button>
                      </form>
                    </div>
                    <Link
                      className="d-center y2-bg p1-color px-5 py-3 mb-6 w-100"
                      href="/create-acount"
                    >
                      Create Account
                    </Link>
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
