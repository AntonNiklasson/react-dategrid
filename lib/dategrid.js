import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const createEmptyArray = n => new Array(n).fill(undefined);
const createRangeArray = n => createEmptyArray(n).map((v, i) => i + 1);

class Dategrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: moment()
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

  gotoPreviousMonth() {
    this.setState({
      view: moment(this.state.view).subtract(1, "month")
    });
  }

  gotoNextMonth() {
    this.setState({
      view: moment(this.state.view).add(1, "month")
    });
  }

  render() {
    const { view } = this.state;
    const {
      className,
      renderDay,
      renderPreviousNavigation,
      renderNextNavigation,
      renderTitle,
      withoutWeekdays
    } = this.props;

    const weeksArray = this.getWeeksArray();

    return (
      <table className={className}>
        <thead>
          <tr>
            <th>
              {renderPreviousNavigation({
                onClick: this.gotoPreviousMonth.bind(this)
              })}
            </th>
            <th colSpan={5}>{renderTitle(view)}</th>
            <th>
              {renderNextNavigation({
                onClick: this.gotoNextMonth.bind(this)
              })}
            </th>
          </tr>
          {!withoutWeekdays && (
            <tr>
              {createEmptyArray(7)
                .map((v, i) => i)
                .map(i => <td key={i}>{this.props.renderWeekday(i)}</td>)}
            </tr>
          )}
        </thead>
        <tbody>
          {weeksArray.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>{renderDay(day, view)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Dategrid.propTypes = {
  className: PropTypes.string,
  renderDay: PropTypes.func,
  renderPreviousNavigation: PropTypes.func,
  renderNextNavigation: PropTypes.func,
  renderTitle: PropTypes.func,
  withoutWeekdays: PropTypes.bool
};

Dategrid.defaultProps = {
  className: "",
  renderDay: day => day.date(),
  renderTitle: view => view.format("MMMM YYYY"),
  renderPreviousNavigation: props => <span {...props}>{"‹"}</span>,
  renderNextNavigation: props => <span {...props}>{"›"}</span>,
  renderWeekday: index => {
    switch (index) {
      case 0:
        return "Mo";
      case 1:
        return "Tu";
      case 2:
        return "We";
      case 3:
        return "Th";
      case 4:
        return "Fr";
      case 5:
        return "Sa";
      case 6:
        return "Su";
      default:
        return null;
    }
  }
};

export default Dategrid;
