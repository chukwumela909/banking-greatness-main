import React from "react";
import Link from "next/link";
import LottieLoaderPrivacy from "./LottieLoaderPrivacy";
export default function Privacy() {
  return (
    <div className="z-30 privacy bg-white shadow-sm border border-neutral-500/10 items-end md:items-center /bg-white gap-8 /px- shadow-lg/ rounded-lg overflow-hidden /mx-5 /shadow-md relative">
      <div className="absolute top-3 right-5">
        <LottieLoaderPrivacy />
      </div>
      <div className="text-cont py-8 px-8 /md:px-12 flex /items-center h-full order-last md:order-none">
        <div>
          {" "}
          <div className="icon inline-flex rounded-full py-2 bg-base-color/5 text-base-color px-3 text-xs font-semibold   items-center gap-x-2 /justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.75Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p>Privacy</p>
          </div>
          <div className="name font-bold mt-2 text-lg text-neutral-600">
            Private and Secured
          </div>
          <div className="desc mt-4 md:mt-2 font-medium md:pr-6 md:text-balance text-sm text-neutral-500 /font-semibold /p-2 rounded-sm /text-balance">
            At Wilson Investment Bank & Co, your privacy and securities are our
            top priorities. With state-of-the-art encryption technology,
            multi-factor authentication, and continuous monitoring, we ensure
            that your sensitive information and transactions are safeguarded at
            every step.
          </div>
          <div className="flex">
            {" "}
            <Link
              href="/auth/signup"
              className="/flex rounded-full hidden bg-base-color/80 h-12 items-center justify-center gap-x-2 mt-8 px-8 text-sm /font-medium font-bold text-gray-50"
            >
              <p>{"Stay Secured"}</p>{" "}
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
    </div>
  );
}
