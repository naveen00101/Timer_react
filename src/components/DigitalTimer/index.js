// Write your code here
import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    isTimeRunning: false,
    timeInMin: 25,
    timerInSec: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timeInMin} = this.state

    if (timeInMin > 1) {
      this.setState(prevState => ({timeInMin: prevState.timeInMin - 1}))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({timeInMin: prevState.timeInMin + 1}))
  }

  renderTimerLimitController = () => {
    const {timeInMin, timerInSec} = this.state
    const isButtonsDisabled = timerInSec > 0

    return (
      <div className="limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value"> {timeInMin}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimeRunning: false,
      timeInMin: 25,
      timerInSec: 0,
    })
  }

  incrementTimerElapsedInSeconds = () => {
    const {timeInMin, timerInSec} = this.state
    const isTimerCompleted = timerInSec === timeInMin * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSec: prevState.timerInSec + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimeRunning, timerInSec, timeInMin} = this.state
    const isTimerCompleted = timerInSec === timeInMin * 60

    if (isTimerCompleted) {
      this.setState({timerInSec: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  renderTimerController = () => {
    const {isTimeRunning} = this.state
    const startOrPauseImage = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimeRunning ? 'pause icon' : 'play icon'
    const startOrPauseText = isTimeRunning ? 'Pause' : 'Start'
    return (
      <div className="controller-container">
        <button
          className="controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="controller-icon"
            src={startOrPauseImage}
          />
          {startOrPauseText}
          {/* <p className="controller-label">{startOrPauseText}</p> */}
        </button>

        <button
          className="controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
        </button>
        <p className="controller-label">Reset</p>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInMin, timerInSec} = this.state
    const totalRemainingSec = timeInMin * 60 - timerInSec
    const min = Math.floor(totalRemainingSec / 60)
    const sec = Math.floor(totalRemainingSec % 60)
    console.log(sec)
    console.log(typeof sec)
    const minAsString = min > 9 ? min : `0${min}`
    const secAsString = sec > 9 ? sec : `0${sec}`

    return `${minAsString}:${secAsString}`
  }

  render() {
    const {isTimeRunning} = this.state
    const labelText = isTimeRunning ? 'Running' : 'Paused'
    return (
      <div className="main-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display-container">
            <div className="time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
