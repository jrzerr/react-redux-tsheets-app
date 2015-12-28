import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as timesheetActions } from '../redux/modules/timesheet'
import { actions as timecardActions } from '../redux/modules/timecard'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  start: state.timecard.start,
  end: state.timecard.end,
  notes: state.timecard.notes
})
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, timesheetActions, timecardActions), dispatch)
}
export class Timecard extends React.Component {
  static propTypes = {
    start: React.PropTypes.object.isRequired,
    end: React.PropTypes.object.isRequired,
    notes: React.PropTypes.string.isRequired
  }

  render () {
    return (
      <div className='container text-center'>
        <div>
          <span>Start:</span>
          <span>{ JSON.stringify(this.props.start) }</span>
        </div>
        <div>
          <span>End:</span>
          <span>{ JSON.stringify(this.props.end) }</span>
        </div>
        <div>
          <span>Notes:</span>
          <span>{ JSON.stringify(this.props.notes) }</span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timecard)
