import * as AccessTokenUtils from 'redux/utils/AccessTokenUtils'
import * as APIMethods from 'redux/utils/APIMethods'
import { convertParamsToURL } from 'redux/utils/APIUtilities'

var endpoint = 'jobcodes'
var datakey = 'jobcodes'

/**
 * @param  {Object} - list of params
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
 * @param  {Object} - list of params
 * @return {Promise}
 */
export function post (params) {
  return APIMethods.post(endpoint, AccessTokenUtils.get(), params).then(function (response) {
    return response.json()
  }).then(function (jsondata) {
    return jsondata.results[datakey]
  })
}

/**
 * @param  {Object} - list of params
 * @return {Promise}
 */
export function put (params) {
  return APIMethods.put(endpoint, AccessTokenUtils.get(), params).then(function (response) {
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
