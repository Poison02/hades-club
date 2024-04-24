import React, { Component } from 'react'
import Flipper from './Flipper'
import './flipClock.less'

class FlipClock extends Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.flipObjs = []
    this.state = {
      hou: 0,
      second: 0,
      minutes: 0,
      strikes: 0,
      oneHour: false,
      halfHour: false
    }
  }

  render() {
    let { oneHour, halfHour } = this.state
    return (
      <div className='FlipClock'>
        <Flipper ref='flipperHour1' oneHour={oneHour} halfHour={halfHour} />
        <Flipper ref='flipperHour2' oneHour={oneHour} halfHour={halfHour} />
        <em>:</em>
        <Flipper ref='flipperMinute1' oneHour={oneHour} halfHour={halfHour} />
        <Flipper ref='flipperMinute2' oneHour={oneHour} halfHour={halfHour} />
        <em>:</em>
        <Flipper ref='flipperSecond1' oneHour={oneHour} halfHour={halfHour} />
        <Flipper ref='flipperSecond2' oneHour={oneHour} halfHour={halfHour} />
      </div>
    )
  }

  componentDidMount() {
    this.flipObjs = [
      this.refs.flipperHour1,
      this.refs.flipperHour2,
      this.refs.flipperMinute1,
      this.refs.flipperMinute2,
      this.refs.flipperSecond1,
      this.refs.flipperSecond2
    ]
    this.init()
  }

  // 初始化数字
  init() {
    for (let i = 0; i < this.flipObjs.length; i++) {
      this.flipObjs[i].setFront(0)
    }
  }
  // 开始计时
  run = () => {
    this.timer = setInterval(() => {
      // 获取当前时间
      const nextstrikes = this.state.strikes + 1000
      const o_nextstrikes = nextstrikes + 1000
      let hou = parseInt(nextstrikes / 3600000) % 24,
        minetes = parseInt(nextstrikes / 60000) % 60,
        second = parseInt(nextstrikes / 1000) % 60
      let o_hou = parseInt(o_nextstrikes / 3600000) % 24,
        o_minetes = parseInt(o_nextstrikes / 60000) % 60,
        o_second = parseInt(o_nextstrikes / 1000) % 60
      let n_hou = o_hou <= 9 ? '0' + o_hou : o_hou,
        n_minetes = o_minetes <= 9 ? '0' + o_minetes : o_minetes,
        n_second = o_second <= 9 ? '0' + o_second : o_second
      let nextTimeStr = n_hou + n_minetes + n_second

      this.setState(
        {
          hou: hou <= 9 ? '0' + hou : hou,
          minutes: minetes <= 9 ? '0' + minetes : minetes,
          second: second <= 9 ? '0' + second : second,
          strikes: nextstrikes,
          oneHour: 10000 <= nextTimeStr,
          halfHour: 3000 <= nextTimeStr
        },
        () => {
          let { hou, minutes, second } = this.state
          let nowTimeStr = hou + minutes + second

          for (let i = 0; i < this.flipObjs.length; i++) {
            if (nowTimeStr[i] === nextTimeStr[i]) {
              continue
            }
            this.flipObjs[i].flipDown(nowTimeStr[i], nextTimeStr[i])
          }
        }
      )
    }, 1000)
  }

  end = () => {
    clearInterval(this.timer)
  }

  stop = () => {
    clearInterval(this.timer)
  }

  /**
   * 计时的时间段
   * @returns
   */
  getUseTime = () => {
    const { hou, minutes, second } = this.state
    const nowTimeStr = hou + minutes + second
    return nowTimeStr
  }

  //清除定时器
  componentWillUnmount() {
    clearInterval(this.timer)
  }
}
export default FlipClock
