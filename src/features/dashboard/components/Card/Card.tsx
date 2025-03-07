import { Spinner, Tooltip } from "@/components/Elements";
import clsx from "clsx";
import { memo } from "react";
import { useDrag } from "react-dnd";
import { useCard } from "../../api";
import { useGetCard } from "../../api/getCardInfo";
import { cardType } from "../../types";
import { BlockOptions } from "../BlockOptions/BlockOptions";
import { CardNotes } from "../CardNotes/CardNotes";
import { CardEdit, DeleteCard } from "../CardOptions/CardOptions";
import style from "./Card.module.css";

interface CardProps {
  id: string;
  link: string;
  salary: string;
  grade: "Frontend" | "Backend" | "Other";
  date: string;
  name: string;
  fields: { tag: string; text: string }[];
}

export interface DragCard {
  hIndex: string;
  id: string;
  type: string;
  blockId: string;
}

const gradeInitColor = {
  Frontend: "grade__front",
  Backend: "grade__back",
  Other: "grade__other",
};

export const Card = ({
  id,
  date,
  fields,
  grade,
  link,
  name,
  salary,
}: CardProps) => {
  const gradeColor = gradeInitColor[grade];
  const fixedData = new Date(date).toLocaleDateString();
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
    [id]
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
            <span className={clsx(style["card__grade"], style[gradeColor])}>
              {grade}
            </span>
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
            content={`Обновлено:${fixedData}`}
            className={style["date__block"]}
          >
            <span className={style["date__icon"]}>{fixedData}</span>
          </Tooltip>
          <Tooltip content="Поля соискателя">
            <CardNotes fields={fields} id={id} />
          </Tooltip>
          <Tooltip content="Информация по соискателю">
            <CardEdit id={id} name={name} stack={grade} salary={salary} />
          </Tooltip>

          <DeleteCard id={id} />
        </div>
      </div>
    </div>
  );
};

const CardWrapper = ({ id }: { id: string }) => {
  const result = useGetCard(id);
  if (result.status === "loading") {
    return (
      <div className={style["card"]}>
        <Spinner />
      </div>
    );
  }

  if (result.status === "error") {
    return null;
  }

  const {
    resume_fields: fields,
    resume_link: link,
    resume_name: name,
    resume_salary: salary,
    resume_stack: grade,
    updatedAt: date,
  } = result.data.resume;

  return (
    <Card
      date={date}
      fields={fields}
      grade={grade}
      id={id}
      salary={salary}
      link={link}
      name={name}
    />
  );
};

interface CardListProps {
  title: string;
  id: string;
  deleteColumn: (id: string) => void;
}

export const CardList = memo(function CardExmpl({
  title,
  id,
  deleteColumn,
}: CardListProps) {
  const cards = useCard(id);
  if (!cards.data) {
    return null;
  }
  return (
    <>
      <div className={style["block__head"]}>
        <h3>{title}</h3>
        <BlockOptions id={id} deleteColumn={deleteColumn} />
      </div>
      {cards.status === "success"
        ? cards.data.results.map((el) => (
            <CardWrapper key={el.resume_id} id={el.resume_id} />
          ))
        : null}
    </>
  );
});
