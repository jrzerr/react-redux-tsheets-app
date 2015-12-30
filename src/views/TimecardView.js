import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { actions as timesheetActions } from '../redux/modules/timesheet'
import { actions as timecardActions } from '../redux/modules/timecard'
import { Timecard } from '../components/Timecard'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  timesheet: state.timecard.toJS()
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, timesheetActions, timecardActions), dispatch)
}
export class TimecardView extends React.Component {
  static propTypes = {
    timesheet: React.PropTypes.object.isRequired,
    clockIn: React.PropTypes.func.isRequired,
    clockOut: React.PropTypes.func.isRequired,
    updateTimecard: React.PropTypes.func.isRequired
  }

  render () {
    const { updateTimecard, timesheet, clockIn, clockOut } = this.props
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Timecard:&nbsp;
          <div>
            <Timecard timesheet={timesheet}
              onClockIn={() => clockIn()}
              onClockOut={() => clockOut()} />
          </div>
        </h2>
        <button className='btn btn-default'
                onClick={() => updateTimecard({ start: new Date() })}>
          Set Start to Now
        </button>
        <button className='btn btn-default'
                onClick={() => updateTimecard({ end: new Date() })}>
          Set End to Now
        </button>
        <button className='btn btn-default'
                onClick={() => updateTimecard({ notes: 'These are some new notes' })}>
          Set Notes
        </button>
        <hr />
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimecardView)
