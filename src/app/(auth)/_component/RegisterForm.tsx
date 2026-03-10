"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";
import { useRegisterMutation } from "@/hooks/useAuthMutation";
import { AxiosError } from "axios";

export function RegisterForm() {
  const router = useRouter();
  const { mutate, isPending } = useRegisterMutation();
  const [message, setMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "BIDDER",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = (data: RegisterFormData) => {
    try {
      mutate(data, {
        onSuccess: () => {
          router.push("/login?registered=true");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setMessage(error.response?.data.errors);
            return;
          }
          setMessage(error.message);
        },
      });
    } catch (err) {
      console.error("Institutional registration failure:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      {message && (
        <div className="p-6 border border-zinc-200 bg-zinc-50 text-zinc-950 text-[11px] font-medium uppercase tracking-widest flex items-center justify-center text-center italic">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-8 md:gap-10">
        {/* Role Selection */}
        <div className="flex flex-col gap-4">
          <label className="meta-label block ml-1 text-zinc-400 font-medium tracking-widest">
            Account Specification
          </label>
          <div className="flex gap-8 border-b border-zinc-200 pb-2">
            {["BIDDER", "SELLER"].map((role) => (
              <label
                key={role}
                className={`flex-1 cursor-pointer transition-all duration-500 py-3 text-center text-[11px] font-medium tracking-[0.15em] ${
                  selectedRole === role
                    ? "text-black border-b border-black"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <input
                  {...register("role")}
                  type="radio"
                  value={role}
                  className="hidden"
                />
                {role}
              </label>
            ))}
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-4">
          <label className="meta-label block ml-1">Email Address</label>
          <input
            {...register("email")}
            type="email"
            placeholder="name@exclusive.com"
            className="editorial-input px-1 font-normal"
          />
          {errors.email && (
            <p className="meta-label text-zinc-400 mt-1 lowercase italic tracking-normal">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="flex flex-col gap-4">
          <label className="meta-label block ml-1">
            Preferred Handle
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="lux_connoisseur"
            className="editorial-input px-1 font-normal"
          />
          {errors.username && (
            <p className="meta-label text-zinc-400 mt-1 lowercase italic tracking-normal">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-4">
          <label className="meta-label block ml-1">Security Code</label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="editorial-input px-1 font-normal"
          />
          {errors.password && (
            <p className="meta-label text-zinc-400 mt-1 lowercase italic tracking-normal">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="btn-primary w-full flex items-center justify-center gap-6"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          <>
            INITIALIZE ACCOUNT
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
