import style from "./NotFound.module.css";
import img from "@/assets/404.png";
import { Button } from "@/components/Elements";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={style["wrapper"]}>
      <img className={style["image"]} src={img} alt="page not found" />
      <h1 className={style["title"]}>
        Страница которую вы ищете украли пришельцы.
      </h1>
      <Button className={style["btn"]} onClick={() => navigate("/")}>
        Вернуться на главную
      </Button>
    </div>
  );
};
