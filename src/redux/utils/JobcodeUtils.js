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
        name: 'Jobcode 0'
      }),
      '001': Map({
        id: '001',
        parent_id: '0',
        name: 'Jobcode 1'
      }),
      '002': Map({
        id: '002',
        parent_id: '0',
        name: 'Jobcode 2'
      }),
      '003': Map({
        id: '003',
        parent_id: '002',
        name: 'Jobcode 3'
      })
    })
    
  })
}
