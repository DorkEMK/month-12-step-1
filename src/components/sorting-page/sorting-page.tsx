import React, { MouseEvent, useState } from "react";
import {
  ARRAY_MAX_LENGTH,
  ARRAY_MAX_VALUE,
  ARRAY_MIN_LENGTH,
  ARRAY_MIN_VALUE,
} from "../../constants/data-constraints";
import { DELAY_IN_MS } from "../../constants/delays";
import { useBtn } from "../../hooks/useBtn";
import { SortButtons } from "../../types/btn-names";
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

  const { isLoadingButton, setLoadingState, resetLoadingState } = useBtn();
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

  const renderNewArray = (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);
    const newArray = randomArr(minValue, maxValue, minLen, maxLen);
    setArrToRender(formRandArr(newArray));
    resetLoadingState();
  };

  const handleSortAscending = (e: MouseEvent<HTMLButtonElement>) => {
    setWasSorted(true);
    if (sortingMode === Mode.Selection) {
      selectionSort(arrToRender, Direction.Ascending, e);
    }
    if (sortingMode === Mode.Bubble) {
      bubbleSort(arrToRender, Direction.Ascending, e);
    }
  };

  const handleSortDescending = (e: MouseEvent<HTMLButtonElement>) => {
    setWasSorted(true);
    if (sortingMode === Mode.Selection) {
      selectionSort(arrToRender, Direction.Descending, e);
    }
    if (sortingMode === Mode.Bubble) {
      bubbleSort(arrToRender, Direction.Descending, e);
    }
  };

  const selectionSort = async (arr: TArrayElem[], direction: Direction, e: MouseEvent<HTMLButtonElement>) => {
    // recolor previously sorted array as if it was new
    if (wasSorted) {
      arr.map((elem) => (elem.state = ElementStates.Default));
      setArrToRender([...arr]);
      await delay(DELAY_IN_MS);
    }

    if (direction === Direction.Ascending) {
      setLoadingState(e);

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
      resetLoadingState();
    }

    if (direction === Direction.Descending) {
      setLoadingState(e);

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
      resetLoadingState();
    }
  };

  const bubbleSort = async (arr: TArrayElem[], direction: Direction, e: MouseEvent<HTMLButtonElement>) => {
    // recolor previously sorted array as if it was new
    if (wasSorted) {
      arr.map((elem) => (elem.state = ElementStates.Default));
      setArrToRender([...arr]);
      await delay(DELAY_IN_MS);
    }

    if (direction === Direction.Ascending) {
      setLoadingState(e);
      let isSorted = false;
      for (let i = 0; i < arr.length; i++) {
        // if array wasn't change in previos iteration - it is sorted
        if (isSorted) {
          for (let h = 0; h < arr.length - i; h++) {
            arr[h].state = ElementStates.Modified;
            setArrToRender([...arr]);
            resetLoadingState();
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
      resetLoadingState();
    }

    if (direction === Direction.Descending) {
      setLoadingState(e);
      let isSorted = false;
      for (let i = 0; i < arr.length; i++) {
        // if array wasn't change in previos iteration - it is sorted
        if (isSorted) {
          for (let h = 0; h < arr.length - i; h++) {
            arr[h].state = ElementStates.Modified;
            setArrToRender([...arr]);
            resetLoadingState();
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
      resetLoadingState();
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
          name={SortButtons.Ascending}
          sorting={Direction.Ascending}
          onClick={(e) => handleSortAscending(e)}
          isLoader={isLoadingButton.button === "sortAsc"}
          disabled={(isLoadingButton.isLoading && isLoadingButton.button !== SortButtons.Ascending)}
          extraClass="mr-6"
        />
        <Button
          text={"По убыванию"}
          type="button"
          name={SortButtons.Descending}
          sorting={Direction.Descending}
          onClick={(e) => handleSortDescending(e)}
          isLoader={isLoadingButton.button === SortButtons.Descending}
          disabled={(isLoadingButton.isLoading && isLoadingButton.button !== SortButtons.Descending)}
          extraClass="mr-40"
        />
        <Button
          text={"Новый массив"}
          type="button"
          name={SortButtons.NewArray}
          onClick={(e) => renderNewArray(e)}
          isLoader={isLoadingButton.button === SortButtons.NewArray}
          disabled={(isLoadingButton.isLoading && isLoadingButton.button !== SortButtons.NewArray)}
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
