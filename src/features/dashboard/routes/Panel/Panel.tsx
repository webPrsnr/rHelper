import { Spinner } from "@/components/Elements";
import { useUser } from "@/lib/auth";
import { useCallback, useState } from "react";
import { useBlock } from "../../api";
import { Block } from "../../components";
import { SingleBlock } from "../../types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./Panel.module.css";
import { BlockAdd } from "../../components/BlockAdd/BlockAdd";
import { useReportSystem } from "../../api/getReport";

interface TitlePanelProps{
  id: string
}
const TitlePanel = (props:TitlePanelProps) => {
  const {id} = props


  const downloadFile = async() => {
    const data = await useReportSystem(id)
    
    const url = window.URL.createObjectURL(data);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `отчег_итог.pdf`;
    document.body.appendChild(a);
    
    a.click();
    a.remove();
    
    window.URL.revokeObjectURL(url);
  }

  return (
  <div className={style['panel__container']}>
    <h2>Мониторинг</h2>
    <span className={style['panel__link']} onClick={() => {
      downloadFile()
    }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#71717A" d="m12 17l4-4l-1.4-1.4l-1.6 1.55V9h-2v4.15L9.4 11.6L8 13zm-6 5q-.825 0-1.412-.587T4 20V8l6-6h8q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm0-2h12V4h-7.15L6 8.85zm0 0h12z"/></svg>
    </span>
  </div>

  )
}

const Board = () => {
  const { data: user } = useUser();
  if (!user) {
    return null;
  }

  const userId = user.id;

  return (
    <section className={style["panel"]}>
      <TitlePanel id={userId} />
      <Wrapper id={userId} />
    </section>
  );
};

const Wrapper = ({ id }: { id: string }) => {
  const data = useBlock(id);
  return (
    <div className={style["panel__wrapper"]}>
      {data.status === "loading" ? (
        <Spinner size="lg" className={style["panel__spinner"]} />
      ) : data.status === "error" ? null : (
        <ColumnsWrapper columns={data.data.columns} id={id} />
      )}
    </div>
  );
};

interface ColumnsWrapperProps {
  columns: SingleBlock[];
  id: string;
}

const ColumnsWrapper = ({ columns, id }: ColumnsWrapperProps) => {
  const [controlledColumns, setColumns] = useState(columns);
  const hashArr: Record<number, number> = {};
  controlledColumns.forEach((el, index) => (hashArr[el.column_index] = index));

  const changeBlockPosition = (id_1: number, id_2: number) => {
    const finalArray = [...controlledColumns]; // setState(e => [...e])
    const firstEl = finalArray[hashArr[id_1]]; // index
    firstEl.column_index = id_2;
    const secondEl = finalArray[hashArr[id_2]]; // index
    secondEl.column_index = id_1;
    finalArray[hashArr[id_1]] = secondEl;
    finalArray[hashArr[id_2]] = firstEl;
    setColumns(finalArray);
  };

  const addColumn = (block: SingleBlock) => {
    debugger;
    const finalArray = [...controlledColumns, block];
    setColumns(finalArray);
  };

  const deleteColumn = (id: string) => {
    debugger;
    const finalArray = controlledColumns.filter(
      (column) => column.column_id !== id
    );
    setColumns(finalArray);
  };
  return (
    <>
      {controlledColumns.map((block) => (
        <Block
          key={block.column_id}
          id={block.column_id}
          title={block.column_title}
          userId={id}
          hIndex={block.column_index}
          changeBlockPosition={changeBlockPosition}
          deleteColumn={deleteColumn}
        />
      ))}
      <BlockAdd id={id} addColumn={addColumn} />
    </>
  );
};

export const Panel = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  );
};
