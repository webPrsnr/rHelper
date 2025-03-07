import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { clsx } from "clsx";

import style from "./Drawer.module.css";

const sizes = {
  sm: "sm",
  md: "md",
};

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  renderFooter: () => ReactNode;
  size?: keyof typeof sizes;
}

export const Drawer = ({
  children,
  isOpen,
  onClose,
  renderFooter,
  title,
  size = "md",
}: DrawerProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        open={isOpen}
        onClose={onClose}
        className={style["drawer"]}
      >
        <div className={style["drawer__wrapper"]}>
          <Transition.Child as={Fragment}>
            <div
              className={clsx(style["drawer__container"], style[sizes[size]])}
            >
              <div className={style["container__wrapper"]}>
                <div className={style["container__body"]}>
                  <div className={style["container__header"]}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <div className={style["icon__container"]} onClick={onClose}>
                      <svg
                        className={style["icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#71717A"
                          fillRule="evenodd"
                          d="M19.2 6.2a1 1 0 0 0-1.4-1.4L12 10.58l-5.8-5.8a1 1 0 0 0-1.4 1.42L10.58 12l-5.8 5.8a1 1 0 1 0 1.42 1.4L12 13.42l5.8 5.8a1 1 0 0 0 1.4-1.42L13.42 12l5.8-5.8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={style["container__items"]}>{children}</div>
                </div>
                <div className={style["container__footer"]}>
                  {renderFooter()}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
