import { Dir } from "fs";
import React, { useState } from "react";
import {
  ARRAY_MAX_LENGTH,
  ARRAY_MAX_VALUE,
  ARRAY_MIN_LENGTH,
  ARRAY_MIN_VALUE,
} from "../../constants/data-constraints";
import { DELAY_IN_MS } from "../../constants/delays";
import { TBtnState } from "../../types/btn-state";
import type { TArrayElem } from "../../types/data";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Mode } from "../../types/sorting-mode";
import { delay } from "../../utils/delay";
import { randomArr } from "../../utils/randomArr";
import { swap } from "../../utils/swap";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const minLen = ARRAY_MIN_LENGTH;
  const maxLen = ARRAY_MAX_LENGTH;
  const minValue = ARRAY_MIN_VALUE;
  const maxValue = ARRAY_MAX_VALUE;

  const loadingInitState = {
    isLoading: false,
    button: null,
  };

  const [isLoadingButton, setIsLoadingButton] = useState<TBtnState>(loadingInitState);
  const [wasSorted, setWasSorted] = useState(false);
  const [sortingMode, setSortingMode] = useState(Mode.Selection);

  const arrInit = randomArr(minValue, maxValue, minLen, maxLen);

  const formRandArr = (arr: number[]) => {
    const arrOfElements: TArrayElem[] = [];
    arr.forEach((elem) => {
      arrOfElements.push({
        value: elem,
        state: ElementStates.Default,
      });
    });
    return arrOfElements;
  };

  const [arrToRender, setArrToRender] = useState(formRandArr(arrInit));

  const renderNewArray = () => {
    setIsLoadingButton({ isLoading: true, button: "newArr" });
    const newArray = randomArr(minValue, maxValue, minLen, maxLen);
    setArrToRender(formRandArr(newArray));
    setIsLoadingButton(loadingInitState);
  };

  const handleSortAscending = () => {
    setWasSorted(true);
    if (sortingMode === Mode.Selection) {
      selectionSort(arrToRender, Direction.Ascending);
    }
    if (sortingMode === Mode.Bubble) {
      bubbleSort(arrToRender, Direction.Ascending);
    }
  };

  const handleSortDescending = () => {
    setWasSorted(true);
    if (sortingMode === Mode.Selection) {
      selectionSort(arrToRender, Direction.Descending);
    }
    if (sortingMode === Mode.Bubble) {
      bubbleSort(arrToRender, Direction.Descending);
    }
  };

  const selectionSort = async (arr: TArrayElem[], direction: Direction) => {
    // recolor previously sorted array as if it was new
    if (wasSorted) {
      arr.map((elem) => (elem.state = ElementStates.Default));
      setArrToRender([...arr]);
      await delay(DELAY_IN_MS);
    }

    if (direction === Direction.Ascending) {
      setIsLoadingButton({ isLoading: true, button: "sortAsc" });

      for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        arr[i].state = ElementStates.Changing;
        setArrToRender([...arr]);
        await delay(DELAY_IN_MS);

        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setArrToRender([...arr]);
          await delay(DELAY_IN_MS);

          if (arr[j].value < arr[minIndex].value) {
            minIndex = j;
          }
          arr[j].state = ElementStates.Default;
        }
        arr[i].state = ElementStates.Default;
        swap<TArrayElem>(arr, minIndex, i);
        arr[i].state = ElementStates.Modified;
        setArrToRender([...arr]);
      }
      arr[arr.length - 1].state = ElementStates.Modified;
      setArrToRender([...arr]);
      setIsLoadingButton(loadingInitState);
    }

    if (direction === Direction.Descending) {
      setIsLoadingButton({ isLoading: true, button: "sortDesc" });

      for (let i = 0; i < arr.length - 1; i++) {
        let maxIndex = i;
        arr[i].state = ElementStates.Changing;
        setArrToRender([...arr]);
        await delay(DELAY_IN_MS);

        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setArrToRender([...arr]);
          await delay(DELAY_IN_MS);

          if (arr[j].value > arr[maxIndex].value) {
            maxIndex = j;
          }
          arr[j].state = ElementStates.Default;
        }
        arr[i].state = ElementStates.Default;
        swap<TArrayElem>(arr, maxIndex, i);
        arr[i].state = ElementStates.Modified;
        setArrToRender([...arr]);
      }
      arr[arr.length - 1].state = ElementStates.Modified;
      setArrToRender([...arr]);
      setIsLoadingButton(loadingInitState);
    }
  };

  const bubbleSort = async (arr: TArrayElem[], direction: Direction) => {
    // recolor previously sorted array as if it was new
    if (wasSorted) {
      arr.map((elem) => (elem.state = ElementStates.Default));
      setArrToRender([...arr]);
      await delay(DELAY_IN_MS);
    }

    if (direction === Direction.Ascending) {
      setIsLoadingButton({ isLoading: true, button: "sortAsc" });
      let isSorted = false;
      for (let i = 0; i < arr.length; i++) {
        // if array wasn't change in previos iteration - it is sorted
        if (isSorted) {
          for (let h = 0; h < arr.length - i; h++) {
            arr[h].state = ElementStates.Modified;
            setArrToRender([...arr]);
            setIsLoadingButton(loadingInitState);
          }
          return;
        }

        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].state = ElementStates.Changing;
          arr[j + 1].state = ElementStates.Changing;
          setArrToRender([...arr]);
          await delay(DELAY_IN_MS);

          isSorted = true;

          if (arr[j].value > arr[j + 1].value) {
            swap<TArrayElem>(arr, j, j + 1);
            isSorted = false;
            setArrToRender([...arr]);
          }
          arr[j].state = ElementStates.Default;
        }

        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArrToRender([...arr]);
      }
      setArrToRender([...arr]);
      setIsLoadingButton(loadingInitState);
    }

    if (direction === Direction.Descending) {
      setIsLoadingButton({ isLoading: true, button: "sortDesc" });
      let isSorted = false;
      for (let i = 0; i < arr.length; i++) {
        // if array wasn't change in previos iteration - it is sorted
        if (isSorted) {
          for (let h = 0; h < arr.length - i; h++) {
            arr[h].state = ElementStates.Modified;
            setArrToRender([...arr]);
            setIsLoadingButton(loadingInitState);
          }
          return;
        }

        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].state = ElementStates.Changing;
          arr[j + 1].state = ElementStates.Changing;
          setArrToRender([...arr]);
          await delay(DELAY_IN_MS);

          isSorted = true;

          if (arr[j].value < arr[j + 1].value) {
            swap<TArrayElem>(arr, j, j + 1);
            isSorted = false;
            setArrToRender([...arr]);
          }
          arr[j].state = ElementStates.Default;
        }

        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArrToRender([...arr]);
      }
      setArrToRender([...arr]);
      setIsLoadingButton(loadingInitState);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          label={"Выбор"}
          value={Mode.Selection}
          checked={sortingMode === Mode.Selection}
          onChange={() => setSortingMode(Mode.Selection)}
          disabled={isLoadingButton.isLoading}
          extraClass="mr-20"
        />
        <RadioInput
          label={"Пузырёк"}
          value={Mode.Bubble}
          checked={sortingMode === Mode.Bubble}
          onChange={() => setSortingMode(Mode.Bubble)}
          disabled={isLoadingButton.isLoading}
          extraClass="mr-25"
        />
        <Button
          text={"По возрастанию"}
          type="button"
          sorting={Direction.Ascending}
          onClick={handleSortAscending}
          isLoader={isLoadingButton.button === "sortAsc"}
          disabled={(isLoadingButton.isLoading && isLoadingButton.button !== "sortAsc")}
          extraClass="mr-6"
        />
        <Button
          text={"По убыванию"}
          type="button"
          sorting={Direction.Descending}
          onClick={handleSortDescending}
          isLoader={isLoadingButton.button === "sortDesc"}
          disabled={(isLoadingButton.isLoading && isLoadingButton.button !== "sortDesc")}
          extraClass="mr-40"
        />
        <Button
          text={"Новый массив"}
          type="button"
          onClick={renderNewArray}
          isLoader={isLoadingButton.button === "newArr"}
          disabled={(isLoadingButton.isLoading && isLoadingButton.button !== "newArr")}
        />
      </form>
      {arrToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {arrToRender.map((item, index) => (
              <li key={index}>
                <Column index={item.value} state={item.state} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
