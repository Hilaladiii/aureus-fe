"use client";

import Link from "next/link";

export function SuccessState() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center selection:bg-black selection:text-white">
      <div className="max-w-md flex flex-col gap-10">
        <span className="meta-label text-emerald-600 lowercase text-xl tracking-tight">
          Consignment Received
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-normal text-black leading-tight tracking-tight">
          Lot Successfully <br />
          <span>Submitted.</span>
        </h1>
        <p className="text-lg text-zinc-500 font-normal leading-relaxed font-sans">
          Our curators will now evaluate your asset for provenance and rarity.
          You will receive a notification once the lot is ready for exhibition.
        </p>
        <Link href="/seller" className="btn-primary inline-flex justify-center">
          Return to Atelier
        </Link>
      </div>
    </div>
  );
}
