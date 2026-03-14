"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ArrowUpRight, Loader2, ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import { useLiveLeaderboard } from "@/hooks/useLiveLeaderboard";
import { useAuction } from "@/hooks/useAuctions";
import { useBidMutation } from "@/hooks/useBidMutation";
import { bidSchema } from "@/schemas/auction";

export default function AuctionDetailPage() {
  const { id } = useParams() as { id: string };
  const { auction, isLoading: auctionLoading, isError: auctionError } = useAuction(id);
  const { leaderboard, isConnected, error: sseError } = useLiveLeaderboard(id);
  const { mutate: placeBid, isLoading: bidLoading, error: bidError } = useBidMutation(id);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const highestBid = useMemo(() => {
    const liveHighest = leaderboard.length > 0 ? Math.max(...leaderboard.map(b => b.amount)) : 0;
    return Math.max(liveHighest, auction?.currentBid || 0);
  }, [leaderboard, auction?.currentBid]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ amount: number }>({
    resolver: zodResolver(bidSchema(highestBid, auction?.increment || 100)),
  });

  const onSubmit = async (data: { amount: number }) => {
    setSuccessMsg(null);
    try {
      await placeBid(data.amount);
      setSuccessMsg(`Congratulations! Your bid of $${data.amount.toLocaleString()} is currently leading.`);
      reset();
    } catch (err) {
      console.error("Institutional bidding failure:", err);
    }
  };

  const currencyFormatter = useMemo(() => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }), 
  []);

  if (auctionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6 text-zinc-300">
           <Loader2 className="w-10 h-10 animate-spin" />
           <span className="meta-label">Syncing Lot Data...</span>
        </div>
      </div>
    );
  }

  if (auctionError || !auction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-lg space-y-8">
           <span className="meta-label text-amber-600">Access Restricted</span>
           <h1 className="text-5xl font-serif text-black leading-tight font-normal tracking-tight">Lot Not Found.</h1>
           <p className="text-lg text-zinc-400">The catalog item you requested is no longer available for exhibition.</p>
           <Link href="/auctions" className="btn-primary inline-flex">Return to Gallery</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 flex flex-col items-center">
      <main className="max-w-7xl w-full px-6 md:px-12 flex flex-col gap-16 md:gap-20">

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start">
          
          {/* Left: Media Focus */}
          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
            <div className="relative aspect-square overflow-hidden bg-zinc-50 border border-[#EAEAEA] rounded-none">
              <Image 
                src={auction.imageUrl} 
                alt={auction.title} 
                fill 
                className="object-cover opacity-95 grayscale transition-all duration-[1s] hover:grayscale-0"
              />
              <div className="absolute top-0 right-0 p-6 md:p-8">
                 <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black animate-pulse" />
                    <span className="meta-label text-black bg-white/90 px-4 py-2 font-medium">LIVE AUCTION</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 max-w-2xl">
               <div className="flex flex-col gap-2">
                  <h3 className="meta-label text-black">Exhibition Notes</h3>
                  <p className="text-lg md:text-xl text-[#767676] font-normal leading-relaxed tracking-tight font-sans">
                    {auction.description}
                  </p>
               </div>

               <hr className="border-[#EAEAEA]" />

               <div className="grid grid-cols-2 gap-12">
                  <div className="flex flex-col gap-2">
                    <span className="meta-label text-zinc-400">Provenance / Seller</span>
                    <span className="text-lg font-serif text-black underline underline-offset-4 decoration-[#EAEAEA] font-normal">
                      {auction.seller.username}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="meta-label text-zinc-400">Status</span>
                    <span className="text-base font-sans font-medium uppercase tracking-[0.1em] text-black">
                      Institutional Grade
                    </span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Bidding */}
          <div className="lg:col-span-5 flex flex-col gap-12 md:gap-16">
            <div className="flex flex-col gap-4">
               <span className="meta-label">Category: {auction.category}</span>
               <h1 className="text-5xl md:text-6xl font-serif text-black leading-none font-normal tracking-tight">
                 {auction.title}
               </h1>
            </div>

            <div className="border border-[#EAEAEA] p-8 md:p-10 flex flex-col gap-10 bg-white">
               
               <div className="flex flex-col gap-8 border-b border-[#EAEAEA] pb-10">
                  <div className="flex justify-between items-baseline">
                    <span className="meta-label text-black">Bidding Ledger</span>
                    <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-none ${isConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
                       <span className="meta-label text-zinc-400 tracking-widest text-[10px]">
                         {isConnected ? "Linked" : "Linking..."}
                       </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <span className="meta-label text-zinc-400">Highest Bid Received</span>
                     <div className="text-7xl md:text-[80px] font-serif text-black tracking-tighter leading-none font-normal">
                       {currencyFormatter.format(highestBid)}
                       <span className="text-sm font-sans align-top ml-2 text-zinc-300 font-medium">USD</span>
                     </div>
                  </div>
               </div>

               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center px-1">
                       <label className="meta-label text-black">Your Official Entry</label>
                       <span className="text-xs text-[#767676] font-sans font-normal uppercase tracking-widest">
                         Min Incr: {currencyFormatter.format(auction.increment)}
                       </span>
                    </div>
                    
                    <div className="relative">
                       <span className="absolute left-0 top-1/2 -translate-y-1/2 font-serif text-3xl text-zinc-300 font-normal">$</span>
                       <input 
                         {...register("amount")}
                         type="number" 
                         placeholder={(highestBid + auction.increment).toString()}
                         className="editorial-input pl-8 text-3xl font-serif font-normal"
                       />
                    </div>
                    {errors.amount && (
                      <p className="meta-label text-zinc-400 mt-2 lowercase normal-case tracking-normal">{errors.amount.message}</p>
                    )}
                    {bidError && (
                       <div className="p-6 border border-zinc-100 bg-zinc-50 text-zinc-950 text-[11px] font-medium uppercase tracking-[0.1em] flex items-center justify-center text-center">
                         {bidError}
                       </div>
                    )}
                    {successMsg && (
                       <div className="p-6 bg-zinc-50 border border-[#EAEAEA] text-zinc-950 text-xs font-medium uppercase tracking-[0.15em] text-center leading-relaxed">
                         {successMsg}
                       </div>
                    )}
                  </div>

                  <button 
                    disabled={bidLoading}
                    className="btn-primary w-full py-5 flex items-center justify-center gap-4"
                  >
                    {bidLoading ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (
                      <>
                        SUBMIT OFFICIAL BID
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
               </form>
            </div>

            {/* Bidding History Ledger */}
            <div className="flex flex-col gap-10">
               <div className="flex items-center justify-between border-b border-black pb-4">
                 <h4 className="meta-label text-black">Bidding History</h4>
                 <span className="meta-label text-zinc-400">{leaderboard.length} Entries</span>
               </div>

               <div className="flex flex-col gap-1">
                  {leaderboard.length > 0 ? leaderboard.map((bid, idx) => (
                    <div 
                      key={bid.id} 
                      className={`flex items-center justify-between py-6 border-b border-[#EAEAEA] group transition-all ${
                        idx === 0 ? "bg-zinc-50/50" : ""
                      }`}
                    >
                       <div className="flex flex-col gap-1">
                          <span className="meta-label text-[10px] text-zinc-300">Bidder Handle</span>
                          <span className="text-lg font-serif text-black group-hover:underline underline-offset-4 decoration-1 transition-all duration-500 font-normal">
                            {bid.bidderName}
                            {idx === 0 && <span className="ml-3 text-[9px] font-sans font-medium uppercase tracking-[0.15em] bg-black text-white px-2 py-0.5 align-middle">Leading</span>}
                          </span>
                       </div>
                       <div className="text-right flex flex-col gap-1">
                          <span className="meta-label text-[10px] text-zinc-300">Amount</span>
                          <span className="text-xl font-serif text-black font-normal">{currencyFormatter.format(bid.amount)}</span>
                       </div>
                    </div>
                  )) : (
                    <div className="py-24 text-center border-y border-dashed border-[#EAEAEA]">
                       <span className="meta-label text-zinc-200 font-serif lowercase normal-case text-lg">Ledger Entry Empty</span>
                    </div>
                  )}
                  {sseError && <p className="meta-label text-zinc-400 mt-6 text-center lowercase normal-case tracking-normal">{sseError}</p>}
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
