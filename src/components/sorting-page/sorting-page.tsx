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
import type { Step } from "../../types/data";
import { Direction } from "../../types/direction";
import { Mode } from "../../types/sorting-mode";
import { delay } from "../../utils/delay";
import { getRandomArr } from "../../utils/randomArr";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { bubbleSort, getColumnState, selectionSort } from "./utils";

export const SortingPage: React.FC = () => {
  const minLen = ARRAY_MIN_LENGTH;
  const maxLen = ARRAY_MAX_LENGTH;
  const minValue = ARRAY_MIN_VALUE;
  const maxValue = ARRAY_MAX_VALUE;

  const { isLoadingButton, setLoadingState, resetLoadingState } = useBtn();
  const [sortingMode, setSortingMode] = useState(Mode.Selection);

  const arrInit = getRandomArr(minValue, maxValue, minLen, maxLen);

  const [arrToRender, setArrToRender] = useState<Step>({
    currentArray: arrInit,
    indexI: null,
    indexJ: null,
    sortedRange: [],
  });

  const renderNewArray = (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);
    setArrToRender({
      currentArray: [...getRandomArr(minValue, maxValue, minLen, maxLen)],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    });
    resetLoadingState();
  };

  const renderSteps = async (
    steps: Step[],
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setLoadingState(e);

    if (steps?.length) {
      for (const step of steps) {
        setArrToRender(step);
        await delay(DELAY_IN_MS);
      }
    }
    resetLoadingState();
  };

  const handleSort = (
    e: MouseEvent<HTMLButtonElement>,
    mode: Mode,
    direction: Direction
  ) => {
    const steps =
      mode === Mode.Selection
        ? selectionSort(arrToRender.currentArray, direction)
        : mode === Mode.Bubble
        ? bubbleSort(arrToRender.currentArray, direction)
        : [];

    renderSteps(steps, e);
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
          onClick={(e) => handleSort(e, sortingMode, Direction.Ascending)}
          isLoader={isLoadingButton.button === SortButtons.Ascending}
          disabled={
            isLoadingButton.isLoading &&
            isLoadingButton.button !== SortButtons.Ascending
          }
          extraClass="mr-6"
        />
        <Button
          text={"По убыванию"}
          type="button"
          name={SortButtons.Descending}
          sorting={Direction.Descending}
          onClick={(e) => handleSort(e, sortingMode, Direction.Descending)}
          isLoader={isLoadingButton.button === SortButtons.Descending}
          disabled={
            isLoadingButton.isLoading &&
            isLoadingButton.button !== SortButtons.Descending
          }
          extraClass="mr-40"
        />
        <Button
          text={"Новый массив"}
          type="button"
          name={SortButtons.NewArray}
          onClick={(e) => renderNewArray(e)}
          isLoader={isLoadingButton.button === SortButtons.NewArray}
          disabled={
            isLoadingButton.isLoading &&
            isLoadingButton.button !== SortButtons.NewArray
          }
        />
      </form>
      {arrToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {arrToRender.currentArray.map((item, index) => (
              <li key={index}>
                <Column
                  index={item}
                  state={getColumnState(index, arrToRender)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
