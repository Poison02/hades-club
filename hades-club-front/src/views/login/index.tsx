import { saveUserInfo } from '@features/userInfoSlice.ts'
import LoginQrcode from '@imgs/login_qrcode.jpg'
import req from '@utils/request'
import { Button, Input, Space, message } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './index.less'

const loginApiName = '/user/doLogin'

const Login = () => {
  const [validCode, setValidCode] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changeCode = e => {
    setValidCode(e.target.value)
  }

  const getUserInfo = async loginId => {
    req(
      {
        method: 'post',
        url: '/user/getUserInfo',
        data: {
          userName: loginId
        }
      },
      '/auth'
    ).then(res => {
      if (res?.success && res?.data) {
        dispatch(saveUserInfo(res.data))
      }
    })
  }

  const doLogin = () => {
    if (!validCode) return
    req(
      {
        method: 'get',
        url: loginApiName,
        params: { validCode }
      },
      '/auth'
    ).then(async res => {
      if (res.success && res.data) {
        message.success('登录成功')
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        await getUserInfo(res.data.loginId)
        setTimeout(() => {
          navigate('/question-bank')
        }, 500)
      } else {
        message.error('登录失败，请重试')
      }
    })
  }

  return (
    <div className='login-box'>
      <div className='login-container-inner'>
        <div className='notes'></div>
        <div className='qrcode-box'>
          <div className='qrcode-desc'>
            <p>微信扫码关注公众号</p>
            <p>公众号发送 “验证码”开启加薪之路</p>
          </div>
          <div className='qrcode-img'>
            <img src={LoginQrcode} alt='' />
          </div>
          <div className='qrcode-form'>
            <Space>
              <Input maxLength={3} placeholder='验证码' onChange={changeCode} value={validCode} />
              <Button type='primary' ghost onClick={doLogin}>
                登录
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
