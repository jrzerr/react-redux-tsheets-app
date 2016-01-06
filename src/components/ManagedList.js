import React from 'react'
import { OrderedMap } from 'immutable'
var defaultButtonStyle = {
  display: 'block'
}

/**
 * We will return whether the item passed in should be marked as selected
 * One case where the item should be selected:
 * 1) item is the same as the selected item
 * @param  {Map} item - An item that we want to determine if selected
 * @param  {Map} current - The current item
 * @param  {OrderedMap} list - The entire map of id and Map item
 * @return {Boolean} - Whether item should be shown as selected
 */
export function _isSelected (item, selected, list) {
  // if no selected item, then nothing should be marked as selected
  if (!selected) {
    return false
  } else {
    // If item passed in is the current item, it should be marked as selected
    if (selected.get('id') === item.get('id')) {
      return true
    } else {
      return false
    }
  }
}

export class ManagedList extends React.Component {
  static propTypes = {
    list: React.PropTypes.instanceOf(OrderedMap).isRequired,
    currentId: React.PropTypes.number.isRequired,
    parentId: React.PropTypes.number.isRequired,
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
    let currentItem = list.get(currentId.toString())
    let backButton = this._renderBackButton(parentId, currentItem, list, style, this._handleBack.bind(this))
    let listComponent = this._renderList(parentId, currentItem, list, style, selectedStyle, isSelected, this._handleSelect.bind(this))
    return (
      <div className=''>
        {backButton}
        {listComponent}
      </div>
    )
  }

  _renderBackButton (parentId, currentItem, list, style, onClick) {
    let backButton
    if (parentId !== 0) {
      let parentItem = list.get(parentId.toString())
      let parentItemParentId = parentItem.get('parent_id')
      backButton = <button key={parentId + 'back'} style={style} onClick={() => onClick(parentItemParentId)}> &lt;</button>
    } else {
      backButton = ''
    }
    return backButton
  }

  _renderList (parentId, currentItem, list, style, selectedStyle, isSelected, onClick) {
    return list.filter((v) => v.get('parent_id') === parentId).map((value, key) => {
      var s
      if (isSelected(value, currentItem, list)) {
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
            onClick={() => onClick(value, parseInt(key, 10))}>{content}</button>
        )
    }).toArray()
  }

  _handleSelect (value, key) {
    if (value.get('has_children') && this.props.onChangeParent) {
      this.props.onChangeParent(key)
    } else {
      this.props.onChange(key)
    }
  }

  _handleBack (parentId) {
    if (this.props.onChangeParent) {
      this.props.onChangeParent(parentId)
    }
  }
}

export default ManagedList
