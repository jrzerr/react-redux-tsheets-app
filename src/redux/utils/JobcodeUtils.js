import { Map, OrderedMap } from 'immutable'

export function getInitialJobcodes () {
  return Map({
    parent_ids: Map({
      timecard: '0',
      add_timesheet: '0',
      edit_timesheet: '0'
    }),
    list: OrderedMap({
      '000': Map({
        id: '000',
        parent_id: '0',
        name: 'Jobcode 0',
        has_children: false
      }),
      '001': Map({
        id: '001',
        parent_id: '0',
        name: 'Jobcode 1',
        has_children: false
      }),
      '002': Map({
        id: '002',
        parent_id: '0',
        name: 'Jobcode 2',
        has_children: true
      }),
      '003': Map({
        id: '003',
        parent_id: '002',
        name: 'Jobcode 3',
        has_children: false
      }),
      '004': Map({
        id: '004',
        parent_id: '002',
        name: 'Jobcode 4',
        has_children: true
      }),
      '005': Map({
        id: '005',
        parent_id: '004',
        name: 'Jobcode 5',
        has_children: false
      }) 
    })
  })
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
