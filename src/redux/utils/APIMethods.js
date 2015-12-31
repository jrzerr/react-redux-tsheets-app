import config from 'config'

/**
 *
 * Example of how to do a GET and get the json data
 * APIMethods.get('timesheets', AccessToken.get(), 'start_date=2015-12-01&end_date=2015-12-25').then(function (response) {
 *   return response.json()
 * }).then(function (jsondata) {
 *   console.log(jsondata)
 * })
 *
 */
export function get (endpoint, token, params) {
  var apiroot = config.tsheets_apiroot
  var url = apiroot + '/' + endpoint
  if (params) {
    url += '?' + params
  }

  //  url = 'http://bodovino.zerrtech.com/wp-json/posts?type=wine'

  // var myHeaders = new Headers()
  //  myHeaders.append('Authorization', 'Bearer ' + token)
  // myHeaders.append('Content-Type', 'application/json')

  var myInit = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }

  // var myRequest = new Request(url, myInit)

  return fetch(url, myInit)
}

export function post (endpoint, token, params) {

}

export function put (endpoint, token, params) {

}

export function remove (endpoint, token, params) {

}
