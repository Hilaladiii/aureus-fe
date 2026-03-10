"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuctions, getAuctionById } from "@/services/auction.service";

export function useAuctions() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["auctions"],
    queryFn: getAuctions,
  });

  return {
    auctions: data || [],
    isLoading,
    isError: error,
    mutate: refetch,
  };
}

export function useAuction(id: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["auction", id],
    queryFn: () => getAuctionById(id),
    enabled: !!id,
  });

  return {
    auction: data,
    isLoading,
    isError: error,
    mutate: refetch,
  };
}
