import { createAction, handleActions } from 'redux-actions'
import { update } from 'redux/utils/TimesheetUtils'

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
    return update(state, payload)
  },

  CLOCK_IN: (state, { payload }) => {
    state.start = payload
  },

  CLOCK_OUT: (state, { payload }) => {
    state.end = payload
  }

}, { })
