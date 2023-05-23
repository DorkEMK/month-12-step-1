export const getRandomArr = (
  min: number,
  max: number,
  minLen: number,
  maxLen: number
): number[] => {
  const arr = [];

  const randLen = minLen + Math.floor(Math.random() * (maxLen - minLen + 1));

  for (let i = 0; i < randLen; i++) {
    arr.push(min + Math.floor(Math.random() * (max - min + 1)));
  }
  return arr;
};
