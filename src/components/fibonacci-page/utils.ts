export const calcFibArray = (index: number, initialArr: number[]) => {
  for (let i = 2; i <= index; i++) {
    initialArr[i] = initialArr[i - 1] + initialArr[i - 2];
  }

  return initialArr;
};
