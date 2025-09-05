import Image from "next/image";
import React from "react";
import paymentStyle from "./paymentStyle.module.css";
import styles from "./style.module.css";

const PaymentSection = () => {
  return (
    <>
      <div
        className={paymentStyle.desktopPaymentSection}
        style={{
          borderBottom: "rgb(48, 45, 45) 0.2px solid",
          paddingBottom: "40px",
        }}
      >
        <div className={paymentStyle.section}>
          <div>
            <p className={paymentStyle.title}>Responsible Gaming</p>
            <div className={paymentStyle.image_row}>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image44.png"}
                  height={28}
                  width={23}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image45.png"}
                  height={28}
                  width={25}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image46.png"}
                  height={28}
                  width={24}
                  alt="Responsible Gaming Icon"
                />
              </div>
            </div>
          </div>

          <div>
            <p className={paymentStyle.title}>Payment Methods</p>
            <div className={paymentStyle.image_row}>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image47.png"}
                  height={28}
                  width={68}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image48.png"}
                  height={28}
                  width={56}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image49.png"}
                  height={28}
                  width={38}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image50.png"}
                  height={28}
                  width={56}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image51.png"}
                  height={28}
                  width={72}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image52.png"}
                  height={28}
                  width={67}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image53.png"}
                  height={28}
                  width={85}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image54.png"}
                  height={28}
                  width={25}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image55.png"}
                  height={28}
                  width={79}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image56.png"}
                  height={28}
                  width={118}
                  alt="Responsible Gaming Icon"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={paymentStyle.section}>
          <div>
            <p className={paymentStyle.title}>Community Websites</p>
            <div className={paymentStyle.image_row}>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image57.png"}
                  height={28}
                  width={25}
                  alt="Community Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image58.png"}
                  height={28}
                  width={25}
                  alt="Community Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image59.png"}
                  height={28}
                  width={25}
                  alt="Community Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image60.png"}
                  height={28}
                  width={25}
                  alt="Community Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image61.png"}
                  height={28}
                  width={25}
                  alt="Community Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image62.png"}
                  height={28}
                  width={25}
                  alt="Community Icon"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={paymentStyle.section}>
          <div>
            <p className={paymentStyle.title}>Sponsorships</p>
            <div className={styles.serviceItem}>
              <Image
                src={"/image_new/image03.png"}
                height={50}
                width={50}
                alt="Customer Support"
              />
              <div className={styles.textContentEx}>
                <p className={styles.titleEx}>Delhi Bulls</p>
                <p className={styles.titleEx}>2023 - 2024</p>
                <p className={styles.subtitle}>Title Sponsor</p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div>
            <p className={paymentStyle.title}>Brand Ambassadors</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",

                gap: "40px",
              }}
            >
              <div className={styles.serviceItem}>
                <Image
                  src={"/image_new/image63.png"}
                  height={60}
                  width={40}
                  alt="Customer Support"
                />
                <div className={styles.textContentEx}>
                  <p className={styles.titleEx}>Andre Dwayne Russell</p>
                  <p className={styles.titleEx}> 2024 - 2026</p>
                </div>
              </div>
              <div className={styles.serviceItem}>
                <Image
                  src={"/image_new/image64.png"}
                  height={60}
                  width={40}
                  alt="Customer Support"
                />
                <div className={styles.textContentEx}>
                  <p className={styles.titleEx}>Glenn McGrath</p>
                  <p className={styles.titleEx}>2023 - 2024</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className={paymentStyle.title}>Gaming License</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "40px",
              }}
            >
              <div className={styles.serviceItem}>
                <Image
                  src={"/image_new/image65.png"}
                  height={60}
                  width={76}
                  alt="Customer Support"
                />
                <Image
                  src={"/image_new/image67.png"}
                  height={60}
                  width={32}
                  alt="Customer Support"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For mobile  */}
      <div
        className={paymentStyle.mobilePaymentSection}
        style={{ paddingLeft: "6px" }}
      >
        <div className={paymentStyle.section}>
          <div>
            <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
              Sponsorships
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Image
                src={"/image_new/image03.png"}
                height={41.59}
                width={41.59}
                alt="Customer Support"
              />
              <div className={styles.textContentEx}>
                <p style={{ color: "#ffffff", fontSize: "12.48px" }}>
                  Delhi Bulls
                </p>
                <p style={{ color: "#ffffff80", fontSize: "11.44px" }}>
                  2023 - 2024
                </p>
                <p
                  style={{
                    color: "#ffffff80",
                    fontSize: "11.44px",
                    marginTop: "-8px",
                  }}
                >
                  Title Sponsor
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
            Brand Ambassadors
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "8px",
              gap: "40px",
            }}
          >
            <div className={styles.serviceItem}>
              <Image
                src={"/image_new/image63.png"}
                height={60}
                width={40}
                alt="Customer Support"
              />
              <div className={styles.textContentEx}>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "12.48px",
                    lineHeight: "12px",
                  }}
                >
                  Andre Dwayne Russell
                </p>
                <p style={{ color: "#ffffff80", fontSize: "11.44px" }}>
                  {" "}
                  2024-2026
                </p>
              </div>
            </div>
            <div className={styles.serviceItem}>
              <Image
                src={"/image_new/image64.png"}
                height={60}
                width={40}
                alt="Customer Support"
              />
              <div style={{}}>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "12.48px",
                    lineHeight: "12px",
                  }}
                >
                  Glenn McGrath
                </p>
                <p
                  style={{
                    color: "#ffffff80",
                    fontSize: "11.44px",
                    lineHeight: "12px",
                  }}
                >
                  2023-2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px" }}>
          <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
            Payment Methods
          </p>

          <div style={{ marginTop: "8px" }}>
            <div className={paymentStyle.image_row}>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image47.png"}
                  height={28}
                  width={68}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image48.png"}
                  height={28}
                  width={56}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image49.png"}
                  height={28}
                  width={38}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image50.png"}
                  height={28}
                  width={56}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image51.png"}
                  height={28}
                  width={72}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image52.png"}
                  height={28}
                  width={67}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image53.png"}
                  height={28}
                  width={85}
                  alt="Responsible Gaming Icon"
                />
              </div>
            </div>

            <div
              className={paymentStyle.image_row}
              style={{ marginTop: "10px" }}
            >
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image54.png"}
                  height={14}
                  width={14}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image55.png"}
                  height={28}
                  width={40}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image56.png"}
                  height={28}
                  width={48}
                  alt="Responsible Gaming Icon"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "24px",
          }}
        >
          <div>
            <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
              Responsible Gaming
            </p>
            <div
              className={paymentStyle.image_row}
              style={{ marginTop: "8px" }}
            >
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image44.png"}
                  height={28}
                  width={20}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image45.png"}
                  height={28}
                  width={22}
                  alt="Responsible Gaming Icon"
                />
              </div>
              <div className={paymentStyle.image_wrapper}>
                <Image
                  src={"/image_new/image46.png"}
                  height={28}
                  width={21}
                  alt="Responsible Gaming Icon"
                />
              </div>
            </div>
          </div>

          <div>
            <div>
              <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
                Community Websites
              </p>
              <div
                className={paymentStyle.image_row}
                style={{ marginTop: "8px" }}
              >
                <div className={paymentStyle.image_wrapper}>
                  <Image
                    src={"/image_new/image57.png"}
                    height={28}
                    width={23}
                    alt="Community Icon"
                  />
                </div>
                <div className={paymentStyle.image_wrapper}>
                  <Image
                    src={"/image_new/image58.png"}
                    height={28}
                    width={23}
                    alt="Community Icon"
                  />
                </div>
                <div className={paymentStyle.image_wrapper}>
                  <Image
                    src={"/image_new/image59.png"}
                    height={28}
                    width={22}
                    alt="Community Icon"
                  />
                </div>
                <div className={paymentStyle.image_wrapper}>
                  <Image
                    src={"/image_new/image60.png"}
                    height={28}
                    width={22}
                    alt="Community Icon"
                  />
                </div>
              </div>
              <div
                className={paymentStyle.image_row}
                style={{ marginTop: "8px" }}
              >
                <div className={paymentStyle.image_wrapper}>
                  <Image
                    src={"/image_new/image61.png"}
                    height={28}
                    width={22}
                    alt="Community Icon"
                  />
                </div>
                <div className={paymentStyle.image_wrapper}>
                  <Image
                    src={"/image_new/image62.png"}
                    height={28}
                    width={20}
                    alt="Community Icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "24px",
            borderTop: "1px solid rgba(128, 128, 128, 0.2)", // Gray with 20% opacity
            borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
            padding: "10px 0",
          }}
        >
          <div>
            <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
              Gaming License
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "40px",
                marginTop: "8px",
              }}
            >
              <div className={styles.serviceItem}>
                <Image
                  src={"/image_new/image65.png"}
                  height={60}
                  width={76}
                  alt="Customer Support"
                />
              </div>
            </div>
          </div>
          <div style={{ marginRight: "20px" }}>
            <p style={{ color: "#ff8a14", fontSize: "12.48px" }}>
              App Download
            </p>
            <div
              style={{
                gap: "40px",
              }}
            >
              <Image
                src={"/image_new/image43.png"}
                height={160}
                width={100}
                alt="Customer Support"
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "24px",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div>
            <Image
              src={"/images/providersnew/fastbet.png"}
              height={60}
              width={70}
              alt="Customer Support"
            />
          </div>
          <div>
            <p
              style={{
                color: "#ff8a14",
                fontSize: "12.48px",
                lineHeight: "16px",
              }}
            >
              Catch the winning buzz
            </p>
            <p
              style={{
                color: "#ffffff80",
                fontSize: "11.44px",
                lineHeight: "16px",
              }}
            >
              © 2025 Casinoxy. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSection;
