export interface SingleCard {
  token_key: string;
  resume_id: string;
  h_index: string;
  resume_link: string;
  resume_fields: {
    name: string;
    age: number;
    salary: number;
  };
}

export interface CardResponse {
  results: SingleCard[];
}
