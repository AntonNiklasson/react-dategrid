import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";

import Dategrid from "./dategrid";

describe("Dategrid", () => {
  let clock;
  let moment;

  beforeEach(() => {
    moment = require("moment");
    clock = sinon.useFakeTimers({ now: 1523259350000 }); // 2018-03-14 13.37:00
  });

  afterEach(() => {
    clock.restore();
  });

  describe("Weekdays", () => {
    it("should render the weekdays in <thead><tr /></thead>", () => {
      const weekdayRow = mount(<Dategrid now={moment()} />)
        .find("thead")
        .find("tr")
        .first();

      expect(weekdayRow.text()).toBe("MoTuWeThFrSaSu");
    });
  });

  describe("Grid of Days", () => {
    it("should always render with six week rows", () => {
      expect(
        mount(<Dategrid now={moment()} />)
          .find("tbody")
          .find("tr").length
      ).toBe(6);
    });

    it("should render the first two rows of days including previous months last days as needed", () => {
      const daysGrid = mount(<Dategrid now={moment()} />);
      const weekRows = daysGrid.find("tbody").find("tr");

      expect(weekRows.first().find("td").length).toBe(7);
      expect(weekRows.first().text()).toBe("2627281234");
    });

    it.skip("should render the last row of days including next months last days as needed", () => {
      const daysGrid = mount(<Dategrid now={moment()} />);
      const lastRow = daysGrid
        .find("tbody")
        .find("tr")
        .last();

      expect(lastRow.text()).toBe("2345678");
    });
  });
});
