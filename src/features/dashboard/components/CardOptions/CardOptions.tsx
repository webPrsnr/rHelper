import { Button, ConfirmDialog } from "@/components/Elements";
import { Drawer, Form, Input } from "@/components/Forms";
import clsx from "clsx";
import { z } from "zod";
import { useDeleteCard } from "../../api/deleteCard";
import { usePatchMainCard } from "../../api/patchMainCard";
import style from "./CardOptions.module.css";

interface CardOptionsProps {
  id: string;
  name: string;
  stack: string;
  salary: string;
}

interface CardDeletePRops {
  id: string;
}

export const DeleteCard = ({ id }: CardDeletePRops) => {
  const useDelete = useDeleteCard();
  return (
    <ConfirmDialog
      variant="delete"
      title="Удалить резюме?"
      body="Вы действительно хотите удалить резюме?"
      triggerBtn={
        <div
          className={clsx(style["note__block"], style["note__block_delete"])}
        >
          <span className={style["note__icon_delete"]}></span>
        </div>
      }
      confirmBtn={
        <Button
          onClick={() => {
            useDelete.mutate(id);
          }}
        >
          Удалить
        </Button>
      }
    />
  );
};

const schema = z.object({
  name: z.string(),
  salary: z.string(),
  stack: z.string(),
});

type EditValues = z.infer<typeof schema>;

export const CardEdit = ({ id, name, stack, salary }: CardOptionsProps) => {
  const usePatch = usePatchMainCard(id);
  return (
    <Drawer
      isDone={usePatch.isSuccess}
      triggerBtn={
        <div className={style["note__block"]}>
          <span className={style["note__icon"]}></span>
        </div>
      }
      title="Редактировать"
      submitBtn={
        <Button
          form="edit"
          type="submit"
          size="sm"
          isLoading={usePatch.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<EditValues, typeof schema>
        onSubmit={async (data) => {
          await usePatch.mutate({
            resumeId: id,
            fields: data,
          });
        }}
        schema={schema}
        id="edit"
        className={style["notes__form"]}
      >
        {({ register, formState }) => (
          <>
            <Input
              error={formState.errors["name"]}
              registration={register("name")}
              type="text"
              label="Имя"
              text={name}
            />
            <Input
              error={formState.errors["salary"]}
              registration={register("salary")}
              type="text"
              label="Зарплата"
              text={salary}
            />
            <Input
              error={formState.errors["stack"]}
              registration={register("stack")}
              type="text"
              label="Стэк"
              text={stack}
            />
          </>
        )}
      </Form>
    </Drawer>
  );
};
