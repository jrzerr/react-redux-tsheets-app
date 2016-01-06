import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from 'redux/modules/counter'
import timesheet from 'redux/modules/timesheet'
import timecard from 'redux/modules/timecard'
import jobcodes from 'redux/modules/jobcodes'
import timesheetList from 'redux/modules/timesheetList'

// This is ES2015 shorthand for mapping the "counter" state
// to the "counter" reducer
export default combineReducers({
  counter,
  timecard,
  jobcodes,
  timesheetList,
  router
})
