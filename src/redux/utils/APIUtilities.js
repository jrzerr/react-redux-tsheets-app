
/**
 * Convert object that contains key value pairs into a URL encoded query param string
 * @param  {Object} params
 * @return {string} Query param string
 */
export function convertParamsToURL (params) {
  var queryParams = Object.keys(params).reduce(function (previous, key) {
    return previous + '&' + key + '=' + encodeURIComponent(params[key])
  }, '')
  // chop off leading &
  if (queryParams.length > 0) {
    queryParams = queryParams.slice(1)
  }
  return queryParams
}
