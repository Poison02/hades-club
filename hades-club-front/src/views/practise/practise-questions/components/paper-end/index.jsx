// import req from '@utils/request'
import req from '@utils/request'
import { Card, Empty, Pagination, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'

const tabList = [
  {
    key: '0',
    tab: '默认'
  },
  {
    key: '1',
    tab: '最新'
  },
  {
    key: '2',
    tab: '最热'
  }
]

const PaperView = props => {
  const { type } = props
  const navigate = useNavigate()

  const [spinning, setSpinning] = useState(false)
  const [paperList, setPaperList] = useState([])
  const [orderType, setOrderType] = useState('0')
  const [pageInfo, setPageInfo] = useState({
    total: 0,
    pageIndex: 1
  })
  useEffect(() => {
    getPreSetContent()
  }, [type, orderType])

  const getPreSetContent = () => {
    let api = '/practice/set/getPreSetContent'
    if (type === 'unfinish') {
      api = '/practice/set/getUnCompletePractice'
    }
    let params = {
      pageInfo: {
        pageNo: pageInfo.pageIndex,
        pageSize: 8
      }
    }
    if (type !== 'unfinish') {
      params.orderType = orderType
    }
    req(
      {
        method: 'post',
        data: params,
        url: api
      },
      '/practice'
    )
      .then(res => {
        if (res.success) {
          setPageInfo({
            ...pageInfo,
            total: res.data.total
          })
          setPaperList(res.data.result || [])
        } else {
          setPaperList([])
        }
      })
      .catch(err => console.log(err))
  }

  const onTabChange = key => {
    setOrderType(key)
  }

  const onChangePagination = pageIndex => {
    setPageInfo({
      ...pageInfo,
      pageIndex
    })
  }

  const handleJump = setId => navigate('/practise-detail/' + setId)

  return (
    <Spin spinning={spinning}>
      <div className='paper-box'>
        <div className='paper-box-cardlist'>
          <Card
            style={{ width: '100%' }}
            tabList={type === 'unfinish' ? null : tabList}
            bordered={false}
            activeTabKey={tabList.key}
            onTabChange={onTabChange}
          >
            <div
              className='ant-card-body-box'
              style={{ justifyContent: paperList?.length ? 'flex-start' : 'center' }}
            >
              {paperList?.length > 0 ? (
                paperList.map((item, index) => {
                  return (
                    <div
                      className='paper-box-cardlist-body-item'
                      onClick={() => handleJump(item.setId)}
                      key={`paperList_${index}`}
                    >
                      <h1 className='paper-box-cardlist-body-item-title'>
                        {item.setName || item.title}
                      </h1>
                      {type === 'unfinish' ? (
                        <div className='paper-box-cardlist-body-item-hot'>
                          <div>上次练习时间</div>
                          {item.practiceTime}
                        </div>
                      ) : (
                        <>
                          <div className='paper-box-cardlist-body-item-hot'>
                            热度指数：{item.setHeat}
                          </div>
                          <div className='paper-box-cardlist-body-item-describe'>
                            <Tooltip placement='topLeft' title={item.setDesc}>
                              <span className='hide-3-line'>{item.setDesc}</span>
                            </Tooltip>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </Card>
        </div>
        <div className='paper-box-paging'>
          {pageInfo.total > 8 && (
            <Pagination
              style={{
                padding: '24px 0',
                textAlign: 'center'
              }}
              showQuickJumper
              current={pageInfo.pageIndex}
              defaultCurrent={1}
              total={pageInfo.total}
              defaultPageSize={10}
              onChange={onChangePagination}
            />
          )}
        </div>
      </div>
    </Spin>
  )
}

export default PaperView
