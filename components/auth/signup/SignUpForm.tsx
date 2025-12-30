import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useColors } from "@/context/colorContext";
import { useSignUpContext } from "@/context/signUpFormContext";
import { signUpSchema } from "@/server/schema";
import { checkEmail } from "@/server/actions/checkEmail";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export default function SignUpForm({ setSteps }: { setSteps: any }) {
  const colors = useColors();
  let toastId: any;
  const { formData, setFormData } = useSignUpContext();

  interface SignUpFormData {
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const { status, execute } = useAction(checkEmail, {
    onSuccess({ data }) {
      if (data?.exists)
        toast.error("A User with this credentials exists", {
          id: toastId,
          duration: 3000,
        });

      if (!data?.exists) {
        toast.success("Credentials Validated", {
          id: toastId,
          duration: 3000,
        });
        setSteps(1);
      }
      toast.dismiss(toastId);
    },
    onExecute() {
      toast.loading("Checking credentials...", {
        id: toastId,
      });
    },
    onError(error) {
      if (error.error.fetchError)
        toast.error("Error checking credentials", {
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

  const onSubmit = async (data: SignUpFormData) => {
    execute(data);
    setFormData(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Controller
            name="firstName"
            control={control}
            defaultValue={formData.firstName || ""}
            render={({ field }) => (
              <Input
                id="first-name"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                placeholder="John"
              />
            )}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm font-medium">
              {String(errors.firstName.message)}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Controller
            name="lastName"
            control={control}
            defaultValue={formData.lastName || ""}
            render={({ field }) => (
              <Input
                id="last-name"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputChange(e);
                }}
                placeholder="Doe"
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm font-medium">
              {String(errors.lastName.message)}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          defaultValue={formData.email || ""}
          render={({ field }) => (
            <Input
              id="email"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange(e);
              }}
              type="email"
              className="lowercase"
              placeholder="m@example.com"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-sm font-medium">
            {String(errors.email.message)}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Controller
          name="phone"
          control={control}
          defaultValue={formData.phone || ""}
          render={({ field }) => (
            <Input
              id="phone"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange(e);
              }}
              placeholder="+1 (555) 555-5555"
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm font-medium">
            {String(errors.phone.message)}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Controller
          name="dob"
          control={control}
          defaultValue={formData.dob || ""}
          render={({ field }) => (
            <Input
              id="dob"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleInputChange(e);
              }}
              type="date"
            />
          )}
        />
        {errors.dob && (
          <p className="text-red-500 text-sm font-medium">
            {String(errors.dob.message)}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={status === "executing"}
        style={{ background: colors.defaultblue }}
        className="w-full h-12 disabled:opacity-40"
      >
        Proceed <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-gray-900 hover:underline dark:text-gray-50"
          prefetch={false}
        >
          Login
        </Link>
      </div>
    </form>
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
