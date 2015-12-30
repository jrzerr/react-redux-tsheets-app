import React from 'react'
import { ClockIn } from 'components/ClockIn'
export class Timecard extends React.Component {
  static propTypes = {
    timesheet: React.PropTypes.object.isRequired,
    onClockIn: React.PropTypes.func.isRequired,
    onClockOut: React.PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
  }

  render () {
    const { timesheet, onClockIn, onClockOut } = this.props
    return (
      <div className='container text-center'>
        <div>Notes: {timesheet.notes}</div>
        <div>Start: {this._renderTime(timesheet.start)}</div>
        <div>End: {this._renderTime(timesheet.end)}</div>
        <ClockIn
          onTheClock={timesheet.on_the_clock}
          onClockIn={onClockIn}
          onClockOut={onClockOut}
          />
      </div>
    )
  }

  _renderTime (time) {
    if (time instanceof Date) {
      return time.getTime()
    } else {
      return undefined
    }
  }
}

export default Timecard
