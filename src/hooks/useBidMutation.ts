"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeBid } from "@/services/bid.service";

export function useBidMutation(auctionId: string) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (amount: number) => placeBid(auctionId, amount),
    onSuccess: () => {
      // Refresh wallet balance and leaderboard after bidding
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // Leaderboard is SSE, but we might want to refresh auction detail if needed
      queryClient.invalidateQueries({ queryKey: ["auction", auctionId] });
    },
  });

  return {
    mutate: mutateAsync,
    isLoading: isPending,
    error: error?.message || null,
  };
}
