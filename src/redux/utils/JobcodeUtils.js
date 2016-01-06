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

/**
 * We will return whether the item passed in should be marked as selected
 * Two cases where the item should be selected:
 * 1) item is the same as the current item
 * 2) item is any parent of the current item
 * @param  {Map} item - An item that we want to determine if selected
 * @param  {Map} current - The current item
 * @param  {OrderedMap} list - The entire map of id and Map item
 * @return {Boolean} - Whether item should be shown as selected
 */
export function isSelected (item, current, list) {
  // if no current item, then nothing should be marked as selected
  if (!current) {
    return false
  } else {
    // If item passed in is the current item, it should be marked as selected
    if (current.get('id') === item.get('id')) {
      return true
    } else if (!current.get('parent_id')) { // if current has no parent, no search
      return false
    } else { // otherwise check current item's parent
      return isSelected(item, list.get(current.get('parent_id').toString()), list)
    }
  }
}
