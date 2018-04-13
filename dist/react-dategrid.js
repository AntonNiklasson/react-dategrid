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
        view: moment().startOf("day")
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
        var _this3 = this;

        var view = this.state.view;
        var _props = this.props,
            className = _props.className,
            renderDay = _props.renderDay,
            renderPreviousNavigation = _props.renderPreviousNavigation,
            renderNextNavigation = _props.renderNextNavigation,
            renderTitle = _props.renderTitle,
            withoutWeekdays = _props.withoutWeekdays;

        var weeksArray = this.getWeeksArray();

        return React.createElement(
          "table",
          { className: className },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                renderPreviousNavigation({
                  gotoPreviousMonth: this.gotoPreviousMonth
                })
              ),
              React.createElement(
                "th",
                { colSpan: 5 },
                renderTitle(view)
              ),
              React.createElement(
                "th",
                null,
                renderNextNavigation({ gotoNextMonth: this.gotoNextMonth })
              )
            ),
            !withoutWeekdays && React.createElement(
              "tr",
              null,
              createEmptyArray(7).map(function (v, i) {
                return i;
              }).map(function (i) {
                return React.createElement(
                  "td",
                  { key: i },
                  _this3.props.renderWeekday(i)
                );
              })
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
                    renderDay(day, view)
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
    className: PropTypes.string,
    renderDay: PropTypes.func,
    renderPreviousNavigation: PropTypes.func,
    renderNextNavigation: PropTypes.func,
    renderTitle: PropTypes.func,
    withoutWeekdays: PropTypes.bool
  };

  Dategrid.defaultProps = {
    className: "",
    renderDay: function renderDay(day) {
      return day.date();
    },
    renderTitle: function renderTitle(view) {
      return view.format("MMMM YYYY");
    },
    renderPreviousNavigation: function renderPreviousNavigation(_ref) {
      var gotoPreviousMonth = _ref.gotoPreviousMonth;
      return React.createElement(
        "span",
        { onClick: gotoPreviousMonth },
        "‹"
      );
    },
    renderNextNavigation: function renderNextNavigation(_ref2) {
      var gotoNextMonth = _ref2.gotoNextMonth;
      return React.createElement(
        "span",
        { onClick: gotoNextMonth },
        "›"
      );
    },
    renderWeekday: function renderWeekday(index) {
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

  return Dategrid;

})));
