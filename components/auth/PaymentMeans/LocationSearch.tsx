"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useColors } from "@/context/colorContext";
import { useState } from "react";
import animationData from "@/components/auth/verify/search.json";

import dynamic from "next/dynamic";
import Link from "next/link";
const Lottie = dynamic(() => import("lottie-react").then((m) => m.default), {
  ssr: false,
});
export default function LocationSearch() {
  const [zipcode, setZipCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showNotFound, setShowNotFound] = useState<boolean>(false);
  const [state, setState] = useState<string | null>(null);
  const colors = useColors();
  const US_STATES = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];
  const handlezipchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };
  const handleLoaders = () => {
    setLoading(true);
    setTimeout(() => {
      handleSwitchers();
    }, 7000);
  };

  const handleSwitchers = () => {
    setLoading(false);
    setShowNotFound(true);
  };
  return (
    <div className="flex flex-col bg-grid-blue-100 items-center justify-center w-full min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        {!showNotFound && loading && (
          <>
            <div className="flex /flex-col justify-center">
              <Lottie
                animationData={animationData}
                className="w-[90%] h-[13rem]"
              />
            </div>
            <div className="mt-6 font-medium text-center">
              {" "}
              Searching for a bank around{" "}
              <span className="font-bold">{state}</span>
            </div>
          </>
        )}
        {!loading && !showNotFound && (
          <>
            <div className="text-cen/ter mb-6 form-page">
              <h2 className="text-xl font-bold dark:text-neutral-700">
                Fill in the fields to discover our <br /> branches close to you
              </h2>
              <p className="text-muted-foreground text-sm py-2 dark:text-neutral-600">
                Find your nearest branch for in-person deposits. Locate
                convenient branch locations and experience personalized service.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => setState(value)}>
                  <SelectTrigger
                    id="state"
                    aria-label="State"
                    className="dark:bg-neutral-100 dark:border-neutral-200 dark:text-neutral-700"
                  >
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent className="dark:text-neutral-700 dark:bg-white dark:border-neutral-200">
                    <ScrollArea className="h-[250px] dark:bg-white dark:text-neutral-300">
                      {US_STATES.map((state) => (
                        <SelectItem
                          value={state.name}
                          className="font-medium"
                          key={state.abbreviation}
                        >
                          {state.abbreviation} - {state.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input
                  id="zipcode"
                  maxLength={6}
                  placeholder="10001"
                  value={zipcode}
                  className="dark:bg-neutral-100 dark:border-neutral-200 dark:text-neutral-600"
                  onChange={handlezipchange}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                disabled={zipcode == "" || !state || zipcode.length !== 6}
                onClick={() => handleLoaders()}
                style={{ background: colors.defaultblue }}
                className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700"
              >
                Discover <SearchIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        )}

        {showNotFound && (
          <>
            <div className="try-again-sect">
              <div className="largetext font-bold text-xl mb-2">No Result</div>
              <div className="text">
                {"We couldn't find a nearby bank around"} {state}{" "}
                {
                  "please try again using another location or use other payment methods provided"
                }
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => {
                    setShowNotFound(false);
                  }}
                  style={{
                    background: colors.defaultblue + "10",
                    color: colors.defaultblue,
                  }}
                  className="w-full font-bold mb-2 h-12 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Try again
                </Button>
                <Link href="/auth/payment-means">
                  <Button
                    style={{
                      background: colors.defaultblue,
                    }}
                    className="w-full font-bold h-12 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Use Mobile Payment
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
