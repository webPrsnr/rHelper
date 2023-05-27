import { Spinner } from "@/components/Elements";
import { useUser } from "@/lib/auth";
import { useCallback, useState } from "react";
import { useBlock } from "../../api";
import { Block } from "../../components";
import { SingleBlock } from "../../types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./Panel.module.css";

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
      ) : !data.data ? null : (
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
  const changeBlockPosition = useCallback(
    (fItem: number, sItem: number) => {
      //TODO
      const objArray = [];
      const indexArray = [];
      for (let i = 0; controlledColumns.length >= i; i++) {
        if (controlledColumns[i].column_index === fItem) {
          objArray.push(controlledColumns[i]);
          indexArray.push(i);
          break;
        }
      }
      for (let i = 0; controlledColumns.length >= i; i++) {
        if (controlledColumns[i].column_index === sItem) {
          objArray.push(controlledColumns[i]);
          indexArray.push(i);
          break;
        }
      }
      const firstObj = objArray[0];
      const secondObj = objArray[1];

      const fIndex = indexArray[0];
      const sIndex = indexArray[1];

      const resArray = controlledColumns;
      resArray[fIndex] = secondObj;
      resArray[sIndex] = firstObj;
      setColumns([...resArray]);
    },
    [id]
  );
  //TODO синхронизировать удаление блока react-query с controlledColumns;
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
        />
      ))}
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
