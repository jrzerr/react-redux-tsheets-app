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
    jobcode_id: '',
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

function makeMap (key, value, fields) {
  var map = Map({
    _id: key
  })
  fields.forEach((field) => {
    if (value[field]) {
      map = map.set(field, value[field])
    }
  })
  return map
}

export function fromApiMapper (response, keys) {
  var fields = [
    'type',
    'user_id',
    'jobcode_id',
    'notes',
    'customfields',
    'id',
    'start',
    'end',
    'duration',
    'type'
  ]
  var timesheets = OrderedMap()
  const timesheetResults = response.results.timesheets
  var index = 1
  keys.forEach((key) => {
    timesheets = timesheets.set(key, makeMap(key, timesheetResults[index++], fields))
  })
  return timesheets
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
