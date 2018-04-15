import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import { expect } from "chai";
import Dategrid from "./dategrid";

const textEquals = text => el => el.text() === text;
const propEquals = (prop, value) => el => el.prop(prop) === value;

describe("Dategrid", () => {
  beforeEach(() => {
    moment.now = () => 1521034620000; // 2018-03-14 13.37:00
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
      const wrapper = mount(<Dategrid now={moment()} />);
      const component = wrapper.find("tbody");

      expect(
        component
          .find("tr")
          .at(0)
          .text()
      ).to.equal("2627281234");
      expect(
        component
          .find("tr")
          .at(1)
          .text()
      ).to.equal("567891011");
      expect(
        component
          .find("tr")
          .at(2)
          .text()
      ).to.equal("12131415161718");
      expect(
        component
          .find("tr")
          .at(3)
          .text()
      ).to.equal("19202122232425");
      expect(
        component
          .find("tr")
          .at(4)
          .text()
      ).to.equal("2627282930311");
      expect(
        component
          .find("tr")
          .at(5)
          .text()
      ).to.equal("2345678");
    });
  });

  describe("renderDay", () => {
    it("should render days with the given renderDay callback", () => {
      const component = mount(
        <Dategrid
          now={moment()}
          renderDay={(day, index) => {
            return <marquee key={index}>{day.date()}</marquee>;
          }}
        />
      );

      expect(component.find("marquee").length).to.equal(42);
    });
  });

  describe("renderTitle", () => {
    it("should render the month and year by default", () => {
      const component = mount(<Dategrid now={moment()} />);

      expect(
        component
          .find("thead")
          .find("th")
          .filterWhere(textEquals("March 2018"))
          .exists()
      ).to.equal(true);
    });

    it("should render the title using the renderTitle prop if given", () => {
      const component = mount(
        <Dategrid
          renderTitle={view => <marquee>{view.format("MMMM YYYY")}</marquee>}
        />
      );

      const title = component.find("thead th").find("marquee");
      expect(title.exists()).to.equal(true);
    });
  });

  describe("renderWeekday", () => {
    it("should render the weekdays in <thead><tr /></thead>", () => {
      const weekdayRow = mount(<Dategrid now={moment()} />)
        .find("thead")
        .find("tr")
        .at(1);

      expect(weekdayRow.text()).to.equal("MoTuWeThFrSaSu");
    });
  });

  describe("withoutWeekdays", () => {
    it("should hide the weekdays of told so", () => {
      const component = mount(<Dategrid withoutWeekdays />);

      expect(component.find("thead").text()).to.not.include("MoTuWeThFrSaSu");
    });
  });

  describe("Navigation", () => {
    it.skip("should render navigation arrows next to the title by default", () => {
      const component = mount(<Dategrid />);

      const previousMonthButton = component
        .find("thead")
        .find("th")
        .filterWhere(propEquals("alt", "Previous Month"));
      const nextMonthButton = component
        .find("thead")
        .find("th")
        .filterWhere(propEquals("alt", "Next Month"));

      expect(previousMonthButton.exists()).to.equal(true);
      expect(nextMonthButton.exists()).to.equal(true);
    });

    it.skip("should switch the current month when pressing the navigation button", () => {
      const component = mount(<Dategrid />);

      component
        .find("thead")
        .find("th")
        .filterWhere(propEquals("alt", "Next Month"))
        .simulate("click");

      expect(
        component
          .find("thead")
          .find("th")
          .filterWhere(textEquals("April 2018"))
          .exists()
      ).to.equal(true);

      component
        .find("thead")
        .find("th")
        .filterWhere(propEquals("alt", "Previous Month"))
        .simulate("click");

      expect(
        component
          .find("thead")
          .find("th")
          .filterWhere(textEquals("March 2018"))
          .exists()
      ).to.equal(true);
    });

    it("should render the navigation using the render props if given", () => {
      const component = mount(
        <Dategrid
          renderPreviousNavigation={props => (
            <marquee {...props}>{"<<"}</marquee>
          )}
          renderNextNavigation={props => <marquee {...props}>{">>"}</marquee>}
        />
      );

      expect(
        component
          .find("marquee")
          .filterWhere(textEquals("<<"))
          .exists()
      ).to.equal(true);
      expect(
        component
          .find("marquee")
          .filterWhere(textEquals(">>"))
          .exists()
      ).to.equal(true);
    });
  });
});
