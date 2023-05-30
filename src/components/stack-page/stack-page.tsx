import React, { MouseEvent, useMemo, useState } from "react";
import { LETTER_MAX_LENGTH } from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useBtn } from "../../hooks/useBtn";
import { useForm } from "../../hooks/useForm";
import { StackButtons } from "../../types/btn-names";
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
  const [changingElemIndex, setChangingElemIndex] = useState<number | null>(
    null
  );
  const { values, handleChange, setValues } = useForm({ elem: "" });
  const { isLoadingButton, setLoadingState, resetLoadingState } = useBtn();

  const stack = useMemo(() => new Stack<TStackElem>(), []);

  const handlePush = async (
    elem: TStackElem,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    setLoadingState(e);

    stack.push(elem);
    setStackToRender(stack.elements);
    setValues({ ...values, elem: "" });
    setChangingElemIndex(stack.size);
    await delay(SHORT_DELAY_IN_MS);
    setChangingElemIndex(null);

    resetLoadingState();
  };

  const handlePop = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);

    setChangingElemIndex(stack.size);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackToRender(stack.elements);
    setChangingElemIndex(null);

    resetLoadingState();
  };

  const reset = (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);

    stack.reset();
    setStackToRender([...stack.elements]);

    resetLoadingState();
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
          data-cy="input"
        />
        <Button
          text={"Добавить"}
          type="button"
          name={StackButtons.Push}
          isLoader={isLoadingButton.button === StackButtons.Push}
          disabled={
            !values.elem.length ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== StackButtons.Push)
          }
          onClick={(e) => handlePush(values.elem, e)}
          extraClass="mr-6"
          data-cy="button-push"
        />
        <Button
          text={"Удалить"}
          type="button"
          name={StackButtons.Pop}
          isLoader={isLoadingButton.button === StackButtons.Pop}
          disabled={
            !stack.size ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== StackButtons.Pop)
          }
          onClick={(e) => handlePop(e)}
          extraClass="mr-40"
          data-cy="button-pop"
        />
        <Button
          text={"Очистить"}
          type="reset"
          name={StackButtons.Reset}
          isLoader={isLoadingButton.button === StackButtons.Reset}
          onClick={(e) => reset(e)}
          disabled={
            !stack.size ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== StackButtons.Reset)
          }
          data-cy="button-reset"
        />
      </form>
      {stackToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {stackToRender.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item}
                  state={
                    index === changingElemIndex
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  index={index-1}
                  head={index === stack.size ? "top" : null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
