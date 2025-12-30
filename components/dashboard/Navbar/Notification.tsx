"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDistance } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import {
  deleteNotification,
  readNotifications,
} from "@/server/dashboard/navActions";
import { toast } from "sonner";
import { useFetchInfo } from "@/lib/data/fetchPost";

export default function Notification() {
  const { data } = useFetchInfo();
  const notifications = data!.data.notifications.reverse() || [];
  const readNotifs = data!.data.readNotification;
  let toastId: string;
  const { status, execute } = useAction(deleteNotification, {
    onSuccess({ data }) {
      toast.success("Notification deleted succesfully", {
        id: toastId,
        duration: 3000,
      });

      toast.dismiss(toastId);
    },

    onExecute() {
      toast.loading("Please wait, Deleting notification", {
        id: toastId,
      });
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with providers", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error deleting notification", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const deleteNotificationFn = (id: any) => {
    execute({ id });
  };
  const readNotification = async () => {
    if (readNotifs) return;
    await readNotifications();
  };
  return (
    <div className="relative flex items-center justify-center">
      <Popover>
        <PopoverTrigger
          className="/p-0 /m-0 relative"
          onClick={readNotification}
        >
          <div
            className={`notification transition-all md:bg-base-color/5 md:p-3 md:dark:bg-blue-500/10 cursor-pointer rounded-md  `}
            // style={{ backgroundColor: colors.darkdefualtblue + "08" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-5 md:size-4 text-base-color/80 dark:text-blue-500"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                clipRule="evenodd"
              />
            </svg>
            {!readNotifs && (
              <div className="absolute top-0 right-1 ">
                <div className="dot h-2 animate__animated rounded-full w-2 animate__repeat-3 bg-red-500 animate__flash"></div>
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="border-base-color/5 w-[350px] dark:border dark:border-neutral-800 dark:bg-neutral-900 mr-3 overflow-hidden md:mr-0 rounded-md md:w-[380px] /h-[400px] max-h-[400px] overflow-y-scroll /shadow-md">
          <div className="title text-sm font-semibold text-neutral-500 dark:text-neutral-300">
            Notifications
          </div>
          <div className="separator w-12 h-0.5 my-4 bg-black/10 dark:bg-neutral-800 mx-auto"></div>
          {notifications.length > 0 && (
            <div className="space-y-3">
              {" "}
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className="flex justify-between  items-center">
                    <div className="message&icon relative  flex items-start gap-x-4">
                      <div
                        className={`icon p-3 bg-base-color/5 dark:bg-blue-500/10 text-base-color/80 dark:text-blue-500 /border relative flex z-20 justify-center rounded-full `}
                      >
                        {/* ${
                        notification.status === "success"
                          ? "bg-green-600/5 text-green-600 border-green-600/30"
                          : notification.status === "warning"
                          ? "bg-yellow-600/5 text-yellow-600 border-yellow-600/30"
                          : notification.status === "failed"
                          ? "bg-red-600/5 text-red-600 border-red-600/30"
                          : "bg-neutral-100/50 text-neutral-700"
                      } */}
                        {notification.type === "card" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                            <path
                              fillRule="evenodd"
                              d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : notification.type === "neutral" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}

                        {/* {index < notifications.length - 1 && (
                          <div
                            className={`liner flex absolute h-10 w-[1px]  -z-10 -bottom-10 bg-base-color/5`}
                          ></div>
                        )} */}
                      </div>
                      <div className="message pb-2 pr-7 text-[13px] text-black dark:text-neutral-300 fon/t-medium">
                        {notification.message}
                        <div className="date mt-1 dark:text-neutral-500 font-medium /text-base-color/80">
                          {formatDistance(notification.dateAdded, new Date(), {
                            addSuffix: true,
                          })
                            .charAt(0)
                            .toUpperCase() +
                            formatDistance(notification.dateAdded, new Date(), {
                              addSuffix: true,
                            })
                              .slice(1)
                              .replace("Less than a minute ago", "Just now")}
                        </div>
                      </div>
                    </div>
                    <button
                      disabled={notification.id && status === "executing"}
                      onClick={() => deleteNotificationFn(notification.id)}
                      className="disabled:opacity-15 hover:bg-red-50 dark:hover:bg-red-500/10 p-1 transition-all rounded delete-notification  /bg-red-500/5 /p-3 text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
                        <path
                          fillRule="evenodd"
                          d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {index < notifications.length - 1 && (
                    <div className="separator w-full h-[1px] bg-black/5 dark:bg-neutral-800 mx-auto"></div>
                  )}
                </div>
              ))}
            </div>
          )}
          {notifications.length <= 0 && (
            <div className=" flex justify-center h-[300px] items-center">
              <div className="text-cont ">
                <div className="icon flex justify-center text-neutral-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="texts mt-1 font-medium text-sm text-neutral-500">
                  No new notifications
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
