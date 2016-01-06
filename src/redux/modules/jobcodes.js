import { handleActions, createAction } from 'redux-actions'
import { fromJS } from 'immutable'
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
export const updateParentIds = createAction(UPDATE_PARENT_IDS, (value = 0) => value)

export const setJobcodes = createAction(SET_JOBCODES, value => value)

export const getJobcodes = () => {
  return (dispatch, getState) => {
    var jobcodeOptions = {}
    return JobcodeResource.get(jobcodeOptions).then((jsondata) => {
      return dispatch(setJobcodes(fromJS(jsondata).toOrderedMap()))
    }).then((jsondata) => {
      return dispatch(updateParentIds(JobcodeUtils.getInitialJobcodeParentIds()))
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
    return state.set('list', payload)
  },

  UPDATE_PARENT_IDS: (state, { payload }) => {
    return state.mergeDeepIn(['parent_ids'], payload)
  }
}, JobcodeUtils.getInitialJobcodes())
