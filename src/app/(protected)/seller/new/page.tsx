"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Upload, Loader2, ArrowRight } from "lucide-react";

const newLotSchema = z.object({
  title: z.string().min(5, "Lot title must be at least 5 characters for proper appraisal."),
  category: z.enum(["DIGITAL", "PHYSICAL", "EXPERIENCE"]),
  reservePrice: z.coerce.number().min(1, "A reserve price is required for institutional protection."),
  increment: z.coerce.number().min(100, "Minimum increment is $100."),
  description: z.string().min(20, "Please provide a detailed exhibition note for the connoisseurs."),
  imageUrl: z.string().url("A high-fidelity imagery source is required."),
});

type NewLotFormData = z.infer<typeof newLotSchema>;

export default function NewLotPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewLotFormData>({
    resolver: zodResolver(newLotSchema),
    defaultValues: {
      category: "PHYSICAL",
    }
  });

  const onSubmit = async (data: NewLotFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Consignment rejected by the system.");
      
      setSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center selection:bg-black selection:text-white">
        <div className="max-w-md flex flex-col gap-10">
           <span className="meta-label text-emerald-600 italic lowercase normal-case text-xl tracking-tight">Consignment Received</span>
           <h1 className="text-5xl md:text-6xl font-serif font-normal text-black leading-tight tracking-tight">
             Lot Successfully <br />
             <span className="italic">Submitted.</span>
           </h1>
           <p className="text-lg text-[#767676] font-normal leading-relaxed font-sans italic">
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

  return (
    <div className="pb-24 flex flex-col items-center">
      <div className="max-w-4xl w-full px-6 md:px-12 flex flex-col gap-12 md:gap-16">

        
        {/* Header */}
        <div className="flex flex-col gap-8 md:gap-10">
           <Link href="/seller" className="nav-link flex items-center gap-3">
              <ArrowLeft className="w-4 h-4" />
              Back to Atelier
           </Link>
           <h1 className="text-5xl md:text-7xl font-serif text-black leading-none tracking-tight font-normal">
             New Asset <br />
             <span className="italic font-normal">Consignment.</span>
           </h1>
           <hr className="border-[#EAEAEA]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12 md:gap-16">
          
          {/* Section 1: Identity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
               <h3 className="meta-label text-black">Asset Identity</h3>
               <p className="text-sm text-zinc-400 font-normal font-sans italic">Provide core identifiers for your extraordinary lot.</p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-10">
               <div className="flex flex-col gap-4">
                  <label className="meta-label block">Official Title</label>
                  <input 
                    {...register("title")}
                    placeholder="e.g. Imperial Heritage Chronograph"
                    className="editorial-input italic font-normal"
                  />
                  {errors.title && <p className="meta-label text-zinc-400 mt-1 lowercase italic normal-case tracking-normal">{errors.title.message}</p>}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex flex-col gap-4">
                    <label className="meta-label block">Category</label>
                    <select 
                      {...register("category")}
                      className="editorial-input appearance-none bg-transparent font-medium"
                    >
                      <option value="PHYSICAL">Physical Asset</option>
                      <option value="DIGITAL">Digital / NFT</option>
                      <option value="EXPERIENCE">Rare Experience</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="meta-label block">Image Source URL</label>
                    <div className="relative">
                       <input 
                        {...register("imageUrl")}
                        placeholder="https://images.unsplash.com/..."
                        className="editorial-input pr-10 font-normal"
                       />
                       <Upload className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300" />
                    </div>
                    {errors.imageUrl && <p className="meta-label text-zinc-400 mt-1 lowercase italic normal-case tracking-normal">{errors.imageUrl.message}</p>}
                  </div>
               </div>
            </div>
          </div>

          <hr className="border-[#EAEAEA]" />

          {/* Section 2: Valuation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
               <h3 className="meta-label text-black">Valuation Framework</h3>
               <p className="text-sm text-zinc-400 font-normal font-sans italic">Define financial parameters for the auction.</p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="flex flex-col gap-4">
                  <label className="meta-label block">Reserve Price (USD)</label>
                  <input 
                    {...register("reservePrice")}
                    type="number"
                    placeholder="250000"
                    className="editorial-input font-serif italic font-normal"
                  />
                  {errors.reservePrice && <p className="meta-label text-zinc-400 mt-1 lowercase italic normal-case tracking-normal">{errors.reservePrice.message}</p>}
               </div>
               <div className="flex flex-col gap-4">
                  <label className="meta-label block">Min. Increment (USD)</label>
                  <input 
                    {...register("increment")}
                    type="number"
                    placeholder="5000"
                    className="editorial-input font-serif italic font-normal"
                  />
                  {errors.increment && <p className="meta-label text-zinc-400 mt-1 lowercase italic normal-case tracking-normal">{errors.increment.message}</p>}
               </div>
            </div>
          </div>

          <hr className="border-[#EAEAEA]" />

          {/* Section 3: Exhibition Notes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
               <h3 className="meta-label text-black">Exhibition Notes</h3>
               <p className="text-sm text-zinc-400 font-normal font-sans italic">The narrative that drives provenance.</p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-4">
               <label className="meta-label block">Lot Description</label>
               <textarea 
                 {...register("description")}
                 rows={6}
                 placeholder="Describe the asset's heritage, specifications, and rarity..."
                 className="w-full border border-[#EAEAEA] p-6 text-lg font-serif italic font-normal placeholder:text-zinc-300 focus:border-black focus:outline-none transition-colors duration-300 rounded-none bg-transparent"
               />
               {errors.description && <p className="meta-label text-zinc-400 mt-1 lowercase italic normal-case tracking-normal">{errors.description.message}</p>}
            </div>
          </div>

          <div className="pt-12 flex justify-end">
             <button 
               disabled={isSubmitting}
               type="submit" 
               className="btn-primary min-w-[280px] md:min-w-[320px] flex items-center justify-center gap-6"
             >
               {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin text-white" /> : (
                 <>
                   SUBMIT FOR APPRAISAL
                   <ArrowRight className="w-4 h-4" />
                 </>
               )}
             </button>
          </div>

        </form>
      </div>
    </div>
  );
}
