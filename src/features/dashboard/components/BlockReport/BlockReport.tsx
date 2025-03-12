import { useReportById } from "../../api/getReport";
import style from "./BlockReport.module.css"

interface BlockReport {
  id: string;
}

const downloadFile = async(id: string) => {
  const data = await useReportById(id)
  
  const url = window.URL.createObjectURL(data);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `$отчет_колонка.pdf`;
  document.body.appendChild(a);
  
  a.click();
  a.remove();
  
  window.URL.revokeObjectURL(url);
}

export const BlockReport = ({ id }: BlockReport) => {
  return (
    <span className={style["menu__item"]} onClick={() => downloadFile(id)}>Получить отчет</span>
  );
};
