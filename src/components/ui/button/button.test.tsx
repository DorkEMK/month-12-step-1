import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "./button";

const testData = {
  text: "test",
};

describe("Button component", () => {
  it("renders default", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders with text", () => {
    const button = renderer.create(<Button text={testData.text} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders when disabled", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("renders when loading", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("fires callback on click", () => {
    const callback = jest.fn();
    render(<Button text={testData.text} onClick={callback}/>);
    const button = screen.getByText(testData.text);
    fireEvent.click(button);
    expect(callback).toBeCalled();
  });
});
