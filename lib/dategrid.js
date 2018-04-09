import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import moment from "moment";

class Dategrid extends React.Component {
  getFirstWeekdayInMonth() {
    return this.props.now.date(1).day() + 1;
  }

  getDaysArray(daysInMonth) {
    return new Array(daysInMonth).fill(undefined).map((v, i) => i + 1);
  }

  getWeeksArray() {
    const startingWeekday = this.getFirstWeekdayInMonth();

    console.log(now);
    console.log("=======", startingWeekday);

    return [[1, 1, 1, 1, 1, 1, 1], [], [], [], [], []];
  }

  render() {
    const weeksArray = this.getWeeksArray();

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
          {weeksArray.map(week => <tr>{week.map(day => <td>{day}</td>)}</tr>)}
        </tbody>
      </table>
    );
  }
}

Dategrid.propTypes = {
  now: PropTypes.object.isRequired
};

export default Dategrid;
