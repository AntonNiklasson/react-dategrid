import React from "react";
import { render } from "react-dom";
import moment from "moment";

const createEmptyCells = n => {
  return [].fill(null, 0, n);
};

const getFirstWeekdayInMonth = date => {
  const d = moment(date);

  d.date(1);

  const weekday = d.day();

  return weekday;
};

const getWeeksArray = date => {
  const startingWeekday = getFirstWeekdayInMonth(date);

  return [[...createEmptyCells(startingWeekday), ...[1, 2]]];
};

class Dategrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    };
  }

  render() {
    return getWeeksArray();
  }
}

Dategrid.propTypes = {};

export default Dategrid;
