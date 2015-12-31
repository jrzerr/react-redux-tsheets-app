import React from 'react'
import { ManagedList } from 'components/ManagedList'
import { OrderedMap } from 'immutable'

export class Jobcode extends React.Component {
  static propTypes = {
    jobcodes: React.PropTypes.instanceOf(OrderedMap).isRequired,
    parentId: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    currentId: React.PropTypes.string.isRequired
  }
  constructor (props) {
    super(props)
  }

  render () {
    const { jobcodes, parentId, currentId, onChange } = this.props
    return (
      <div className=''>
       <ManagedList
          list={jobcodes.filter((v) => v.get('parent_id') === parentId)}
          currentId={currentId}
          onSelect={onChange}
          parentId={parentId}
        />
      </div>
    )
  }

  _change (event) {
    this.props.onChange(event.target.value)
  }
}

export default Jobcode
