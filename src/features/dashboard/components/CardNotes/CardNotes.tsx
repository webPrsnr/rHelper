import { Button } from "@/components/Elements";
import { Drawer, Form, TextArea } from "@/components/Forms";
import style from "./CardNotes.module.css";
import { z } from "zod";
import { usePatchCard } from "../../api/patchCard";

interface CardFields {
  tag: string;
  text: string;
}

interface CardNotesProps {
  id: string;
  fields: CardFields[];
}

const schema = z.record(z.string(), z.string());

type CardSchema = z.infer<typeof schema>;

export const CardNotes = ({ id, fields }: CardNotesProps) => {
  const usePatch = usePatchCard(id);
  if (!fields) {
    return null;
  }
  return (
    <Drawer
      isDone={usePatch.isSuccess}
      triggerBtn={
        <div className={style["note__block"]}>
          <span className={style["note__icon"]}></span>
        </div>
      }
      title="Обновить"
      submitBtn={
        <Button
          form="update"
          type="submit"
          size="sm"
          isLoading={usePatch.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<CardSchema, typeof schema>
        onSubmit={async (data) => {
          await usePatch.mutate({
            resumeId: id,
            fields: data,
          });
        }}
        id="update"
        className={style["notes__form"]}
      >
        {({ register, formState }) => (
          <>
            {fields.map((field: CardFields) => (
              <TextArea
                key={field.tag}
                text={field.text}
                error={formState.errors[field.tag]}
                registration={register(field.tag)}
                label={field.tag}
              />
            ))}
          </>
        )}
      </Form>
    </Drawer>
  );
};
