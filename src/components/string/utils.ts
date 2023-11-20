import { TStringElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/swap";

export const formInitialArr = (string: string) =>
  string
    .split("")
    .map((item) => ({ item: item, state: ElementStates.Default }));

export const reverseBySteps = (
  arr: TStringElem[],
  start: number,
  end: number,
  acc: TStringElem[][]
) => {
  if (end < start) {
    return acc;
  }

  if (end === start) {
    arr[end] = { ...arr[end], state: ElementStates.Modified };
    acc.push([...arr]);
    return acc;
  }
  arr[start] = { ...arr[start], state: ElementStates.Changing };
  arr[end] = { ...arr[end], state: ElementStates.Changing };
  acc.push([...arr]);

  swap<TStringElem>(arr, start, end);
  arr[start] = { ...arr[start], state: ElementStates.Modified };
  arr[end] = { ...arr[end], state: ElementStates.Modified };
  acc.push([...arr]);

  reverseBySteps(arr, start + 1, end - 1, acc);

  return acc;
};
