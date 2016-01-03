import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import timesheet from './modules/timesheet'
import timecard from './modules/timecard'
import jobcodes from './modules/jobcodes'

// This is ES2015 shorthand for mapping the "counter" state
// to the "counter" reducer
export default combineReducers({
  counter,
  timesheet,
  timecard,
  jobcodes,
  router
})
