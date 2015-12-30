/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'

const config = {
  env : process.env.NODE_ENV,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../'),

  // TSheets API
  tsheets_apiroot: 'https://rest.tsheets.com/api/v1',
  tsheets_apitoken: ''

}

export default config
