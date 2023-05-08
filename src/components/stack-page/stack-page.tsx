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
  const { values, handleChange, setValues } = useForm({ elem: "" });
  const { isLoadingButton, setLoadingState, resetLoadingState } = useBtn();

  const stack = useMemo(() => new Stack<TStackElem>(), []);

  const handlePush = async (elem: string, e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);

    stack.push({ letter: elem, state: ElementStates.Changing });
    setStackToRender([...stack.getElements()]);

    setValues({ ...values, elem: "" });
    await delay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setStackToRender([...stack.getElements()]);

    resetLoadingState();
  };

  const handlePop = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);

    stack.peak()!.state = ElementStates.Changing;
    setStackToRender([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackToRender([...stack.getElements()]);

    resetLoadingState();
  };

  const reset = (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);;
    stack.reset();
    setStackToRender([...stack.getElements()]);
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
        />
        <Button
          text={"Добавить"}
          type="button"
          name={StackButtons.Push}
          isLoader={isLoadingButton.button === StackButtons.Push}
          disabled={
            !values.elem.length ||
            (isLoadingButton.isLoading && isLoadingButton.button !== StackButtons.Push)
          }
          onClick={(e) => handlePush(values.elem, e)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          name={StackButtons.Pop}
          isLoader={isLoadingButton.button === StackButtons.Pop}
          disabled={
            !stackToRender.length ||
            (isLoadingButton.isLoading && isLoadingButton.button !== StackButtons.Pop)
          }
          onClick={(e) => handlePop(e)}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          name={StackButtons.Reset}
          isLoader={isLoadingButton.button === StackButtons.Reset}
          onClick={(e) => reset(e)}
          disabled={
            !stackToRender.length ||
            (isLoadingButton.isLoading && isLoadingButton.button !== StackButtons.Reset)
          }
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
