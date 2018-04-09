import React from "react";
import { render } from "react-dom";
import moment from "moment";

class Dategrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    };
  }

  getDaysArray(daysInMonth) {
    return new Array(daysInMonth).fill(undefined).map((v, i) => i + 1);
  }

  getWeeksArray() {
    return [[null, null, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11, 12]];
  }

  getFirstWeekdayInMonth() {
    return this.state.date.startOf("month").day();
  }

  render() {
    const daysInMonth = this.state.date.daysInMonth();
    const days = this.getDaysArray(daysInMonth);
    const weeksArray = this.getWeeksArray();

    console.log(this.getFirstWeekdayInMonth());

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

Dategrid.propTypes = {};

export default Dategrid;
