"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { useLoginMutation } from "@/hooks/useAuthMutation";
import { AxiosError } from "axios";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, isPending } = useLoginMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("Registration successful. Please sign in to access your vault.");
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setSuccess(null);
    setMessage(null);
    try {
      mutate(data, {
        onSuccess: () => {
          router.push("/auctions");
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            setMessage(error.response?.data.errors || error.message);
            return;
          }
          setMessage(error.message);
        },
      });
    } catch (err) {
      console.error("Institutional authentication failure:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      {message && (
        <div className="p-6 border border-zinc-200 bg-zinc-50 text-zinc-950 text-[11px] font-medium uppercase tracking-widest flex items-center justify-center text-center">
          {message}
        </div>
      )}
      {success && (
        <div className="p-6 border border-emerald-100 bg-emerald-50 text-emerald-950 text-[11px] font-medium uppercase tracking-widest flex items-center justify-center text-center">
          {success}
        </div>
      )}

      <div className="flex flex-col gap-8 md:gap-10">
        {/* Email Address */}
        <div className="flex flex-col gap-4">
          <label className="meta-label block ml-1">
            Vault Identifier (Email)
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="connoisseur@aureus.com"
            className="editorial-input px-1 font-normal"
          />
          {errors.email && (
            <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <label className="meta-label text-black">Access Code</label>
            <Link 
              href="/forgot-password" 
              className="meta-label text-zinc-400 hover:text-black transition-colors lowercase tracking-normal underline underline-offset-4 decoration-zinc-200"
            >
              recover?
            </Link>
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="editorial-input px-1 font-normal"
          />
          {errors.password && (
            <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
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
            AUTHENTICATE ACCESS
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
