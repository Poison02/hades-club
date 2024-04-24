import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './features/userInfoSlice.ts'

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    userInfo: userInfoSlice
  }
})

export default store
