import { handleActions, createAction } from 'redux-actions'
import { OrderedMap } from 'immutable'
import { getInitialTimesheet, toApiMapper } from 'redux/utils/TimesheetUtils'
import * as APIMethods from 'redux/utils/APIMethods'
import * as AccessToken from 'redux/utils/AccessTokenUtils'
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TIMESHEET = 'ADD_TIMESHEET'
export const UPDATE_TIMESHEET = 'UPDATE_TIMESHEET'
export const UPDATE_AND_SYNC_TIMESHEET = 'UPDATE_AND_SYNC_TIMESHEET'
export const ADD_AND_SYNC_TIMESHEET = 'ADD_AND_SYNC_TIMESHEET'

// ------------------------------------

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

// takes a single timesheet object and syncs with the api
export const syncTimesheet = (timesheet) => {
  return (dispatch, getState) => {
    var syncParams = {
      'data': [
        toApiMapper(timesheet)
      ]
    }
    const _id = timesheet.get('_id')
    // Can only clock in a timesheet that does not exist on the server
    if (timesheet.get('id') === null) {
      // POST a new one
      return APIMethods.post('timesheets', AccessToken.get(), syncParams).then(function (response) {
        return response.json()
      }).then((jsondata) =>
        dispatch(updateTimesheet(_id, { id: jsondata.results.timesheets['1'].id }))
      )
    } else {
      // PUT to update
      return APIMethods.put('timesheets', AccessToken.get(), syncParams).then(function (response) {
        return response.json()
      })
    }
  }
}

export const actions = {
  addTimesheet,
  updateTimesheet
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
