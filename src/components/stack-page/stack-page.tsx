import React, { useMemo, useState } from "react";
import { LETTER_MAX_LENGTH } from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { TBtnState } from "../../types/btn-state";
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
  const loadingInitState = {
    isLoading: false,
    button: null,
  };
  const [stackToRender, setStackToRender] = useState<TStackElem[]>([]);

  const { values, handleChange, setValues } = useForm({ elem: "" });
  const [isLoadingButton, setIsLoadingButton] =
    useState<TBtnState>(loadingInitState);

  const stack = useMemo(() => new Stack<TStackElem>(), []);

  const handlePush = async (elem: string) => {
    setIsLoadingButton({ isLoading: true, button: "push" });

    stack.push({ letter: elem, state: ElementStates.Changing });
    setStackToRender([...stack.getElements()]);

    setValues({ ...values, elem: "" });
    await delay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setStackToRender([...stack.getElements()]);

    setIsLoadingButton(loadingInitState);
  };

  const handlePop = async () => {
    setIsLoadingButton({ isLoading: true, button: "pop" });

    stack.peak()!.state = ElementStates.Changing;
    setStackToRender([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackToRender([...stack.getElements()]);

    setIsLoadingButton(loadingInitState);
  };

  const reset = () => {
    setIsLoadingButton({ isLoading: true, button: "reset" });
    stack.reset();
    setStackToRender([...stack.getElements()]);
    setIsLoadingButton(loadingInitState);
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
          isLoader={isLoadingButton.button === "push"}
          disabled={
            !values.elem.length ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "push")
          }
          onClick={() => handlePush(values.elem)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          isLoader={isLoadingButton.button === "pop"}
          disabled={
            !stackToRender.length ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "pop")
          }
          onClick={handlePop}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          isLoader={isLoadingButton.button === "reset"}
          onClick={reset}
          disabled={
            !stackToRender.length ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "reset")
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
