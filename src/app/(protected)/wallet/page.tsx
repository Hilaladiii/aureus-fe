"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowUpRight,
  Loader2,
  ShieldCheck,
  History,
  Wallet,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import {
  useWallet,
  useTransactions,
  useTopUpMutation,
} from "@/hooks/useWallet";

// Top-up Schema
const topUpSchema = z.object({
  amount: z.coerce
    .number()
    .min(100, "Minimum top-up amount is $100 for institutional accounts.")
    .positive("Please enter a valid capital amount."),
  method: z.literal("CREDIT_CARD"),
});

type TopUpFormData = z.infer<typeof topUpSchema>;

export default function WalletPage() {
  const { activeBalance, heldBalance, isLoading: walletLoading } = useWallet();
  const { transactions, isLoading: txLoading } = useTransactions();
  const {
    mutate: topUp,
    isLoading: isSubmitting,
    error: topUpError,
  } = useTopUpMutation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TopUpFormData>({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      method: "CREDIT_CARD",
    },
  });

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const onSubmit = async (data: TopUpFormData) => {
    setSuccessMsg(null);
    try {
      await topUp(data);
      setSuccessMsg(
        `Capital of ${currencyFormatter.format(data.amount)} successfully initialized for transfer.`,
      );
      reset();
    } catch (err) {
      console.error("Institutional top-up failure:", err);
    }
  };

  return (
    <div className="pb-24 flex flex-col items-center">
      <main className="max-w-7xl w-full px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Balance Overview & History */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24">
            {/* Balance Summary */}
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="flex flex-col gap-4">
                <span className="meta-label">
                  Financial Position / Real-Time Audit
                </span>
                <h1 className="text-5xl md:text-7xl font-serif text-black leading-none font-normal tracking-tight">
                  Your Capital{" "}
                  <span className="font-normal">Ledger.</span>
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-y border-[#EAEAEA] py-12 md:py-16">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-4 h-4 text-black" />
                    <span className="meta-label text-black">
                      Active Capital
                    </span>
                  </div>
                  {walletLoading ? (
                    <div className="h-16 w-48 bg-zinc-50 animate-pulse" />
                  ) : (
                    <div className="text-6xl md:text-7xl font-serif text-black tracking-tighter leading-none font-normal">
                      {currencyFormatter.format(activeBalance)}
                    </div>
                  )}
                  <p className="text-sm text-[#767676] font-normal font-sans max-w-[200px]">
                    Available for immediate bidding and acquisition.
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-[#EAEAEA] pt-12 md:pt-0 md:pl-12">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#767676]" />
                    <span className="meta-label">Escrow / Held Balance</span>
                  </div>
                  {walletLoading ? (
                    <div className="h-16 w-48 bg-zinc-50 animate-pulse" />
                  ) : (
                    <div className="text-6xl md:text-7xl font-serif text-[#767676] tracking-tighter leading-none font-normal opacity-60">
                      {currencyFormatter.format(heldBalance)}
                    </div>
                  )}
                  <p className="text-sm text-[#767676] font-normal font-sans max-w-[200px]">
                    Capital currently secured for active auction bids.
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Ledger */}
            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between border-b border-black pb-6">
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-black" />
                  <h4 className="meta-label text-black">
                    Recent Transactional History
                  </h4>
                </div>
                <span className="meta-label text-zinc-400">
                  Audit Grade: Institutional
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {txLoading ? (
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-24 w-full bg-zinc-50 animate-pulse border-b border-[#EAEAEA]"
                    />
                  ))
                ) : transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-8 border-b border-[#EAEAEA] group hover:bg-zinc-50 transition-colors px-4"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="meta-label text-[10px] text-zinc-300">
                          {tx.date} / {tx.id}
                        </span>
                        <span className="text-xl font-serif text-black group-hover:underline underline-offset-4 decoration-1 transition-all duration-500 font-normal">
                          {tx.method}
                        </span>
                      </div>
                      <div className="text-right flex flex-col gap-2">
                        <span className="meta-label text-[10px] text-zinc-300">
                          {tx.status}
                        </span>
                        <span
                          className={`text-2xl font-serif font-normal ${tx.amount > 0 ? "text-black" : "text-[#767676]"}`}
                        >
                          {tx.amount > 0 ? "+" : ""}
                          {currencyFormatter.format(tx.amount)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center border-y border-dashed border-[#EAEAEA]">
                    <span className="meta-label text-zinc-200 font-serif lowercase normal-case text-lg">
                      Transaction Ledger Empty
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Top-Up Form */}
          <div className="lg:col-span-5 flex flex-col gap-12 md:gap-16 lg:sticky lg:top-32">
            <div className="border border-[#EAEAEA] p-10 md:p-12 flex flex-col gap-12 bg-white">
              <div className="flex flex-col gap-6">
                <span className="meta-label text-black">
                  Capital Injection Flow
                </span>
                <h3 className="text-4xl font-serif font-normal text-black tracking-tight leading-tight">
                  Initialize <span className="font-normal">Top-Up.</span>
                </h3>
                <hr className="border-[#EAEAEA]" />
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-12"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <label className="meta-label text-black">
                      Transaction Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-3xl text-zinc-300 font-normal">
                        $
                      </span>
                      <input
                        {...register("amount")}
                        type="number"
                        placeholder="50000"
                        className="editorial-input pl-8 text-3xl font-serif font-normal"
                      />
                    </div>
                    {errors.amount && (
                      <p className="meta-label text-zinc-400 mt-2 lowercase normal-case tracking-normal">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-6">
                    <label className="meta-label text-black">
                      Settlement Protocol
                    </label>
                    <div className="flex items-center justify-between px-6 py-5 border border-black bg-zinc-50">
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-4 h-4 text-black" />
                        <span className="font-sans text-sm font-medium uppercase tracking-widest text-black">
                          Credit Ledger / Card
                        </span>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-black" />
                      <input
                        {...register("method")}
                        type="hidden"
                        value="CREDIT_CARD"
                      />
                    </div>
                  </div>

                  {topUpError && (
                    <div className="p-6 border border-[#EAEAEA] bg-zinc-50 text-zinc-950 text-[11px] font-medium uppercase tracking-[0.1em] flex items-center justify-center text-center">
                      {topUpError}
                    </div>
                  )}
                  {successMsg && (
                    <div className="p-8 bg-zinc-50 border border-[#EAEAEA] text-zinc-950 text-[11px] font-medium uppercase tracking-[0.15em] text-center leading-relaxed">
                      {successMsg}
                    </div>
                  )}
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn-primary w-full py-6 flex items-center justify-center gap-6"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  ) : (
                    <>
                      INITIALIZE TRANSFER
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
