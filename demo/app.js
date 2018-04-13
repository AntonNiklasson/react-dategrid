class App extends React.Component {
  renderDay(day) {
    if (moment().isSame(day, "day")) {
      return <div className="day day--today">{day.date()}</div>;
    }

    return <div className="day">{day.date()}</div>;
  }

  renderTitle(view) {
    return <div className="title">{view.format("MMMM YYYY")} 📅</div>;
  }

  render() {
    return (
      <Dategrid renderTitle={this.renderTitle} renderDay={this.renderDay} />
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
