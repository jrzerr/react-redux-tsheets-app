import config from 'config'

/**
 * Does a fetch from the API with query parameters
 * @param  {string} method - HTTP method
 * @param  {string} endpoint - API endpoint
 * @param  {string} token - Access Token
 * @param  {string} params - URL encoded query params, no ? at the beginning
 * @return {Promise} Fetch promise that is resolved with the response
 */
function urlParamFetch (method, endpoint, token, params) {
  var apiroot = config.tsheets_apiroot
  var url = apiroot + '/' + endpoint
  if (params) {
    url += '?' + params
  }

  var myInit = {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }

  return fetch(url, myInit)
}

/**
 * Does a fetch from the API sending a body of JSON data
 * @param  {string} method - HTTP method
 * @param  {string} endpoint - API endpoint
 * @param  {string} token - Access Token
 * @param  {string} params - JSON data to send in the post body
 * @return {Promise} Fetch promise that is resolved with the response
 */
function bodyParamFetch (method, endpoint, token, params) {
  var apiroot = config.tsheets_apiroot
  var url = apiroot + '/' + endpoint

  var myInit = {
    method: method,
    body: JSON.stringify(params),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  }

  return fetch(url, myInit)
}

/**
 * Do a GET request to the API
 * @param  {string} endpoint - API endpoint
 * @param  {string} token - Access Token
 * @param  {string} params - URL encoded query params, no ? at the beginning
 * @return {Promise} Fetch promise that is resolved with the response
 * Example of how to do a GET and get the json data
 * APIMethods.get('timesheets', AccessToken.get(), 'start_date=2015-12-01&end_date=2015-12-25').then(function (response) {
 *   return response.json()
 * }).then(function (jsondata) {
 *   console.log(jsondata)
 * })
 *
 */
export function get (endpoint, token, params) {
  return urlParamFetch('GET', endpoint, token, params)
}

/**
 * Do a POST request to the API
 * @param  {string} endpoint - API endpoint
 * @param  {string} token - Access Token
 * @param  {string} params - JSON data to send in the post body
 * @return {Promise} Fetch promise that is resolved with the response
 */
export function post (endpoint, token, params) {
  return bodyParamFetch('POST', endpoint, token, params)
}

/**
 * Do a PUT request to the API
 * @param  {string} endpoint - API endpoint
 * @param  {string} token - Access Token
 * @param  {string} params - JSON data to send in the post body
 * @return {Promise} Fetch promise that is resolved with the response
 */
export function put (endpoint, token, params) {
  return bodyParamFetch('PUT', endpoint, token, params)
}

/**
 * Do a DELETE request to the API
 * @param  {string} endpoint - API endpoint
 * @param  {string} token - Access Token
 * @param  {string} params - URL encoded query params, no ? at the beginning
 * @return {Promise} Fetch promise that is resolved with the response
 */
export function remove (endpoint, token, params) {
  return urlParamFetch('DELETE', endpoint, token, params)
}
