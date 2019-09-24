"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch() {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

    _this.state = {
      running: false,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      resultList: []
    };
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "format",
    value: function format(times) {
      return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.state.running = true;
        this.watch = setInterval(function () {
          return _this2.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var miliseconds = this.state.miliseconds + 1,
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
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
    }
  }, {
    key: "saveTime",
    value: function saveTime() {
      this.setState({
        resultList: [[this.state.minutes, this.state.seconds, this.state.miliseconds]].concat(_toConsumableArray(this.state.resultList))
      });
    }
  }, {
    key: "restart",
    value: function restart() {
      this.setState({
        running: false,
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      });
      clearInterval(this.watch);
      console.log(this.state.resultList);
    }
  }, {
    key: "resetList",
    value: function resetList() {
      this.setState({
        resultList: []
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var resultList = this.state.resultList.map(function (result, index) {
        return React.createElement(
          "li",
          { key: index },
          _this3.format({
            minutes: result[0],
            seconds: result[1],
            miliseconds: result[2]
          })
        );
      });
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "controls" },
          React.createElement(
            "button",
            {
              onClick: function onClick() {
                _this3.start();
              }
            },
            "Start"
          ),
          React.createElement(
            "button",
            {
              onClick: function onClick() {
                _this3.saveTime();
                _this3.stop();
              }
            },
            "Stop"
          ),
          React.createElement(
            "button",
            {
              onClick: function onClick() {
                _this3.restart();
              }
            },
            "Restart"
          )
        ),
        React.createElement(
          "div",
          { className: "stopwatch" },
          this.format({
            minutes: this.state.minutes,
            seconds: this.state.seconds,
            miliseconds: this.state.miliseconds
          })
        ),
        React.createElement(
          "button",
          {
            className: "resetList",
            onClick: function onClick() {
              _this3.resetList();
            }
          },
          "Reset List"
        ),
        React.createElement(
          "ul",
          { className: "results" },
          resultList
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("containerStopwatch"));
