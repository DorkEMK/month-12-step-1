import React, { useMemo, useState } from "react";
import {
  LETTER_MAX_LENGTH,
  QUEUE_SIZE,
} from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
import { TBtnState } from "../../types/btn-state";
import type { TQueueElem, TQueueRenderElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const elemInit: TQueueRenderElem = {
    letter: "",
    state: ElementStates.Default,
  };
  const queueInit = Array(QUEUE_SIZE).fill(elemInit);
  const headInit = -1;
  const tailInit = -1;

  const loadingInitState = {
    isLoading: false,
    button: null,
  };

  const queue = useMemo(() => new Queue<TQueueElem>(QUEUE_SIZE), []);

  const [queueToRender, setQueueToRender] =
    useState<TQueueRenderElem[]>(queueInit);
  const [head, setHead] = useState(headInit);
  const [tail, setTail] = useState(tailInit);

  const { values, handleChange, setValues } = useForm({ elem: "" });
  const [isLoadingButton, setIsLoadingButton] =
    useState<TBtnState>(loadingInitState);

  const renderReset = async () => {
    setHead(headInit);
    setTail(tailInit);
    setQueueToRender([...queueInit]);
  };

  const renderEnqueue = async (value: string) => {
    const tailIndex = queue.tailPointer;

    const newElem: TQueueRenderElem = {
      letter: value,
      state: ElementStates.Changing,
    };

    queueToRender[tailIndex] = {
      ...queueToRender[tailIndex],
      state: ElementStates.Changing,
    };
    setQueueToRender([...queueToRender]);
    await delay(SHORT_DELAY_IN_MS);

    setTail((t) => t + 1);
    tailIndex === 0 && setHead((h) => h + 1);

    queueToRender[tailIndex] = newElem;
    setQueueToRender([...queueToRender]);
    await delay(SHORT_DELAY_IN_MS);

    queueToRender[tailIndex] = {
      ...queueToRender[tailIndex],
      state: ElementStates.Default,
    };
    setQueueToRender([...queueToRender]);
  };

  const renderDequeue = async () => {
    const headIndex = queue.headPointer;
    const tailIndex = queue.tailPointer;

    queueToRender[headIndex] = {
      ...queueToRender[headIndex],
      state: ElementStates.Changing,
    };
    setQueueToRender([...queueToRender]);
    await delay(SHORT_DELAY_IN_MS);

    queueToRender[headIndex] = elemInit;
    if (headIndex === tailIndex) {
      queue.reset();
      renderReset();
      return;
    }
    setHead((h) => h + 1);
    setQueueToRender([...queueToRender]);
  };

  const handleEnqueue = (elem: string) => {
    setIsLoadingButton({ isLoading: true, button: "enqueue" });
    setValues({ ...values, elem: "" });
    queue.enqueue(elem);
    renderEnqueue(elem);
    setIsLoadingButton(loadingInitState);
  };

  const handleDequeue = async () => {
    setIsLoadingButton({ isLoading: true, button: "dequeue" });
    renderDequeue();
    queue.dequeue();
    setIsLoadingButton(loadingInitState);
  };

  const handleReset = () => {
    setIsLoadingButton({ isLoading: true, button: "reset" });
    queue.reset();
    renderReset();
    setIsLoadingButton(loadingInitState);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <Input
          maxLength={LETTER_MAX_LENGTH}
          isLimitText={true}
          placeholder="Введите значение"
          value={values.elem}
          name="elem"
          onChange={handleChange}
          extraClass="mr-6"
        />
        <Button
          text={"Добавить"}
          type="button"
          isLoader={isLoadingButton.button === "enqueue"}
          disabled={
            !values.elem.length ||
            tail === 6 ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "enqueue")
          }
          onClick={() => handleEnqueue(values.elem)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          isLoader={isLoadingButton.button === "dequeue"}
          disabled={
            queue.isEmpty() ||
            tail < 0 ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "dequeue")
          }
          onClick={handleDequeue}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          isLoader={isLoadingButton.button === "reset"}
          onClick={handleReset}
          disabled={
            queue.isEmpty() ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "reset")
          }
        />
      </form>
      {queueToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {queueToRender.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item?.letter}
                  state={item?.state}
                  index={index}
                  head={index === head ? HEAD : null}
                  tail={index === tail ? TAIL : null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
