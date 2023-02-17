import { useDisclosure } from "@/hooks/useDisclosure";
import { cloneElement, ReactElement } from "react";
import { Button } from "../Button";
import { Dialog, DialogTitle } from "../Dialog";

import { clsx } from "clsx";

import style from "./ConfirmDialog.module.css";

const confirmInfo = {
  delete: "delete",
  info: "info",
  accept: "accept",
};

interface ConfirmDialogProps {
  triggerBtn: ReactElement;
  confirmBtn: ReactElement;
  body?: string;
  isDone?: boolean;
  title: string;
  cancelBtnText?: string;
  variant: keyof typeof confirmInfo;
}

export const ConfirmDialog = ({
  confirmBtn,
  title,
  triggerBtn,
  body = "",
  cancelBtnText = "Отмена",
  isDone = false,
  variant = "info",
}: ConfirmDialogProps) => {
  const { isOpen, open, close } = useDisclosure();

  const trigger = cloneElement(triggerBtn, { onClick: open });

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} onClose={close}>
        <DialogTitle
          className={clsx(style["confirm__title"], style[confirmInfo[variant]])}
        >
          {title}
        </DialogTitle>
        {body && <p className={style["confirm__descr"]}>{body}</p>}
        <div className={style["confirm__btns"]}>
          <Button type="button" variant="inverse" size="sm" onClick={close}>
            {cancelBtnText}
          </Button>
          {confirmBtn}
        </div>
      </Dialog>
    </>
  );
};
