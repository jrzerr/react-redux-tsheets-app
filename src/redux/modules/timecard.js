import { createAction, handleActions } from 'redux-actions'
import * as TimesheetUtils from 'redux/utils/TimesheetUtils'
import * as TimesheetResource from 'redux/utils/TimesheetResource'

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

export const clockIn = (value = new Date()) => {
  return (dispatch, getState) => {
    dispatch({ type: CLOCK_IN, payload: value })
    return dispatch(syncTimesheet(getState().timecard)).then(() => {
      console.log('clock in syncTimesheet done in clock in ac')
    })
  }
}

export const clockOut = (value = new Date()) => {
  return (dispatch, getState) => {
    dispatch({ type: CLOCK_OUT, payload: value })
    return dispatch(syncTimesheet(getState().timecard)).then(() => {
      console.log('clock out syncTimesheet done in clock out ac')
    })
  }
}

export const syncTimesheet = (timesheet) => {
  return (dispatch, getState) => {
    // Can only clock in a timesheet that does not exist on the server
    if (timesheet.get('id') === null) {
      // POST a new one
      return TimesheetResource.post(timesheet).then((jsondata) =>
        dispatch(updateTimecard({ id: jsondata['1'].id }))
      )
    } else {
      // PUT an existing one
      return TimesheetResource.put(timesheet).then((jsondata) =>
        // dispatch(updateTimecard({ id: jsondata['1'].id }))
        jsondata
      )
    }
  }
}

export const actions = {
  updateTimecard,
  clockIn,
  clockOut,
  syncTimesheet
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
