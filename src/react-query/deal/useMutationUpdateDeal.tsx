"use client";
import API from "@/api";
import { UpdateDealDto } from "@/api/deals.api/deal.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationUpdateDeal() {
  const queryClient = useQueryClient();
  const mutationFn = (dto: UpdateDealDto) => API.deal.updateDeal(dto);

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ exact: true, queryKey: ["deal"] }),
  });
}
