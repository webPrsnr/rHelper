import { useUser } from "@/lib/auth";

import style from "./Profile.module.css";

interface UserProperty {
  label: string;
  value: string;
}

const UserProperty = ({ label, value }: UserProperty) => {
  return (
    <div className={style["user__wrapper"]}>
      <div className={style["user__elem"]}>{label}</div>
      <div className={style["user__elem"]}>{value}</div>
    </div>
  );
};

export const Profile = () => {
  const { data } = useUser();

  if (!data) {
    return null;
  }

  return (
    <section className={style["profile"]}>
      <div className={style["profile__wrapper"]}>
        <h1 className={style["profile__title"]}>Ваш профиль</h1>
        <div className={style["profile__container"]}>
          <div className={style["profile__head"]}>
            <div className={style["head__left"]}>
              <p className={style["profile__descr"]}>
                Здесь вы можете редактировать свой профиль
              </p>
            </div>
          </div>
          <div className={style["profile__body"]}>
            <UserProperty label={"Имя"} value={data.firstName} />
            <UserProperty label={"Фамилия"} value={data.lastName} />
            <UserProperty label={"Компания"} value={data.organization} />
            <UserProperty label={"Логин"} value={data.login} />
            <UserProperty label={"API-ключ"} value={data.api} />
          </div>
        </div>
      </div>
    </section>
  );
};
