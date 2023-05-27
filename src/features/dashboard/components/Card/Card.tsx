import { Tooltip } from "@/components/Elements";
import { memo } from "react";
import { useDrag } from "react-dnd";
import { useCard } from "../../api";
import { cardType } from "../../types";
import { BlockOptions } from "../BlockOptions/BlockOptions";
import { CardNotes } from "../CardNotes/CardNotes";
import style from "./Card.module.css";

interface CardProps {
  grade: string;
  status: string;
  salary: number;
  name: string;
  date: string;
  note: string;
  id: string;
  blockId: string;
}

export interface DragCard {
  hIndex: string;
  id: string;
  type: string;
  blockId: string;
}

export const Card = ({
  blockId,
  date,
  grade,
  id,
  name,
  note,
  salary,
  status,
}: CardProps) => {
  const [{ isDragging }, cardDrag] = useDrag(
    {
      type: cardType.ELEMENT,
      item: () => {
        return { id };
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    },
    []
  );
  return (
    <div
      ref={cardDrag}
      className={style["card"]}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={style["card__wrapper"]}>
        <div className={style["card__status"]}>
          <div className={style["card__check"]}>
            <span className={style["card__grade"]}>{grade}</span>
          </div>
          <span>
            {salary}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={style["card__salary"]}
              data-name="Flat Line"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 11H9V3h5a4 4 0 0 1 4 4h0a4 4 0 0 1-4 4ZM9 3v18"
              />
              <path
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 15h9"
                data-name="primary"
              />
            </svg>
          </span>
        </div>
        <div className={style["card__name"]}>
          <h4>{name}</h4>
        </div>
        <div className={style["card__notes"]}>
          <Tooltip
            content={`Решить до ${date}`}
            className={style["date__block"]}
          >
            <span className={style["date__icon"]}>{date}</span>
          </Tooltip>
          <CardNotes note={note} id={id} />
        </div>
      </div>
    </div>
  );
};

interface CardListProps {
  title: string;
  id: string;
}

export const CardList = memo(function CardExmpl({ title, id }: CardListProps) {
  const cards = useCard(id);
  return (
    <>
      <div className={style["block__head"]}>
        <h3>{title}</h3>
        <BlockOptions id={id} />
      </div>
      {cards.data?.results.map((card) => (
        <Card
          key={card.resume_id}
          blockId={id}
          date="hello"
          grade="Frontend"
          name="William"
          note="Hello"
          salary={card.resume_fields.salary}
          id={card.resume_id}
          status="pending"
        />
      ))}
    </>
  );
});
