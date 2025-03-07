import { api } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SingleBlock } from "../types";

export interface AddBlockProps {
  userId: string;
  title: string;
}

interface ReturnRes {
  column: SingleBlock;
}

export const addBlock = ({
  userId,
  title,
}: AddBlockProps): Promise<ReturnRes> => {
  return api.post(`column/${userId}`, { json: { title: title } }).json();
};

export const useAddBlock = () => {
  const mutation = useMutation({
    mutationFn: (obj: AddBlockProps) => {
      return addBlock(obj);
    },
    onSuccess: (data) => {
      return data;
    },
  });
  return mutation;
};
