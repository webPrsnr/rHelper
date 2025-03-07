import { ReactNode, useState } from "react";
import { Tooltip } from "../Tooltip";
import style from "./CopyClipboard.module.css";

interface CopyClipboardProps {
  children: ReactNode;
  copyText: string;
}

export const CopyClipboard = ({ children, copyText }: CopyClipboardProps) => {
  const [flag, setFlag] = useState(true);

  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!flag) return;
    navigator.clipboard.writeText(copyText);
    setFlag(false);
  };

  return (
    <Tooltip
      content={flag ? "Нажмите чтобы скопировать" : "Текст успешно скопирован"}
    >
      <div onClick={clickHandler} className={flag ? "" : style["area"]}>
        {children}
      </div>
    </Tooltip>
  );
};
