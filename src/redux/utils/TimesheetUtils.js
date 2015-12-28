import { Map } from 'immutable'

export function update (timesheet, props) {
  return timesheet.mergeDeep(props)
}

export function clockIn (timesheet, date) {
  return update(timesheet, Map({
    start: date
  }))
}

export function clockOut (timesheet, date) {
  return update(timesheet, Map({
    end: date
  }))
}
