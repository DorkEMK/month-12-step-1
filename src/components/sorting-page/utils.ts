import { Step } from "../../types/data";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export const getColumnState = (index: number, step: Step): ElementStates => {
  let state = ElementStates.Default;
  if (step.sortedRange.includes(index)) {
    state = ElementStates.Modified;
  }
  if (index === step.indexI || index === step.indexJ) {
    state = ElementStates.Changing;
  }
  return state;
};

export const selectionSort = (arr: number[], direction: Direction) => {
  const steps: Step[] = [];

  steps.push({
    currentArray: [...arr],
    indexI: null,
    indexJ: null,
    sortedRange: [],
  });
  if (arr.length > 0) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        steps.push({
          currentArray: [...arr],
          indexI: i,
          indexJ: j,
          sortedRange: [...steps[steps.length - 1]?.sortedRange],
        });
        if (
          direction === Direction.Ascending
            ? arr[j] < arr[minIndex]
            : arr[j] > arr[minIndex]
        ) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
      steps[steps.length - 1].sortedRange.push(i);
    }

    steps.push({
      currentArray: [...arr],
      indexI: null,
      indexJ: null,
      sortedRange: [...steps[steps.length - 1].sortedRange, arr.length - 1],
    });
  }
  return steps;
};

export const bubbleSort = (arr: number[], direction: Direction) => {
  const steps: Step[] = [];

  steps.push({
    currentArray: [...arr],
    indexI: null,
    indexJ: null,
    sortedRange: [],
  });
  if (arr.length > 0) {
    let isSorted = false;
    for (let i = 0; i < arr.length; i++) {
      if (isSorted) {
        steps.push({
          currentArray: [...arr],
          indexI: null,
          indexJ: null,
          sortedRange: [...steps[steps.length - 1].sortedRange],
        });
        for (let h = 0; h < arr.length - i; h++) {
          steps[steps.length - 1].sortedRange.push(h);
        }
        return steps;
      }
      for (let j = 0; j < arr.length - i - 1; j++) {
        steps.push({
          currentArray: [...arr],
          indexI: j,
          indexJ: j + 1,
          sortedRange: [...steps[steps.length - 1]?.sortedRange],
        });
        isSorted = true;
        if (
          direction === Direction.Ascending
            ? arr[j] > arr[j + 1]
            : arr[j] < arr[j + 1]
        ) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          isSorted = false;
        }
        if (j+1 === arr.length - i - 1) {
          steps[steps.length - 1].sortedRange.push(arr.length - i - 1);
        }
      }
    }

    steps.push({
      currentArray: [...arr],
      indexI: null,
      indexJ: null,
      sortedRange: [...steps[steps.length - 1].sortedRange],
    });

    if (steps[steps.length - 1].sortedRange.length !== arr.length) {
      steps[steps.length - 1].sortedRange.push(0);
    }
  }
  return steps;
};
