import { api } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface MoveCardProps {
  cardId: string;
  blockId: string;
}

export const moveCard = ({ cardId, blockId }: MoveCardProps) => {
  return api.post(`resume/${blockId}`, { json: { resumId: cardId } }).json();
};

export const useMoveCard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (obj: MoveCardProps) => {
      return moveCard(obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card"] });
    },
  });
  return mutation;
};
