import Image from "next/image";
import React from "react";
import styles from "./style.module.css";

const ServiceSection = () => {
  return (
    <div className={styles.serviceContainer}>
      <div className={styles.serviceItem}>
        <Image
          src={"/image_new/image40.png"}
          height={60}
          width={60}
          alt="Customer Support"
        />
        <div className={styles.textContent} style={{ marginTop: "5px" }}>
          <p className={styles.title}>Customer Support</p>
          <p className={styles.subtitle}>Available 24/7 to assist you</p>
        </div>
      </div>
      <div className={styles.serviceItem}>
        <Image
          src={"/image_new/image41.png"}
          height={60}
          width={60}
          alt="Customer Support"
        />
        <div className={styles.textContent}>
          <p className={styles.title}>New Member Guide</p>
          <p className={styles.subtitle}>Check out FAQ and guides</p>

          <button className={styles.button}>Explore Now</button>
        </div>
      </div>
      <div className={styles.serviceItem}>
        <Image
          src={"/image_new/image42.png"}
          height={60}
          width={60}
          alt="Customer Support"
        />
        <div className={styles.textContent}>
          <p className={styles.title}>Brand Ambassador</p>
          <p className={styles.subtitle}>Play with celebrity</p>
          <button className={styles.button}>Explore Now</button>
        </div>
      </div>
      <div className={styles.serviceItem}>
        <Image
          src={"/image_new/image43.png"}
          height={160}
          width={160}
          alt="Customer Support"
        />
      </div>
      {/* Add additional items here if needed */}
    </div>
  );
};

export default ServiceSection;
