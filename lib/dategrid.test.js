import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";

import Dategrid from "./dategrid";

describe("Dategrid", () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("renders a grid of the current months days by default", () => {
    const component = mount(<Dategrid />);

    expect(component.text()).toBe("hejsan");
  });
});
