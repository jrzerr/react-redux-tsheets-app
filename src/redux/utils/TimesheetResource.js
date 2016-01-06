import * as AccessTokenUtils from 'redux/utils/AccessTokenUtils'
import * as APIMethods from 'redux/utils/APIMethods'
import { convertParamsToURL } from 'redux/utils/APIUtilities'
import * as TimesheetUtils from 'redux/utils/TimesheetUtils'

var endpoint = 'timesheets'
var datakey = 'timesheets'

/**
 * @param  {Object} params - list of params
 * @return {Promise}
 */
export function get (params) {
  return APIMethods.get(endpoint, AccessTokenUtils.get(), convertParamsToURL(params)).then(function (response) {
    return response.json()
  }).then(function (jsondata) {
    return jsondata.results[datakey]
  })
}

/**
 * @param  {Object} timesheet - timesheet obj
 * @return {Promise}
 */
export function post (timesheet) {
  var postParams = {
    'data': [
      TimesheetUtils.toApiMapper(timesheet)
    ]
  }
  return APIMethods.post(endpoint, AccessTokenUtils.get(), postParams).then(function (response) {
    return response.json()
  }).then(function (jsondata) {
    return jsondata.results[datakey]
  })
}

/**
 * @param  {Object} timesheet - list of params
 * @return {Promise}
 */
export function put (timesheet) {
  var putParams = {
    'data': [
      TimesheetUtils.toApiMapper(timesheet)
    ]
  }
  return APIMethods.put(endpoint, AccessTokenUtils.get(), putParams).then(function (response) {
    return response.json()
  }).then(function (jsondata) {
    return jsondata.results[datakey]
  })
}

/**
 * @param  {Object} - list of params
 * @return {[type]}
 */
export function remove (params) {
  return APIMethods.remove(endpoint, AccessTokenUtils.get(), convertParamsToURL(params)).then(function (response) {
    return response.json()
  }).then(function (jsondata) {
    return jsondata.results[datakey]
  })
}
