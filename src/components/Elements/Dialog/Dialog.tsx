import { Transition, Dialog as InterfaceDialog } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import style from "./Dialog.module.css";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const DialogTitle = InterfaceDialog.Title;
export const DialogDesc = InterfaceDialog.Description;

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <InterfaceDialog as="div" className={style["dialog"]} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={style["dialog__bg"]} />
          </Transition.Child>

          <div className={style["dialog__overflow"]}>
            <div className={style["dialog__child"]}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <InterfaceDialog.Panel className={style["dialog__panel"]}>
                  {children}
                </InterfaceDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </InterfaceDialog>
      </Transition>
    </>
  );
};
