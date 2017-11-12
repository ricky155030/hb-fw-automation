import React from 'react'
import style from './Form.css'
import axios from 'axios'
import { fill, take } from 'lodash'
import { Form, Icon, Input, Button, Upload } from 'antd'
import Select from './Select'
import Test from './Test'

const options = fill(new Array(100000), 1).map((i, value) => ({
  value,
  label: `aa_${value}`
}))

class TicketForm extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      fileList: [],
      value: []
    }
  }

  handleAddUploadFile = file => {
    this.setState(({ fileList }) => ({
      fileList: [...fileList, file]
    }))

    return false
  }

  handleRemoveUploadFile = file => {
    this.setState(({ fileList }) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  }

  uploadFiles = () => {
    const {
      fileList
    } = this.state

    const formData = new FormData()

    fileList.forEach(f => {
      console.log(f)
      formData.append('rules', f)
    })

    console.log(formData)

    return axios({
        url: 'http://localhost:3001/upload',
        'Content-Type': 'multipart/form-data',
        method: 'post',
        data: formData
      })
      .then(response => console.log(response))
  }

  render () {
    const {
      getFieldDecorator
    } = this.props.form

    const {
      value,
      fileList
    } = this.state

    return (
      <div>
        <h2>
          <Icon className={style.headerIcon} type="plus" />
          Create a Ticket
        </h2>
        <hr className={style.hr} />
        <Select 
          allowClear
          value={value}
          mode="multiple"
          options={options}
          style={{ width: '100%' }}
          onSelect={v => this.setState({ value: v })}
          filterFunc={(input, option, regExp) => {
            return option.match(regExp) !== null
          }}
        />
        <Form>
          <Form.Item
            label="User"
          >
          {
            getFieldDecorator('user', {
              rules: [{
                require: true, message: 'Please tell us who you are'
              }]
            })(
              <Input type="text" />
            )
          }
          </Form.Item>
          <Form.Item
            label="Upload Rule Files"
          >
            <Upload
              fileList={fileList}
              beforeUpload={this.handleAddUploadFile}
              onRemove={this.handleRemoveUploadFile}
            >
              <Button>
                <Icon type="upload" />
                Select File
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
          	<Button type="primary" htmlType="submit" onClick={this.uploadFiles}>
          	  Submit
          	</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(TicketForm)
