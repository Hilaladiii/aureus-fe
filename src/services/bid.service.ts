import apiClient from "@/lib/axios";

export const placeBid = async (auctionId: string, amount: number) => {
  const response = await apiClient.post(`/auctions/${auctionId}/bid`, { amount });
  return response.data;
};
