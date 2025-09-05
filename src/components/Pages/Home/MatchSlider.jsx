"use client";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import {api_path} from '../../../lib/api_path';
import axios from 'axios';


// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';


export default function MatchSlider() {

  return (

    <>
  
    <Swiper
      slidesPerView={1}
      centeredSlides={false}
      slidesPerGroupSkip={1}
      grabCursor={true}
      keyboard={{
        enabled: true,
      }}
      breakpoints={{
        769: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
      }}
      scrollbar={true}
      navigation={false}
      pagination={{
        clickable: true,
      }}
      modules={[Keyboard, Scrollbar, Navigation, Pagination]}
      className="mySwiper"
    >
      {/* <SwiperSlide>
           <Image  src="/images/live match3.png" width={500} height={500} alt="Icon"  /> 
      </SwiperSlide> */}
      {/* <SwiperSlide>
           <Image  src="/images/live match4.png" width={500} height={500} alt="Icon"  /> 
      </SwiperSlide> */}

    </Swiper>
  </>


  );
}
