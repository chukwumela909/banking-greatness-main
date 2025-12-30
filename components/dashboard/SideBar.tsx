"use client";
import Image from "next/image";
import React from "react";
import hero from "@/public/assets/capital-logo-light.svg";
import hero_dark from "@/public/assets/capital-logo-dark.svg";
import { useColors } from "@/context/colorContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Switch } from "../ui/switch";
import ControlCenter from "./controlCenter";

type navItems = {
  id: number;
  name: string;
  path: string;
  icon: any;
}[];
export default function SideBar() {
  const colors = useColors();
  const MotionLink = motion(Link);
  const pathname = usePathname();

  const nav: navItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M2.75 9a.75.75 0 0 1 .75.75v1.69l2.22-2.22a.75.75 0 0 1 1.06 1.06L4.56 12.5h1.69a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-3.5A.75.75 0 0 1 2.75 9ZM2.75 7a.75.75 0 0 0 .75-.75V4.56l2.22 2.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h1.69a.75.75 0 0 0 0-1.5h-3.5a.75.75 0 0 0-.75.75v3.5c0 .414.336.75.75.75ZM13.25 9a.75.75 0 0 0-.75.75v1.69l-2.22-2.22a.75.75 0 1 0-1.06 1.06l2.22 2.22H9.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-.75-.75ZM13.25 7a.75.75 0 0 1-.75-.75V4.56l-2.22 2.22a.75.75 0 1 1-1.06-1.06l2.22-2.22H9.75a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Deposit",
      path: "/dashboard/deposit",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M4.5 13a3.5 3.5 0 0 1-1.41-6.705A3.5 3.5 0 0 1 9.72 4.124a2.5 2.5 0 0 1 3.197 3.018A3.001 3.001 0 0 1 12 13H4.5Zm.72-5.03a.75.75 0 0 0 1.06 1.06l.97-.97v2.69a.75.75 0 0 0 1.5 0V8.06l.97.97a.75.75 0 1 0 1.06-1.06L8.53 5.72a.75.75 0 0 0-1.06 0L5.22 7.97Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Fixed",
      path: "/dashboard/fixed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M7.628 1.349a.75.75 0 0 1 .744 0l1.247.712a.75.75 0 1 1-.744 1.303L8 2.864l-.875.5a.75.75 0 0 1-.744-1.303l1.247-.712ZM4.65 3.914a.75.75 0 0 1-.279 1.023L4.262 5l.11.063a.75.75 0 0 1-.744 1.302l-.13-.073A.75.75 0 0 1 2 6.25V5a.75.75 0 0 1 .378-.651l1.25-.714a.75.75 0 0 1 1.023.279Zm6.698 0a.75.75 0 0 1 1.023-.28l1.25.715A.75.75 0 0 1 14 5v1.25a.75.75 0 0 1-1.499.042l-.129.073a.75.75 0 0 1-.744-1.302l.11-.063-.11-.063a.75.75 0 0 1-.28-1.023ZM6.102 6.915a.75.75 0 0 1 1.023-.279l.875.5.875-.5a.75.75 0 0 1 .744 1.303l-.869.496v.815a.75.75 0 0 1-1.5 0v-.815l-.869-.496a.75.75 0 0 1-.28-1.024ZM2.75 9a.75.75 0 0 1 .75.75v.815l.872.498a.75.75 0 0 1-.744 1.303l-1.25-.715A.75.75 0 0 1 2 11V9.75A.75.75 0 0 1 2.75 9Zm10.5 0a.75.75 0 0 1 .75.75V11a.75.75 0 0 1-.378.651l-1.25.715a.75.75 0 0 1-.744-1.303l.872-.498V9.75a.75.75 0 0 1 .75-.75Zm-4.501 3.708.126-.072a.75.75 0 0 1 .744 1.303l-1.247.712a.75.75 0 0 1-.744 0L6.38 13.94a.75.75 0 0 1 .744-1.303l.126.072a.75.75 0 0 1 1.498 0Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Transfer",
      path: "/dashboard/transfers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M8.75 6h-1.5V3.56L6.03 4.78a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06L8.75 3.56V6H11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.25v5.25a.75.75 0 0 0 1.5 0V6Z" />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Settings",
      path: "/dashboard/settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z" />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Support",
      path: "/dashboard/support",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="w-full h-screen overflow-scroll flex flex-col gap-y-1 /items-center j/ustify-center">
      <div className="side-bar-cont bg-white dark:bg-neutral-900 w-full  rounded-md px-4 py-2">
        <div className="mt-2 pb-6 w-full">
          {" "}
          <Image
            src={hero}
            alt=""
            width={1000}
            height={1000}
            quality={100}
            className="w-5/6 dark:hidden /opacity-80 mx-auto/"
          />
          <Image
            src={hero_dark}
            alt=""
            width={1000}
            height={1000}
            quality={100}
            className="w-5/6 dark:block hidden /opacity-80 mx-auto/"
          />
        </div>
        <div className="space-y-3 mt-4">
          <p className="font-semibold uppercase dark:text-neutral-400 text-neutral-700 text-xs">
            {" "}
            menu
          </p>
          <AnimatePresence>
            {nav.map((nav) => (
              <motion.div key={nav.path}>
                <MotionLink
                  href={nav.path}
                  key={nav.path}
                  // style={
                  //   nav.path === pathname
                  //     ? { color: colors.defaultblue }
                  //     : { display: "block" }
                  // }
                  className={`${
                    nav.path === pathname
                      ? `text-base-color/70 dark:text-blue-500 font-semibold rounded-md`
                      : " text-neutral-700/80 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700/60 dark:text-neutral-400   hover:opacity-100"
                  } cursor-pointer block /overflow-hidden rounded-md text-sm px-3 py-3 relative transition`}
                >
                  <motion.div>
                    <motion.div className="z-30 flex items-center gap-x-2">
                      {nav.icon}
                      <p>{nav.name}</p>
                    </motion.div>
                    {nav.path === pathname ? (
                      <motion.div
                        transition={{ type: "tween" }}
                        layoutId="underline"
                        className="absolute mover bg-[#0013BB06] dark:bg-blue-500/10 rounded-md top-0 left-0 w-full h-full z-10 "
                      ></motion.div>
                    ) : null}
                  </motion.div>
                </MotionLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-900 w-full h-full rounded-lg p-4">
        <p className="font-semibold uppercase mb-2 text-neutral-700 dark:text-neutral-400 text-xs">
          {" "}
          quick controls
        </p>
        <ControlCenter />
      </div>
    </div>
  );
}
