import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import Dategrid from "./dategrid";

describe("Dategrid", () => {
  beforeEach(() => {
    moment.now = () => 1521034620000; // 2018-03-14 13.37:00
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
      const wrapper = mount(<Dategrid now={moment()} />);
      const weekRows = wrapper.find("tbody").find("tr");

      expect(weekRows.first().find("td").length).toBe(7);
      expect(weekRows.first().text()).toBe("2627281234");
    });

    it.only("should render the last two row of days including next months last days as needed", () => {
      const daysGrid = mount(<Dategrid now={moment()} />).find("tbody");

      const secondToLastRow = daysGrid.find("tr").at(4);
      const lastRow = daysGrid.find("tr").last();

      expect(secondToLastRow.text()).toBe("2627282930311");
      expect(lastRow.text()).toBe("2345678");
    });
  });
});
