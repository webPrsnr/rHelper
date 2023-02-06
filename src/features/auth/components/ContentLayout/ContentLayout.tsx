import { ReactNode } from "react";
import style from "./ContentLayout.module.css";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export const ContentLayout = ({ children, title }: LayoutProps) => {
  return (
    <section className={style["layout__wrapper"]}>
      <div className={style["layout__head"]}>
        <h1 className={style["layout__title"]}>{title}</h1>
      </div>
      {children}
    </section>
  );
};
