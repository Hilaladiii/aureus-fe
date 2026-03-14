"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAuctions,
  getAuctionById,
  getCategories,
  consignLot,
} from "@/services/auction.service";

export function useAuctions() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["auctions"],
    queryFn: getAuctions,
  });

  return {
    auctions: (data as any[]) || [],
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

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useConsignMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => consignLot(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auctions"] });
    },
  });
}
