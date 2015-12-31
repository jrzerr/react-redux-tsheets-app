import { handleActions, createAction } from 'redux-actions'
import * as JobcodeUtils from 'redux/utils/JobcodeUtils'
import * as JobcodeResource from 'redux/utils/JobcodeResource'

// ------------------------------------
// Constants
// ------------------------------------

export const GET_JOBCODES = 'GET_JOBCODES'
export const SET_JOBCODES = 'SET_JOBCODES'
export const UPDATE_PARENT_IDS = 'UPDATE_PARENT_IDS'

// ------------------------------------
// Actions
// ------------------------------------
export const updateParentIds = createAction(UPDATE_PARENT_IDS, (value = '0') => value)

export const setJobcodes = createAction(SET_JOBCODES, value => value)

export const getJobcodes = () => {
  return (dispatch, getState) => {
    var jobcodeOptions = {}
    JobcodeResource.get(jobcodeOptions).then(function (jsondata) {
      dispatch(setJobcodes(jsondata))
    })
  }
}

export const actions = {
  setJobcodes,
  getJobcodes,
  updateParentIds
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  SET_JOBCODES: (state, { payload }) => {
    return JobcodeUtils.set(state, payload)
  },

  UPDATE_PARENT_IDS: (state, { payload }) => {
    return JobcodeUtils.updateParentIds(state, payload)
  }
}, JobcodeUtils.getInitialJobcodes())
