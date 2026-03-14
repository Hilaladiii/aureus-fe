import apiClient from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { Auction, Category } from "@/types/auction";

export const getAuctions = async (): Promise<Auction[]> => {
  const response = await apiClient.get("/auctions");
  return response.data;
};

export const getAuctionById = async (id: string): Promise<Auction> => {
  const response = await apiClient.get(`/auctions/${id}`);
  return response.data;
};

export const consignLot = async (data: any) => {
  const response = await apiClient.post("/auctions", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await apiClient.get("/categories");
  return response.data;
};
