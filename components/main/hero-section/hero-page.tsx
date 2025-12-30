"use client";
import Image from "next/image";
import React from "react";
import heroImg from "@/public/assets/bankImage.jpg";
import CountUp from "react-countup";
import { Inter } from "next/font/google";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";
const inter = Inter({
  subsets: ["latin"],
});
const words = ["Financial", "Secured", "Wealth", "Banking"];
export default function Hero() {
  type bankData = {
    id: number;
    name: string;
    plus: string;
    number: number;
    classname: string;
    icon: any;
  }[];

  const bData: bankData = [
    {
      id: 1,
      name: "Years of Experience",
      plus: "Y+",
      number: 4,
      classname: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Active Customers",
      plus: "+",
      number: 2000,
      classname: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Monthly Volume",
      plus: "M",
      number: 10,
      classname: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Worldwide Trustees",
      plus: "",
      number: 12,
      classname: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.638 1.093a.75.75 0 0 1 .724 0l2 1.104a.75.75 0 1 1-.724 1.313L10 2.607l-1.638.903a.75.75 0 1 1-.724-1.313l2-1.104ZM5.403 4.287a.75.75 0 0 1-.295 1.019l-.805.444.805.444a.75.75 0 0 1-.724 1.314L3.5 7.02v.73a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .388-.657l1.996-1.1a.75.75 0 0 1 1.019.294Zm9.194 0a.75.75 0 0 1 1.02-.295l1.995 1.101A.75.75 0 0 1 18 5.75v2a.75.75 0 0 1-1.5 0v-.73l-.884.488a.75.75 0 1 1-.724-1.314l.806-.444-.806-.444a.75.75 0 0 1-.295-1.02ZM7.343 8.284a.75.75 0 0 1 1.02-.294L10 8.893l1.638-.903a.75.75 0 1 1 .724 1.313l-1.612.89v1.557a.75.75 0 0 1-1.5 0v-1.557l-1.612-.89a.75.75 0 0 1-.295-1.019ZM2.75 11.5a.75.75 0 0 1 .75.75v1.557l1.608.887a.75.75 0 0 1-.724 1.314l-1.996-1.101A.75.75 0 0 1 2 14.25v-2a.75.75 0 0 1 .75-.75Zm14.5 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-.388.657l-1.996 1.1a.75.75 0 1 1-.724-1.313l1.608-.887V12.25a.75.75 0 0 1 .75-.75Zm-7.25 4a.75.75 0 0 1 .75.75v.73l.888-.49a.75.75 0 0 1 .724 1.313l-2 1.104a.75.75 0 0 1-.724 0l-2-1.104a.75.75 0 1 1 .724-1.313l.888.49v-.73a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
  return (
    <div
      className="cont h-screen b/g-gray-100 w-full overflow-hidden"
      id="home"
    >
      {/* <BackgroundBeams /> */}
      <div className="imageCont  relative w-full h-full">
        <div className="w-full h-full absolute top0">
          <Image
            alt=""
            src={heroImg}
            className=" h-full w-full object-cover"
            width={1000}
            height={1000}
          />
        </div>
        <div className="itemsCont absolute z-10 top-0 left-0 w-full h-full">
          <div className="inner-cont grid grid-cols-1 /h-[80%] w-[90%] md:w-[97%] mx-auto lg:w-full lg:mx-0 /text-center lg:text-left lg:grid-cols-2 lg:h-[100%] h-[55%] md:h-[60%] px-1 md:px-16 items-end lg:items-center">
            <div className="textcont lg:pl-4 lg:pr-7">
              <div className="large-text font-bold text-2xl sm:text-3xl md:text-5xl md:pr-40 lg:pr-0 text-balance text-black/80">
                Start your
                {/* <br className="hidden" />{" "} */}
                <FlipWords
                  words={words}
                  className="text-base-color/80 dark:text-base-color/80"
                />{" "}
                <br className="" /> Journey with exceptional service
              </div>
              <div className="sub-text /text-sm  rounded-md text-neutral-600 md:text-base text-sm/ pr-20 md:pr-40 lg:pr-0 font-medium md:mt-5 mt-3  text-balance ">
                Experience a new era of everyday banking, offering seamless and
                personalized solutions meticulously designed to meet all your
                financial needs and aspirations.
              </div>
              <div className="cta flex  items-center lg:justify-start   mt-8 text-sm gap-2 md:gap-4">
                <Link
                  href={"/auth/signup"}
                  className="register px-6 py-4 rounded-full font-bold bg-base-color/80 text-white flex items-center gap-3 cursor-pointer hover:bg-[#]"
                >
                  <p>Get Started</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 hidden md:block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href={"/auth/login"}
                  className="login px-6 py-4 rounded-full text-neutral-600 bg-neutral-50  font-bold md:flex items-center gap-3 cursor-pointer hover: transition-all"
                >
                  <p>Sign-in</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 hidden md:block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="inner_cont2 mt-8 md:mt-0 hidden md:px-16 px-5 lg:grid lg:grid-cols-2  gap-3  items-center justify-center w-full">
              {bData.map((data) => (
                <div
                  className="rounded-xl md:p-4 p-2  bg-[#ffffffc1] backdrop-filter backdrop-blur-md md:w-44 lg:w-full flex flex-col justify-center"
                  key={data.id}
                >
                  <div className="icon-cont text-base-color/80 bg-base-color/5 p-2 h-11 mx-auto flex items-center justify-center w-11 rounded-full ">
                    {data.icon}
                  </div>
                  <div className="number-cont text-center  text-black/90 mt-3 font-bold ext-sm md:text-base">
                    <p className={inter.className}>
                      <CountUp end={data.number} duration={5} />
                      {data.plus}
                    </p>
                  </div>
                  <div className="text-cont mt-1 md:mt-0 px-2 md:px-0 /text-balance text-sm text-center font-semibold  text-black/60">
                    {data.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="inner_cont2 md:h-[30%] mt-16 md:mt-0 lg:hidden md:px-16 px-5 grid grid-cols-2 md:flex gap-3  items-center justify-center w-full">
            {bData.map((data) => (
              <div
                className="rounded-xl md:p-4 p-2  bg-[#ffffffc1] backdrop-filter backdrop-blur-md md:w-44 flex flex-col justify-center"
                key={data.id}
              >
                <div className="icon-cont text-base-color/80 bg-base-color/5 p-2 h-11 mx-auto flex items-center justify-center w-11 rounded-full ">
                  {data.icon}
                </div>
                <div className="number-cont text-center  text-black/90 mt-3 font-bold text-sm md:text-base">
                  <p className={inter.className}>
                    <CountUp end={data.number} duration={5} />
                    {data.plus}
                  </p>
                </div>
                <div className="text-cont mt-1 md:mt-0 px-2 md:px-0 /text-balance text-xs text-center font-semibold text-black/60 /text-neutral-400">
                  {data.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
