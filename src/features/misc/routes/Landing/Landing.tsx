import clsx from "clsx";
import style from "./Landing.module.css";
import { Button } from "@/components/Elements";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/auth";

export const Landing = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();

  const initRedirect = () => {
    if (user) {
      navigate("/app");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <section className={style["landing"]}>
      <div className={style["landing__wrapper"]}>
        <div className={style["landing__title"]}>
          <h1 className={style["title__welcome"]}>
            Комплекс
            <br />
            мониторинга
            <br />
            <span>резюме</span>
          </h1>
          <p className={style["title__descr"]}>
            Удобное приложения по мониторингу поступающих резюме, состоящее из
            виджета (парсинг работают только на{" "}
            <a href="https://hh.ru">hh.ru</a>) и отдельного сайта.
          </p>
          <Button
            className={style["title__btn"]}
            onClick={initRedirect}
            variant="primary"
          >
            Начать работу
          </Button>
        </div>
        <div className={style["landing__features"]}>
          <div
            className={clsx(style["feature__block"], style["feature__block_1"])}
          >
            <img src="" alt="" />
            <h2 className={style["block__title"]}>
              Зарегестрируйтесь в приложении
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              minus.
            </p>
          </div>
          <div
            className={clsx(style["feature__block"], style["feature__block_2"])}
          >
            <img src="" alt="" />
            <h2 className={style["block__title"]}>
              Скачайте виджет и введите свой API-ключ
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              minus.
            </p>
          </div>
          <div
            className={clsx(style["feature__block"], style["feature__block_3"])}
          >
            <img src="" alt="" />
            <h2 className={style["block__title"]}>
              Мониторьте резюме внутри приложения
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              minus.
            </p>
          </div>
        </div>
        <div className={style["landing__footer"]}>2023</div>
      </div>
    </section>
  );
};
