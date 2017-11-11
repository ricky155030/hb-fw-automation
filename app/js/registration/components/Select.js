import React from 'react'
import { Select as AntdSelect } from 'antd'

class Select extends React.PureComponent {
  constructor(props) {
    super(props)

    this.counter = 0
    this.state = {
      input: ''
    }
  }

  handleSearch = input => {
    this.counter = 0
    this.setState({ input })
  }

  render () {
    const {
      options
    } = this.props

    const {
      input
    } = this.state

    console.log(options)
    console.log(input)
    return (
      <AntdSelect {...this.props} onSearch={this.handleSearch}>
      {
        options.map((o, index) => {
          if(this.counter < 10 && o.label.toUpperCase().indexOf(input.toUpperCase()) != -1) {
            this.counter++
            console.log(o.label)
            return <AntdSelect.Option key={o.value}>{ o.label }</AntdSelect.Option>
          } else {
            return <AntdSelect.Option key={o.value} style={{ display: 'none' }}>{ o.label }</AntdSelect.Option>
          }
        })
      }
      </AntdSelect>
    )
  }
}

export default Select
