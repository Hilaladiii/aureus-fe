"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWalletData, getTransactions, topUpWallet, WalletData } from "@/services/wallet.service";

export function useWallet() {
  const { data, error, isLoading, refetch } = useQuery<WalletData>({
    queryKey: ["wallet"],
    queryFn: getWalletData,
  });

  return {
    activeBalance: data?.activeBalance || 0,
    heldBalance: data?.heldBalance || 0,
    currency: data?.currency || "USD",
    isLoading,
    isError: error,
    mutate: refetch,
  };
}

export function useTransactions() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return {
    transactions: data || [],
    isLoading,
    isError: error,
    mutate: refetch,
  };
}

export function useTopUpMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: topUpWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  return {
    mutate: mutateAsync,
    isLoading: isPending,
    error: error?.message || null,
  };
}
