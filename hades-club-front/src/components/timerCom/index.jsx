import React, { Component } from "react";

export default class timerCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hou: 0,
      second: 0,
      minutes: 0,
      strikes: 0,
    };
  }
  timer = () => {
    const nextstrikes = this.state.strikes + 50;
    this.setState({
      hou: parseInt(nextstrikes / 3600000) % 24,
      minutes: parseInt(nextstrikes / 60000) % 60,
      second: parseInt(nextstrikes / 1000) % 60,
      strikes: this.state.strikes + 50,
    });
  }
  componentDidMount() {
    setInterval(this.timer, 50);
  } 
  render() {
    return (
      <div>
        <h1>
          {this.state.hou}:{this.state.minutes}:{this.state.second}
        </h1>
      </div>
    );
  }
}
