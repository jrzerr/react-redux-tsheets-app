import { Map, OrderedMap, fromJS } from 'immutable'

export function getInitialJobcodeList () {
  return OrderedMap({})
}

export function getInitialJobcodeParentIds () {
  return Map({
    timecard: 0,
    add_timesheet: 0,
    edit_timesheet: 0
  })
}

export function getInitialJobcodes () {
  return Map({}).set('parent_ids', getInitialJobcodeParentIds()).set('list', getInitialJobcodeList())
}

export function set (jobcodes, newJobcodes) {
  return jobcodes.set('list', fromJS(newJobcodes).toOrderedMap())
}

export function updateParentIds (jobcodes, props) {
  return jobcodes.mergeDeepIn(['parent_ids'], props)
}

// check if the parent is a parent of the child
export function isParent (parent, child, list) {
  if (!child) {
    return false
  } else {
    if (child.get('id') === parent.get('id')) {
      return true
    } else if (!child.get('parent_id')) {
      return false
    } else {
      return isParent(parent, list.get(child.get('parent_id')), list)
    }
  }
}
