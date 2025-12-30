"use client";
import React, { useState, useEffect } from "react";
import { Link as Lk } from "react-scroll";

export default function BTT() {
  const [showButton, setShowButton] = useState(false);
  const [windowsValue, setWindowsValue] = useState(0);

  const handleScroll = () => {
    // Show button when the user scrolls beyond 100 pixels
    setWindowsValue(window.scrollY);
    if (window.scrollY > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Lk
      to={"home"}
      spy={true}
      smooth={true}
      offset={-100}
      duration={500}
      className={`fixed bottom-10 animate__fadeInUp animate__faster animate__animated bg-base-color/80 left-10 rounded-full z-50 ${
        showButton
          ? "animate__animated animate__fadeInUp"
          : windowsValue <= 160
          ? "animate__animated animate__fadeOutDown"
          : "hidden"
      }
        `}
    >
      <div className="rounded-full cursor-pointer p-5 md:p-4 bg-base-color/80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5 text-white"
        >
          <path
            fillRule="evenodd"
            d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Lk>
  );
}
