import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { actions as timesheetActions } from '../redux/modules/timesheet'
import { actions as timecardActions } from '../redux/modules/timecard'
import styles from './HomeView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  timesheet: state.timecard
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, timesheetActions, timecardActions), dispatch)
}
export class TimecardView extends React.Component {
  static propTypes = {
    timesheet: React.PropTypes.object.isRequired,
    setStart: React.PropTypes.func.isRequired,
    setEnd: React.PropTypes.func.isRequired,
    setNotes: React.PropTypes.func.isRequired,
    updateTimecard: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Timecard:&nbsp;
          <span className={styles['counter--green']}>{JSON.stringify(this.props.timesheet)}</span>
        </h2>
        <button className='btn btn-default'
                onClick={() => this.props.updateTimecard({ start: new Date() })}>
          Set Start to Now
        </button>
        <button className='btn btn-default'
                onClick={() => this.props.updateTimecard({ end: new Date() })}>
          Set End to Now
        </button>
        <button className='btn btn-default'
                onClick={() => this.props.updateTimecard({ notes: 'These are some new notes' })}>
          Set Notes
        </button>
        <hr />
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimecardView)
