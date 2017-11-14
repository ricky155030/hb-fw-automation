import React from 'react'
import { escapeRegExp, remove, isEmpty, chain, keyBy, sortBy } from 'lodash'
import { Select as AntdSelect, Icon } from 'antd'
import style from './Select.css'

const SELECT_ALL = 'Select All'

class Select extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      options: []
    }
  }

  handleSearch = input => {
    const options = this.calculateOption(input)
    this.setState({ input, options })
  }

  handleSelect = (selected, option) => {
    const {
      options
    } = this.state

    const {
      mode,
      value
    } = this.props

    let optionText = this.getOptionText(option)

    if(!mode) {
      this.props.onSelect(selected)
    }

    if(mode == 'multiple' && optionText == SELECT_ALL) {
      this.props.onSelect([
        ...value,
        ...options.filter(o => value.indexOf(o.value.toString()) == -1).map(o => o.value.toString())
      ])
    } else {
      this.props.onSelect([
        ...value,
        selected
      ])
    }
  }

  handleDeselect = selected => {
    const {
      value
    } = this.props

    if(!mode) {
      this.props.onSelect(null)
    }

    if(mode == 'multiple') {
      this.props.onSelect(value.filter(i => i !== selected))
    }
  }

  getOptionText = option => {
    if(typeof(option.props.children) !== 'string') {
      return option.props.children.props.text
    } 

    return option.props.children
  }

  handleChange = value => {
    // Trigger clear event
    if(isEmpty(value) && typeof(value) !== 'string') {
      this.props.onSelect(value)
    }
  }

  calculateOption(input) {
    const {
      value,
      options,
      filterFunc
    } = this.props

    const optionsKeyByValue = keyBy(options, 'value')
    const regExp = this.generateRegExp(input)

    const filteredOption = chain(options)
      .filter(o => !input || input && filterFunc(input, o.label, regExp))
      .filter(o => value.indexOf(o.value.toString()) == -1)
      .take(100)
      .value()
    
    const selectedOption = chain(value)
      .map(v => optionsKeyByValue[v])
      .value()

    const result = [
      ...selectedOption,
      ...filteredOption
    ]

    return sortBy(result, 'value')
  }

  generateChildren = () => {
    const {
      mode,
      value
    } = this.props

    let options = []

    if(this.state.options.length != 0 && mode == 'multiple') {
      options.push(
        <AntdSelect.Option key={SELECT_ALL} style={{ background: 'red', color: 'white'}}>
          <div text={SELECT_ALL}>
            <Icon className={style.optionIcon} type="plus-square" />
            <b style={{ background: 'red' }}>{ SELECT_ALL }</b>
          </div>
        </AntdSelect.Option>
      )
    }

    const children = this.state.options.map(o => (
      <AntdSelect.Option key={o.value}>
        { o.label }
      </AntdSelect.Option>
    ))

    return options.concat(children)
  }

  handleFilterOption = (input, option) => {
    const {
      filterFunc
    } = this.props

    let target = this.getOptionText(option)
    const regExp = this.generateRegExp(input)

    return filterFunc(input, target, regExp) || target == SELECT_ALL
  }

  generateRegExp = input => {
    let regExp = /^$/

    try {
      regExp = new RegExp(input, 'i')
    } catch(e) {
      console.log(e)
    }

    return regExp
  }

  render () {
    const {
      mode,
      filterFunc
    } = this.props

    if(mode && mode != 'multiple') {
      return <span style={{ color: 'red' }}>Error: Select is not support for { mode }</span>
    }

    return (
      <AntdSelect 
        {...this.props} 
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        onSelect={this.handleSelect}
        onDeselect={this.handleDeselect}
        filterOption={this.handleFilterOption}
      >
      { this.generateChildren() }
      </AntdSelect>
    )
  }
}

export default Select
