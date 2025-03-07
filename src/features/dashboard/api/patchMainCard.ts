import { api } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface PatchCardProps {
  resumeId: string;
  fields: {
    name: string;
    salary: string;
    stack: string;
  };
}

export const patchCard = ({ resumeId, fields }: PatchCardProps) => {
  return api
    .patch(`resume/main/${resumeId}`, { json: { fields: fields } })
    .json();
};

export const usePatchMainCard = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (obj: PatchCardProps) => {
      return patchCard(obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-info", id] });
    },
  });
  return mutation;
};
