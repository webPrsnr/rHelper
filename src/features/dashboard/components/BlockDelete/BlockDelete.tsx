import { Button, ConfirmDialog } from "@/components/Elements";
import { useDeleteBlock } from "../../api/deleteBlock";

interface BlockDelete {
  id: string;
  triggerBtn: any;
  deleteColumn: (id: string) => void;
}

export const BlockDelete = ({ id, triggerBtn, deleteColumn }: BlockDelete) => {
  const deleteMutation = useDeleteBlock();
  return (
    <ConfirmDialog
      variant="delete"
      title="Удалить блок"
      body="Вы действительно хотите удалить блок?"
      triggerBtn={triggerBtn}
      confirmBtn={
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => {
            deleteColumn(id);
            deleteMutation.mutate(id);
          }}
        >
          Удалить
        </Button>
      }
    />
  );
};
