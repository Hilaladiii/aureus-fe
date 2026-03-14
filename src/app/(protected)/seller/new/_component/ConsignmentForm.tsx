"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Upload, Loader2, ArrowRight, X } from "lucide-react";
import { useCategories, useConsignMutation } from "@/hooks/useAuctions";
import { newLotSchema, type NewLotFormData } from "../_schema";
import dayjs from "dayjs";

interface ConsignmentFormProps {
  onSuccess: () => void;
}

export function ConsignmentForm({ onSuccess }: ConsignmentFormProps) {
  const { data, isLoading: isCategoriesLoading } = useCategories();
  const categories = data?.data;
  const { mutateAsync: consign, isPending: isSubmitting } =
    useConsignMutation();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewLotFormData>({
    resolver: zodResolver(newLotSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: NewLotFormData) => {
    if (images.length === 0) {
      alert("Please provide at least one high-fidelity image for the lot.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "startTime" || key === "endTime") {
          formData.append(key, dayjs(value as string).format());
        } else {
          formData.append(key, value.toString());
        }
      });
      images.forEach((image) => {
        formData.append("images", image);
      });

      await consign(formData);

      onSuccess();
      reset();
      setImages([]);
      previews.forEach(URL.revokeObjectURL);
      setPreviews([]);
    } catch (err) {
      console.error(err);
    }
  };

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
            <span className="font-normal">Consignment.</span>
          </h1>
          <hr className="border-zinc-200" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-12 md:gap-16"
        >
          {/* Section 1: Identity */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
              <h3 className="meta-label text-black">Asset Identity</h3>
              <p className="text-sm text-zinc-400 font-normal font-sans">
                Provide core identifiers for your extraordinary lot.
              </p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <label className="meta-label block">Official Title</label>
                <input
                  {...register("name")}
                  placeholder="e.g. Imperial Heritage Chronograph"
                  className="editorial-input font-normal"
                />
                {errors.name && (
                  <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  <label className="meta-label block">Category</label>
                  <div className="relative">
                    <select
                      {...register("categoryId")}
                      disabled={isCategoriesLoading}
                      className="editorial-input appearance-none bg-transparent font-medium pr-10 disabled:opacity-50"
                    >
                      <option value="">
                        {isCategoriesLoading
                          ? "Curating categories..."
                          : "Select Category"}
                      </option>
                      {Array.isArray(categories) &&
                        categories.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 rotate-90 text-zinc-300" />
                    </div>
                  </div>
                  {errors.categoryId && (
                    <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-zinc-200" />

          {/* Section 2: Visual Documentation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
              <h3 className="meta-label text-black">Visual Documentation</h3>
              <p className="text-sm text-zinc-400 font-normal font-sans">
                High-fidelity imagery for the exhibition gallery.
              </p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-8">
              <div className="flex flex-wrap gap-4">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative group w-32 h-32 md:w-40 md:h-40 bg-zinc-50 border border-zinc-100 overflow-hidden"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-black/80 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="cursor-pointer w-32 h-32 md:w-40 md:h-40 border border-dashed border-zinc-200 flex flex-col items-center justify-center gap-3 hover:border-black hover:bg-zinc-50 transition-all duration-300 group">
                  <Upload className="w-6 h-6 text-zinc-300 group-hover:text-black transition-colors" />
                  <span className="meta-label text-[10px] text-zinc-400 group-hover:text-black">
                    Add Imagery
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <hr className="border-zinc-200" />

          {/* Section 3: Temporal Framework */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
              <h3 className="meta-label text-black">Temporal Framework</h3>
              <p className="text-sm text-zinc-400 font-normal font-sans">
                Define the exhibition period for your lot.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="meta-label block">Exhibition Starts</label>
                <input
                  {...register("startTime")}
                  type="datetime-local"
                  className="editorial-input font-sans font-normal"
                />
                {errors.startTime && (
                  <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="meta-label block">Exhibition Concludes</label>
                <input
                  {...register("endTime")}
                  type="datetime-local"
                  className="editorial-input font-sans font-normal"
                />
                {errors.endTime && (
                  <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-zinc-200" />

          {/* Section 4: Valuation Framework */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
              <h3 className="meta-label text-black">Valuation Framework</h3>
              <p className="text-sm text-zinc-400 font-normal font-sans">
                Define financial parameters for the auction.
              </p>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4">
                <label className="meta-label block">Reserve Price (USD)</label>
                <input
                  {...register("reservePrice")}
                  type="number"
                  placeholder="250000"
                  className="editorial-input font-serif font-normal"
                />
                {errors.reservePrice && (
                  <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                    {errors.reservePrice.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <label className="meta-label block">Min. Increment (USD)</label>
                <input
                  {...register("increment")}
                  type="number"
                  placeholder="5000"
                  className="editorial-input font-serif font-normal"
                />
                {errors.increment && (
                  <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                    {errors.increment.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-zinc-200" />

          {/* Section 5: Exhibition Notes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 flex flex-col gap-2">
              <h3 className="meta-label text-black">Exhibition Notes</h3>
              <p className="text-sm text-zinc-400 font-normal font-sans">
                The narrative that drives provenance.
              </p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-4">
              <label className="meta-label block">Lot Description</label>
              <textarea
                {...register("description")}
                rows={6}
                placeholder="Describe the asset's heritage, specifications, and rarity..."
                className="w-full border border-zinc-200 p-6 text-lg font-serif font-normal placeholder:text-zinc-300 focus:border-black focus:outline-none transition-colors duration-300 rounded-none bg-transparent"
              />
              {errors.description && (
                <p className="meta-label text-zinc-400 mt-1 lowercase tracking-normal">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="pt-12 flex justify-end">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-primary min-w-70 md:min-w-[320px] flex items-center justify-center gap-6"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
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
