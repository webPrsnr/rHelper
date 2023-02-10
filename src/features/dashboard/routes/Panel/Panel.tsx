import { Block, Card } from "../../components";
import style from "./Panel.module.css";

export const Panel = () => {
  return (
    <section className={style["panel"]}>
      <h2 className={style["panel__title"]}>Мониторинг</h2>
      <div className={style["panel__wrapper"]}>
        <Block title={"Входящие"}>
          <Card
            date="14.09"
            name="Иванов И.И"
            note={"Заметки"}
            salary={30000}
            grade="Frontend"
            status="Рассмотреть"
          />
          <Card
            date="14.09"
            name="Иванов И.И"
            note={"Заметки"}
            salary={30000}
            grade="Frontend"
            status="Проверить тестовое"
          />
          <Card
            date="14.09"
            name="Иванов И.И"
            note={"Заметки"}
            salary={30000}
            grade="Frontend"
            status="Рассмотреть"
          />
          <Card
            date="14.09"
            name="Иванов И.И"
            note={"Заметки"}
            salary={30000}
            grade="Frontend"
            status="Проверить тестовое"
          />
        </Block>
      </div>
    </section>
  );
};
