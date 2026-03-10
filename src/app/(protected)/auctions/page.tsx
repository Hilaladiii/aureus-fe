"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import AuctionCard from "@/components/auctions/AuctionCard";
import { useAuctions } from "@/hooks/useAuctions";

export default function AuctionListingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const { auctions, isLoading, isError } = useAuctions();

  const filteredAuctions =
    activeCategory === "ALL"
      ? auctions
      : auctions.filter((a) => a.category === activeCategory);

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col gap-12 md:gap-16">
        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 border-b border-[#EAEAEA] pb-12 md:pb-16">
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="meta-label">
              Curated Selection / 2026 Collection
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-black leading-none tracking-tight font-normal">
              The Grand <span className="italic font-normal">Gallery.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#767676] max-w-2xl font-normal leading-relaxed italic tracking-tight font-sans">
              A meticulously curated showcase of rare digital and physical
              assets, sourced from global collectors and verified for
              unparalleled provenance.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group min-w-[280px] md:min-w-[320px]">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="Search lots..."
                className="bg-transparent border-b border-[#EAEAEA] pl-8 pr-4 py-3 outline-none focus:border-black transition-all w-full font-sans text-sm placeholder:text-zinc-400 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Editorial Categories Filter */}
        <div className="flex items-center gap-10 md:gap-12 border-b border-[#EAEAEA] pb-1 overflow-x-auto no-scrollbar">
          {["ALL", "DIGITAL", "PHYSICAL", "EXPERIENCE"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`meta-label transition-all duration-300 relative pb-6 whitespace-nowrap ${
                activeCategory === cat
                  ? "text-black border-b border-black"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-48 flex flex-col items-center justify-center gap-6 text-zinc-300">
            <Loader2 className="w-10 h-10 animate-spin" />
            <span className="meta-label">Syncing Gallery Data...</span>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="py-48 text-center border border-zinc-100 bg-zinc-50 rounded-none mb-24 md:mb-32">
            <span className="meta-label text-amber-600">
              Protocol Interrupted
            </span>
            <h3 className="text-4xl font-serif text-zinc-400 italic mt-6 font-normal">
              Vault access error.
            </h3>
            <hr className="w-16 mx-auto my-10 border-[#EAEAEA]" />
            <p className="text-lg text-zinc-400 max-w-sm mx-auto italic font-sans font-normal leading-relaxed">
              {isError.message}
            </p>
          </div>
        )}

        {/* Auction Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-20 md:gap-y-24 pb-24 md:pb-32">
            {Array.isArray(filteredAuctions) &&
              filteredAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
        )}

        {/* Editorial Empty State */}
        {!isLoading && !isError && filteredAuctions.length === 0 && (
          <div className="py-32 md:py-48 text-center border border-zinc-100 bg-zinc-50 rounded-none mb-24 md:mb-32">
            <span className="meta-label text-zinc-300">
              Lot Inquiry Status: Empty
            </span>
            <h3 className="text-4xl font-serif text-zinc-400 italic mt-6 font-normal">
              No items found in this section.
            </h3>
            <hr className="w-16 mx-auto my-10 border-[#EAEAEA]" />
            <p className="text-lg text-zinc-400 max-w-sm mx-auto italic font-sans font-normal leading-relaxed">
              The gallery is currently being updated by our senior art
              directors. Please revisit shortly or contact the concierge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
