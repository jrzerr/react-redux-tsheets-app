import base from './_base'
import local from './_local'

var overrides = local(base)

export default Object.assign({}, base, overrides)
