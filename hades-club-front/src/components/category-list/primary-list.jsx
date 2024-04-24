import req from '@utils/request'
import { Card, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { apiName, categoryBackColor, mockCategoryList } from './constant'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './index-new.less'

const PrimaryList = props => {
  const [loading, setLoading] = useState(false)
  const [primaryCategoryId, setPrimaryCategoryId] = useState()
  const [categoryList, setCategoryList] = useState([])

  /**
   * 获取大类分类
   */
  const getPrimaryCategoryInfo = () => {
    setLoading(true)
    req({
      method: 'post',
      url: apiName.queryPrimaryCategory,
      data: { categoryType: 1 }
    })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setPrimaryCategoryId(res.data[0].id)
          setCategoryList([...res.data])
          props.changePrimaryId(res.data[0].id)
        } else {
          setPrimaryCategoryId(mockCategoryList[0].id)
          setCategoryList(mockCategoryList)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getPrimaryCategoryInfo()
  }, [])

  return (
    <Spin spinning={loading}>
      <div className='category-box'>
        <Swiper
          spaceBetween={14}
          slidesPerView={6.5}
          style={{ paddingTop: '10px' }}
          modules={[Navigation]}
          navigation
        >
          {categoryList.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setPrimaryCategoryId(item.id)
                  props.changePrimaryId(item.id)
                }}
              >
                <Card
                  style={{ backgroundColor: `${categoryBackColor[index]}` }}
                  bodyStyle={{ padding: '10px 14px' }}
                  className={`category-card ${item.id === primaryCategoryId ? 'active' : ''}`}
                >
                  <Space direction='vertical' size='middle'>
                    <div className='category-card-title'>{item.categoryName}</div>
                    <div className='category-card-count'>{item.count}道题</div>
                  </Space>
                </Card>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </Spin>
  )
}

export default PrimaryList
