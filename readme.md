# React Dategrid 📅

A calendar component based on render props.

The approach is to _make as few decisions as possible_. The only markup it renders is the structure for the underlying table, everything else is up to the consumer. It has no knowledge of something like a _selected date_ or how do style past dates. Implement that kind of behaviour in `renderDay`. The only thing it really needs is a moment instance to base its view on.

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
  state = {
    view: moment()
  }

  renderTitle = (view) => {
    return <strong>{view.format('MMMM YYYY')}</strong>;
  }

  renderWeekday = (index) => {
    const weekday = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][index];

    return <div className={index < 5 ? 'workday' : 'weekend'}>{weekday}</div> }

  renderDay = (day, view) => {
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
        view={this.state.view}
        renderTitle={this.renderTitle}
        renderWeekday={this.renderWeekday}
        renderDay={this.renderDay}
      />
    );
  }
}
```

## Props

### view

The current view to render.

### onViewChange(updatedView)

Called as the view updates.

### renderTitle(view)

Receives the current view instance. This will be placed between the navigations with a colspan fixed to 5.

### renderPreviousNavigation(props)

Receives props to be spread on the interactive navigation element.

### renderNextNavigation(props)

Receives props to be spread on the interactive navigation element.

### renderDay(day, view)

Receives a specific day as a moment instance together with the current view. This will be rendered into a `<td />`.
