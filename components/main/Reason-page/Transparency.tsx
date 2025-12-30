"use client";
import { useColors } from "@/context/colorContext";
import React from "react";
import LottieloaderTransperency from "./LottieloaderTransparency";
import Link from "next/link";
export default function Transparency() {
  return (
    <div className=" z-30 transparency bg-white shadow-sm border border-neutral-500/10 items-end md:items-center /bg-white gap-8 /px- shadow-lg/ rounded-lg overflow-hidden /mx-5 /shadow-md relative">
      <div className="absolute top-3 right-5">
        <LottieloaderTransperency />
      </div>
      {/* <div className="flex h-full">
        <div
          className="count hidden md:block text-[7rem] font-black text-blue-100 font-sans mr-6"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          2
        </div>
    
      </div> */}
      <div className="text-cont py-8 px-8 /md:px-12 flex /items-center h-full order-last md:order-none">
        {" "}
        {/* <div className="h-2/6 w-4 mr-6 bg-blue-700 rounded-full overflow-hidden"></div>{" "} */}
        <div>
          {" "}
          <div className="icon gap-x-2 bg-green-500/5 text-green-500 p-2 inline-flex rounded-full py-2 px-3 text-xs font-semibold items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="M13.024 9.25c.47 0 .827-.433.637-.863a4 4 0 0 0-4.094-2.364c-.468.05-.665.576-.43.984l1.08 1.868a.75.75 0 0 0 .649.375h2.158ZM7.84 7.758c-.236-.408-.79-.5-1.068-.12A3.982 3.982 0 0 0 6 10c0 .884.287 1.7.772 2.363.278.38.832.287 1.068-.12l1.078-1.868a.75.75 0 0 0 0-.75L7.839 7.758ZM9.138 12.993c-.235.408-.039.934.43.984a4 4 0 0 0 4.094-2.364c.19-.43-.168-.863-.638-.863h-2.158a.75.75 0 0 0-.65.375l-1.078 1.868Z" />
              <path
                fillRule="evenodd"
                d="m14.13 4.347.644-1.117a.75.75 0 0 0-1.299-.75l-.644 1.116a6.954 6.954 0 0 0-2.081-.556V1.75a.75.75 0 0 0-1.5 0v1.29a6.954 6.954 0 0 0-2.081.556L6.525 2.48a.75.75 0 1 0-1.3.75l.645 1.117A7.04 7.04 0 0 0 4.347 5.87L3.23 5.225a.75.75 0 1 0-.75 1.3l1.116.644A6.954 6.954 0 0 0 3.04 9.25H1.75a.75.75 0 0 0 0 1.5h1.29c.078.733.27 1.433.556 2.081l-1.116.645a.75.75 0 1 0 .75 1.298l1.117-.644a7.04 7.04 0 0 0 1.523 1.523l-.645 1.117a.75.75 0 1 0 1.3.75l.644-1.116a6.954 6.954 0 0 0 2.081.556v1.29a.75.75 0 0 0 1.5 0v-1.29a6.954 6.954 0 0 0 2.081-.556l.645 1.116a.75.75 0 0 0 1.299-.75l-.645-1.117a7.042 7.042 0 0 0 1.523-1.523l1.117.644a.75.75 0 0 0 .75-1.298l-1.116-.645a6.954 6.954 0 0 0 .556-2.081h1.29a.75.75 0 0 0 0-1.5h-1.29a6.954 6.954 0 0 0-.556-2.081l1.116-.644a.75.75 0 0 0-.75-1.3l-1.117.645a7.04 7.04 0 0 0-1.524-1.523ZM10 4.5a5.475 5.475 0 0 0-2.781.754A5.527 5.527 0 0 0 5.22 7.277 5.475 5.475 0 0 0 4.5 10a5.475 5.475 0 0 0 .752 2.777 5.527 5.527 0 0 0 2.028 2.004c.802.458 1.73.719 2.72.719a5.474 5.474 0 0 0 2.78-.753 5.527 5.527 0 0 0 2.001-2.027c.458-.802.719-1.73.719-2.72a5.475 5.475 0 0 0-.753-2.78 5.528 5.528 0 0 0-2.028-2.002A5.475 5.475 0 0 0 10 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p>Transparency</p>
          </div>
          <div className="name font-bold mt-2 text-lg /pr-2 text-neutral-600">
            Transparency & Trust
          </div>
          <div className="desc mt-4 md:mt-2 font-medium text-sm text-neutral-500  /font-semibold /p-2 rounded-sm text-balance">
            At Wilson Investment Bank & Co, transparency is paramount. We
            provide clear and concise information about our fees, terms. and
            policies, ensuring you have full visibility into your banking
            experience. Additionally, our dedicated team of professionals is
            committed to providing honest and reliable assistance whenever you
            need it.
          </div>
          <div className="flex/ hidden">
            {" "}
            <Link
              href="#"
              className="flex h-12 items-center justify-center gap-x-2 mt-8 bg-base-color/80 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>{"Let's Sign"}</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
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
      </div>
      {/* <div className="image order-first md:order-none h-full bg-blue-700/5">
         <Image
          src={"/assets/transparencywcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full /rounded-xl"
        /> 
        <LottieloaderTransperency />
      </div> */}
    </div>
  );
}
