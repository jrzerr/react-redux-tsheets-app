import React from 'react'

export class ClockIn extends React.Component {
  static propTypes = {
    onTheClock: React.PropTypes.bool.isRequired,
    onClockIn: React.PropTypes.func.isRequired,
    onClockOut: React.PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
  }

  render () {
    const { onTheClock, onClockIn, onClockOut } = this.props
    var clockInButton
    if (onTheClock) {
      clockInButton = <button 
      className='btn btn-primary'
      onClick={onClockOut}>Clock Out</button>
    } else {
      clockInButton = <button 
      className='btn btn-default'
      onClick={onClockIn}>Clock In</button>
    }
    return (
      <div className=''>
        {clockInButton}
      </div>
    )
  }
}

export default ClockIn
