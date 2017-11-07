import React from 'react'
import style from './Form.css'
import axios from 'axios'
import { Form, Icon, Input, Button, Upload } from 'antd'
import ImgurModal from './ImgurModal'

class TicketForm extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      fileList: []
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
      fileList
    } = this.state

    return (
      <div>
        <h2>
          <Icon className={style.headerIcon} type="plus" />
          Create a Ticket
        </h2>
        <hr className={style.hr} />
        <ImgurModal url="https://i.imgur.com/BhljIAJ.jpg" />
        <ImgurModal url="https://i.imgur.com/ph73tKv.jpg" />
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
