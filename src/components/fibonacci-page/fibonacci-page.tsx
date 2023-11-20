import React, { FormEvent, useState } from "react";
import { FIBONACCI_MAX_INDEX } from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/delay";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { calcFibArray } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [fibArray, setFibArray] = useState<number[]>([]);
  const { values, handleChange } = useForm({ index: "" });
  const [isLoading, setIsLoading] = useState(false);

  const initialFib = [1, 1];

  const renderFib = async (index: number, initialArr: number[]) => {
    setIsLoading(true);
    setFibArray([]);
    const fibArray = calcFibArray(index, initialArr);;

    for (let fib of fibArray) {
      setFibArray(arr => [...arr, fib]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    renderFib(Number(values.index), initialFib);

  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          max={FIBONACCI_MAX_INDEX}
          min={1}
          isLimitText={true}
          placeholder="Введите число"
          value={values.index}
          name="index"
          onChange={handleChange}
          extraClass="mr-6"
          data-cy="input"
        />
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader={isLoading}
          disabled={
            !values.index ||
            Number(values.index) < 1 ||
            Number(values.index) > FIBONACCI_MAX_INDEX ||
            !Number.isInteger(Number(values.index))
          }
          data-cy="submit"
        />
      </form>
      {fibArray && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {fibArray.map((item, index) => (
              <li key={index}>
                <Circle letter={item.toString()} index={index} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
