import config from 'config'

export function get (endpoint, token, params) {
  var url = config.tsheets_apiroot + '/' + endpoint
  if (params) {
    url += '?' + params
  }

  //  url = 'http://bodovino.zerrtech.com/wp-json/posts?type=wine'

  var myHeaders = new Headers()
  //  myHeaders.append('Authorization', 'Bearer ' + token)
  myHeaders.append('Content-Type', 'application/json')

  var myInit = {
    method: 'GET',
    mode: 'no-cors',
    credentials: 'include',
    headers: myHeaders
  }

  var myRequest = new Request(url, myInit)

  return fetch(myRequest, myInit)
}

export function post (endpoint, token, params) {

}

export function put (endpoint, token, params) {

}

export function remove (endpoint, token, params) {

}
