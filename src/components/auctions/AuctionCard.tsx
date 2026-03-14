"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Auction } from "@/types/auction";

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const formattedBid = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(auction.currentBid);

  return (
    <Link href={`/auctions/${auction.id}`} className="group block flex flex-col gap-6 selection:bg-black selection:text-white">
      {/* Editorial Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50 rounded-none border border-transparent group-hover:border-[#EAEAEA] transition-all duration-500">
        <Image
          src={auction.imageUrl}
          alt={auction.title}
          fill
          className="object-cover grayscale transition-all duration-[1.5s] ease-out group-hover:grayscale-0 group-hover:scale-105"
        />
        
        {/* Minimalist Indicators */}
        <div className="absolute top-0 right-0 p-4">
           <span className="bg-black text-white text-[10px] font-medium uppercase tracking-[0.1em] px-2 py-1 rounded-none">
             Lot {auction.id.padStart(2, '0')}
           </span>
        </div>
      </div>

      {/* Editorial Content: Grouped by Proximity */}
      <div className="flex flex-col gap-4 px-1">
        <div className="flex flex-col gap-1">
          <span className="meta-label text-[10px] text-zinc-400 font-medium tracking-[0.1em]">
            {auction.category} / {auction.seller.username}
          </span>
          <h3 className="text-2xl font-serif text-black leading-tight group-hover:underline underline-offset-4 decoration-1 decoration-zinc-300 transition-all duration-500 font-normal">
            {auction.title}
          </h3>
        </div>

        <div className="flex flex-col gap-1">
           <span className="meta-label text-[10px] font-medium tracking-[0.1em]">Current Bid</span>
           <span className="text-xl font-serif text-black font-normal">{formattedBid}</span>
        </div>

        <div className="pt-2 border-t border-zinc-50 mt-2">
          <span className="meta-label text-zinc-300 group-hover:text-black transition-colors duration-500 font-medium text-[10px] tracking-widest">
            Inquire →
          </span>
        </div>
      </div>
    </Link>
  );
}
