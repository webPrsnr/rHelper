import { useLogout } from "@/lib/auth";
import { ReactNode, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import style from "./Dashboard.module.css";
import clsx from "clsx";

interface NavigateSelection {
  name: string;
  to: string;
  onClick?: () => void;
}
const UserNavigation = () => {
  const userLogout = useLogout();

  const navigateSelection: NavigateSelection[] = [
    { name: "Профиль", to: "./profile" },
    {
      name: "Выйти",
      to: "",
      onClick: () => {
        userLogout.mutate({});
      },
    },
  ];

  return (
    <Menu as={"div"} className={style["menu"]}>
      <div>
        <Menu.Button className={style["menu__button"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={style["menu__icon"]}
          >
            <g fill="#ffffff" transform="translate(0, 0) scale(1, 1) ">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </g>
          </svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={style["menu__list"]}>
          {navigateSelection.map((select) => (
            <Menu.Item key={select.name}>
              {({ active }) => (
                <Link
                  to={select.to}
                  onClick={select.onClick}
                  className={clsx(
                    style["menu__item"],
                    active ? style["menu__item_active"] : ""
                  )}
                >
                  {select.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  return (
    <section className={style["dashboard"]}>
      <header className={style["dashboard__header"]}>
        <div className={style["header__wrapper"]}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2190.46 -1499.46 3594.37 2265.22"
              className={style["logo"]}
            >
              <g transform="translate(-1883.26 -1191.43) scale(51.588)">
                <g fill="#007bff">
                  <path d="M0 31.98h32v-32H0v32zm2-30h28v28H2v-28z" />
                  <path d="M6.44 16.83h8.96l-4.48-7.74zM16.6 13.33h8.96l-4.48-7.74zM6.44 26.41h8.96l-4.48-7.74zM16.6 22.91h8.96l-4.48-7.74z" />
                </g>
              </g>
              <path
                fill="#007bff"
                d="M324 0H146v1013h102q29 0 40-11t15-38l12-158q52 106 128 165 77 60 180 60 42 0 76-10 34-9 63-26l-23-133q-7-25-31-25-14 0-43 9-29 10-81 10-93 0-156-54-62-54-104-157V0Zm1818 1433V0h-195v652h-772V0H980v1433h195V794h772v639h195Z"
                transform="scale(.512 -.512)"
              />
            </svg>
          </div>
          <div>
            <UserNavigation />
          </div>
        </div>
      </header>
      <main className={style["dashboard__main"]}>{children}</main>
    </section>
  );
};
