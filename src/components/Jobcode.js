import React from 'react'
import { ManagedList } from 'components/ManagedList'
import { OrderedMap } from 'immutable'
import { isSelected } from 'redux/utils/JobcodeUtils'

export class Jobcode extends React.Component {
  static propTypes = {
    jobcodes: React.PropTypes.instanceOf(OrderedMap).isRequired,
    parentId: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onChangeParent: React.PropTypes.func.isRequired,
    currentId: React.PropTypes.number.isRequired
  }

  render () {
    const {
      jobcodes,
      parentId,
      currentId,
      onChange,
      onChangeParent
    } = this.props
    return (
      <div className=''>
       <ManagedList
          list={jobcodes}
          currentId={currentId}
          onChange={onChange}
          onChangeParent={onChangeParent}
          parentId={parentId}
          isSelected={isSelected}

        />
      </div>
    )
  }

  _change (event) {
    this.props.onChange(event.target.value)
  }
}

export default Jobcode
