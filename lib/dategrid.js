import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import moment from "moment";

const createEmptyArray = n => new Array(n).fill(undefined);
const createRangeArray = n => createEmptyArray(n).map((v, i) => i + 1);

class Dategrid extends React.Component {
  getFirstWeekArray() {
    const now = moment(this.props.now);
    const firstWeekdayOfCurrentMonth = (now.date(1).day() + 6) % 7;
    const lastDateInPreviousMonth = now.subtract(1, "month").daysInMonth();

    return [
      ...createEmptyArray(firstWeekdayOfCurrentMonth)
        .map((v, i) => lastDateInPreviousMonth - i)
        .reverse(),
      ...createRangeArray(7 - firstWeekdayOfCurrentMonth)
    ];
  }

  getWeekArray(startDate) {
    const lastDateInMonth = this.props.now.daysInMonth();
    return createEmptyArray(7)
      .map((v, i) => startDate + i)
      .map(date => (date > lastDateInMonth ? date - lastDateInMonth : date));
  }

  getDaysArray(daysInMonth) {
    return createRangeArray(daysInMonth);
  }

  getWeeksArray() {
    const firstWeek = this.getFirstWeekArray();

    return [
      firstWeek,
      this.getWeekArray(firstWeek[6] + 1 + 0 * 7),
      this.getWeekArray(firstWeek[6] + 1 + 1 * 7),
      this.getWeekArray(firstWeek[6] + 1 + 2 * 7),
      this.getWeekArray(firstWeek[6] + 1 + 3 * 7),
      this.getWeekArray(firstWeek[6] + 1 + 4 * 7)
    ];
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>Mo</td>
            <td>Tu</td>
            <td>We</td>
            <td>Th</td>
            <td>Fr</td>
            <td>Sa</td>
            <td>Su</td>
          </tr>
        </thead>
        <tbody>
          {this.getWeeksArray().map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => <td key={dayIndex}>{day}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Dategrid.propTypes = {
  now: PropTypes.object.isRequired
};

export default Dategrid;
