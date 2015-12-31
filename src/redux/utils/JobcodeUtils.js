import { Map, OrderedMap, fromJS } from 'immutable'

export function getInitialJobcodeList () {
  return OrderedMap({
    0: Map({
      id: 0,
      parent_id: 0,
      name: 'Jobcode 0',
      has_children: false
    }),
    1: Map({
      id: 1,
      parent_id: 0,
      name: 'Jobcode 1',
      has_children: false
    }),
    2: Map({
      id: 2,
      parent_id: 0,
      name: 'Jobcode 2',
      has_children: true
    }),
    3: Map({
      id: 3,
      parent_id: 2,
      name: 'Jobcode 3',
      has_children: false
    }),
    4: Map({
      id: 4,
      parent_id: 2,
      name: 'Jobcode 4',
      has_children: true
    }),
    5: Map({
      id: 5,
      parent_id: 4,
      name: 'Jobcode 5',
      has_children: false
    })
  })
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
