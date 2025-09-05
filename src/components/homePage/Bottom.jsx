"use client";

import React from "react";

import BottomSection from "./BottomSection";
import ServiceSection from "./ServiceSection";
import PaymentSection from "./PaymentSection";
import Footer from "./Footer";
import FooterLastForMobile from "./FooterLast";
import styles from "./FooterLast.module.css";
const Bottom = ({ session }) => {
  return (
    <div style={{ backgroundColor: "#080808" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "10px auto",
          position: "relative",
        }}
      >
        <BottomSection />
        <ServiceSection />
        <PaymentSection />
        <Footer />
        <FooterLastForMobile session={session} />
      </div>
    </div>
  );
};

export default Bottom;
