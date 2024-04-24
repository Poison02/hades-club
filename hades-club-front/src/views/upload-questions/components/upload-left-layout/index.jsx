import { RightOutlined } from '@ant-design/icons'
import { Affix } from 'antd'
import React from 'react'
import './index.less'

export default function UploadLeftLayout(props) {
  return (
    <Affix offsetTop={150}>
      <div className='upload-left-layout'>
        {props.layoutList.map((item, index) => {
          return (
            <div
              className={`upload-left-layout-item ${
                item.active ? 'upload-left-layout-item-active' : ''
              }`}
              onClick={() => {
                props.onChange(index)
              }}
              key={`upload_left_layout_${item.id}`}
            >
              {item.title}
              <RightOutlined style={{ marginLeft: 54 }} />
            </div>
          )
        })}
      </div>
    </Affix>
  )
}
