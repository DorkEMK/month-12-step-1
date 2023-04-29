import React, { FormEvent, useState }  from "react";
import { STRING_MAX_LENGTH } from "../../constants/data-constraints";
import { useForm } from "../../hooks/useForm";
import type { TStringElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swap";

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {

  const [strArray, setStrArray] = useState<TStringElem[]>([]);
  const {values, handleChange} = useForm({string: ''});
  const [isLoading, setIsLoading] = useState(false);

  const formInitialArr = () => (
    values.string.split('')
    .map((item) => ({item: item, state: ElementStates.Default}))
  )

  const renderReverse = async (arr: TStringElem[], start: number, end: number) => {
    if (end - start < 2) {
      arr[end].state = ElementStates.Modified;
      setStrArray([...arr]);
      await delay(1000);

      return arr;
    }
    arr[start].state = ElementStates.Changing;
    arr[end].state = ElementStates.Changing;
    setStrArray([...arr]);
    await delay(1000);

    swap<TStringElem>(arr, start, end);
    arr[start].state = ElementStates.Modified;
    arr[end].state = ElementStates.Modified;
    setStrArray([...arr]);
    await delay(1000);

    renderReverse(arr, start+1, end-1);

    return arr;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setIsLoading(true);

    const initArr = formInitialArr();
    setStrArray(initArr);
    await delay(1000);

    renderReverse(initArr, 0, initArr.length-1);

    setIsLoading(false);
  }

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
        />
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader = {isLoading}
          disabled = {!values.string.length}
        />
      </form>
      {strArray &&
      <ul className={styles.letters}>
        {
          strArray.map((item, index) => (
            <li key={index}>
              <Circle letter={item.item} state={item.state} />
            </li>
          ))
        }
      </ul>}

    </SolutionLayout>
  );
};
