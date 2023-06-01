import React, { MouseEvent, useState } from "react";
import {
  LETTER_MAX_LENGTH,
  LIST_MAX_LENGTH,
  LIST_MAX_VALUE,
  LIST_MIN_LENGTH,
  LIST_MIN_VALUE,
} from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";
import { useBtn } from "../../hooks/useBtn";
import type { TExtraElem, TListElem, TListRenderElem } from "../../types/data";
import { ListButtons } from "../../types/btn-names";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { getRandomArr } from "../../utils/randomArr";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./linked-list";
import { formDefaultRenderList } from "./utils";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const minLen = LIST_MIN_LENGTH;
  const maxLen = LIST_MAX_LENGTH;
  const minValue = LIST_MIN_VALUE;
  const maxValue = LIST_MAX_VALUE;

  const { values, handleChange } = useForm({ value: "", index: "" });
  const { isLoadingButton, setLoadingState, resetLoadingState } = useBtn();
  const arrInit = React.useMemo(() => getRandomArr(minValue, maxValue, minLen, maxLen), [maxLen, maxValue, minLen, minValue]);

  const list = React.useMemo(
    () => new LinkedList<TListElem>(arrInit.map((elem) => elem.toString())),
    [arrInit]
  );
  const [listToRender, setListToRender] = useState<TListRenderElem[]>(
    formDefaultRenderList(list.toArray())
  );
  let arrHelper: TListRenderElem[] = [];

  const renderAddHead = async (
    value: string,
    arr: TListRenderElem[],
    elem: TExtraElem
  ) => {
    arr[0].extraElem = elem;
    setListToRender([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    delete arr[0].extraElem;
    arr.unshift({ letter: value, state: ElementStates.Modified });
    setListToRender([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const renderAddTail = async (
    value: string,
    arr: TListRenderElem[],
    elem: TExtraElem,
    tailIndex: number
  ) => {
    arr[tailIndex].extraElem = elem;
    setListToRender([...arr]);
    await delay(SHORT_DELAY_IN_MS);

    delete arr[tailIndex].extraElem;
    arr.push({ letter: value, state: ElementStates.Modified });
    setListToRender([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const handleAddHead = async (value: string, e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);

    let arrHelper = [...listToRender];
    const newElem: TExtraElem = {
      type: "insert",
      letter: value,
      state: ElementStates.Changing,
    };
    await renderAddHead(value, arrHelper, newElem);

    list.prepend(values.value);
    setListToRender(formDefaultRenderList(list.toArray()));
    resetLoadingState();
  };

  const handleAddTail = async (value: string, e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);

    let arrHelper = [...listToRender];
    const newElem: TExtraElem = {
      type: "insert",
      letter: value,
      state: ElementStates.Changing,
    };
    const tail = list.getSize() - 1;

    await renderAddTail(value, arrHelper, newElem, tail);

    list.append(values.value);
    setListToRender(formDefaultRenderList(list.toArray()));
    resetLoadingState();
  };

  const handleDeleteHead = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);
    arrHelper = [...listToRender];
    const headLetter = arrHelper[0].letter;
    arrHelper[0] = {
      letter: "",
      state: ElementStates.Default,
      extraElem: {
        type: "delete",
        letter: headLetter,
        state: ElementStates.Changing,
      },
    };
    setListToRender(arrHelper);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setListToRender(formDefaultRenderList(list.toArray()));
    resetLoadingState();
  };

  const handleDeleteTail = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);
    arrHelper = [...listToRender];
    const tailLetter = arrHelper[arrHelper.length - 1].letter;
    arrHelper[arrHelper.length - 1] = {
      letter: "",
      state: ElementStates.Default,
      extraElem: {
        type: "delete",
        letter: tailLetter,
        state: ElementStates.Changing,
      },
    };
    setListToRender(arrHelper);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setListToRender(formDefaultRenderList(list.toArray()));
    resetLoadingState();
  };

  const handleAddByIndex = async (value: string, index: number, e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);
    arrHelper = [...listToRender];
    const newElem: TExtraElem = {
      type: "insert",
      letter: value,
      state: ElementStates.Changing,
    };
    if (index === 0) {
      await renderAddHead(value, arrHelper, newElem);
    } else {
      for (let i = 0; i <= index; i++) {
        if (i !== 0) {
          arrHelper[i - 1].state = ElementStates.Changing;
        }
        arrHelper[i].extraElem = newElem;
        setListToRender([...arrHelper]);
        await delay(SHORT_DELAY_IN_MS);
        delete arrHelper[i].extraElem;
      }
    }
    arrHelper.splice(index, -1, {
      letter: value,
      state: ElementStates.Modified,
    });
    for (let i = 0; i < index; i++) {
      arrHelper[i].state = ElementStates.Default;
    }
    setListToRender([...arrHelper]);
    await delay(SHORT_DELAY_IN_MS);

    list.addByIndex(value, index);
    setListToRender(formDefaultRenderList(list.toArray()));
    resetLoadingState();
  };

  const handleDeleteByIndex = async (index: number, e: MouseEvent<HTMLButtonElement>) => {
    setLoadingState(e);
    arrHelper = [...listToRender];
    const targetLetter = arrHelper[index].letter;
    for (let i = 0; i < index; i++) {
      arrHelper[i].state = ElementStates.Changing;
      setListToRender([...arrHelper]);
      await delay(SHORT_DELAY_IN_MS);
    }
    arrHelper[index] = {
      letter: "",
      state: ElementStates.Changing,
      extraElem: {
        type: "delete",
        letter: targetLetter,
        state: ElementStates.Changing,
      },
    };
    setListToRender(arrHelper);
    await delay(SHORT_DELAY_IN_MS);
    list.deleteByIndex(index);
    setListToRender(formDefaultRenderList(list.toArray()));
    resetLoadingState();
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
          data-cy="input-value"
        />
        <Button
          text={"Добавить в head"}
          type="button"
          name={ListButtons.AddHead}
          isLoader={isLoadingButton.button === ListButtons.AddHead}
          disabled={
            !values.value ||
            (isLoadingButton.isLoading && isLoadingButton.button !== ListButtons.AddHead)
          }
          onClick={(e) => handleAddHead(values.value, e)}
          data-cy="button-add-head"
        />
        <Button
          text={"Добавить в tail"}
          type="button"
          name={ListButtons.AddTail}
          isLoader={isLoadingButton.button === ListButtons.AddTail}
          disabled={
            !values.value ||
            (isLoadingButton.isLoading && isLoadingButton.button !== ListButtons.AddTail)
          }
          onClick={(e) => handleAddTail(values.value, e)}
          data-cy="button-add-tail"
        />
        <Button
          text={"Удалить из head"}
          type="button"
          name={ListButtons.DeleteHead}
          isLoader={isLoadingButton.button === ListButtons.DeleteHead}
          disabled={
            isLoadingButton.isLoading && isLoadingButton.button !== ListButtons.DeleteHead
          }
          onClick={(e) => handleDeleteHead(e)}
          data-cy="button-delete-head"
        />
        <Button
          text={"Удалить из tail"}
          type="button"
          name={ListButtons.DeleteTail}
          isLoader={isLoadingButton.button === ListButtons.DeleteTail}
          disabled={
            isLoadingButton.isLoading && isLoadingButton.button !== ListButtons.DeleteTail
          }
          onClick={(e) => handleDeleteTail(e)}
          data-cy="button-delete-tail"
        />
        <Input
          placeholder="Введите индекс"
          value={values.index}
          name="index"
          onChange={handleChange}
          data-cy="input-index"
        />
        <Button
          text={"Добавить по индексу"}
          type="button"
          name={ListButtons.AddByIndex}
          isLoader={isLoadingButton.button === ListButtons.AddByIndex}
          disabled={
            !values.index ||
            !values.value ||
            isNaN(Number(values.index)) ||
            Number(values.index) >= listToRender.length ||
            Number(values.index) < 0 ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== ListButtons.AddByIndex)
          }
          onClick={(e) => handleAddByIndex(values.value, Number(values.index), e)}
          extraClass={styles.btn_wide}
          data-cy="button-add-index"
        />
        <Button
          text={"Удалить по индексу"}
          type="button"
          name={ListButtons.DeleteByIndex}
          isLoader={isLoadingButton.button === ListButtons.DeleteByIndex}
          disabled={
            !values.index ||
            isNaN(Number(values.index)) ||
            Number(values.index) > listToRender.length - 1 ||
            Number(values.index) < 0 ||
            (isLoadingButton.isLoading &&
              isLoadingButton.button !== ListButtons.DeleteByIndex)
          }
          onClick={(e) => handleDeleteByIndex(Number(values.index), e)}
          extraClass={styles.btn_wide}
          data-cy="button-delete-index"
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
                        isSmall
                      />
                    ) : index === 0 ? (
                      HEAD
                    ) : null
                  }
                  tail={
                    item.extraElem && item.extraElem.type === "delete" ? (
                      <Circle
                        letter={item.extraElem.letter}
                        state={item.extraElem.state}
                        isSmall
                      />
                    ) : index === listToRender.length - 1 ? (
                      TAIL
                    ) : null
                  }
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
