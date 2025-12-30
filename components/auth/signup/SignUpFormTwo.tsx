import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";
import { z } from "zod";
import { useSignUpContext } from "@/context/signUpFormContext";
import { useRouter } from "next/navigation";
import { checkSsn } from "@/server/actions/checkEmail";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createUser } from "@/server/actions/createUser";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

// Define an interface for the component props
interface SignUpFormTwoProps {
  setSteps: (stepUpdater: (prevStep: number) => number) => void;
}

// Define an interface for the form data
interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  accountType: "savings" | "checking";

  motherMaidenName?: string;
  ssn?: string;
  password?: string;
  confirmPassword?: string;
}

// Define the Zod schema for form validation
const schema = z
  .object({
    motherMaidenName: z.string().min(1, "Mother's maiden name is required."),
    ssn: z
      .string()
      .min(9, "Invalid ssn, check again")
      .max(9, "Invalid ssn, check again"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirmation password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const SignUpFormTwo: React.FC<SignUpFormTwoProps> = ({ setSteps }) => {
  const router = useRouter();
  let toastId: any;
  const [signUp, setSignUp] = useState<boolean>(false);
  let toastId2: any;
  const colors = useColors();
  const { formData, setFormData } = useSignUpContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };
  const handleSelectValueChange = (value: "savings" | "checking") => {
    setFormData({ accountType: value });
    console.log(formData);
  };
  const { status: createUserStatus, execute: exec } = useAction(createUser, {
    onSuccess({ data }) {
      if (data?.success)
        toast.success("Account created, redirecting...", {
          id: toastId2,
          duration: 3000,
        });
      toast.dismiss(toastId2);
      router.push("/auth/verify/signup-verification");
      localStorage.setItem("email", JSON.stringify(formData.email));
    },
    onExecute() {
      toast.loading("Creating account...", {
        id: toastId2,
      });
    },
    onError(error) {
      if (error.error.fetchError)
        toast.error("Error creating account", {
          id: toastId2,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId2,
        });
      if (error.error.validationErrors)
        toast.error("Please check your details  and try again", {
          id: toastId2,
        });

      toast.dismiss(toastId2);
    },
  });

  const { status, execute } = useAction(checkSsn, {
    onSuccess({ data }) {
      if (data?.exists)
        toast.error("SSN already exists", {
          id: toastId,
          duration: 3000,
        });

      if (!data?.exists) {
        toast.success("SSN Validated", {
          id: toastId,
          duration: 3000,
        });

        setSignUp(true);
      }

      toast.dismiss(toastId);
    },
    onExecute() {
      toast.loading("Please wait...", {
        id: toastId,
      });
    },
    onError(error) {
      if (error.error.fetchError)
        toast.error("Error checking SSN", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Please check your details", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const onSubmit = async (data: FormData) => {
    await setFormData(data);
    execute(data);
  };
  useEffect(() => {
    if (signUp) exec(formData);
  }, [exec, formData, signUp]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-0.5">
        <Label htmlFor="mother-maiden-name">{"Mother's Maiden Name"}</Label>
        <Input
          id="mother-maiden-name"
          {...register("motherMaidenName")}
          onChange={handleInputChange}
          value={formData.motherMaidenName || ""}
          placeholder="Martha"
          required
        />
        {errors.motherMaidenName && (
          <p className="text-red-500">{errors.motherMaidenName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="ssn">{"Ssn"}</Label>
        <Input
          id="ssn"
          type="number"
          {...register("ssn")}
          maxLength={9}
          onChange={handleInputChange}
          value={formData.ssn || ""}
          placeholder="xxxxxxxxxxx"
          required
        />
        {errors.ssn && <p className="text-red-500">{errors.ssn.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountType">Select an account</Label>

        <Select
          defaultValue={formData.accountType || ""}
          onValueChange={handleSelectValueChange}
          required
        >
          <SelectTrigger id="accountType" className="font-medium">
            <SelectValue
              placeholder="Select an account"
              className="font-medium"
            />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="savings">Savings</SelectItem>
            <SelectItem value="checking">Checking</SelectItem>
          </SelectContent>
        </Select>
        {errors.accountType && (
          <p className="text-red-500 text-sm font-medium">
            Please select an account
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          onChange={handleInputChange}
          value={formData.password || ""}
          required
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          // onChange={handleInputChange}
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="mt-3 flex justify-between items-center">
        <Button
          type="button"
          id="previous"
          onClick={() => setSteps((prev: number) => prev - 0.8)}
          style={{
            background: colors.defaultblue + "10",
            color: colors.defaultblue,
          }}
          className="/w-full h-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button
          type="submit"
          disabled={
            status === "executing" ||
            createUserStatus === "executing" ||
            formData.accountType === "" ||
            !formData.accountType
          }
          style={{ background: colors.defaultblue }}
          className="/w-full h-12 px-7 disabled:opacity-40"
        >
          <p className="pr-3 font-bold">Finish</p>{" "}
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
        </Button>
      </div>{" "}
      {/* <div className="text-sm text-gray-500 dark:text-gray-400">
        Have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-gray-900 hover:underline dark:text-gray-50"
          prefetch={false}
        >
          Login
        </Link>
      </div> */}
    </form>
  );
};

export default SignUpFormTwo;
