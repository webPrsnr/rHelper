import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { clsx } from "clsx";
import style from "./BlockOptions.module.css";
import { useDeleteBlock } from "../../api/deleteBlock";
import { Spinner } from "@/components/Elements";

interface BlockOptionsProps {
  id: string;
}

interface BlockOptions {
  name: string;
  onClick?: () => void;
}

export const BlockOptions = ({ id }: BlockOptionsProps) => {
  const deleteMutation = useDeleteBlock();
  const options: BlockOptions[] = [
    {
      name: "Удалить",
      onClick: () => {
        deleteMutation.mutate(id);
      },
    },
    //TODO: редактировать
  ];
  return (
    <>
      <Menu as={"div"} className={style["menu"]}>
        <div>
          <Menu.Button className={style["menu__button"]}>
            <span className={style["more__btn"]}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                <path d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z" />
              </svg>
            </span>
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
            {options.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <span
                    onClick={option.onClick}
                    className={clsx(
                      style["menu__item"],
                      active ? style["menu__item_active"] : null
                    )}
                  >
                    {deleteMutation.isLoading && <Spinner size="sm" />}
                    {option.name}
                  </span>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
