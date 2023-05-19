import { reverseBySteps, formInitialArr } from "./utils";

const testInitArr = {
  input: "123",
  output: [
    {
      item: "1",
      state: "default",
    },
    {
      item: "2",
      state: "default",
    },
    {
      item: "3",
      state: "default",
    },
  ],
};

const testEvenData = {
  input: "1234",
  output: [
    [
      {
        item: "1",
        state: "default",
      },
      {
        item: "2",
        state: "default",
      },
      {
        item: "3",
        state: "default",
      },
      {
        item: "4",
        state: "default",
      },
    ],
    [
      {
        item: "1",
        state: "changing",
      },
      {
        item: "2",
        state: "default",
      },
      {
        item: "3",
        state: "default",
      },
      {
        item: "4",
        state: "changing",
      },
    ],
    [
      {
        item: "4",
        state: "modified",
      },
      {
        item: "2",
        state: "default",
      },
      {
        item: "3",
        state: "default",
      },
      {
        item: "1",
        state: "modified",
      },
    ],
    [
      {
        item: "4",
        state: "modified",
      },
      {
        item: "2",
        state: "changing",
      },
      {
        item: "3",
        state: "changing",
      },
      {
        item: "1",
        state: "modified",
      },
    ],
    [
      {
        item: "4",
        state: "modified",
      },
      {
        item: "3",
        state: "modified",
      },
      {
        item: "2",
        state: "modified",
      },
      {
        item: "1",
        state: "modified",
      },
    ],
  ],
};

const testOddData = {
  input: "123",
  output: [
    [
      {
        item: "1",
        state: "default",
      },
      {
        item: "2",
        state: "default",
      },
      {
        item: "3",
        state: "default",
      },
    ],
    [
      {
        item: "1",
        state: "changing",
      },
      {
        item: "2",
        state: "default",
      },
      {
        item: "3",
        state: "changing",
      },
    ],
    [
      {
        item: "3",
        state: "modified",
      },
      {
        item: "2",
        state: "default",
      },
      {
        item: "1",
        state: "modified",
      },
    ],
    [
      {
        item: "3",
        state: "modified",
      },
      {
        item: "2",
        state: "modified",
      },
      {
        item: "1",
        state: "modified",
      },
    ],
  ],
};

const testSingleData = {
  input: "1",
  output: [
    [
      {
        item: "1",
        state: "default",
      },
    ],
    [
      {
        item: "1",
        state: "modified",
      },
    ],
  ],
};

const testEmptyData = {
  input: "",
  output: [[]],
};

describe("creating initial arr from string", () => {
  it("creates correct arr with states", () => {
    const arr = formInitialArr(testInitArr.input);
    expect(arr).toEqual(testInitArr.output);
  });
});

describe("string reverse algorithm", () => {
  it("reverse even length string", () => {
    const arr = formInitialArr(testEvenData.input);
    const steps = reverseBySteps(arr, 0, arr.length - 1, [[...arr]]);
    expect(steps).toEqual(testEvenData.output);
  });

  it("reverse odd length string", () => {
    const arr = formInitialArr(testOddData.input);
    const steps = reverseBySteps(arr, 0, arr.length - 1, [[...arr]]);
    expect(steps).toEqual(testOddData.output);
  });

  it("reverse single symbol string", () => {
    const arr = formInitialArr(testSingleData.input);
    const steps = reverseBySteps(arr, 0, arr.length - 1, [[...arr]]);
    expect(steps).toEqual(testSingleData.output);
  });

  it("reverse empty string", () => {
    const arr = formInitialArr(testEmptyData.input);
    const steps = reverseBySteps(arr, 0, arr.length - 1, [[...arr]]);
    expect(steps).toEqual(testEmptyData.output);
  });
});
