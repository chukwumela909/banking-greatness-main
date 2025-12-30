"use client";
import React, { useEffect, useState } from "react";
import { useColors } from "@/context/colorContext";
import { usePathname } from "next/navigation";
import hero from "@/public/assets/capital-logo-light.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const MotionLink = motion(Link);
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    // Show button when the user scrolls beyond 100 pixels
    if (window.scrollY > 80) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  type navItems = {
    id: number;
    name: string;
    path: string;
    className: string;
  }[];
  const pathname = usePathname();
  const nav: navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
      className: " ",
    },
    {
      id: 2,
      name: "Contacts",
      path: "/contact",
      className: "",
    },
    {
      id: 3,
      name: "About",
      path: "#",
      className: "",
    },
    {
      id: 4,
      name: "Resources",
      path: "#",
      className: "",
    },
    {
      id: 5,
      name: "Lending",
      path: "#",
      className: "",
    },
    {
      id: 6,
      name: "Help center",
      path: "#",
      className: "",
    },
  ];
  const colors = useColors();
  return (
    <div
      className={`nav_cont transition-all z-50  ${
        showButton
          ? "border-b bg-white py-5  md:py-3 "
          : "bg-gradient-to-b pb-12 pt-5 md:pt-3 from-white via-white to-transparent border-0"
      }  fixed top-0 w-full dark:border-neutral-100 px-10 flex justify-between md:grid items-center text-sm md:grid-cols-12 `}
      // style={{ background: colors.defaultblu }}
    >
      <div className="logo col-span-1 font-bold ">
        <Image
          src={hero}
          alt=""
          width={1000}
          height={1000}
          quality={100}
          className="w-full /opacity-80 /mx-auto/"
        />
      </div>
      <div className="menu lg:col-span-9 md:col-span-8 justify-center  hidden md:flex gap-x-2   items-center">
        <AnimatePresence>
          {nav.map((nav) => (
            <motion.div
              key={nav.path}
              className={`${
                nav.path === pathname
                  ? `font-bold text-base-color/80 rounded-full`
                  : " text-neutral-500 hover:opacity-100 font-medium"
              } cursor-pointer /overflow-hidden  text-sm py-1 p px-1 relative transition ${
                nav.className
              }`}
            >
              <MotionLink href={nav.path}>
                <motion.p className="z-30">{nav.name}</motion.p>
                {nav.path === pathname ? (
                  <motion.div
                    transition={{ type: "tween" }}
                    layoutId="underline"
                    className="absolute mover flex justify-center items-end rounded-full top-0 left-0 w-full h-full z-10"
                  >
                    <motion.div className="inner bg-base-color/50 rounded-xl bottom-0 left-0 h-0.5 w-1/3 "></motion.div>
                  </motion.div>
                ) : null}
              </MotionLink>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Link
        href={"/auth/login"}
        className="cta lg:col-span-2 md:col-span-2 hidden md:flex  items-center gap-2"
      >
        <div className="text-nowrap font-bold text-neutral-500 px-5 py-3 rounded-full bg-neutral-100 cursor-pointer hover:opacity-90 transition-all">
          Sign-in
        </div>
        <div className="text-nowrap px-5 py-3 rounded-full font-bold bg-base-color/80 text-white cursor-pointer hover:opacity-90 transition-all">
          Get Started
        </div>
      </Link>
      <div className="sidemenu md:hidden">
        <Sheet>
          <SheetTrigger>
            <div
              className="icon text-white"
              style={{ color: colors.defaultblue }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </SheetTrigger>{" "}
          <SheetContent
            className="border-none dark:bg-white /relative  w-[80%]"
            side={"left"}
          >
            {" "}
            <SheetHeader>
              {" "}
              <div className="logo flex justify-center  font-bold">
                <Image
                  src={hero}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-4/6 "
                />{" "}
              </div>{" "}
            </SheetHeader>
            <div className="mt-20">
              <p className="uppercase font-semibold mb-5 /80 text-sm">MENU</p>
              <AnimatePresence>
                {nav.map((nav) => (
                  <motion.div
                    key={nav.path}
                    className={`${
                      nav.path === pathname
                        ? `font-semibold text-base-color/80 rounded-xl`
                        : "text-neutral-500 font-semibold"
                    } cursor-pointer /overflow-hidden text-sm  px-5 py-3 relative transition`}
                  >
                    <MotionLink href={nav.path}>
                      <motion.p className="z-30">{nav.name}</motion.p>
                      {nav.path === pathname ? (
                        <motion.div
                          transition={{ type: "spring" }}
                          layoutId="underline"
                          className="absolute mover flex items-center  rounded-xl/ top-0 left-0 w-full h-full z-10"
                        >
                          <motion.div className="inner bg-base-color/80 rounded-xl left-0 h-1/3 w-0.5 "></motion.div>
                        </motion.div>
                      ) : null}
                    </MotionLink>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="cta grid grid-cols-1  absolute bottom-4 text-sm left-0 w-full px-5 text-center">
              <Link
                href={"/auth/login"}
                // style={{ background: colors.defaultblue }}

                className=" px-5 py-3 mb-/6 w-full  rounded-xl  font-semibold bg-neutral-100 text-neutral-500 /text-white cursor-pointer transition-all"
              >
                Sign-in
              </Link>
              <Link
                href={"/auth/signup"}
                className="mt-2 px-5 py-3 rounded-xl font-semibold text-white cursor-pointer hover:opacity-90 transition-all"
                style={{ background: colors.darkdefualtblue }}
              >
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
