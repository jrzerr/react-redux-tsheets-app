import { createAction, handleActions } from 'redux-actions'
import * as TimesheetUtils from 'redux/utils/TimesheetUtils'
import * as APIMethods from 'redux/utils/APIMethods'
import * as AccessToken from 'redux/utils/AccessTokenUtils'
import { Map } from 'immutable'
import { uuid } from 'redux/utils/uuid'
import { addTimesheet, updateTimesheet } from 'redux/modules/timesheetList'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_TIMECARD_ID = 'UPDATE_TIMECARD_ID'
export const UPDATE_TIMECARD = 'UPDATE_TIMECARD'

// ------------------------------------
// Actions
// ------------------------------------
export const updateTimecardId = createAction(UPDATE_TIMECARD_ID, value => value)

export const addOrUpdate = (props) => {
  return (dispatch, getState) => {
    var _id = getState().timecard.get('_id')
    if (_id) {
      dispatch(updateTimesheet(_id, props))
    } else {
      _id = uuid()
      dispatch(updateTimecardId(_id))   
      dispatch(addTimesheet(_id, props))
    }
  }  
}

export const clockIn = (value = new Date()) => {
  return addOrUpdate({
    start: value,
    on_the_clock: true
  })
}

export const clockOut = (value = new Date()) => {
  return (dispatch, getState) => {
    dispatch(addOrUpdate({
      end: value,
      on_the_clock: false
    }))
    // on clock out we should clear out the timecard id
    dispatch(updateTimecardId(undefined))
  }
}

export const updateTimecard = (props) => {
  return addOrUpdate(props)
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
        dispatch(updateTimecardId({ id: jsondata.results.timesheets['1'].id }))
      })
    } else {
      // PUT a new one
      APIMethods.put('timesheets', AccessToken.get(), syncParams).then(function (response) {
        return response.json()
      }).then(function (jsondata) {
        // dispatch(updateTimecardId({ id: jsondata.results.timesheets["1"].id }))
      })
    }
  }
}

export const actions = {
  updateTimecardId,
  updateTimecard,
  clockIn,
  clockOut,
  syncTimesheet
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  UPDATE_TIMECARD_ID: (state, { payload }) => {
    return state.set('_id', payload)
  },

}, Map({ _id: undefined }))
