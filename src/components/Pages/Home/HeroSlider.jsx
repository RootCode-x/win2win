"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./slide_custom.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { api_path } from "../../../lib/api_path";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function TopSlider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api_path}/commonData?slidelist=true`);
      const newData = response.data;
      setImageData(newData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className={styles.hero_area__main}>
          <div
            className="row"
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 9500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={false}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              {/* {imageData.map((item, index) => (
                    <SwiperSlide key={index}> <img src={`${process.env.PUBLIC_URL}/images/${item.slideImage}`} /> </SwiperSlide>
                  ))} */}

              <SwiperSlide>
                {" "}
                <Image
                  src="/image_new/image30.jpg?V=1"
                  layout="responsive"
                  height={500}
                  width={1400}
                  alt="copy number"
                />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <Image
                  src="/image_new/image31.jpg?V=1"
                  layout="responsive"
                  height={500}
                  width={1400}
                  alt="copy number"
                />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <Image
                  src="/image_new/image32.jpg?V=1"
                  layout="responsive"
                  height={500}
                  width={1400}
                  alt="copy number"
                />{" "}
              </SwiperSlide>

              <div
                style={{ display: "none" }}
                className="autoplay-progress"
                slot="container-end"
              >
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  {/* <circle cx="24" cy="24" r="20"></circle> */}
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
