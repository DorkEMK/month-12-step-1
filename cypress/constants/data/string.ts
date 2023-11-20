import { circleBorderColor } from "../constants";

export const stringSteps = {
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
