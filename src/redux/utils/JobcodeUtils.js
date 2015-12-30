import { fromJS } from 'immutable'

export function getInitialJobcodes () {
  return fromJS({ 
    parent_ids: {
      timecard: '0',
      add_timesheet: '0',
      edit_timesheet: '0'
    },
    list: {
      '000': {
        id: '000',
        parent_id: '0',
        name: 'Jobcode 0'
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
      }
    },
  })
}
