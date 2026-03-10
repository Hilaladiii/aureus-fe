import apiClient from "@/lib/axios";
import { RegisterFormData, LoginFormData } from "@/schemas/auth";

export const registerUser = async (data: RegisterFormData) => {
  const response = await apiClient.post("/users/register", data);
  return response.data;
};

export const loginUser = async (data: LoginFormData) => {
  const response = await apiClient.post("/users/login", data);
  return response.data;
};
