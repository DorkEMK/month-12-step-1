import React from "react";
import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

const testData = {
	letter: "test",
	index: 0,
};

describe("Circle component", () => {
  it("renders default", () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with letter", () => {
    const circle = renderer.create(<Circle letter={testData.letter}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with head", () => {
    const circle = renderer.create(<Circle head={testData.letter}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with element as head", () => {
    const circle = renderer.create(<Circle head={<Circle/>}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with tail", () => {
    const circle = renderer.create(<Circle tail={testData.letter}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with element as tail", () => {
    const circle = renderer.create(<Circle tail={<Circle/>}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with index", () => {
    const circle = renderer.create(<Circle index={testData.index}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with isSmall prop", () => {
    const circle = renderer.create(<Circle isSmall/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with the default state", () => {
	const circle = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with the changing state", () => {
	const circle = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("renders with the modified state", () => {
	const circle = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
