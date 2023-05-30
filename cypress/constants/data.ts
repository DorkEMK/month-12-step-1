import { circleBorderColor } from "./style";

export const testStringSteps = {
  input: "1234",
  length: 4,
  output: [
    [
      {
        item: "1",
        style: circleBorderColor.default,
      },
      {
        item: "2",
        style: circleBorderColor.default,
      },
      {
        item: "3",
        style: circleBorderColor.default,
      },
      {
        item: "4",
        style: circleBorderColor.default,
      },
    ],
    [
      {
        item: "1",
        style: circleBorderColor.changing,
      },
      {
        item: "2",
        style: circleBorderColor.default,
      },
      {
        item: "3",
        style: circleBorderColor.default,
      },
      {
        item: "4",
        style: circleBorderColor.changing,
      },
    ],
    [
      {
        item: "4",
        style: circleBorderColor.modified,
      },
      {
        item: "2",
        style: circleBorderColor.default,
      },
      {
        item: "3",
        style: circleBorderColor.default,
      },
      {
        item: "1",
        style: circleBorderColor.modified,
      },
    ],
    [
      {
        item: "4",
        style: circleBorderColor.modified,
      },
      {
        item: "2",
        style: circleBorderColor.changing,
      },
      {
        item: "3",
        style: circleBorderColor.changing,
      },
      {
        item: "1",
        style: circleBorderColor.modified,
      },
    ],
    [
      {
        item: "4",
        style: circleBorderColor.modified,
      },
      {
        item: "3",
        style: circleBorderColor.modified,
      },
      {
        item: "2",
        style: circleBorderColor.modified,
      },
      {
        item: "1",
        style: circleBorderColor.modified,
      },
    ],
  ],
};

export const testFibSteps = {
  input: "4",
  output: [
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
      },
      {
        item: "1",
        index: 1,
        style: circleBorderColor.default,
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
      },
      {
        item: "1",
        index: 1,
        style: circleBorderColor.default,
      },
      {
        item: "2",
        index: 2,
        style: circleBorderColor.default,
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
      },
      {
        item: "1",
        index: 1,
        style: circleBorderColor.default,
      },
      {
        item: "2",
        index: 2,
        style: circleBorderColor.default,
      },
      {
        item: "3",
        index: 3,
        style: circleBorderColor.default,
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
      },
      {
        item: "1",
        index: 1,
        style: circleBorderColor.default,
      },
      {
        item: "2",
        index: 2,
        style: circleBorderColor.default,
      },
      {
        item: "3",
        index: 3,
        style: circleBorderColor.default,
      },
      {
        item: "5",
        index: 4,
        style: circleBorderColor.default,
      },
    ],
  ],
};

export const testStackPushSteps = {
  inputFirst: "1",
  outputFirst: [
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.changing,
        head: "top",
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
        head: "top",
      },
    ],
  ],
  inputSecond: "2",
  outputSecond: [
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
        head: "",
      },
      {
        item: "2",
        index: 1,
        style: circleBorderColor.changing,
        head: "top",
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
        head: "",
      },
      {
        item: "2",
        index: 1,
        style: circleBorderColor.default,
        head: "top",
      },
    ],
  ],
};

export const testStackPopSteps = {
  outputFirst: [
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
        head: "",
      },
      {
        item: "2",
        index: 1,
        style: circleBorderColor.changing,
        head: "top",
      },
    ],
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.default,
        head: "top",
      },
    ],
  ],
  outputSecond: [
    [
      {
        item: "1",
        index: 0,
        style: circleBorderColor.changing,
        head: "top",
      },
    ],
  ],
};
