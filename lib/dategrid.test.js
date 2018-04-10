import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import { expect } from "chai";
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
        .at(1);

      expect(weekdayRow.text()).to.equal("MoTuWeThFrSaSu");
    });
  });

  describe("Grid of Days", () => {
    it("should always render with six week rows", () => {
      expect(
        mount(<Dategrid now={moment()} />)
          .find("tbody")
          .find("tr").length
      ).to.equal(6);
    });

    it("should render the current month's days correctly", () => {
      const wrapper = mount(<Dategrid now={moment()} />).find("tbody");

      expect(
        wrapper
          .find("tr")
          .at(0)
          .text()
      ).to.equal("2627281234");
      expect(
        wrapper
          .find("tr")
          .at(1)
          .text()
      ).to.equal("567891011");
      expect(
        wrapper
          .find("tr")
          .at(2)
          .text()
      ).to.equal("12131415161718");
      expect(
        wrapper
          .find("tr")
          .at(3)
          .text()
      ).to.equal("19202122232425");
      expect(
        wrapper
          .find("tr")
          .at(4)
          .text()
      ).to.equal("2627282930311");
      expect(
        wrapper
          .find("tr")
          .at(5)
          .text()
      ).to.equal("2345678");
    });
  });

  describe("Render Prop: renderDay", () => {
    it("should render days with the given renderDay callback", () => {
      const wrapper = mount(
        <Dategrid
          now={moment()}
          renderDay={(day, index) => {
            return <marquee key={index}>{day}</marquee>;
          }}
        />
      );

      expect(wrapper.find("marquee").length).to.equal(42);
    });
  });

  describe("Header", () => {
    it("should render the current months name at the top", () => {
      const wrapper = mount(<Dategrid now={moment()} />);

      expect(
        wrapper
          .find("thead")
          .find("tr")
          .first()
          .text()
      ).to.equal("March");
    });

    it("should hide the weekdays of told so", () => {
      const wrapper = mount(<Dategrid now={moment()} withoutWeekdays />);

      console.log(wrapper.find("thead").text());

      expect(wrapper.find("thead").text()).to.not.include("MoTuWeThFrSaSu");
    });
  });
});
