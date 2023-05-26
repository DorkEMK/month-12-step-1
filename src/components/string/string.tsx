import React, { FormEvent, useState } from "react";
import { STRING_MAX_LENGTH } from "../../constants/data-constraints";
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import type { TStringElem } from "../../types/data";
import { delay } from "../../utils/delay";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { formInitialArr, reverseBySteps } from "./utils";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState<TStringElem[]>([]);
  const { values, handleChange } = useForm({ string: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const initArr = formInitialArr(values.string);
    const steps = reverseBySteps(initArr, 0, initArr.length - 1, [[...initArr]]);
    if (steps?.length) {
      for (const step of steps) {
        setString([...step]);
        await delay(DELAY_IN_MS);
      }
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={STRING_MAX_LENGTH}
          isLimitText={true}
          value={values.string}
          name="string"
          onChange={handleChange}
          extraClass="mr-6"
          data-cy="input"
        />
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader={isLoading}
          disabled={!values.string.length}
          data-cy="submit"
        />
      </form>
      {string && (
        <ul className={styles.letters}>
          {string.map((item, index) => (
            <li key={index}>
              <Circle letter={item.item} state={item.state} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
