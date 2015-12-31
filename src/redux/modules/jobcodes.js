import { createAction, handleActions } from 'redux-actions'
import * as JobcodeUtils from 'redux/utils/JobcodeUtils'
import * as JobcodeResource from 'redux/utils/JobcodeResource'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_JOBCODES = 'GET_JOBCODES'
export const SET_JOBCODES = 'SET_JOBCODES'

// ------------------------------------
// Actions
// ------------------------------------
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
  getJobcodes
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  SET_JOBCODES: (state, { payload }) => {
    return JobcodeUtils.set(state, payload)
  }
}, JobcodeUtils.getInitialJobcodes())
