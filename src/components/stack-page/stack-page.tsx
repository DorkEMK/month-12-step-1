import React, { useMemo, useState } from "react";
import { LETTER_MAX_LENGTH } from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import type { TStackElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {

  const [stackToRender, setStackToRender] = useState<TStackElem[]>([]);

  const { values, handleChange, setValues } = useForm({ elem: "" });
  const [isLoadingPush, setIsLoadingPush] = useState(false);
  const [isLoadingPop, setIsLoadingPop] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  const stack = useMemo(() => new Stack<TStackElem>(), []);

  const push = async (elem: string) => {
    setIsLoadingPush(true);

    stack.push({ letter: elem, state: ElementStates.Changing });
    setStackToRender([...stack.getElements()]);

    setValues({ ...values, elem: "" });
    await delay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setStackToRender([...stack.getElements()]);

    setIsLoadingPush(false);
  };

  const pop = async () => {
    setIsLoadingPop(true);

    stack.peak()!.state = ElementStates.Changing;
    setStackToRender([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackToRender([...stack.getElements()]);

    setIsLoadingPop(false);
  };

  const reset = () => {
    setIsLoadingReset(true);
    stack.reset();
    setStackToRender([...stack.getElements()]);

    setIsLoadingPush(false);
    setIsLoadingReset(false);
  };

  return (
    <SolutionLayout title="Стек">
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
          isLoader={isLoadingPush}
          disabled={!values.elem.length || isLoadingPop || isLoadingReset}
          onClick={() => push(values.elem)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          isLoader={isLoadingPop}
          disabled={!stackToRender.length || isLoadingPush || isLoadingReset}
          onClick={pop}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          isLoader={isLoadingReset}
          onClick={reset}
          disabled={!stackToRender.length || isLoadingPush || isLoadingPop}
        />
      </form>
      {stackToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {stackToRender.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.letter}
                  state={item.state}
                  index={index}
                  head={index === stackToRender.length - 1 ? "top" : null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
