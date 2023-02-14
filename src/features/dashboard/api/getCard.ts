import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/ky";
import { CardResponse } from "../types";

export const getCard = (id: string): Promise<CardResponse> => {
  return api.get(`resume/${id}`).json();
};

export const useCard = (id: string) => {
  return useQuery({
    queryKey: ["card", id],
    queryFn: () => getCard(id),
    enabled: !!id,
  });
};
