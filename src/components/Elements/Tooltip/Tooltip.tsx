import { ReactNode, useState } from "react";
import { clsx } from "clsx";
import style from "./Tooltip.module.css";

interface TooltipProps {
  content: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}

export const Tooltip = ({
  children,
  content,
  className = "",
  delay = 400,
}: TooltipProps) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(true);

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setActive(false);
  };
  return (
    <div
      className={clsx(style["tooltip"], className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {active && <div className={style["tooltip__content"]}>{content}</div>}
    </div>
  );
};
