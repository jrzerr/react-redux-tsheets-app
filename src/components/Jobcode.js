import React from 'react'

export class Jobcode extends React.Component {
  static propTypes = {
    jobcodes: React.PropTypes.object.isRequired,
    parentId: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    currentId: React.PropTypes.string.isRequired
  }
  constructor (props) {
    super(props)
  }

  render () {
    const { jobcodes, parentId, currentId } = this.props
    console.log(currentId)
    const jobcodeIds = Object.keys(jobcodes)
    return (
      <div className=''>
        <select onChange={(event) => this._change(event)} value={currentId}>
          <option value=''></option>
          {jobcodeIds.map((id) => {
            return (
                <option key={id} value={id}>{jobcodes[id].name}</option>
              )
          })}
        </select>
      </div>
    )
  }

  _change (event) {
    this.props.onChange(event.target.value)
  }
}

export default Jobcode
