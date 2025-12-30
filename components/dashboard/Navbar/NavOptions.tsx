"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";
import { toast } from "sonner";
import { IUser } from "@/server/userSchema";
import { logout } from "@/server/dashboard/navActions";
import ControlCenter from "../controlCenter";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function NavOptions({ data }: { data: IUser }) {
  const datas = [
    {
      name: "Deposit",
      path: "/dashboard/deposit",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 text-green-500"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.25 6a.75.75 0 0 0-1.5 0v4.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V9.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Transfer",
      path: "/dashboard/transfers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 text-blue-500"
        >
          <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
        </svg>
      ),
    },
    {
      name: "Fixed",
      path: "/dashboard/fixed",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 text-base-color/80"
        >
          <path
            fillRule="evenodd"
            d="M11.622 1.602a.75.75 0 0 1 .756 0l2.25 1.313a.75.75 0 0 1-.756 1.295L12 3.118 10.128 4.21a.75.75 0 1 1-.756-1.295l2.25-1.313ZM5.898 5.81a.75.75 0 0 1-.27 1.025l-1.14.665 1.14.665a.75.75 0 1 1-.756 1.295L3.75 8.806v.944a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .372-.648l2.25-1.312a.75.75 0 0 1 1.026.27Zm12.204 0a.75.75 0 0 1 1.026-.27l2.25 1.312a.75.75 0 0 1 .372.648v2.25a.75.75 0 0 1-1.5 0v-.944l-1.122.654a.75.75 0 1 1-.756-1.295l1.14-.665-1.14-.665a.75.75 0 0 1-.27-1.025Zm-9 5.25a.75.75 0 0 1 1.026-.27L12 11.882l1.872-1.092a.75.75 0 1 1 .756 1.295l-1.878 1.096V15a.75.75 0 0 1-1.5 0v-1.82l-1.878-1.095a.75.75 0 0 1-.27-1.025ZM3 13.5a.75.75 0 0 1 .75.75v1.82l1.878 1.095a.75.75 0 1 1-.756 1.295l-2.25-1.312a.75.75 0 0 1-.372-.648v-2.25A.75.75 0 0 1 3 13.5Zm18 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.372.648l-2.25 1.312a.75.75 0 1 1-.756-1.295l1.878-1.096V14.25a.75.75 0 0 1 .75-.75Zm-9 5.25a.75.75 0 0 1 .75.75v.944l1.122-.654a.75.75 0 1 1 .756 1.295l-2.25 1.313a.75.75 0 0 1-.756 0l-2.25-1.313a.75.75 0 1 1 .756-1.295l1.122.654V19.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4 text-purple-500"
        >
          <path d="M10 3.75a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM17.25 4.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM5 3.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM4.25 17a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM17.25 17a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5h5.5ZM9 10a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1 0-1.5h5.5A.75.75 0 0 1 9 10ZM17.25 10.75a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5h1.5ZM14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM10 16.25a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
        </svg>
      ),
    },
  ];
  const handleAccountCopy = (_: string) => {
    navigator.clipboard.writeText(_);
    toast.success("Copied successfully");
  };
  return (
    <div className="flex justify-center items-center pl-1.5">
      <Popover>
        <PopoverTrigger>
          {" "}
          <div
            className="navoptions transition-all md:bg-base-color/5 md:dark:bg-blue-500/10 p-3 cursor-pointer rounded-md"
            // style={{ backgroundColor: colors.darkdefualtblue + "08" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 md:size-4 text-base-color/80 dark:text-blue-500"
            >
              <path d="M17 2.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5ZM17 15.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM3.75 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM4.5 2.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5ZM10 11a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 10 11ZM10.75 2.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM10 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.75 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM16.25 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            </svg>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] mr-2 md:mr-0 dark:bg-neutral-900 transition-all">
          <div className="account-section transition-all  cursor-pointer hover:bg-[#0013BB02] dark:hover:bg-neutral-800 p-2 rounded-md flex /pl-1 items-center space-x-2/ justify-between">
            <div className="flex space-x-1">
              <Avatar>
                {<AvatarImage src={data.profilePictureLink} />}
                <AvatarFallback className="font-bold text-sm border border-base-color/30 text-base-color/80 bg-base-color/5 dark:text-blue-500 dark:bg-blue-500/5 dark:border-blue-500/30">
                  {data.firstName.charAt(0).toUpperCase()}
                  {data.lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="pl-1">
                {" "}
                <div className="name  text-sm text-neutral-500 dark:text-neutral-300 font-semibold">
                  {data.firstName} {data.lastName}
                </div>
                <div className="account-type mt-0.5 text-xs font-medium text-neutral-400">
                  Checkings account
                </div>
              </div>
            </div>
            <div className="veification-status pl-3 font-medium text-sm">
              {!data.accountVerified && (
                <div
                  className={`badge bg-red-50/60 border dark:bg-red-400/10 dark:border-red-400/10 border-red-50 px-2 py-1.5 text-xs rounded-md font-semibold text-red-500  flex items-center space-x-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* <p className="hidden md:block">Not Verified</p> */}
                </div>
              )}
              {data.accountVerified && (
                <div
                  className={`badge bg-red-green/60 border dark:bg-green-400/10 dark:border-green-400/10 border-green-50 px-2 py-1.5 text-xs rounded-md font-semibold text-green-500  flex items-center space-x-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* <p className="hidden md:block">Verified</p> */}
                </div>
              )}
            </div>
          </div>
          <div className="separator w-14 h-[1px] my-4 bg-black/10 mx-auto"></div>

          <div className="account-deets mt-1 space-y-2">
            <div className="accountnumber flex justify-between items-center bg-[#0013BB06] dark:bg-neutral-800 p-3 rounded-sm">
              <div className="account&icon flex items-center gap-x-2">
                {/* <div className="icon  text-base-color/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M14 6H6v8h8V6Z" />
                    <path
                      fillRule="evenodd"
                      d="M9.25 3V1.75a.75.75 0 0 1 1.5 0V3h1.5V1.75a.75.75 0 0 1 1.5 0V3h.5A2.75 2.75 0 0 1 17 5.75v.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v.5A2.75 2.75 0 0 1 14.25 17h-.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-.5A2.75 2.75 0 0 1 3 14.25v-.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-.5A2.75 2.75 0 0 1 5.75 3h.5V1.75a.75.75 0 0 1 1.5 0V3h1.5ZM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div> */}
                <div className="info">
                  <div className="text-neutral-500 dark:text-neutral-300 font-med/ium text-xs">
                    Account number
                  </div>
                  <code
                    className={`accountno text-neutral-500/ dark:text-neutral-400   f/ont-medium text-neutral-600 text-sm /${inter.className}`}
                  >
                    {data.bankAccountNumber}
                  </code>
                </div>
              </div>
              <div
                onClick={() => handleAccountCopy(data.bankAccountNumber)}
                className="copy cursor-pointer text-base-color/80 dark:text-blue-500 dark:bg-blue-500/10 p-2 rounded-md bg-base-color/5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </div>
            </div>
            <div className="routingtnumber flex justify-between items-center bg-[#0013BB06] dark:bg-neutral-800  p-3 rounded-sm">
              <div className="routing&icon flex items-center gap-x-2">
                {/* <div className="icon  text-base-color/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M14 6H6v8h8V6Z" />
                    <path
                      fillRule="evenodd"
                      d="M9.25 3V1.75a.75.75 0 0 1 1.5 0V3h1.5V1.75a.75.75 0 0 1 1.5 0V3h.5A2.75 2.75 0 0 1 17 5.75v.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v.5A2.75 2.75 0 0 1 14.25 17h-.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-.5A2.75 2.75 0 0 1 3 14.25v-.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-.5A2.75 2.75 0 0 1 5.75 3h.5V1.75a.75.75 0 0 1 1.5 0V3h1.5ZM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div> */}
                <div className="info">
                  <div className="text-neutral-600  dark:text-neutral-300  font-me/dium text-xs">
                    Routing number
                  </div>
                  <code
                    className={`accountno text-neutral-500/  dark:text-neutral-400   /font-medium text-neutral-600 text-sm /${inter.className}`}
                  >
                    {data.bankRoutingNumber}
                  </code>
                </div>
              </div>
              <div
                onClick={() => handleAccountCopy(data.bankRoutingNumber)}
                className="copy cursor-pointer text-base-color/80 p-2 dark:text-blue-500 dark:bg-blue-500/10 rounded-md bg-base-color/5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* <div className="separator w-14 h-[1px] my-4 bg-black/10 mx-auto"></div> */}

          <div className="tt font-medium mt-4 text-sm text-neutral-600 dark:text-neutral-400">
            Quick <span className="/text-base-color/80">links</span>
          </div>
          <div className="account-info grid grid-cols-4 gap-1 mt-2">
            {datas.map((data) => (
              <Link
                href={data.path}
                key={data.path}
                className="flex items-center justify-center hover:bg-base-color/5 transition-all gap-2 p-3 bg-[#0013BB06] dark:bg-neutral-800 text-neutral-500 rounded-md"
              >
                <div className="text-neutral-500">{data.icon}</div>{" "}
                {/* <p className="text-sm font-medium">{data.name}</p> */}
              </Link>
            ))}
          </div>

          <div className="control-center">
            <div className="tt font-medium mt-2 text-sm mb-3 text-neutral-600 dark:text-neutral-400">
              Control <span className="/text-base-color/80">center</span>
            </div>
            <ControlCenter />
          </div>
          <div className="separator w-14 h-[1px] my-4 bg-black/10 mx-auto"></div>

          <div className="w-full md:block hidden border-base-color/40 dark:border-blue-500/40 border text-center font-bold text-base-color/80 dark:text-blue-500 rounded-sm mt-1 text-sm p-2">
            <Link href={"/dashboard/settings"}>Go to settings</Link>
          </div>
          <div className="w-full md:hidden  bg-red-500/10 py-3 cursor-pointer border border-red-500/20 text-center font-semibold text-red-500/80 rounded-sm mt-1 text-sm p-2">
            <div onClick={() => logout()}>Sign Out</div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
