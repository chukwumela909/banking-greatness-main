"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useColors } from "@/context/colorContext";

export default function PaymentSelect() {
  const colors = useColors();

  return (
    <div className="container mx-auto  max-w-md px-4 py-12">
      <div className="space-y-6">
        <div className="text-/">
          <h1 className="text-2xl font-bold dark:text-neutral-700">
            Choose Your Deposit Method
          </h1>
          <p className="text-muted-foreground text-sm mt-2 font-medium">
            An account opening deposit of{" "}
            <span className="font-semibold">$550</span> is required. Select your
            preferred way to pay
          </p>
        </div>
        <RadioGroup defaultValue="branch" className="space-y-4 dark:bg-white">
          <div className="flex cursor-pointer bg-white dark:border-neutral-200 dark:bg-white items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted dark:bg-neutral-100 text-muted-foreground">
              <BuildingIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-2">
              <RadioGroupItem
                value="branch"
                id="branch"
                className="peer sr-only"
              />
              <Label
                htmlFor="branch"
                className="text-lg font-bold /font-medium text-black/70"
              >
                Deposit at a Branch
              </Label>
              <p className="text-muted-foreground text-sm text-medium">
                Prefer face-to-face service? Visit one of our branches to make
                deposits with the help of our friendly staff. Experience
                personalized assistance and efficient transactions. Find a
                branch near you today.
              </p>
              <Link
                href="/auth/payment-means/location-search"
                className="inline-flex h-12 dark:text-white items-center gap-2 font-bold  rounded-md bg-primary px-4 py-2 text-sm fo/nt-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
                style={{ backgroundColor: colors.defaultblue }}
              >
                Branch Deposit <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex cursor-pointer bg-white dark:bg-white dark:border-neutral-200 items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground">
            <div className="flex h-12 w-12 items-center dark:bg-neutral-100 dark:border-neutral-200 justify-center rounded-full bg-muted text-muted-foreground">
              <CreditCardIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-2 ">
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label htmlFor="card" className="text-lg font-bold text-black/70">
                Deposit Via Mobile Deposit
              </Label>
              <p className="text-muted-foreground text-sm text-medium">
                Send money securely with mobile payment methods. Enjoy the
                convenience of instant transfers and peace of mind knowing your
                transactions are protected.
              </p>
              <Link
                style={{ backgroundColor: colors.defaultblue }}
                href="/auth/payment-means/mobile-deposit"
                className="inline-flex h-12 dark:text-white mt-20 items-center gap-2 font-bold rounded-md bg-primary px-4 py-2 text-sm f/ont-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Mobile Deposit <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BuildingIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CreditCardIcon(props: any) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
