import { fromJS } from 'immutable'

export function getInitialJobcodes () {
  return fromJS({
    parent_ids: {
      timecard: '0',
      add_timesheet: '0',
      edit_timesheet: '0'
    },
    list: {
      '31417560': {
        id: '31417560',
        parent_id: '0',
        name: 'Another test'
      },
      '001': {
        id: '001',
        parent_id: '0',
        name: 'Jobcode 1'
      },
      '002': {
        id: '002',
        parent_id: '0',
        name: 'Jobcode 2'
      },
      '003': {
        id: '003',
        parent_id: '002',
        name: 'Jobcode 2'
      }
    },
  })
}

export function set (jobcodes, newJobcodes) {
  console.log('in JobcodeUtils.set')
  console.log(newJobcodes)
  return jobcodes.set('list', fromJS(newJobcodes).toOrderedMap())
}
