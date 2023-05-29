import { ElementStates } from "./element-states";

export type TStringElem = {
  item: string;
  state: ElementStates;
};

export type TStackElem = string;

export type TQueueElem = string;

export type TQueueRenderElem = {
  letter: TQueueElem;
  state: ElementStates;
};

export type TExtraElem = {
  type: "insert" | "delete";
  letter: string;
  state: ElementStates;
};

export type TListElem = string;

export type TListRenderElem = {
  letter: string;
  state: ElementStates;
  extraElem?: TExtraElem;
};

export type Step = {
  currentArray: number[];
  indexI: number | null;
  indexJ: number | null;
  sortedRange: number[];
};
