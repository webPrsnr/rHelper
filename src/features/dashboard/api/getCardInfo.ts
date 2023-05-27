import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/ky";

interface CardsResponse {
  resume_link: string;
  resume_id: string;
  resume_fields: {
    [field: string]: any;
  };
}

export const getCard = (id: string): Promise<CardsResponse> => {
  return api.get(`resume/get/${id}`).json();
};

export const useCard = (id: string) => {
  return useQuery({
    queryKey: ["card-info", id],
    queryFn: () => getCard(id),
  });
};
