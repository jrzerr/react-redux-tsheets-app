import { Map, OrderedMap, fromJS } from 'immutable'
import config from 'config'
import moment from 'moment'

export function getInitialTimesheet () {
  var user_id = config.tsheets_user_id
  return fromJS({
    id: null,
    _id: null,
    notes: '',
    type: 'regular',
    on_the_clock: false,
    date: null,
    start: null,
    end: null,
    jobcode_id: 0,
    user_id: user_id,
    customfields: {
      // $$$ may need to specify your own here
      67540: 'd1',
      67538: 'pick me'
    }
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
    jobcode_id: id
  }))
}

/**
 * Convert the TimesheetModel into JSON that is suitable for
 * sending to the API
 * @param  {TimesheetModel}
 * @return {Object} JSON that represents the TimesheetModel object
 */
export function toApiMapper (timesheet) {
  var fields = [
    'type',
    'user_id',
    'jobcode_id',
    'notes',
    'customfields'
  ]
  if (timesheet.get('id') === null) {
    // pick the fields we want
    if (timesheet.get('type') === 'regular') {
      fields.push('start')
      fields.push('end')
    } else {
      fields.push('duration')
      fields.push('date')
    }
    return toApiMapperFields(timesheet, fields)
  } else {
    // pick the fields we want
    fields.push('id')
    if (timesheet.get('type') === 'regular') {
      fields.push('start')
      fields.push('end')
    } else {
      fields.push('duration')
      fields.push('date')
    }
    return toApiMapperFields(timesheet, fields)
  }
}

function timesheetToImmutable (timesheet) {
  return fromJS({
    'type': timesheet.type,
    'user_id': timesheet.user_id,
    'jobcode_id': timesheet.jobcode_id,
    'notes': timesheet.notes,
    'customfields': timesheet.customfields,
    'id': timesheet.id,
    'start': (!timesheet.start) ? null : new Date(timesheet.start),
    'end': (!timesheet.end) ? null : new Date(timesheet.end),
    'duration': timesheet.duration,
  })
}

export function fromApiMapper (response, timesheetsToMerge) {
  const timesheets = response.results.timesheets

  var index = 1
  return timesheetsToMerge.map((timesheet) => {
    return timesheet.mergeDeep(timesheetToImmutable(timesheets[index++]))
  })
}

function toApiMapperFields (timesheet, fields) {
  return fields.reduce(function (prev, fieldName) {
    var fieldValue = timesheet.get(fieldName)
    prev[fieldName] = toApiMapperField(fieldName, fieldValue)
    return prev
  }, {})
}

var fieldNameToFieldMapper = {
  'end': toApiMapperFieldEnd,
  'start': toApiMapperFieldStart
}

function getFieldMapper (fieldName) {
  if (fieldNameToFieldMapper[fieldName]) {
    return fieldNameToFieldMapper[fieldName]
  } else {
    return toApiMapperFieldGeneric
  }
}

function toApiMapperField (fieldName, fieldValue) {
  var fieldNameMapper = getFieldMapper(fieldName)
  return fieldNameMapper(fieldValue)
}

function toApiMapperFieldEnd (fieldValue) {
  if (fieldValue === null) {
    return ''
  } else {
    return moment(fieldValue).format()
  }
}

function toApiMapperFieldStart (fieldValue) {
  return moment(fieldValue).format()
}

function toApiMapperFieldGeneric (fieldValue) {
  return fieldValue
}
