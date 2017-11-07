import React from 'react'
import createModal from './Modal.js'
import { Button } from 'antd'

const ImgurModal = props => {
  const {
    url
  } = props

  const handleClick = () => {
    createModal({
      title: 'haha',
      content: (
        <div>
          <div style={{ height: '48px', padding: '10px', lineHeight: '28px', backgroundColor: '#000', color: '#fff' }}>
            <h4>{ url }</h4>
          </div>
          <img src={url} width="100%" />
        </div>
      ),
      footer: null
    })
  }

  return (
    <Button type="primary" onClick={handleClick}>
      Open
    </Button>
  )
}

export default ImgurModal
