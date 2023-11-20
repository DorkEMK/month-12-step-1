import { circleBorderColor } from "../constants";

export const queuePlaceholder = [
  {
    item: "",
    index: 0,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
  {
    item: "",
    index: 1,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
  {
    item: "",
    index: 2,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
  {
    item: "",
    index: 3,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
  {
    item: "",
    index: 4,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
  {
    item: "",
    index: 5,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
  {
    item: "",
    index: 6,
    style: circleBorderColor.default,
    head: "",
    tail: ""
  },
];

export const queueEnqueueSteps = {
  toEmpty: {
    input: "1",
    output: [
      [
        {
          item: "",
          index: 0,
          style: circleBorderColor.changing,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.changing,
          head: "head",
          tail: "tail"
        },
        {
          item: "",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.default,
          head: "head",
          tail: "tail"
        },
        {
          item: "",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
    ]
  },
  toNonEmpty: {
    input: "2",
    output: [
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.default,
          head: "head",
          tail: "tail"
        },
        {
          item: "",
          index: 1,
          style: circleBorderColor.changing,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.default,
          head: "head",
          tail: ""
        },
        {
          item: "2",
          index: 1,
          style: circleBorderColor.changing,
          head: "",
          tail: "tail"
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.default,
          head: "head",
          tail: ""
        },
        {
          item: "2",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: "tail"
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
    ]
  }
};

export const queueDequeueSteps = {
  single: {
    output: [
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.changing,
          head: "head",
          tail: "tail"
        },
        {
          item: "",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
      [
        {
          item: "",
          index: 0,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
    ]
  },
  nonSingle: {
    output: [
      [
        {
          item: "1",
          index: 0,
          style: circleBorderColor.changing,
          head: "head",
          tail: ""
        },
        {
          item: "2",
          index: 1,
          style: circleBorderColor.default,
          head: "",
          tail: "tail"
        },
        {
          item: "",
          index: 2,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 3,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 4,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 5,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
        {
          item: "",
          index: 6,
          style: circleBorderColor.default,
          head: "",
          tail: ""
        },
      ],
    ],
  }
}