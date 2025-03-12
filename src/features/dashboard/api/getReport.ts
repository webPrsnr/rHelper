import { api } from "@/lib/ky";

const getReportById = (id: string): Promise<any> => {
  return api.get(`report/block/${id}`).blob();
};

const getSystemReport = (id: string): Promise<any> => {
  return api.get(`report/all/${id}`).blob()
}


export const useReportById = async (id: string) => {
  return await getReportById(id)
};

export const useReportSystem = async (id: string) => {
  return await getSystemReport(id)
}