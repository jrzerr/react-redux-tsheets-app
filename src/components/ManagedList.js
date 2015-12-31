import React from 'react'
import { OrderedMap } from 'immutable'
var defaultButtonStyle = {
  display: 'block'
}

export function _isSelected (parent, child, list) {
  if (!child) {
    return false
  } else {
    if (child.get('id') === parent.get('id')) {
      return true
    } else if (!child.get('parent_id')) {
      return false
    } else {
      return _isSelected(parent, list.get(child.get('parent_id')), list)
    }
  }
}

export class ManagedList extends React.Component {
  static propTypes = {
    list: React.PropTypes.instanceOf(OrderedMap).isRequired,
    currentId: React.PropTypes.string.isRequired,
    parentId: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onChangeParent: React.PropTypes.func,
    buttonStyle: React.PropTypes.object,
    isSelected: React.PropTypes.func
  }
  constructor (props) {
    super(props)
  }

  render () {
    var {
      list,
      buttonStyle,
      currentId,
      isSelected,
      parentId
    } = this.props
    var style, selectedStyle
    if (buttonStyle === undefined) {
      style = defaultButtonStyle
    } else {
      style = buttonStyle
    }
    selectedStyle = Object.assign({}, style)
    selectedStyle.borderStyle = 'solid'
    selectedStyle.borderWidth = 1
    if (!isSelected) {
      isSelected = _isSelected
    }
    return (
      <div className=''>
        {list.filter((v) => v.get('parent_id') === parentId).map((value, key) => {
          var childItem = list.get(currentId)
          var s
          if (isSelected(value, childItem, list)) {
            s = selectedStyle
          } else {
            s = style
          }
          var content = value.get('name')
          if (value.get('has_children')) {
            content += ' >'
          }
          return (
              <button 
                key={key} 
                style={s}
                onClick={() => this._handleSelect(value, key)}>{content}</button>
            )
        }).toArray()}
      </div>
    )
  }

  _handleSelect (value, key) {
    if (value.get('has_children') && this.props.onChangeParent) {
      this.props.onChangeParent(key)
    } else {
      this.props.onChange(key)
    }
  }
}

export default ManagedList
