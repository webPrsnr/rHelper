import { cloneElement, ReactElement, ReactNode, useEffect } from "react";
import { Button, DrawerProps as DElement } from "@/components/Elements";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Drawer as EDrawer } from "@/components/Elements";

interface DrawerProps {
  isDone: boolean;
  triggerBtn: ReactElement;
  submitBtn: ReactElement;
  title: string;
  children: ReactNode;
  size?: DElement["size"];
}

export const Drawer = ({
  children,
  isDone,
  size = "md",
  submitBtn,
  title,
  triggerBtn,
}: DrawerProps) => {
  const { close, open, isOpen } = useDisclosure();

  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <>
      {cloneElement(triggerBtn, { onClick: open })}
      <EDrawer
        isOpen={isOpen}
        onClose={close}
        title={title}
        size={size}
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" onClick={close}>
              Отменить
            </Button>
            {submitBtn}
          </>
        )}
      >
        {children}
      </EDrawer>
    </>
  );
};
