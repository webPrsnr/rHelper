import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/ky";
import { BlockResponse } from "../types";

export const getBlock = (id: string): Promise<BlockResponse> => {
  return api.get(`column/${id}`).json();
};

export const useBlock = (id: string) => {
  return useQuery({
    queryKey: ["block", id],
    queryFn: () => getBlock(id),
    enabled: !!id,
  });
};
