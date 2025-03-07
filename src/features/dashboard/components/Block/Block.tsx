import { ReactNode, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CardList, DragCard } from "../Card/Card";
import { cardType } from "../../types";
import { useCard, useMoveCard } from "../../api";
import style from "./Block.module.css";
import { Spinner } from "@/components/Elements";
import { useBlockMutation } from "./useBlockMutation";

const BlockWrapper = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) => {
  const cardMutation = useMoveCard();
  const [, cardDrop] = useDrop<
    DragCard,
    void,
    { isHoveredCard: boolean; cardElem: DragCard }
  >({
    accept: cardType.ELEMENT,
    drop: (item) => {
      const dragIndex = item.id;
      const dropIndex = id;

      if (dragIndex === dropIndex) {
        return;
      }
      cardMutation.mutate({ blockId: id, cardId: item.id });
    },
  });
  return <div ref={cardDrop}>{children}</div>;
};

interface BlockProps {
  title: string;
  id: string;
  userId: string;
  hIndex: number;
  changeBlockPosition: (fItem: number, sItem: number) => void;
  deleteColumn: (id: string) => void;
}

interface DragItem {
  hIndex: number;
}

export const Block = ({
  title,
  id,
  userId,
  hIndex,
  changeBlockPosition,
  deleteColumn,
}: BlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const { drop, handlerId } = useBlockMutation({
    blockRef: blockRef,
    changeBlockPosition: changeBlockPosition,
    hIndex: hIndex,
    userId: userId,
  });

  const cards = useCard(id);

  const [{ isDragging }, drag] = useDrag({
    type: "block",
    item: () => {
      return { hIndex };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(blockRef));
  return (
    <BlockWrapper id={id}>
      <div
        ref={blockRef}
        className={style["block"]}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        data-handler-id={handlerId}
      >
        {cards.status === "loading" ? (
          <Spinner className={style["block__spinner"]} />
        ) : cards.status === "error" ? null : (
          <CardList id={id} title={title} deleteColumn={deleteColumn} />
        )}
      </div>
    </BlockWrapper>
  );
};
