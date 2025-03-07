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

const Board = () => {
  const { data: user } = useUser();
  if (!user) {
    return null;
  }

  const userId = user.id;

  return (
    <section className={style["panel"]}>
      <h2 className={style["panel__title"]}>Мониторинг</h2>
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
  console.log("INIT", controlledColumns);

  const changeBlockPosition = (id_1: number, id_2: number) => {
    const finalArray = [...controlledColumns]; // setState(e => [...e])
    console.log("CHANGE", finalArray);
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
