import { ExclamationCircleOutlined } from '@ant-design/icons'
import { queryParse } from '@utils'
import req from '@utils/request'
import { Card, Input, Pagination, Skeleton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.less'

const { Search } = Input

const SearchDetails = () => {
  const defaultValue = queryParse(location.search).t

  const navigate = useNavigate()
  const [isShowSkeleton, setIsShowSkeleton] = useState(true)
  const [questionList, setQuestionList] = useState()
  const [total, setTotal] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [searchValue, setSearchValue] = useState()

  useEffect(() => {
    setSearchValue(defaultValue)
  }, [])

  const searchSubject = () => {
    setIsShowSkeleton(false)
    req({
      method: 'post',
      url: '/getSubjectPageBySearch',
      data: {
        pageSize: 10,
        pageNo: pageIndex,
        keyWord: searchValue
      }
    }).then(res => {
      if (res.success && res.data) {
        setTotal(res.data.total)
        setQuestionList(res.data.result)
      }
    })
  }

  const handleJump = id => {
    navigate('/brush-question/' + id)
  }

  const onChangePagination = curPage => {
    setPageIndex(curPage)
  }

  useEffect(() => {
    searchSubject()
  }, [searchValue, pageIndex])

  return (
    <div className='search-details-box'>
      <div className='search-details-box-search'>
        <div>
          <Search
            placeholder='请输入感兴趣的内容'
            onSearch={value => {
              if (value) {
                setSearchValue(value)
                setPageIndex(1)
              } else {
                message.info('搜索词不能为空')
              }
            }}
            enterButton
            defaultValue={defaultValue}
          />
        </div>
      </div>
      <Skeleton
        title={{ width: '100%' }}
        paragraph={{ rows: 20, width: new Array(20).fill('100%') }}
        active
        loading={isShowSkeleton}
      >
        <div className='search-details-box-content'>
          <div className='search-details-box-content-card'>
            <Card style={{ width: '100%' }}>
              <div className='search-details-box-content-main'>
                {questionList?.length > 0 ? (
                  questionList.map((item, index) => {
                    if (item.subjectAnswer) {
                      return (
                        <div className='search-details-box-content-main-item'>
                          <div
                            className='search-details-box-content-main-item-question'
                            key={`search-details-question_${index}`}
                            onClick={() => handleJump(item.subjectId)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectName
                            }}
                          ></div>
                          <div
                            className='search-details-box-content-main-item-answer'
                            key={`search-details-answer_${index}`}
                            onClick={() => handleJump(item.subjectId)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectAnswer + '...'
                            }}
                          ></div>
                        </div>
                      )
                    } else {
                      return (
                        <div className='search-details-box-content-main-item'>
                          <div
                            className='search-details-box-content-main-item-question'
                            key={`search-details-question_${index}`}
                            onClick={() => handleJump(item.id)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectName
                            }}
                          ></div>
                          <div
                            className='search-details-box-content-main-item-answer'
                            key={`search-details-answer_${index}`}
                            onClick={() => handleJump(item.id)}
                            dangerouslySetInnerHTML={{
                              __html: item.subjectAnswer
                            }}
                          ></div>
                        </div>
                      )
                    }
                  })
                ) : (
                  <div className='search-null'>
                    <ExclamationCircleOutlined />
                    <div>很抱歉，没有找到与你搜索相关的内容</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
          <div className='search-details-box-content-paging'>
            {total > 10 && (
              <Pagination
                style={{
                  padding: '24px 0',
                  textAlign: 'center'
                }}
                showQuickJumper
                current={pageIndex}
                defaultCurrent={1}
                total={total}
                defaultPageSize={10}
                onChange={onChangePagination}
              />
            )}
          </div>
        </div>
      </Skeleton>
    </div>
  )
}

export default SearchDetails
