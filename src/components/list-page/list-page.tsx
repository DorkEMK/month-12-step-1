import React, { useState } from "react";
import { LETTER_MAX_LENGTH } from "../../constants/data-constraints";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/useForm";
import { delay } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {

  const {values, handleChange} = useForm({value: "", index: ""})
  const [isLoadingButton, setIsLoadingButton] = useState<{isLoading: boolean, button: string | null}>({
    isLoading: false,
    button: null,
  });


  const handleAddHead = async (value: string) => {
    setIsLoadingButton({isLoading: true, button: "addHead"});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({isLoading: false, button: null})
  }

  const handleAddTail = async (value: string) => {
    setIsLoadingButton({isLoading: true, button: "addTail"});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({isLoading: false, button: null})
  }

  const handleDeleteHead = async () => {
    setIsLoadingButton({isLoading: true, button: "deleteHead"});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({isLoading: false, button: null})
  }

  const handleDeleteTail = async () => {
    setIsLoadingButton({isLoading: true, button: "deleteTail"});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({isLoading: false, button: null})
  }

  const handleAddByIndex = async (value: string, index: string) => {
    setIsLoadingButton({isLoading: true, button: "addByIndex"});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({isLoading: false, button: null})
  }

  const handleDeleteByIndex = async (value: string, index: string) => {
    setIsLoadingButton({isLoading: true, button: "deleteByIndex"});
    await delay(SHORT_DELAY_IN_MS);
    setIsLoadingButton({isLoading: false, button: null})
  }
  
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
          disabled={!values.value || (isLoadingButton.isLoading && isLoadingButton.button !== "addHead")}
          onClick={() => handleAddHead(values.value)}
        />
        <Button
          text={"Добавить в tail"}
          type="button"
          isLoader={isLoadingButton.button === "addTail"}
          disabled={!values.value  || (isLoadingButton.isLoading && isLoadingButton.button !== "addTail")}
          onClick={() => handleAddTail(values.value)}
        />
        <Button
          text={"Удалить из head"}
          type="button"
          isLoader={isLoadingButton.button === "deleteHead"}
          disabled={isLoadingButton.isLoading && isLoadingButton.button !== "deleteHead"}
          onClick={handleDeleteHead}
        />
        <Button
          text={"Удалить из tail"}
          type="button"
          isLoader={isLoadingButton.button === "deleteTail"}
          disabled={isLoadingButton.isLoading && isLoadingButton.button !== "deleteTail"}
          onClick={handleDeleteTail}
        />
        <Input
          placeholder = "Введите индекс"
          value={values.index}
          name="index"
          onChange={handleChange}
        />
        <Button
          text={"Добавить по индексу"}
          type="button"
          isLoader={isLoadingButton.button === "addByIndex"}
          disabled={!values.index || !values.value || (isLoadingButton.isLoading && isLoadingButton.button !== "addByIndex")}
          onClick={() => handleAddByIndex(values.value, values.index)}
          extraClass={styles.btn_wide}
        />
        <Button
          text={"Удалить по индексу"}
          type="button"
          isLoader={isLoadingButton.button === "deleteByIndex"}
          disabled={!values.index || !values.value || (isLoadingButton.isLoading && isLoadingButton.button !== "deleteByIndex")}
          onClick={() => handleDeleteByIndex(values.value, values.index)}
          extraClass={styles.btn_wide}
        />
      </form>

    </SolutionLayout>
  );
};
