import React from "react";
import LottieLoaderUpdate from "./LottieLoaderUpdate";
import Link from "next/link";
export default function Update() {
  return (
    <div className=" z-30 update bg-white shadow-sm border border-neutral-500/10 items-end md:items-center /bg-white gap-8 /px- shadow-lg/ rounded-lg overflow-hidden /mx-5 /shadow-md ">
      <div className="text-cont py-8 px-8 /md:px-12 flex /items-center h-full order-last md:order-none relative">
        <div className="absolute top-3 right-5">
          <LottieLoaderUpdate />
        </div>
        {/* <div className="h-2/6 w-4 mr-6 bg-blue-700 rounded-full overflow-hidden"></div> */}
        {/* <div
          className="count hidden md:block text-[7rem] font-black text-blue-100 font-sans mr-6"
          style={{
            color: colors.defaultblue + "25",
          }}
        >
          3
        </div> */}
        <div>
          {" "}
          <div className="icon rounded-full py-2 px-3 bg-cyan-500/5 text-cyan-500 font-semibold text-xs inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                clipRule="evenodd"
              />
            </svg>
            <p>Update</p>
          </div>
          <div className="name font-bold mt-2 /pr-2 text-lg text-neutral-600">
            Improvement & Innovations
          </div>
          <div className="desc mt-4 md:mt-2 /font-medium text-sm text-neutral-500 font-medium /p-2 rounded-sm pr-5 text-balance">
            At Wilson Investment Bank & Co, we are committed to innovation and
            continuous improvement. Our cutting-edge technology and digital
            solutions are constantly evolving to meet the changing needs of our
            customers.
          </div>
          <div className="flex/ hidden">
            {" "}
            <Link
              href="#"
              className="flex h-12 items-center bg-base-color/80 justify-center gap-x-2 mt-8 rounded-md px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              <p>{"Stay Updated"}</p>{" "}
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

      {/* <div className="image order-first bg-blue-700/5 h-full md:order-none">
        <Image
          src={"/assets/updatewcu.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full /rounded-xl"
        />
        <LottieLoaderUpdate />
      </div> */}
    </div>
  );
}
