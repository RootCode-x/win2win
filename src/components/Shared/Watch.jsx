"use client";

import React, { useState, useEffect } from "react";

const Watch = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    };

    updateTime(); // Set the initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return <div style={{ marginTop: "3px" }}>{time}</div>;
};

export default Watch;
