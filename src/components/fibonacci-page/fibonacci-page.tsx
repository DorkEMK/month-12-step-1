import React, { FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/delay";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [fibArray, setFibArray] = useState<number[]>([]);
  const { values, handleChange } = useForm({ index: "" });
  const [isLoading, setIsLoading] = useState(false);

  const initialFib = [1, 1];

  const calcFibArray = (index: number, initialArr: number[]) => {
    for (let i = 2; i <= index; i++) {
      initialArr[i] = initialArr[i - 1] + initialArr[i - 2];
    }

    return initialArr;
  };

  const renderFib = async (index: number, initialArr: number[]) => {
    setFibArray([]);

    const fibArray = calcFibArray(index, initialArr);
    const arrHelper: number[] = [];

    for (let fib of fibArray) {
      arrHelper.push(fib);
      setFibArray([...arrHelper]);
      await delay(500);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    renderFib(Number(values.index), initialFib);

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          max={19}
          min={1}
          isLimitText={true}
          value={values.index}
          name="index"
          onChange={handleChange}
          extraClass="mr-6"
        />
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader={isLoading}
          disabled={
            !values.index ||
            Number(values.index) < 1 ||
            Number(values.index) > 19 ||
            !Number.isInteger(Number(values.index))
          }
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
