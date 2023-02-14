import { api } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface MoveBlockProps {
  currentBlockIndex: number;
  nextBlockIndex: number;
  token: string;
}

export const moveBlock = ({
  currentBlockIndex,
  nextBlockIndex,
  token,
}: MoveBlockProps) => {
  return api
    .post(`column/`, {
      json: {
        currentBlockIndex: currentBlockIndex,
        nextBlockIndex: nextBlockIndex,
        token: token,
      },
    })
    .json();
};

export const useTransferBlock = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (obj: MoveBlockProps) => {
      return moveBlock(obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block"] });
    },
  });
  return mutation;
};
