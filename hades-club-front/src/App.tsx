import req from '@utils/request'
import Header from '@views/header'
import { Suspense, memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// 引入对应的方法
import './App.less'
import { saveUserInfo } from './store/features/userInfoSlice.ts'

const apiName = {
  update: '/user/update',
  queryInfo: '/user/getUserInfo'
}

const App = () => {
  const userInfoStorage = localStorage.getItem('userInfo')
  const { loginId = '' } = userInfoStorage ? JSON.parse(userInfoStorage) : {}
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

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
        dispatch(saveUserInfo(res.data))
      }
    })
  }

  useEffect(() => {
    if (location.pathname !== '/login' && loginId) {
      getUserInfo()
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/') {
      const userInfoStorage = localStorage.getItem('userInfo')
      if (!userInfoStorage) {
        return window.location.replace('/login')
      }
      navigate('/question-bank')
    }
  }, [location])
  return (
    <div
      className='app-main'
      style={{ padding: location.pathname === '/login' ? '66px 0 0' : '66px 16px 0' }}
    >
      <Header />
      <div
        className='content-box'
        style={{ width: location.pathname === '/login' ? '100%' : '1200px' }}
      >
        <Suspense fallback={<div></div>}>
          <Outlet />
        </Suspense>
      </div>
      <div className='copyright'>
        <a href='http://beian.miit.gov.cn/' target='_blank'>
          京ICP备2023035579号
        </a>
      </div>
    </div>
  )
}

export default memo(App)
