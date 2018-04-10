(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('react-dom'), require('moment')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'react-dom', 'moment'], factory) :
  (global.Dategrid = factory(global.React,global.PropTypes,global.reactDom,global.moment));
}(this, (function (React,PropTypes,reactDom,moment) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var createEmptyArray = function createEmptyArray(n) {
    return new Array(n).fill(undefined);
  };
  var createRangeArray = function createRangeArray(n) {
    return createEmptyArray(n).map(function (v, i) {
      return i + 1;
    });
  };

  var Dategrid = function (_React$Component) {
    _inherits(Dategrid, _React$Component);

    function Dategrid(props) {
      _classCallCheck(this, Dategrid);

      var _this = _possibleConstructorReturn(this, (Dategrid.__proto__ || Object.getPrototypeOf(Dategrid)).call(this, props));

      _this.onPreviousMonthClick = function () {
        _this.setState({
          view: moment(_this.state.view).subtract(1, "month")
        });
      };

      _this.onNextMonthClick = function () {
        _this.setState({
          view: moment(_this.state.view).add(1, "month")
        });
      };

      _this.state = {
        view: props.view || moment().startOf("day")
      };
      return _this;
    }

    _createClass(Dategrid, [{
      key: "getFirstWeekArray",
      value: function getFirstWeekArray() {
        var _this2 = this;

        var firstWeekdayOfCurrentMonth = (moment(this.state.view).date(1).day() + 6) % 7;
        var lastDateInPreviousMonth = moment(this.state.view).subtract(1, "month").daysInMonth();

        var previousMonthDays = createEmptyArray(firstWeekdayOfCurrentMonth).map(function (v, i) {
          return lastDateInPreviousMonth - i;
        }).reverse().map(function (day) {
          return moment(_this2.state.view).subtract(1, "month").date(day);
        });
        var currentMonthDays = createRangeArray(7 - firstWeekdayOfCurrentMonth).map(function (day) {
          return moment(_this2.state.view).date(day);
        });

        return [].concat(_toConsumableArray(previousMonthDays), _toConsumableArray(currentMonthDays));
      }
    }, {
      key: "getOtherWeeks",
      value: function getOtherWeeks(firstWeek) {
        var generateWeek = function generateWeek(weekOffset, lastDay) {
          return createEmptyArray(7).map(function (v, i) {
            return moment(lastDay).add(weekOffset, "week").add(i + 1, "day");
          });
        };

        return createEmptyArray(5).map(function (v, i) {
          return generateWeek(i, firstWeek[firstWeek.length - 1]);
        });
      }
    }, {
      key: "getDaysArray",
      value: function getDaysArray(daysInMonth) {
        return createRangeArray(daysInMonth);
      }
    }, {
      key: "getWeeksArray",
      value: function getWeeksArray() {
        var firstWeek = this.getFirstWeekArray();
        var otherWeeks = this.getOtherWeeks(firstWeek);

        return [firstWeek].concat(_toConsumableArray(otherWeeks));
      }
    }, {
      key: "render",
      value: function render() {
        var view = this.state.view;
        var _props = this.props,
            renderDay = _props.renderDay,
            withoutWeekdays = _props.withoutWeekdays;

        var weeksArray = this.getWeeksArray();

        return React.createElement(
          "table",
          null,
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                { alt: "Previous Month", onClick: this.onPreviousMonthClick },
                "\u226A"
              ),
              React.createElement(
                "th",
                { colSpan: 5 },
                view.format("MMMM YYYY")
              ),
              React.createElement(
                "th",
                { alt: "Next Month", onClick: this.onNextMonthClick },
                "\u226B"
              )
            ),
            !withoutWeekdays && React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                null,
                "Mo"
              ),
              React.createElement(
                "td",
                null,
                "Tu"
              ),
              React.createElement(
                "td",
                null,
                "We"
              ),
              React.createElement(
                "td",
                null,
                "Th"
              ),
              React.createElement(
                "td",
                null,
                "Fr"
              ),
              React.createElement(
                "td",
                null,
                "Sa"
              ),
              React.createElement(
                "td",
                null,
                "Su"
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            weeksArray.map(function (week, weekIndex) {
              return React.createElement(
                "tr",
                { key: weekIndex },
                week.map(function (day, dayIndex) {
                  return React.createElement(
                    "td",
                    { key: dayIndex },
                    renderDay(day)
                  );
                })
              );
            })
          )
        );
      }
    }]);

    return Dategrid;
  }(React.Component);

  Dategrid.propTypes = {
    now: PropTypes.object.isRequired,
    renderDay: PropTypes.func,
    withoutWeekdays: PropTypes.bool
  };

  Dategrid.defaultProps = {
    renderDay: function renderDay(date) {
      return date.date();
    },
    withoutWeekdays: false
  };

  return Dategrid;

})));
