import React, { useState } from "react";
import {
  LETTER_MAX_LENGTH,
  LIST_MAX_LENGTH,
  LIST_MAX_VALUE,
  LIST_MIN_LENGTH,
  LIST_MIN_VALUE,
} from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import type { TListElem, TListRenderElem } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { randomArr } from "../../utils/randomArr";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./linked-list";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const minLen = LIST_MIN_LENGTH;
  const maxLen = LIST_MAX_LENGTH;
  const minValue = LIST_MIN_VALUE;
  const maxValue = LIST_MAX_VALUE;

  const { values, handleChange } = useForm({ value: "", index: "" });
  const [isLoadingButton, setIsLoadingButton] = useState<{
    isLoading: boolean;
    button: string | null;
  }>({
    isLoading: false,
    button: null,
  });
  const arrInit = randomArr(minValue, maxValue, minLen, maxLen);

  const formDefaultRenderList = (arr: string[]) => {
    const arrOfElements: TListRenderElem[] = [];
    arr.forEach((elem) => {
      arrOfElements.push({
        letter: elem.toString(),
        state: ElementStates.Default,
      });
    });
    return arrOfElements;
  };
  const list = React.useMemo(
    () => new LinkedList<TListElem>(arrInit.map(elem => elem.toString())),
    []
  );
  const [listToRender, setListToRender] = useState<TListRenderElem[]>(
    formDefaultRenderList(list.toArray())
  );

  const handleAddHead = async (value: string) => {
    setIsLoadingButton({ isLoading: true, button: "addHead" });

    listToRender[0] = {
      ...listToRender[0],
      extraElem: {
        type: "insert",
        letter: values.value,
        state: ElementStates.Changing,
      },
    };
    setListToRender([...listToRender]);
    await delay(SHORT_DELAY_IN_MS);
    list.prepend(values.value);
    const prependedList = list.toArray();
    setListToRender(prependedList.map((elem, index) => index === 0 ? {
      letter: elem.toString(),
      state: ElementStates.Modified,
    } : {
      letter: elem.toString(),
      state: ElementStates.Default,
    }));
    await delay(SHORT_DELAY_IN_MS);
    setListToRender(prev => {prev[0].state = ElementStates.Default; return prev;});
    setIsLoadingButton({ isLoading: false, button: null });
  };

  const handleAddTail = async (value: string) => {
    setIsLoadingButton({ isLoading: true, button: "addTail" });

    listToRender[listToRender.length-1] = {
      ...listToRender[listToRender.length-1],
      extraElem: {
        type: "insert",
        letter: values.value,
        state: ElementStates.Changing,
      },
    };
    setListToRender([...listToRender]);
    await delay(SHORT_DELAY_IN_MS);
    list.append(values.value);
    const appendedList = list.toArray();
    const tailIndex = list.getSize() - 1;
    setListToRender(appendedList.map((elem, index) => index === tailIndex ? {
      letter: elem.toString(),
      state: ElementStates.Modified,
    } : {
      letter: elem.toString(),
      state: ElementStates.Default,
    }));
    await delay(SHORT_DELAY_IN_MS);
    setListToRender(prev => {prev[tailIndex].state = ElementStates.Default; return prev;});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({ isLoading: false, button: null });
  };

  const handleDeleteHead = async () => {
    setIsLoadingButton({ isLoading: true, button: "deleteHead" });
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({ isLoading: false, button: null });
  };

  const handleDeleteTail = async () => {
    setIsLoadingButton({ isLoading: true, button: "deleteTail" });
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({ isLoading: false, button: null });
  };

  const handleAddByIndex = async (value: string, index: string) => {
    setIsLoadingButton({ isLoading: true, button: "addByIndex" });
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({ isLoading: false, button: null });
  };

  const handleDeleteByIndex = async (value: string, index: string) => {
    setIsLoadingButton({ isLoading: true, button: "deleteByIndex" });
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({ isLoading: false, button: null });
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <Input
          maxLength={LETTER_MAX_LENGTH}
          isLimitText={true}
          placeholder="Введите значение"
          value={values.value}
          name="value"
          onChange={handleChange}
        />
        <Button
          text={"Добавить в head"}
          type="button"
          isLoader={isLoadingButton.button === "addHead"}
          disabled={
            !values.value ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "addHead")
          }
          onClick={() => handleAddHead(values.value)}
        />
        <Button
          text={"Добавить в tail"}
          type="button"
          isLoader={isLoadingButton.button === "addTail"}
          disabled={
            !values.value ||
            (isLoadingButton.isLoading && isLoadingButton.button !== "addTail")
          }
          onClick={() => handleAddTail(values.value)}
        />
        <Button
          text={"Удалить из head"}
          type="button"
          isLoader={isLoadingButton.button === "deleteHead"}
          disabled={
            isLoadingButton.isLoading && isLoadingButton.button !== "deleteHead"
          }
          onClick={handleDeleteHead}
        />
        <Button
          text={"Удалить из tail"}
          type="button"
          isLoader={isLoadingButton.button === "deleteTail"}
          disabled={
            isLoadingButton.isLoading && isLoadingButton.button !== "deleteTail"
          }
          onClick={handleDeleteTail}
        />
        <Input
          placeholder="Введите индекс"
          value={values.index}
          name="index"
          onChange={handleChange}
        />
        <Button
          text={"Добавить по индексу"}
          type="button"
          isLoader={isLoadingButton.button === "addByIndex"}
          disabled={
            !values.index ||
            !values.value ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== "addByIndex")
          }
          onClick={() => handleAddByIndex(values.value, values.index)}
          extraClass={styles.btn_wide}
        />
        <Button
          text={"Удалить по индексу"}
          type="button"
          isLoader={isLoadingButton.button === "deleteByIndex"}
          disabled={
            !values.index ||
            !values.value ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== "deleteByIndex")
          }
          onClick={() => handleDeleteByIndex(values.value, values.index)}
          extraClass={styles.btn_wide}
        />
      </form>
      {listToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {listToRender.map((item, index) => (
              <li key={index} className={styles.item}>
                <Circle
                  letter={item.letter}
                  state={item.state}
                  index={index}
                  head={
                    item.extraElem && item.extraElem.type === "insert" ? (
                      <Circle
                        letter={item.extraElem.letter}
                        state={item.extraElem.state}
                        isSmall={true}
                      />
                    ) : index === 0 ? (
                      "head"
                    ) : null
                  }
                  tail={index === listToRender.length - 1 ? "tail" : null}
                />
                {index < listToRender.length - 1 && <ArrowIcon />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
