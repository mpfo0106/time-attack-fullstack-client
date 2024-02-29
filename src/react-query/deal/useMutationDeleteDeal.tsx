"use client";
import API from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationDeleteDeal() {
  const queryClient = useQueryClient();
  const mutationFn = (dealId: string) => API.deal.deleteDeal(dealId);

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ exact: true, queryKey: ["deal"] }),
  });
}
