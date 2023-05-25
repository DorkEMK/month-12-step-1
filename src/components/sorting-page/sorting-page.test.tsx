import { Direction } from "../../types/direction";
import { selectionSort, bubbleSort } from "./utils";

const testEmptyData = {
  input: [],
  output: [
    {
      currentArray: [],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    },
  ],
};

const testSingleData = {
  input: [1],
  output: [
    {
      currentArray: [1],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    },
    {
      currentArray: [1],
      indexI: null,
      indexJ: null,
      sortedRange: [0],
    },
  ],
};

const testMultipleData = {
  input: [3, 1, 2, 4],
  outputSelectionSortAsc: [
    {
      currentArray: [3, 1, 2, 4],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 1,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 2,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 3,
      sortedRange: [0],
    },
    {
      currentArray: [1, 3, 2, 4],
      indexI: 1,
      indexJ: 2,
      sortedRange: [0],
    },
    {
      currentArray: [1, 3, 2, 4],
      indexI: 1,
      indexJ: 3,
      sortedRange: [0, 1],
    },
    {
      currentArray: [1, 2, 3, 4],
      indexI: 2,
      indexJ: 3,
      sortedRange: [0, 1, 2],
    },
    {
      currentArray: [1, 2, 3, 4],
      indexI: null,
      indexJ: null,
      sortedRange: [0, 1, 2, 3],
    },
  ],
  outputSelectionSortDesc: [
    {
      currentArray: [3, 1, 2, 4],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 1,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 2,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 3,
      sortedRange: [0],
    },
    {
      currentArray: [4, 1, 2, 3],
      indexI: 1,
      indexJ: 2,
      sortedRange: [0],
    },
    {
      currentArray: [4, 1, 2, 3],
      indexI: 1,
      indexJ: 3,
      sortedRange: [0, 1],
    },
    {
      currentArray: [4, 3, 2, 1],
      indexI: 2,
      indexJ: 3,
      sortedRange: [0, 1, 2],
    },
    {
      currentArray: [4, 3, 2, 1],
      indexI: null,
      indexJ: null,
      sortedRange: [0, 1, 2, 3],
    },
  ],
  outputBubbleSortAsc: [
    {
      currentArray: [3, 1, 2, 4],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 1,
      sortedRange: [],
    },
    {
      currentArray: [1, 3, 2, 4],
      indexI: 1,
      indexJ: 2,
      sortedRange: [],
    },
    {
      currentArray: [1, 2, 3, 4],
      indexI: 2,
      indexJ: 3,
      sortedRange: [3],
    },
    {
      currentArray: [1, 2, 3, 4],
      indexI: null,
      indexJ: null,
      sortedRange: [3, 0, 1, 2],
    },
  ],
  outputBubbleSortDesc: [
    {
      currentArray: [3, 1, 2, 4],
      indexI: null,
      indexJ: null,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 0,
      indexJ: 1,
      sortedRange: [],
    },
    {
      currentArray: [3, 1, 2, 4],
      indexI: 1,
      indexJ: 2,
      sortedRange: [],
    },
    {
      currentArray: [3, 2, 1, 4],
      indexI: 2,
      indexJ: 3,
      sortedRange: [3],
    },
    {
      currentArray: [3, 2, 4, 1],
      indexI: 0,
      indexJ: 1,
      sortedRange: [3],
    },
    {
      currentArray: [3, 2, 4, 1],
      indexI: 1,
      indexJ: 2,
      sortedRange: [3, 2],
    },
    {
      currentArray: [3, 4, 2, 1],
      indexI: 0,
      indexJ: 1,
      sortedRange: [3, 2, 1],
    },
    {
      currentArray: [4, 3, 2, 1],
      indexI: null,
      indexJ: null,
      sortedRange: [3, 2, 1, 0],
    },
  ],
};

describe("sort array algorithm", () => {
  it("reverse empty array by selection sort, ascending", () => {
    const steps = selectionSort([...testEmptyData.input], Direction.Ascending);
    expect(steps).toEqual(testEmptyData.output);
  });

  it("reverse empty array by selection sort, descending", () => {
    const steps = selectionSort([...testEmptyData.input], Direction.Descending);
    expect(steps).toEqual(testEmptyData.output);
  });

  it("reverse empty array by bubble sort, ascending", () => {
    const steps = bubbleSort([...testEmptyData.input], Direction.Ascending);
    expect(steps).toEqual(testEmptyData.output);
  });

  it("reverse empty array by bubble sort, descending", () => {
    const steps = bubbleSort([...testEmptyData.input], Direction.Descending);
    expect(steps).toEqual(testEmptyData.output);
  });

  it("reverse single element array by selection sort, ascending", () => {
    const steps = selectionSort([...testSingleData.input], Direction.Ascending);
    expect(steps).toEqual(testSingleData.output);
  });

  it("reverse single element array by selection sort, descending", () => {
    const steps = selectionSort([...testSingleData.input], Direction.Descending);
    expect(steps).toEqual(testSingleData.output);
  });

  it("reverse single element array by bubble sort, ascending", () => {
    const steps = bubbleSort([...testSingleData.input], Direction.Ascending);
    expect(steps).toEqual(testSingleData.output);
  });

  it("reverse single element array by bubble sort, descending", () => {
    const steps = bubbleSort([...testSingleData.input], Direction.Descending);
    expect(steps).toEqual(testSingleData.output);
  });

  it("reverse multiple element array by selection sort, ascending", () => {
    const steps = selectionSort([...testMultipleData.input], Direction.Ascending);
    expect(steps).toEqual(testMultipleData.outputSelectionSortAsc);
  });

  it("reverse multiple element array by selection sort, descending", () => {
    const steps = selectionSort([...testMultipleData.input], Direction.Descending);
    expect(steps).toEqual(testMultipleData.outputSelectionSortDesc);
  });

  it("reverse multiple element array by bubble sort, ascending", () => {
    const steps = bubbleSort([...testMultipleData.input], Direction.Ascending);
    expect(steps).toEqual(testMultipleData.outputBubbleSortAsc);
  });

  it("reverse multiple element array by bubble sort, descending", () => {
    const steps = bubbleSort([...testMultipleData.input], Direction.Descending);
    expect(steps).toEqual(testMultipleData.outputBubbleSortDesc);
  });
});
