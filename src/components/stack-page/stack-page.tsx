import React, { useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import type { TStackElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<TStackElem[]>([]);

  const { values, handleChange, setValues } = useForm({ elem: "" });
  const [isLoadingPush, setIsLoadingPush] = useState(false);
  const [isLoadingPop, setIsLoadingPop] = useState(false);
  const [isLoadingReset, setIsLoadingReset] = useState(false);

  const arrHelper: TStackElem[] = useMemo(() => [], []);

  const push = async (elem: string) => {
    setIsLoadingPush(true);

    arrHelper.push({ letter: elem, state: ElementStates.Changing });
    setStack([...arrHelper]);

    setValues({ ...values, elem: "" });
    await delay(500);

    arrHelper[arrHelper.length - 1].state = ElementStates.Default;
    setStack([...arrHelper]);

    setIsLoadingPush(false);
  };

  const pop = async () => {
    setIsLoadingPop(true);

    arrHelper[arrHelper.length - 1].state = ElementStates.Changing;
    setStack([...arrHelper]);
    await delay(500);

    arrHelper.pop();
    setStack([...arrHelper]);

    setIsLoadingPop(false);
  };

  const reset = () => {
    setIsLoadingReset(true);
    arrHelper.length = 0;
    setStack([...arrHelper]);

    setIsLoadingPush(false);
    setIsLoadingReset(false);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input
          maxLength={4}
          isLimitText={true}
          value={values.elem}
          name="elem"
          onChange={handleChange}
          extraClass="mr-6"
        />
        <Button
          text={"Добавить"}
          type="button"
          isLoader={isLoadingPush}
          disabled={!values.elem.length}
          onClick={() => push(values.elem)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          isLoader={isLoadingPop}
          disabled={!stack.length}
          onClick={pop}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          isLoader={isLoadingReset}
          onClick={reset}
          disabled={!stack.length}
        />
      </form>
      {stack && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {stack.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.letter}
                  state={item.state}
                  index={index}
                  head={index === stack.length - 1 ? "top" : null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
