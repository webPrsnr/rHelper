import style from "./Card.module.css";

interface CardProps {
  grade: string;
  status: string;
  salary: number;
  name: string;
  date: string;
  note: string;
}

export const Card = ({
  status,
  name,
  date,
  note,
  salary,
  grade,
}: CardProps) => {
  return (
    <div className={style["card"]}>
      <div className={style["card__wrapper"]}>
        <div className={style["card__status"]}>
          <div className={style["card__check"]}>
            <span>{grade}</span>
            <span>{status}</span>
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 11H9V3h5a4 4 0 0 1 4 4h0a4 4 0 0 1-4 4ZM9 3v18"
              />
              <path
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
          <div className={style["date__block"]}>
            <span className={style["date__icon"]}>{date}</span>
          </div>
          <div className={style["note__block"]}>
            <span className={style["note__icon"]}>{note}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
