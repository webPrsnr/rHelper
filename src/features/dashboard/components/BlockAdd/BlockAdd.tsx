import { Button } from "@/components/Elements";
import { Drawer, Form, Input } from "@/components/Forms";
import { z } from "zod";
import { useAddBlock } from "../../api/addBlock";
import { SingleBlock } from "../../types";
import style from "./BlockAdd.module.css";

const schema = z.object({
  title: z.string(),
});

type AddValues = z.infer<typeof schema>;

interface BlockAddProps {
  id: string;
  addColumn: (block: SingleBlock) => void;
}

export const BlockAdd = ({ id, addColumn }: BlockAddProps) => {
  const addBlock = useAddBlock();

  return (
    <div>
      <div className={style["block"]}>
        <Drawer
          isDone={addBlock.isSuccess}
          triggerBtn={<span className={style["note__icon"]}></span>}
          title="Добавить"
          submitBtn={
            <Button
              form="edit"
              type="submit"
              size="sm"
              isLoading={addBlock.isLoading}
            >
              Submit
            </Button>
          }
        >
          <Form<AddValues, typeof schema>
            onSubmit={async (data) => {
              const res = await addBlock.mutateAsync({
                title: data.title,
                userId: id,
              });
              // console.log("RES", res);
              addColumn({
                column_id: res.column.column_id,
                column_index: res.column.column_index,
                column_title: res.column.column_title,
                user_id: res.column.user_id,
              });
            }}
            schema={schema}
            id="edit"
            className={style["notes__form"]}
          >
            {({ register, formState }) => (
              <>
                <Input
                  error={formState.errors["title"]}
                  registration={register("title")}
                  type="text"
                  label="Заголовок колонки"
                />
              </>
            )}
          </Form>
        </Drawer>
      </div>
    </div>
  );
};
