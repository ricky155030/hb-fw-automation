import React from 'react'
import ReactDOM from 'react-dom'
import { Modal } from 'antd'

export default function createModal(props) {
  let div = document.createElement('div')
  document.body.appendChild(div)

  const handleCancel = (...args) => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (props.onCancel) {
      props.onCancel(...args);
    }
  }

  const handleOk = (...args) => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    if (props.onOk) {
      props.onOk(...args);
    }
  }

  ReactDOM.render(
    <Modal
      { ...props }
      visible
      onCancel={handleCancel}
      onOk={handleOk}
    >
      { props.content }
    </Modal>
  , div)
  
  return {
    destroy: handleCancel
  }
}
