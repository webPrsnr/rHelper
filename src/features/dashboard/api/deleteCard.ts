import { api } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface DeleteCardProps {
  resumeId: string;
}

export const deleteCard = (resumeID: string) => {
  return api.delete(`resume/${resumeID}`).json();
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (resumeID: string) => {
      return deleteCard(resumeID);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
    },
  });
  return mutation;
};
