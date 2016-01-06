import { createAction, handleActions } from 'redux-actions'
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
      dispatch(addTimesheet(_id, props.set('_id', _id)))
    }
  }  
}

export const clockIn = (value = new Date()) => {
  return addOrUpdate(Map({
    start: value,
    on_the_clock: true
  }))
}

export const clockOut = (value = new Date()) => {
  return (dispatch, getState) => {
    dispatch(addOrUpdate(Map({
      end: value,
      on_the_clock: false
    })))
    // on clock out we should clear out the timecard id
    dispatch(updateTimecardId(undefined))
  }
}

export const updateTimecard = (props) => {
  return addOrUpdate(props)
}

export const actions = {
  updateTimecardId,
  updateTimecard,
  clockIn,
  clockOut
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  UPDATE_TIMECARD_ID: (state, { payload }) => {
    return state.set('_id', payload)
  },

}, Map({ _id: undefined }))
