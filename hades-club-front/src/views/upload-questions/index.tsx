import req from '@utils/request'
import { Card, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SingleBox from './pages/single-box'

import './index.less'
const UploadQuestions = () => {
  const [currentKey, setCurrentKey] = useState('singleBox')
  const navigate = useNavigate()

  useEffect(() => {
    const userInfoStorage = localStorage.getItem('userInfo')
    if (!userInfoStorage) {
      return message.info('请登录')
    }
    const { loginId } = JSON.parse(userInfoStorage)
    req(
      {
        method: 'get',
        url: '/permission/getPermission',
        params: {
          userName: loginId
        }
      },
      '/auth'
    ).then(res => {
      if (res.success && res.data) {
        if (!res.data.includes('subject:add')) {
          message.info('暂无权限')
          navigate('/question-bank')
        }
      }
    })
  }, [])

  return (
    <div className='upload-questions-box'>
      <Card
        style={{ width: '100%' }}
        title='题目录入'
        bordered={false}
        activeTabKey={currentKey}
        onTabChange={key => {
          setCurrentKey(key)
        }}
      >
        <SingleBox />
      </Card>
    </div>
  )
}

export default UploadQuestions
