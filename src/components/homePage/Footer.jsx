import Image from "next/image";
import styles from "./footer.module.css";

const Footer = ({ session }) => {
  return (
    <div className={styles.footerContainer}>
      <div
        className={styles.footerContainerForDesktop}
        style={{
          justifyContent: "space-between",
          borderTop: "rgb(48, 45, 45) 0.2px solid",
          borderBottom: "rgb(48, 45, 45) 0.2px solid",
          padding: "40px 0",
          margin: "30px 0",
        }}
      >
        <div className={styles.logoSection}>
          <Image
            src="/images/providersnew/fastbet.png" // Replace with the path to your Luckbuzz99 logo
            alt="Luckbuzz99 Logo"
            width={150}
            height={50}
          />
        </div>

        <div>
          <div className={styles.linksSection}>
            <a
              style={{
                borderRight: "rgb(184, 169, 169) 2px solid",
                paddingRight: "20px",
              }}
              href="/affiliate"
            >
              Affiliate
            </a>
            <a
              style={{
                borderRight: "rgb(184, 169, 169) 2px solid",
                paddingRight: "20px",
              }}
              href="/responsible-gaming"
            >
              Responsible Gaming
            </a>
            <a
              style={{
                borderRight: "rgb(184, 169, 169) 2px solid",
                paddingRight: "20px",
              }}
              href="/about-us"
            >
              About Us
            </a>
          </div>
          <div>
            <p className={styles.copyrightSection}>
              © 2025 Casinoxy Copyrights. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.textSection}>
        Casinoxy is owned and operated by Casinoxy.
          registration number: 15839, registered address: Hamchhako, Mutsamudu,
          Autonomous Island of Anjouan, Union of Comoros. Contact us
          info@Casinoxy.com. Casinoxy.com is licensed and regulated by the
          Government of the Autonomous Island of Anjouan, Union of Comoros and
          operates under License No. ALSI-202410030-FI1. Casinoxy.com has passed
          all regulatory compliance and is legally authorized to conduct gaming
          operations for any and all games of chance and wagering.
        </p>
      </div>
    </div>
  );
};

export default Footer;
