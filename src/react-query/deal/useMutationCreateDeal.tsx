import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationCreateDeal() {
  const queryClient = useQueryClient();
  const mutationFn = api.deals.createDeal;

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ exact: true, queryKey: ["deal"] }),
  });
}
