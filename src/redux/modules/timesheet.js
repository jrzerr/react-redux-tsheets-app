import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_START = 'SET_START'
export const SET_END = 'SET_END'
export const SET_NOTES = 'SET_NOTES'

// ------------------------------------
// Actions
// ------------------------------------
export const setStart = createAction(SET_START, value => value)
export const setEnd = createAction(SET_END, value => value)
export const setNotes = createAction(SET_NOTES, value => value)

export const actions = {
  setStart,
  setEnd,
  setNotes
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  SET_START: (state, id, { payload }) => {
    state.timesheets[id].start = payload
  },

  SET_END: (state, id, { payload }) => {
    state.timesheets[id].end = payload
  },

  SET_NOTES: (state, id, { payload }) => {
    state.timesheets[id].notes = payload
  }

}, { })
