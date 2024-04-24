import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { saveUserInfo } from '@features/userInfoSlice.ts'
import req from '@utils/request'
import { Button, Card, Col, Form, Input, Radio, Row, Upload, message } from 'antd'
import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import './index.less'

const { TextArea } = Input
const apiName = {
  update: '/user/update',
  queryInfo: '/user/getUserInfo'
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 1 }
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

interface UserInfo {
  nickName?: string
  phone?: string
  email?: string
  sex?: string | number
  introduce?: string
  avatar?: string
}

const Sex: Record<string, any> = {
  1: '男',
  2: '女'
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

const UserInfo = () => {
  const userInfoStorage = localStorage.getItem('userInfo')
  const { loginId = '', tokenValue = '' } = userInfoStorage ? JSON.parse(userInfoStorage) : {}

  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const [editFlag, setEditFlag] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({})
  const [avatar, setAvatar] = useState()

  const getUserInfo = async () => {
    req(
      {
        method: 'post',
        url: apiName.queryInfo,
        data: {
          userName: loginId
        }
      },
      '/auth'
    ).then(res => {
      if (res?.success && res?.data) {
        setUserInfo(res.data)
        setAvatar(res.data.avatar || '')
        form.setFieldsValue(res.data)
      }
    })
  }

  useEffect(() => {
    if (loginId) {
      getUserInfo()
    }
  }, [loginId])

  const onFinish = () => {
    setLoading(true)
    const values = form.getFieldsValue()
    if (!Object.values(values).filter(Boolean).length && !avatar) {
      setLoading(false)
      return
    }
    const params = {
      userName: loginId,
      ...values
    }
    if (avatar) {
      params.avatar = avatar
    }
    req(
      {
        method: 'post',
        url: apiName.update,
        data: { ...params }
      },
      '/auth'
    )
      .then(res => {
        dispatch(saveUserInfo(params))
        setUserInfo(params)
        setAvatar(params.avatar || '')
        if (res.success) {
          message.success('更新成功')
          setTimeout(() => {
            // getUserInfo()
            setLoading(false)
            setEditFlag(false)
          }, 500)
        } else {
          setLoading(false)
        }
      })
      .catch(() => {
        message.error('更新失败')
        setLoading(false)
      })
  }

  const handleChange = ({ file }) => {
    if (file.status === 'done' && file.response.success && file.response.data) {
      setAvatar(file.response.data)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>点击上传</div>
    </div>
  )

  return (
    <div className='user-info-box'>
      <Card title='基本信息'>
        <Form {...layout} colon={false} form={form}>
          <Row>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='用户头像' valuePropName='fileList' getValueFromEvent={normFile}>
                  <Upload
                    name='uploadFile'
                    listType='picture-card'
                    className='avatar-uploader'
                    accept='image/*'
                    showUploadList={false}
                    withCredentials
                    action='/oss/upload'
                    headers={{
                      satoken: 'jichi ' + tokenValue
                    }}
                    data={{
                      bucket: 'user',
                      objectName: 'icon'
                    }}
                    // beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {avatar ? (
                      <img src={avatar} style={{ height: '80px', width: '80px' }} />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              ) : (
                <Form.Item label='用户头像'>
                  {userInfo.avatar ? (
                    <img className='user-info_header' src={userInfo.avatar} />
                  ) : (
                    <div />
                  )}
                  {/* <img className='user-info_header' src={userInfo.avatar || Head} /> */}
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='用户昵称' name='nickName'>
                  <Input placeholder='请输入昵称' />
                </Form.Item>
              ) : (
                <Form.Item label='用户昵称'>
                  <>{userInfo.nickName || ''}</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别' name='sex'>
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                </Form.Item>
              ) : (
                <Form.Item label='性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别'>
                  <>{userInfo.sex ? Sex[userInfo.sex] : '未知'}</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='手机号码' name='phone'>
                  <Input placeholder='请输入手机号码' />
                </Form.Item>
              ) : (
                <Form.Item label='手机号码'>
                  <>{userInfo.phone || ''}</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item
                  label='邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱'
                  name='email'
                >
                  <Input placeholder='请输入邮箱' />
                </Form.Item>
              ) : (
                <Form.Item label='邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱'>
                  <>{userInfo.email || ''}</>
                </Form.Item>
              )}
            </Col>
            <Col span={16}>
              {editFlag ? (
                <Form.Item label='个人简介' name='introduce'>
                  <TextArea placeholder='请输入个人简介' maxLength={500} showCount />
                </Form.Item>
              ) : (
                <Form.Item label='个人简介'>
                  <>{userInfo.introduce || '这个人很懒，什么也没有留下。。。。'}</>
                </Form.Item>
              )}
            </Col>

            <Col span={16}>
              <Form.Item wrapperCol={{ offset: 5 }}>
                {editFlag ? (
                  <>
                    <Button
                      type='primary'
                      style={{ marginRight: '20px' }}
                      onClick={onFinish}
                      loading={loading}
                    >
                      保存
                    </Button>
                    <Button onClick={() => setEditFlag(false)}>取消</Button>
                  </>
                ) : (
                  <Button type='primary' onClick={() => setEditFlag(true)}>
                    编辑
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default memo(UserInfo)
