import clsx from "clsx";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { DragCard } from "../Card/Card";
import { SingleCard, blockType, cardType } from "../../types";
import { useCard, useMoveCard, useTransferBlock } from "../../api";
import style from "./Block.module.css";
import { BlockOptions } from "../BlockOptions/BlockOptions";

interface BlockProps {
  title: string;
  children: (card: SingleCard, hIndex: string) => JSX.Element;
  id: string;
  userId: string;
  hIndex: number;
}

interface DragBlock {
  hIndex: number;
  id: number;
  type: string;
}

export const Block = ({ children, title, id, userId, hIndex }: BlockProps) => {
  const cards = useCard(id);
  const cardMutation = useMoveCard();
  const blockMutation = useTransferBlock();

  const ref = useRef<HTMLDivElement>(null);

  //TODO: Вынести в отдельный хук.
  const [{ handlerId }, dropRef] = useDrop<
    DragBlock,
    void,
    { handlerId: Identifier | null }
  >(
    {
      accept: blockType.ELEMENT,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      drop: (item) => {
        const dragIndex = item.hIndex;
        const dropIndex = hIndex;

        if (dragIndex === dropIndex) {
          return;
        }
        blockMutation.mutate({
          currentBlockIndex: dragIndex,
          nextBlockIndex: dropIndex,
          token: userId,
        });
      },
    },
    [id]
  );

  const [{ isDragging }, dragRef] = useDrag(
    {
      type: blockType.ELEMENT,
      item: () => {
        return { id, hIndex };
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
    [id]
  );

  //TODO: Продумать как прикрутить к Card
  const [{ isHoveredCard, cardElem }, cardDrop] = useDrop<
    DragCard,
    void,
    { isHoveredCard: boolean; cardElem: DragCard }
  >(
    {
      accept: cardType.ELEMENT,
      drop: (item) => {
        const dragIndex = item.blockId;
        const dropIndex = id;

        if (dragIndex === dropIndex) {
          return;
        }
        cardMutation.mutate({ blockId: id, cardId: item.id });
      },
      collect: (monitor) => ({
        isHoveredCard: !!monitor.isOver(),
        cardElem: monitor.getItem(),
      }),
    },
    [id]
  );

  const opacity = isDragging ? style["opacity"] : null;
  const hover = isHoveredCard && cardElem.blockId !== id ? true : false;

  dragRef(dropRef(ref));

  return (
    <div ref={cardDrop} style={{ position: "relative" }}>
      <div
        ref={ref}
        className={clsx(style["block"], opacity)}
        data-handler-id={handlerId}
      >
        <div className={style["block__wrapper"]}>
          <div className={style["block__head"]}>
            <h3>{title}</h3>
            <div>
              <BlockOptions id={id} />
            </div>
          </div>
          <div className={style["block__body"]}>
            {cards.status === "loading" ? (
              <span>Loading...</span>
            ) : (
              cards.data?.results.map((card) => children(card, card.h_index))
            )}
          </div>
        </div>
      </div>
      {hover && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        ></div>
      )}
    </div>
  );
};
