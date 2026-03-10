"use client";

import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

export function useRegisterMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      // Backend returns token in response.token or response.data.token
      const token = response.token || response.data?.token || response.data;
      if (token) {
        login(token);
      }
    },
  });
}

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const token = response.data;
      if (token) {
        login(token);
      }
    },
  });
}
