import React from "react";
import { mount } from "enzyme";
import moment from "moment";
import { expect } from "chai";
import sinon from "sinon";
import Dategrid from "./dategrid";

const textEquals = text => el => el.text() === text;

describe("Dategrid", () => {
  beforeEach(() => {
    moment.now = () => 1521034620000; // 2018-03-14 13.37:00
  });

  describe("view", () => {
    it("should render the given view", () => {
      const wrapper = mount(<Dategrid view={moment().add(3, "month")} />);
      const rows = wrapper.find("tbody").find("tr");
      const weekStrings = [
        "28293031123",
        "45678910",
        "11121314151617",
        "18192021222324",
        "2526272829301",
        "2345678"
      ];

      rows.forEach((row, index) => {
        expect(row.text()).to.equal(weekStrings[index]);
      });
    });

    it("should always render with six week rows", () => {
      expect(
        mount(<Dategrid view={moment()} />)
          .find("tbody")
          .find("tr").length
      ).to.equal(6);
    });
  });

  describe("renderDay", () => {
    it("should render days with the given renderDay callback", () => {
      const component = mount(
        <Dategrid
          view={moment()}
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
      const component = mount(<Dategrid view={moment()} />);

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
          view={moment()}
          renderTitle={view => <marquee>{view.format("MMMM YYYY")}</marquee>}
        />
      );

      const title = component.find("thead th").find("marquee");
      expect(title.exists()).to.equal(true);
    });
  });

  describe("renderWeekday", () => {
    it("should render weekdays in the header", () => {
      const weekdayRow = mount(<Dategrid view={moment()} />)
        .find("thead")
        .find("tr")
        .at(1);

      expect(weekdayRow.text()).to.equal("MoTuWeThFrSaSu");
    });
  });

  describe("withoutWeekdays", () => {
    it("should hide the weekdays of told so", () => {
      const component = mount(<Dategrid view={moment()} withoutWeekdays />);

      expect(component.find("thead").text()).to.not.include("MoTuWeThFrSaSu");
    });
  });

  describe("renderNavigation", () => {
    it("should render navigation arrows by default", () => {
      const component = mount(<Dategrid view={moment()} />);

      const arrows = component.find("thead").find("th");

      expect(arrows.at(0).text()).to.equal("‹");
      expect(arrows.at(2).text()).to.equal("›");
    });

    it("should call the onViewChange prop when pressing the navigation buttons", () => {
      const onViewChangeStub = sinon.stub();
      const component = mount(
        <Dategrid view={moment()} onViewChange={onViewChangeStub} />
      );

      component
        .find("thead")
        .find("th")
        .at(0)
        .find("span")
        .simulate("click");

      component
        .find("thead")
        .find("th")
        .at(2)
        .find("span")
        .simulate("click");

      expect(onViewChangeStub.getCalls().length).to.equal(2);
      expect(
        moment()
          .subtract(1, "month")
          .toString()
      ).to.equal(onViewChangeStub.firstCall.args[0].toString());
      expect(
        moment()
          .add(1, "month")
          .toString()
      ).to.equal(onViewChangeStub.secondCall.args[0].toString());
    });

    it("should render the navigation using the render props if given", () => {
      const component = mount(
        <Dategrid
          view={moment()}
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
