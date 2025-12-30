import React from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const ToggleVisibility = ({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}) => (
  <Button
    type="button"
    className="bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 text-neutral-600 hover:bg-neutral-200"
    size="icon"
    onClick={onToggle}
  >
    {show ? (
      <EyeOffIcon className="h-4 w-4" />
    ) : (
      <EyeIcon className="h-4 w-4" />
    )}
  </Button>
);

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const maskSensitiveInfo = (
  info: string,
  visibleChars: number = 4
): string => {
  if (info.length <= visibleChars) return info;
  const maskedPart = "*".repeat(info.length - visibleChars);
  const visiblePart = info.slice(-visibleChars);
  return `${maskedPart}${visiblePart}`;
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    if (timeout) {
      clearTimeout(timeout);
    }

    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
};
