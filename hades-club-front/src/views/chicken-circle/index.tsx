import headImg from '@/imgs/head.jpg'
import javaImg from '@/imgs/java.jpeg'
import jobImg from '@/imgs/job.jpg'
import {
  FileImageOutlined,
  MessageOutlined,
  ShareAltOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { Avatar, Button, Card, Input, Popover, Tabs } from 'antd'
import { useState } from 'react'
import './index.less'

const { Meta } = Card

const { TextArea } = Input
const Circle = () => {
  const [hasFocus, setHasFocus] = useState(false)
  const [comment, setComment] = useState('')

  const toggleFocus = (flag: boolean) => {
    setHasFocus(!flag)
  }

  const onChange = e => {
    setComment(e.target.value)
  }

  const renderPopContent = () => {
    return (
      <Tabs
        tabPosition='left'
        size='small'
        items={[
          {
            label: '推荐圈子',
            key: '1',
            children: (
              <div className='pop-content'>
                <div className='pop-content-item'>
                  <img src={javaImg} className='item-img' />
                  <span className='item-name'>JAVA圈子</span>
                </div>
                <div className='pop-content-item'>
                  <img src={jobImg} className='item-img' />
                  <span className='item-name'>求职圈子</span>
                </div>
              </div>
            )
          }
        ]}
      />
    )
  }

  return (
    <div className='circle-box'>
      <Card>
        <div className={`top-input-card ${hasFocus ? 'card-focus' : ''}`}>
          <TextArea
            showCount
            maxLength={1000}
            onChange={onChange}
            placeholder='与圈友们分享你得个人经验'
            style={{
              height: 120,
              resize: 'none',
              border: 'none',
              backgroundColor: '#f2f3f5',
              boxShadow: 'none'
            }}
            className='top-text-area'
            onFocus={() => toggleFocus(false)}
            onBlur={() => toggleFocus(true)}
          />
          <Popover placement='bottomLeft' trigger='click' content={renderPopContent}>
            <div className='choose-circle'>选择圈子 {'>'}</div>
          </Popover>
        </div>
        <div className='publish-options'>
          <div className='left-box'>
            <div>
              <SmileOutlined />
              <span style={{ marginLeft: '8px' }}>表情</span>
            </div>
            <div>
              <FileImageOutlined />
              <span style={{ marginLeft: '8px' }}>图片</span>
            </div>
          </div>
          <div className='right-box'>
            <Button type='primary' disabled={!comment.length}>
              发布
            </Button>
          </div>
        </div>
      </Card>
      <Card
        style={{ marginTop: '10px' }}
        actions={[
          <div>
            <ShareAltOutlined />
            <span style={{ marginLeft: 8 }}>分享</span>
          </div>,
          <div>
            <MessageOutlined />
            <span style={{ marginLeft: 8 }}>2</span>
          </div>
        ]}
      >
        <Meta
          avatar={<Avatar src={headImg} />}
          title='鸡翅小弟'
          description='每天练习，两年半定有所成。'
        />
      </Card>
    </div>
  )
}

export default Circle
