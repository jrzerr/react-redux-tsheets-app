import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { actions as timesheetActions } from '../redux/modules/timesheet'
import { actions as timecardActions } from '../redux/modules/timecard'
import { actions as jobcodeActions } from '../redux/modules/jobcodes'
import { Timecard } from '../components/Timecard'
import { Map } from 'immutable'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  timesheet: state.timecard,
  jobcodes: state.jobcodes
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, timesheetActions, timecardActions, jobcodeActions), dispatch)
}
export class TimecardView extends React.Component {
  static propTypes = {
    timesheet: React.PropTypes.instanceOf(Map).isRequired,
    clockIn: React.PropTypes.func.isRequired,
    clockOut: React.PropTypes.func.isRequired,
    updateTimecard: React.PropTypes.func.isRequired,
    updateParentIds: React.PropTypes.func.isRequired,
    jobcodes: React.PropTypes.instanceOf(Map).isRequired,
    getJobcodes: React.PropTypes.func.isRequired
  }

  render () {
    const { updateTimecard, timesheet, clockIn, clockOut, jobcodes, getJobcodes, updateParentIds } = this.props
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Timecard:&nbsp;
          <div>
            <Timecard timesheet={timesheet.toJS()}
              onClockIn={() => clockIn()}
              onClockOut={() => clockOut()}
              jobcodes={jobcodes.get('list')}
              parentId={jobcodes.getIn(['parent_ids', 'timecard'])}
              onChangeJobcode={(id) => {
                updateTimecard({ jobcode_id: id })
                updateParentIds({ timecard: '0' })
              }}
              onChangeJobcodeParent={(id) => updateParentIds({ timecard: id })} />
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
        <button className='btn btn-default'
                onClick={() => getJobcodes()}>
          Fetch Jobcodes
        </button>
        <hr />
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimecardView)
