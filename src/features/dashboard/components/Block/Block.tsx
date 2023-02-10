import { ReactNode } from "react";

import style from "./Block.module.css";

interface BlockProps {
  title: string;
  children: ReactNode;
}

export const Block = ({ children, title }: BlockProps) => {
  return (
    <div className={style["block"]}>
      <div className={style["block__wrapper"]}>
        <div className={style["block__head"]}>
          <h3>{title}</h3>
          <div>
            <span className={style["more__btn"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z" />
              </svg>
            </span>
          </div>
        </div>
        <div className={style["block__body"]}>{children}</div>
      </div>
    </div>
  );
};
