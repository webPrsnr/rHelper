import { useDisclosure } from "@/hooks/useDisclosure";
import { cloneElement, ReactElement } from "react";
import { Button } from "../Button";
import { Dialog, DialogTitle } from "../Dialog";

interface ConfirmDialogProps {
  triggerBtn: ReactElement;
  confirmBtn: ReactElement;
  body?: string;
  isDone?: boolean;
  title: string;
  cancelBtnText?: string;
}

export const ConfirmDialog = ({
  confirmBtn,
  title,
  triggerBtn,
  body = "",
  cancelBtnText = "Отмена",
  isDone = false,
}: ConfirmDialogProps) => {
  const { isOpen, open, close } = useDisclosure();

  const trigger = cloneElement(triggerBtn, { onClick: open });

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} onClose={close}>
        <DialogTitle>{title}</DialogTitle>
        {body && <p>{body}</p>}
        <Button type="button" variant="inverse" onClick={close}>
          {cancelBtnText}
        </Button>
        {confirmBtn}
      </Dialog>
    </>
  );
};
