import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12 md:py-16 selection:bg-black selection:text-white">
      <div className="w-full max-w-lg flex flex-col gap-12 md:gap-16">
        {/* Editorial Header */}
        <div className="text-center flex flex-col gap-6 items-center">
          <Link href="/" className="inline-flex flex-col items-center group">
            <span className="text-4xl md:text-5xl font-serif tracking-tight font-medium uppercase leading-none text-black">
              Aureus
            </span>
            <span className="meta-label tracking-[0.3em] mt-2 text-[10px]">
              Global Editorial Auctions
            </span>
          </Link>
          <hr className="border-zinc-200 w-16" />
        </div>
        {children}
      </div>
    </div>
  );
}
