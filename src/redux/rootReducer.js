import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import timesheet from './modules/timesheet'
import timecard from './modules/timecard'
import jobcodes from './modules/jobcodes'

export default combineReducers({
  counter,
  timesheet,
  timecard,
  jobcodes,
  router
})
