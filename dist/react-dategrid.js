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

    function Dategrid() {
      _classCallCheck(this, Dategrid);

      return _possibleConstructorReturn(this, (Dategrid.__proto__ || Object.getPrototypeOf(Dategrid)).apply(this, arguments));
    }

    _createClass(Dategrid, [{
      key: 'getFirstWeekArray',
      value: function getFirstWeekArray() {
        var now = moment(this.props.now);
        var firstWeekdayOfCurrentMonth = (now.date(1).day() + 6) % 7;
        var lastDateInPreviousMonth = now.subtract(1, 'month').daysInMonth();

        return [].concat(_toConsumableArray(createEmptyArray(firstWeekdayOfCurrentMonth).map(function (v, i) {
          return lastDateInPreviousMonth - i;
        }).reverse()), _toConsumableArray(createRangeArray(7 - firstWeekdayOfCurrentMonth)));
      }
    }, {
      key: 'getWeekArray',
      value: function getWeekArray(startDate) {
        var lastDateInMonth = this.props.now.daysInMonth();
        return createEmptyArray(7).map(function (v, i) {
          return startDate + i;
        }).map(function (date) {
          return date > lastDateInMonth ? date - lastDateInMonth : date;
        });
      }
    }, {
      key: 'getDaysArray',
      value: function getDaysArray(daysInMonth) {
        return createRangeArray(daysInMonth);
      }
    }, {
      key: 'getWeeksArray',
      value: function getWeeksArray() {
        var firstWeek = this.getFirstWeekArray();

        return [firstWeek, this.getWeekArray(firstWeek[6] + 1 + 0 * 7), this.getWeekArray(firstWeek[6] + 1 + 1 * 7), this.getWeekArray(firstWeek[6] + 1 + 2 * 7), this.getWeekArray(firstWeek[6] + 1 + 3 * 7), this.getWeekArray(firstWeek[6] + 1 + 4 * 7)];
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          'table',
          null,
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                'Mo'
              ),
              React.createElement(
                'td',
                null,
                'Tu'
              ),
              React.createElement(
                'td',
                null,
                'We'
              ),
              React.createElement(
                'td',
                null,
                'Th'
              ),
              React.createElement(
                'td',
                null,
                'Fr'
              ),
              React.createElement(
                'td',
                null,
                'Sa'
              ),
              React.createElement(
                'td',
                null,
                'Su'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            this.getWeeksArray().map(function (week, weekIndex) {
              return React.createElement(
                'tr',
                { key: weekIndex },
                week.map(function (day, dayIndex) {
                  return React.createElement(
                    'td',
                    { key: dayIndex },
                    _this2.props.renderDay(day)
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
    renderDay: PropTypes.func
  };

  Dategrid.defaultProps = {
    renderDay: function renderDay(day, index) {
      return React.createElement(
        'td',
        { key: index },
        day
      );
    }
  };

  return Dategrid;

})));
