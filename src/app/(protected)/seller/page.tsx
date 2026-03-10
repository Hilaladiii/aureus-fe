"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, Search, SlidersHorizontal, ArrowUpRight, 
  TrendingUp, Clock, ShieldCheck, MoreHorizontal 
} from "lucide-react";

// Mock Data
const SELLER_LOTS = [
  {
    id: "1",
    title: "Elysian Heights Penthouse NFT",
    status: "ACTIVE",
    currentBid: 245000,
    bids: 18,
    timeLeft: "2h 45m",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=300",
    category: "DIGITAL",
  },
  {
    id: "2",
    title: "Vintage 1955 Chronograph",
    status: "ACTIVE",
    currentBid: 85000,
    bids: 12,
    timeLeft: "5h 12m",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=300",
    category: "PHYSICAL",
  },
  {
    id: "5",
    title: "Celestial Horizon Sculpture",
    status: "PENDING",
    currentBid: 0,
    bids: 0,
    timeLeft: "Starts in 2d",
    imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=300",
    category: "PHYSICAL",
  },
  {
    id: "6",
    title: "Obsidian Core Digital Art",
    status: "ENDED",
    currentBid: 42000,
    bids: 45,
    timeLeft: "Sold",
    imageUrl: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=300",
    category: "DIGITAL",
  }
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("ACTIVE");
  
  const filteredLots = activeTab === "ALL" 
    ? SELLER_LOTS 
    : SELLER_LOTS.filter(lot => lot.status === activeTab);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div className="pb-24 flex flex-col items-center">
      <div className="max-w-7xl w-full px-6 md:px-12 flex flex-col gap-12 md:gap-16">

        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 border-b border-[#EAEAEA] pb-12 md:pb-16">
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="meta-label">Consignor Atelier / Collector No. 420</span>
            <h1 className="text-6xl md:text-8xl font-serif text-black leading-none tracking-tight font-normal">
              Seller <span className="italic font-normal">Dashboard.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#767676] max-w-2xl font-normal leading-relaxed italic tracking-tight font-sans">
              Manage your private collection, monitor real-time bidding activity, 
              and oversee the provenance of your extraordinary assets.
            </p>
          </div>

          <div className="flex items-center gap-6">
             <Link href="/seller/new" className="btn-primary group flex items-center gap-4">
               CONSIGN NEW LOT
               <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
             </Link>
          </div>
        </div>

        {/* Collection Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 border-b border-[#EAEAEA] pb-12 md:pb-16">
           {[
             { label: "Active Lots", value: "02", icon: <TrendingUp className="w-4 h-4" /> },
             { label: "Asset Value", value: "$330k", icon: <ShieldCheck className="w-4 h-4" /> },
             { label: "Pending", value: "01", icon: <Clock className="w-4 h-4" /> },
             { label: "Completed", value: "14", icon: <ArrowUpRight className="w-4 h-4" /> }
           ].map((metric, i) => (
             <div key={i} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[#767676]">
                   {metric.icon}
                   <span className="meta-label tracking-[0.1em]">{metric.label}</span>
                </div>
                <span className="text-4xl font-serif font-normal text-black block leading-none">{metric.value}</span>
             </div>
           ))}
        </div>

        {/* Lot Management Ledger */}
        <div className="flex flex-col gap-8 md:gap-12 pb-24 md:pb-32">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-[#EAEAEA] pb-1">
              <div className="flex items-center gap-10 md:gap-12 overflow-x-auto no-scrollbar">
                {["ACTIVE", "PENDING", "ENDED", "ALL"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`meta-label transition-all duration-300 relative pb-8 whitespace-nowrap ${
                      activeTab === tab ? "text-black border-b border-black" : "text-zinc-400 hover:text-zinc-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-6 pb-6">
                <div className="relative group min-w-[200px]">
                   <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-black transition-colors" />
                   <input 
                    type="text" 
                    placeholder="Search collection..."
                    className="bg-transparent border-b border-zinc-100 pl-8 pr-4 py-2 outline-none focus:border-black transition-all font-sans text-xs placeholder:text-zinc-300 font-medium"
                   />
                </div>
                <button className="nav-link flex items-center gap-2">
                   <SlidersHorizontal className="w-3 h-3" />
                   Filter
                </button>
              </div>
           </div>

           {/* Editorial List / Ledger View */}
           <div className="flex flex-col gap-1">
              {filteredLots.map((lot) => (
                <div key={lot.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 py-10 border-b border-zinc-100 items-center group hover:bg-zinc-50 transition-colors px-4">
                   
                   {/* Item Identity */}
                   <div className="lg:col-span-5 flex items-center gap-6 md:gap-8">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden bg-zinc-50 rounded-none border border-transparent group-hover:border-[#EAEAEA] grayscale group-hover:grayscale-0 transition-all duration-700">
                        <Image src={lot.imageUrl} alt={lot.title} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col gap-1 md:gap-2">
                         <span className="meta-label text-[10px] text-zinc-300">Lot {lot.id.padStart(3, '0')} / {lot.category}</span>
                         <h3 className="text-xl md:text-2xl font-serif italic text-black group-hover:underline underline-offset-4 decoration-1 decoration-zinc-200 transition-all duration-500">{lot.title}</h3>
                      </div>
                   </div>

                   {/* Status Indicator */}
                   <div className="lg:col-span-2 flex flex-col gap-2">
                      <span className="meta-label text-[10px] text-zinc-300">Inquiry Status</span>
                      <div className="flex items-center gap-2">
                         <span className={`w-1.5 h-1.5 ${
                           lot.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 
                           lot.status === 'PENDING' ? 'bg-amber-500' : 'bg-zinc-300'
                         }`} />
                         <span className="meta-label text-black">{lot.status}</span>
                      </div>
                   </div>

                   {/* Performance / Bids */}
                   <div className="lg:col-span-2 flex flex-col gap-2">
                      <span className="meta-label text-[10px] text-zinc-300">Current Valuation</span>
                      <div className="flex flex-col gap-1">
                        <span className="text-xl font-serif text-black">{currencyFormatter.format(lot.currentBid)}</span>
                        <span className="meta-label block text-[10px] opacity-40 italic lowercase normal-case tracking-normal">{lot.bids} entries Received</span>
                      </div>
                   </div>

                   {/* Time / Auction Context */}
                   <div className="lg:col-span-2 flex flex-col gap-2">
                      <span className="meta-label text-[10px] text-zinc-300">Time Remaining</span>
                      <span className="text-sm md:text-base font-sans font-medium uppercase tracking-[0.1em] text-black italic">
                        {lot.timeLeft}
                      </span>
                   </div>

                   {/* Options / Actions */}
                   <div className="lg:col-span-1 flex justify-end">
                      <button className="p-3 text-zinc-300 hover:text-black hover:bg-zinc-100 transition-all rounded-none">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              ))}

              {filteredLots.length === 0 && (
                <div className="py-32 md:py-48 text-center border border-zinc-50 bg-[#F9F9F9]">
                   <span className="meta-label italic font-serif lowercase normal-case text-2xl tracking-tight text-zinc-300">Atelier Ledger Empty</span>
                   <p className="meta-label text-zinc-400 mt-4 italic lowercase normal-case tracking-normal">No lots found matching the current collection filter.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
