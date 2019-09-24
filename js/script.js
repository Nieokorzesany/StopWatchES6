class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      resultList: []
    };
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  start() {
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    let miliseconds = this.state.miliseconds + 1,
      seconds = this.state.seconds,
      minutes = this.state.minutes;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds == 60) {
      minutes += 1;
      seconds = 0;
      miliseconds = 0;
    }
    this.setState({
      minutes,
      seconds,
      miliseconds
    });
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }
  saveTime() {
    this.setState({
      resultList: [
        [this.state.minutes, this.state.seconds, this.state.miliseconds],
        ...this.state.resultList
      ]
    });
  }
  restart() {
    this.setState({
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
    clearInterval(this.watch);
    console.log(this.state.resultList);
  }

  resetList() {
    this.setState({
      resultList: []
    });
  }

  render() {
    const resultList = this.state.resultList.map((result, index) => {
      return (
        <li key={index}>
          {this.format({
            minutes: result[0],
            seconds: result[1],
            miliseconds: result[2]
          })}
        </li>
      );
    });
    return (
      <div className={"container"}>
        <div className="controls">
          <button
            onClick={() => {
              this.start();
            }}
          >
            Start
          </button>
          <button
            onClick={() => {
              this.saveTime();
              this.stop();
            }}
          >
            Stop
          </button>
          <button
            onClick={() => {
              this.restart();
            }}
          >
            Restart
          </button>
        </div>
        <div className={"stopwatch"}>
          {this.format({
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            miliseconds: this.state.miliseconds
          })}
        </div>
        <button
          className={"resetList"}
          onClick={() => {
            this.resetList();
          }}
        >
          Reset List
        </button>
        <ul className="results">{resultList}</ul>
      </div>
    );
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById("containerStopwatch"));
