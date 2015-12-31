import { createAction, handleActions } from 'redux-actions'
import * as TimesheetUtils from 'redux/utils/TimesheetUtils'
import * as APIMethods from 'redux/utils/APIMethods'
import * as AccessToken from 'redux/utils/AccessTokenUtils'
import { Map } from 'immutable'
import { uuid } from 'redux/utils/uuid'
import { addTimesheet } from 'redux/modules/timesheetList'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_TIMECARD = 'UPDATE_TIMECARD'

// ------------------------------------
// Actions
// ------------------------------------
export const updateTimecard = createAction(UPDATE_TIMECARD, value => value)

export const clockIn = (value = new Date()) => {
  return (dispatch, getState) => {
    const _id = uuid()
    dispatch(updateTimecard(_id))
    // dispatch timesheet list update timesheet function to create new timesheet
    // with current start date
    dispatch(addTimesheet(_id, { 
      start: value,
      on_the_clock: true
    }))
  }
}
// export const clockIn = (value = new Date()) => {
//   return (dispatch, getState) => {
//     dispatch({ type: CLOCK_IN, payload: value })
//     dispatch(syncTimesheet(getState().timecard))
//   }
// }

export const clockOut = (value = new Date()) => {
  return (dispatch, getState) => {
    dispatch(syncTimesheet(getState().timecard))
  }
}

export const syncTimesheet = (timesheet) => {
  return (dispatch, getState) => {
    var syncParams = {
      'data': [
        TimesheetUtils.toApiMapper(timesheet)
      ]
    }

    // Can only clock in a timesheet that does not exist on the server
    if (timesheet.get('id') === null) {
      // POST a new one
      APIMethods.post('timesheets', AccessToken.get(), syncParams).then(function (response) {
        return response.json()
      }).then(function (jsondata) {
        dispatch(updateTimecard({ id: jsondata.results.timesheets['1'].id }))
      })
    } else {
      // PUT a new one
      APIMethods.put('timesheets', AccessToken.get(), syncParams).then(function (response) {
        return response.json()
      }).then(function (jsondata) {
        // dispatch(updateTimecard({ id: jsondata.results.timesheets["1"].id }))
      })
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
    return state.set('_id', payload)
  },

}, Map({ _id: undefined }))
