import { useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { useTransferBlock } from "../../api";

interface DragItem {
  hIndex: number;
}

interface BlockMutationProps {
  blockRef: React.RefObject<HTMLDivElement>;
  hIndex: number;
  changeBlockPosition: (fItem: number, sItem: number) => void;
  userId: string;
}

export const useBlockMutation = ({
  blockRef,
  hIndex,
  changeBlockPosition,
  userId,
}: BlockMutationProps) => {
  const blockMutation = useTransferBlock();
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "block",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!blockRef.current) {
        return;
      }
      const dragItem = item.hIndex;
      const dropItem = hIndex;

      if (dragItem === dropItem) {
        return;
      }

      const hoverBoundingRect = blockRef.current?.getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return null;
      }

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragItem < dropItem && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragItem > dropItem && hoverClientX > hoverMiddleX) {
        return;
      }

      changeBlockPosition(dragItem, dropItem);
      blockMutation.mutate({
        currentBlockIndex: dragItem,
        nextBlockIndex: dropItem,
        token: userId,
      });
      item.hIndex = dropItem;
    },
  });

  return { handlerId, drop };
};
