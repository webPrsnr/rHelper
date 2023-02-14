import { useUser } from "@/lib/auth";
import { useCallback } from "react";
import { useBlock } from "../../api";
import { Block, Card } from "../../components";
import { SingleBlock, SingleCard } from "../../types";
import style from "./Panel.module.css";

export const Panel = () => {
  const { data: user } = useUser();
  const userId = user?.id;

  const data = useBlock(userId!);

  const renderCard = useCallback((card: SingleCard, hIndex: string) => {
    return (
      <Card
        key={hIndex}
        date={"14.05"}
        grade={"Frontend"}
        hIndex={hIndex}
        id={card.resume_id}
        name={card.resume_fields.name}
        note={"Hello"}
        salary={card.resume_fields.salary}
        status={"pending"}
        blockId={card.token_key}
      />
    );
  }, []);

  const renderBlock = useCallback(
    (block: SingleBlock, index: number) => {
      return (
        <Block
          key={block.column_id}
          id={block.column_id}
          userId={userId!}
          hIndex={block.column_index}
          title={block.column_title}
        >
          {renderCard}
        </Block>
      );
    },
    [userId]
  );

  return (
    <section className={style["panel"]}>
      <h2 className={style["panel__title"]}>Мониторинг</h2>
      <div className={style["panel__wrapper"]}>
        {data.status === "loading" ? (
          <span>Loading...</span>
        ) : (
          data.data?.columns.map((block, index) => renderBlock(block, index))
        )}
      </div>
    </section>
  );
};
