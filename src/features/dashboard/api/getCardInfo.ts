import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/ky";

interface Field {
  tag: string;
  text: string;
}

interface CardsResponse {
  resume: {
    resume_link: string;
    resume_fields: Field[];
    resume_name: string;
    resume_salary: string;
    resume_stack: "Frontend" | "Backend" | "Other";
    updatedAt: string;
  };
}

export const getCard = (id: string): Promise<CardsResponse> => {
  return api.get(`resume/get/${id}`).json();
};

export const useGetCard = (id: string) => {
  return useQuery({
    queryKey: ["card-info", id],
    queryFn: () => getCard(id),
  });
};
