"use client";
// components/Marquee.js
import styles from "./Marquee.module.css";
import { IconSearch } from "@tabler/icons-react";
import { AiOutlineSound } from "react-icons/ai";
const Marquee = () => {
  return (
    <div className={styles.marquee}>
      <p className={styles.icon}>
        <AiOutlineSound className={styles.iconStyle} />
      </p>
      <div className={styles.marqueeContent}>
        স্ক্যাম সতর্কতা: প্রিয় সদস্যরা, আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে দয়া
        করে আপনার লগইন ডিটেলস, অর্থপ্রদানের রসিদ, ক্যাশ আউট এর ছবি এবং ওটিপি
        কারও সাথে শেয়ার করবেন না। আপনার যদি সহায়তার প্রয়োজন হয়, তাহলে
        লাইভচ্যাট অথবা হোয়াটসঅ্যাপ এর মাধ্যমে আমাদের সাথে যোগাযোগ করুন ধন্যবাদ।
      </div>
    
<script src="https://static.elfsight.com/platform/platform.js" async></script>
<div class="elfsight-app-bd426563-a100-4c3c-9be8-af77e0dfb5b0" data-elfsight-app-lazy></div>
    </div>
  );
};

export default Marquee;
