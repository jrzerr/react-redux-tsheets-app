import { Map, fromJS } from 'immutable'

export function getInitialTimesheet () {
  return fromJS({
    id: null,
    notes: '',
    type: 'regular',
    on_the_clock: false,
    date: null,
    start: null,
    end: null,
    jobcode: ''
  })
}

export function update (timesheet, props) {
  return timesheet.mergeDeep(props)
}

export function clockIn (timesheet, date) {
  return update(timesheet, Map({
    start: date,
    on_the_clock: true
  }))
}

export function clockOut (timesheet, date) {
  return update(timesheet, Map({
    end: date,
    on_the_clock: false
  }))
}

export function setJobcode (timesheet, id) {
  return update(timesheet, Map({
    jobcode: id
  }))
}
