import { circleBorderColor } from "../constants";

export const stackPushSteps = {
  input: {
    toEmpty: "1",
    toNonEmpty: "2",
  },
  output: {
    toEmpty: [
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
    toNonEmpty: [
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
  },
};

export const testStackPopSteps = {
  output: {
    nonSingle: [
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
    single: [
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.changing,
          head: "top",
        },
      ],
    ],
  },
};
