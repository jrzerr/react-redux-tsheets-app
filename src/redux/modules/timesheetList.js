import { handleActions, createAction } from 'redux-actions'
import { OrderedMap } from 'immutable'
import { getInitialTimesheet } from 'redux/utils/TimesheetUtils'
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TIMESHEET = 'ADD_TIMESHEET'
export const UPDATE_TIMESHEET = 'UPDATE_TIMESHEET'

// ------------------------------------
// Actions
// ------------------------------------
export const addTimesheet = createAction(ADD_TIMESHEET, (_id, props) => {
  return {
    _id,
    props
  }
})

export const updateTimesheet = createAction(UPDATE_TIMESHEET, (_id, props) => {
  return {
    _id,
    props
  }
})

export const actions = {
  addTimesheet
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  ADD_TIMESHEET: (state, { payload }) => {
    return state.mergeDeepIn([payload._id], 
      getInitialTimesheet().mergeDeep(payload.props))
  },
  UPDATE_TIMESHEET: (state, { payload }) => {
    return state.mergeDeepIn([payload._id],
      payload.props)
  }
}, OrderedMap())
