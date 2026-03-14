"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col items-center">
      
      {/* Editorial Header */}
      <header className="fixed top-0 w-full z-50 px-6 md:px-12 flex justify-between items-baseline bg-white/95 border-b border-[#EAEAEA] h-20 items-center">
        <Link href="/" className="flex flex-col items-start group">
          <span className="text-2xl md:text-3xl font-serif tracking-tight font-medium uppercase leading-none text-black">Aureus</span>
          <span className="meta-label tracking-[0.3em] mt-1 text-[10px]">Global Editorial Auctions</span>
        </Link>
        
        <nav className="flex items-center gap-8 md:gap-12">
          <Link href="/login" className="nav-link">Sign In</Link>
          <Link href="/register" className="nav-link border-b border-black text-black pb-0.5">Join Platform</Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full pt-32 max-w-7xl">
        
        {/* Editorial Hero Section (Asymmetrical Grid) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 px-6 md:px-12 py-12 md:py-16 border-b border-[#EAEAEA]">
          <div className="lg:col-span-7 flex flex-col justify-center gap-8 md:gap-10">
            <div className="flex flex-col gap-2 md:gap-4">
              <span className="meta-label">Inaugural Private Collection</span>
              <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif font-normal tracking-tight leading-[0.9] text-black">
                The Heritage <br /> 
                <span className="font-normal">Exhibition.</span>
              </h1>
            </div>
            
            <div className="max-w-2xl flex flex-col gap-8">
              <p className="text-lg md:text-xl text-[#767676] font-normal leading-relaxed tracking-tight font-sans">
                An extraordinary collection of curated digital and physical assets from global estates. 
                Driven by provenance, heritage, and the search for the inimitable.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 pt-2">
                <Link href="/auctions" className="btn-primary">
                  Explore Collections
                </Link>
                <Link href="/register" className="nav-link group flex items-center gap-2 text-black">
                  Request Membership <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[3/4] rounded-none overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1200" 
              alt="Featured Exhibition Piece"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-out hover:scale-105"
              priority
            />
            <div className="absolute top-6 left-6 flex flex-col gap-1">
               <span className="meta-label text-white mix-blend-difference">Catalogue Item 001</span>
               <span className="font-serif text-white mix-blend-difference text-xl font-normal underline underline-offset-4 decoration-1">The Obsidian Sanctuary</span>
            </div>
          </div>
        </section>

        {/* Featured Lots Grid */}
        <section className="px-6 md:px-12 py-12 md:py-16 flex flex-col gap-12 md:gap-16">
          <div className="flex justify-between items-end border-b border-[#EAEAEA] pb-8">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight font-normal">Upcoming Premier Events</h2>
            <Link href="/auctions" className="nav-link text-black border-b border-black pb-1">View All Events</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: "Metropolitan Virtual Real Estate", lot: "Lot 42", price: "Starting $4.2M", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" },
              { title: "Imperial Heritage Timepiece", lot: "Lot 18", price: "Starting $1.8M", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800" },
              { title: "Digital Sanctuary Artifact", lot: "Lot 09", price: "Starting $850k", image: "https://images.unsplash.com/photo-1600607687940-497f6a6109b7?auto=format&fit=crop&q=80&w=800" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-6 md:gap-8 group">
                <div className="relative aspect-square overflow-hidden bg-zinc-50 rounded-none">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-4">
                   <div className="flex justify-between items-baseline">
                      <span className="meta-label">{item.lot}</span>
                      <span className="meta-label text-zinc-300">Verified Origin</span>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-serif font-normal text-black group-hover:underline underline-offset-4 decoration-1 transition-all duration-500">{item.title}</h3>
                   <div>
                      <span className="font-serif text-xl md:text-2xl font-normal">{item.price}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical & Ethical Pillars Section */}
        <section className="px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-[#EAEAEA]">
           {[
             { label: "Provenance Registry", desc: "Every asset undergoes an exhaustive 12-point authentication protocol for absolute certainty." },
             { label: "SSE Bidding Architecture", desc: "Ultra-low latency bidding experience powered by proprietary high-fidelity streaming technology." },
             { label: "Global Legal Escrow", desc: "Secure multi-signature escrow frameworks ensuring total regulatory compliance and protection." }
           ].map((pillar, i) => (
             <div key={i} className="flex flex-col gap-4 md:gap-6">
                <span className="meta-label tracking-[0.2em]">{pillar.label}</span>
                <p className="text-base text-[#767676] font-normal leading-relaxed font-sans">{pillar.desc}</p>
             </div>
           ))}
        </section>

        {/* Live Marketplace Indicator */}
        <section className="px-6 md:px-12 py-12 md:py-16 flex justify-center border-t border-[#EAEAEA]">
           <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 px-8 py-6 border border-[#EAEAEA] rounded-none">
              <span className="w-2 h-2 bg-black rounded-none animate-pulse" />
              <span className="meta-label text-black">Aureus Exchange / Real-Time Feed Active</span>
              <div className="hidden md:block h-4 w-px bg-[#EAEAEA] mx-2" />
              <span className="font-serif text-lg md:text-xl text-[#767676] font-normal">Global valuation update in progress...</span>
           </div>
        </section>

      </main>

      {/* Heritage Footer */}
      <footer className="w-full px-6 md:px-12 py-12 md:py-16 bg-[#F9F9F9] border-t border-[#EAEAEA] flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
         <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl font-serif font-medium uppercase tracking-tight">Aureus</span>
            <span className="meta-label text-[10px] tracking-[0.3em]">© 2026 Aureus Global Auctions LLC.</span>
         </div>
         <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {["Provenance", "Legal Framework", "Global Concierge", "Contact", "Privacy"].map((link) => (
              <Link key={link} href="#" className="nav-link text-xs">{link}</Link>
            ))}
         </div>
      </footer>
    </div>
  );
}
