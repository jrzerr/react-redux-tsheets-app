import { handleActions, createAction } from 'redux-actions'
import { OrderedMap } from 'immutable'
import { getInitialTimesheet, toApiMapper, fromApiMapper } from 'redux/utils/TimesheetUtils'
import * as APIMethods from 'redux/utils/APIMethods'
import * as AccessToken from 'redux/utils/AccessTokenUtils'
// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TIMESHEET = 'ADD_TIMESHEET'
export const UPDATE_TIMESHEET = 'UPDATE_TIMESHEET'
export const UPDATE_TIMESHEETS = 'UPDATE_TIMESHEETS'
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

// takes an ordered map of timesheets and merges into the current list
export const updateTimesheets = createAction(UPDATE_TIMESHEETS, (props) => {
  return {
    props
  }
})

export const syncTimesheets = () => {
  return (dispatch, getState) => {
    const timesheetsToPost = getState().timesheetList.filter((timesheet) => !timesheet.get('id'))
    const timesheetsToPut = getState().timesheetList.filter((timesheet) => (timesheet.get('id') && timesheet.get('dirty')))

    if (timesheetsToPost.size !== 0) {
      const syncParamsPost = {
        'data': timesheetsToPost.toArray().map((timesheet) => toApiMapper(timesheet))
      }
      // POST a new one
      return APIMethods.post('timesheets', AccessToken.get(), syncParamsPost).then((response) => 
        response.json()
      ).then((jsondata) => {
        return dispatch(updateTimesheets(fromApiMapper(jsondata, timesheetsToPost)))
      })
    }
    if (timesheetsToPut.size !== 0) {
      const syncParamsPut = {
        'data': timesheetsToPut.toArray().map((timesheet) => toApiMapper(timesheet))
      }
      console.log(syncParamsPut)
    }

    // const _id = timesheet.get('_id')
    // // Can only clock in a timesheet that does not exist on the server
    // if (timesheet) {
    // } else {
    //   // PUT to update
    //   return APIMethods.put('timesheets', AccessToken.get(), syncParams).then(function (response) {
    //     return response.json()
    //   })
    // }
  }
}

export const actions = {
  addTimesheet,
  updateTimesheet,
  updateTimesheets,
  syncTimesheets
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
  },
  UPDATE_TIMESHEETS: (state, { payload }) => {
    return state.mergeDeep(payload.props)
  }
}, OrderedMap())
