import { createAction, handleActions } from 'redux-actions'
import * as TimesheetUtils from 'redux/utils/TimesheetUtils'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_TIMECARD = 'UPDATE_TIMECARD'
export const CLOCK_IN = 'CLOCK_IN'
export const CLOCK_OUT = 'CLOCK_OUT'

// ------------------------------------
// Actions
// ------------------------------------
export const updateTimecard = createAction(UPDATE_TIMECARD, value => value)
export const clockIn = createAction(CLOCK_IN, (value = new Date()) => value)
export const clockOut = createAction(CLOCK_OUT, (value = new Date()) => value)

export const actions = {
  updateTimecard,
  clockIn,
  clockOut
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  UPDATE_TIMECARD: (state, { payload }) => {
    return TimesheetUtils.update(state, payload)
  },

  CLOCK_IN: (state, { payload }) => {
    return TimesheetUtils.clockIn(state, payload)
  },

  CLOCK_OUT: (state, { payload }) => {
    return TimesheetUtils.clockOut(state, payload)
  }

}, TimesheetUtils.getInitialTimesheet())
