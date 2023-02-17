import { Button, ConfirmDialog } from "@/components/Elements";
import { useDeleteBlock } from "../../api/deleteBlock";

interface BlockDelete {
  id: string;
  triggerBtn: any;
}

export const BlockDelete = ({ id, triggerBtn }: BlockDelete) => {
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
          onClick={() => deleteMutation.mutate(id)}
        >
          Удалить
        </Button>
      }
    />
  );
};
