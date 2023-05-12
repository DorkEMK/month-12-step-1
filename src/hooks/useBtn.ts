import { MouseEvent, useState } from "react";
import { TBtnState } from "../types/btn-state";

export function useBtn() {

  const initState: TBtnState = {
    isLoading: false,
    button: null,
  };
  const [isLoadingButton, setIsLoadingButton] = useState<TBtnState>(initState);

  const setLoadingState = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const btnId = (event.currentTarget as HTMLButtonElement).name;
    setIsLoadingButton({ isLoading: true, button: btnId });
  };

  const resetLoadingState = () => {
    setIsLoadingButton(initState);
  };

  return { isLoadingButton, setLoadingState, resetLoadingState };
}
