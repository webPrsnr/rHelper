import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/ky";
import { BlockResponse } from "../types";

interface DeleteResponse {
  message: string;
}

export const deleteBlock = (id: string): Promise<BlockResponse> => {
  return api.delete(`column/${id}`).json();
};

export const useDeleteBlock = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return deleteBlock(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block"] });
    },
  });
  return mutation;
};
