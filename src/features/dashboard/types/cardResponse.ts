export interface SingleCard {
  token_key: string;
  resume_id: string;
  h_index: string;
  resume_link: string;
  resume_name: string;
  resume_salary: string;
  resume_stack: "Frontend" | "Backend" | "Other";
  resume_fields: {
    tag: string;
    text: string;
  }[];
  updatedAt: string;
}

export interface CardResponse {
  results: SingleCard[];
}
