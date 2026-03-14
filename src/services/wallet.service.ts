import apiClient from "@/lib/axios";

export interface WalletData {
  activeBalance: number;
  heldBalance: number;
  currency: string;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  method: string;
}

export const getWalletData = async (): Promise<WalletData> => {
  const response = await apiClient.get("/wallet");
  return response.data;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get("/wallet/transactions");
  return response.data;
};

export const topUpWallet = async (data: { amount: number; method: string }) => {
  const response = await apiClient.post("/wallet/top-up", data);
  return response.data;
};
