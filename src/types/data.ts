import { ElementStates } from "./element-states";

export type TStringElem = {
  item: string;
  state: ElementStates;
};

export type TStackElem = {
  letter: string;
  state: ElementStates;
};

export type TQueueElem = string;

export type TQueueRenderElem = {
  letter: TQueueElem;
  state: ElementStates;
  isHead: boolean;
  isTail: boolean;
};

export type TArrayElem = {
  value: number;
  state: ElementStates;
};
