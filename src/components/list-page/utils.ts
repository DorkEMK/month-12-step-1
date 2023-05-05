import { TListRenderElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";

export const formDefaultRenderList = (arr: string[]) => {
  const arrOfElements: TListRenderElem[] = [];
  arr.forEach((elem) => {
    arrOfElements.push({
      letter: elem.toString(),
      state: ElementStates.Default,
    });
  });
  return arrOfElements;
};
