import { handleActions, createAction } from 'redux-actions'
import * as JobcodeUtils from 'redux/utils/JobcodeUtils'
// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PARENT_IDS = 'UPDATE_PARENT_IDS'
// ------------------------------------
// Actions
// ------------------------------------
export const updateParentIds = createAction(UPDATE_PARENT_IDS, (value = '0') => value)

export const actions = {
  updateParentIds
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  UPDATE_PARENT_IDS: (state, { payload }) => {
    return JobcodeUtils.updateParentIds(state, payload)
  }
}, JobcodeUtils.getInitialJobcodes())
