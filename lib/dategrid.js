import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import moment from "moment";

const createEmptyArray = n => new Array(n).fill(undefined);
const createRangeArray = n => createEmptyArray(n).map((v, i) => i + 1);

class Dategrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: props.view || moment().startOf("day")
    };
  }

  getFirstWeekArray() {
    const firstWeekdayOfCurrentMonth =
      (moment(this.state.view)
        .date(1)
        .day() +
        6) %
      7;
    const lastDateInPreviousMonth = moment(this.state.view)
      .subtract(1, "month")
      .daysInMonth();

    const previousMonthDays = createEmptyArray(firstWeekdayOfCurrentMonth)
      .map((v, i) => lastDateInPreviousMonth - i)
      .reverse()
      .map(day =>
        moment(this.state.view)
          .subtract(1, "month")
          .date(day)
      );
    const currentMonthDays = createRangeArray(
      7 - firstWeekdayOfCurrentMonth
    ).map(day => moment(this.state.view).date(day));

    return [...previousMonthDays, ...currentMonthDays];
  }

  getOtherWeeks(firstWeek) {
    const generateWeek = (weekOffset, lastDay) => {
      return createEmptyArray(7).map((v, i) =>
        moment(lastDay)
          .add(weekOffset, "week")
          .add(i + 1, "day")
      );
    };

    return createEmptyArray(5).map((v, i) =>
      generateWeek(i, firstWeek[firstWeek.length - 1])
    );
  }

  getDaysArray(daysInMonth) {
    return createRangeArray(daysInMonth);
  }

  getWeeksArray() {
    const firstWeek = this.getFirstWeekArray();
    const otherWeeks = this.getOtherWeeks(firstWeek);

    return [firstWeek, ...otherWeeks];
  }

  onPreviousMonthClick = () => {
    this.setState({
      view: moment(this.state.view).subtract(1, "month")
    });
  };

  onNextMonthClick = () => {
    this.setState({
      view: moment(this.state.view).add(1, "month")
    });
  };

  render() {
    const { view } = this.state;
    const { renderDay, withoutWeekdays } = this.props;
    const weeksArray = this.getWeeksArray();

    return (
      <table>
        <thead>
          <tr>
            <th alt="Previous Month" onClick={this.onPreviousMonthClick}>
              ≪
            </th>
            <th colSpan={5}>{view.format("MMMM YYYY")}</th>
            <th alt="Next Month" onClick={this.onNextMonthClick}>
              ≫
            </th>
          </tr>
          {!withoutWeekdays && (
            <tr>
              <td>Mo</td>
              <td>Tu</td>
              <td>We</td>
              <td>Th</td>
              <td>Fr</td>
              <td>Sa</td>
              <td>Su</td>
            </tr>
          )}
        </thead>
        <tbody>
          {weeksArray.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>{renderDay(day)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Dategrid.propTypes = {
  now: PropTypes.object.isRequired,
  renderDay: PropTypes.func,
  withoutWeekdays: PropTypes.bool
};

Dategrid.defaultProps = {
  renderDay: date => date.date(),
  withoutWeekdays: false
};

export default Dategrid;
