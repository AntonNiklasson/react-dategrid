# React Dategrid

A calendar component based on render props.

<img width="300" src="https://raw.githubusercontent.com/AntonNiklasson/react-dategrid/master/demo.png" />

## Install

```
npm install --save react-dategrid
yarn add react-dategrid
```

## Usage

Each `day` is a moment instance. The `view` is what is currently shown by the component, also represented by a moment instance.

```javascript
import Dategrid from 'react-dategrid';

class Datepicker extends React.Component {
  renderTitle = (view) => {
    return <strong>{view.format('MMMM YYYY')}</strong>;
  }

  renderWeekday = (index) => {
    const weekday = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][index];

    return <div className={index < 5 ? 'workday' : 'weekend'}>{weekday}</div>
  }

  renderDay = (day) => {
    if (moment().isSame(day, "day")) {
      return (
        <div className="day day--today">{day.date()}</div>
      );
    }

    return <div className="day">{day.date()}</div>;
  }

  render() {
    return (
      <Dategrid
        renderTitle={this.renderTitle}
        renderWeekday={this.renderWeekday}
        renderDay={this.renderDay}
      />
    );
  }
}
```
