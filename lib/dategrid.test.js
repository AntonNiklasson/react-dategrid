import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";

import Dategrid from "./dategrid";

describe("Dategrid", () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers({ now: 1523259350000 }); // 2018-03-14 13.37:00
  });

  afterEach(() => {
    clock.restore();
  });

  it("should render the weekdays in <thead><tr /></thead>", () => {
    const component = mount(<Dategrid />);

    const weekdayRow = component.find("tr").first();

    expect(weekdayRow.text()).toBe("MoTuWeThFrSaSu");

    console.log(component.debug());
  });
});
