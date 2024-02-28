import API from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutationCreateDeal() {
  const queryClient = useQueryClient();
  const mutationFn = API.deal.createDeal;

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ exact: true, queryKey: ["deal"] }),
  });
}
