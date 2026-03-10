import apiClient from "@/lib/axios";
import { Auction } from "@/types/auction";

export const getAuctions = async (): Promise<Auction[]> => {
  const response = await apiClient.get("/auctions");
  return response.data;
};

export const getAuctionById = async (id: string): Promise<Auction> => {
  const response = await apiClient.get(`/auctions/${id}`);
  return response.data;
};

export const consignLot = async (data: any) => {
  const response = await apiClient.post("/auctions", data);
  return response.data;
};
