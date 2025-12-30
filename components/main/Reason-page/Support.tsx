import React from "react";
import LottieloaderSupport from "./LottieloaderSupport";
import Link from "next/link";
export default function Support() {
  return (
    <div className=" z-30 support bg-white shadow-sm border border-neutral-500/10 items-end md:items-center /bg-white gap-8 /px- shadow-lg/ rounded-lg overflow-hidden /mx-5 /shadow-md relative">
      <div className="absolute top-3 right-5">
        <LottieloaderSupport />
      </div>
      {/* <div className="flex h-full bg-blue-700/10">
        <div
          className="count hidden md:block text-[7rem] font-black text-blue-100 font-sans mr-6"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          4
        </div>{" "}
        <LottieloaderSupport />
      </div> */}
      <div className="text-cont py-8 px-8 /md:px-12 flex /items-center h-full order-last md:order-none">
        {" "}
        <div>
          {" "}
          <div className="icon rounded-full bg-purple-500/5 text-purple-500 py-2 px-3 inline-flex items-center text-xs font-medium gap-2 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
                clipRule="evenodd"
              />
            </svg>

            <p>Support</p>
          </div>
          <div className="name font-bold mt-2 text-lg /pr-2 text-neutral-600">
            Responsive Support
          </div>
          <div className="desc mt-4 md:mt-2 font-medium text-sm text-neutral-500  /font-semibold /p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, we prioritize customer satisfaction
            above all else. Our dedicated team is here to listen to your
            feedback, address your concerns, and provide personalized support
            every step of the way. Whether you have questions about your
            account, need assistance with a transaction, or want to explore new
            banking features, we’re here to help.
          </div>
          <div className="flex/ hidden">
            {" "}
            <Link
              href="#"
              className="flex h-12 bg-base-color/80 items-center justify-center gap-x-2 mt-8 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>{"Get Support"}</p>{" "}
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
      </div>{" "}
      {/* <div className="image h-full bg-blue-700/10 order-first md:order-none">
        <Image
          src={"/assets/supportwcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full rounded-xl"
        />
        <LottieloaderSupport />
      </div> */}
    </div>
  );
}
