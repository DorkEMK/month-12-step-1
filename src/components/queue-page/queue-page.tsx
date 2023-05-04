import React, { useMemo, useState } from "react";
import { LETTER_MAX_LENGTH, QUEUE_SIZE } from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
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
    isHead: false,
    isTail: false,
  };
  const queueInit = Array(QUEUE_SIZE).fill(elemInit);

  const queue = useMemo(() => new Queue<TQueueElem>(QUEUE_SIZE), []);

  const [queueToRender, setQueueToRender] =useState<Array<TQueueRenderElem>>(queueInit);
  const [tail, setTail] = useState(-1);

  const { values, handleChange, setValues } = useForm({ elem: "" });
  const [isLoadingEnqueue, setIsLoadingEnqueue] = useState(false);
  const [isLoadingDequeue, setIsLoadingDequeue] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  const renderEnqueue = async (queue: Queue<string>) => {
    const headIndex = queue.headPointer;
    const tailIndex = queue.tailPointer;
    const tailElem = queue.elements[tailIndex-1]; 

    if (tailElem) {
      queueToRender[tailIndex-1] = {
        letter: tailElem,
        state: ElementStates.Changing,
        isTail: true,
        isHead: queueToRender[tailIndex-1].isHead
      };
      queueToRender[tailIndex-2] = {...queueToRender[tailIndex-2], isTail: false};
      queueToRender[headIndex] = {...queueToRender[headIndex], isHead: true};
      setTail(t => t+1);
      setQueueToRender([...queueToRender]);
      await delay(SHORT_DELAY_IN_MS);
      queueToRender[tailIndex-1] = {...queueToRender[tailIndex-1], state: ElementStates.Default};

      setQueueToRender([...queueToRender]);
    }
  };

  const renderDequeue = async () => {
    const headIndex = queue.headPointer;
    const tailIndex = queue.tailPointer;

    queueToRender[headIndex-1]!.state = ElementStates.Changing;
    setQueueToRender([...queueToRender]);
    await delay(SHORT_DELAY_IN_MS);
    if (headIndex !== tailIndex) {
      queueToRender[headIndex-1] = {...queueToRender[headIndex-1], letter: "", isHead: false, state: ElementStates.Default};
      queueToRender[headIndex] = {...queueToRender[headIndex], isHead: true};
    }
    else {
      queue.reset();
      setTail(-1);
      setQueueToRender([...queueInit]);
      return
    }

    setQueueToRender([...queueToRender]);
  };

  const enqueue = (elem: string) => {
    setIsLoadingEnqueue(true);
    setValues({ ...values, elem: "" });

    queue.enqueue(elem);
    renderEnqueue(queue);

    setIsLoadingEnqueue(false);
  };

  const dequeue = async () => {
    setIsLoadingDequeue(true);

    queue.dequeue();
    renderDequeue();

    setIsLoadingDequeue(false);
  };

  const reset = () => {
    setIsLoadingReset(true);
    queue.reset();
    setQueueToRender([...queueInit]);
    setIsLoadingReset(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <Input
          maxLength={LETTER_MAX_LENGTH}
          isLimitText={true}
          value={values.elem}
          name="elem"
          onChange={handleChange}
          extraClass="mr-6"
        />
        <Button
          text={"Добавить"}
          type="button"
          isLoader={isLoadingEnqueue}
          disabled={!values.elem.length || tail === 6 || isLoadingDequeue || isLoadingReset}
          onClick={() => enqueue(values.elem)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          isLoader={isLoadingDequeue}
          disabled={queue.isEmpty() || tail < 0 || isLoadingEnqueue || isLoadingReset}
          onClick={dequeue}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          isLoader={isLoadingReset}
          onClick={reset}
          disabled={queue.isEmpty() || isLoadingEnqueue || isLoadingDequeue }
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
                  head={item.isHead ? HEAD : null}
                  tail={item.isTail ? TAIL : null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
