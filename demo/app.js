class App extends React.Component {
  renderDay(day) {
    if (moment().isSame(day, "day")) {
      return <div className="day day--today">{day.date()}</div>;
    }

    return <div className="day">{day.date()}</div>;
  }

  render() {
    return <Dategrid renderDay={this.renderDay} />;
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
