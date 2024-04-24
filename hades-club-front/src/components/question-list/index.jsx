import { filterDifficulty, gradeObject } from '@constants'
import { Button, Input, Radio, Space, Table, Tag } from 'antd'
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'

const { Search } = Input

const colors = [
  '#ffffb8',
  '#f4ffb8',
  '#b5f5ec',
  '#bae0ff',
  '#d9f7be',
  '#efdbff',
  ' #ffd6e7',
  '#d6e4ff'
]

const QuestionList = props => {
  const [difficuty, setDifficuty] = useState(0)
  const navigate = useNavigate()

  const RandomNumBoth = (Min, Max) => {
    //差值
    const Range = Max - Min
    // 随机数
    const Rand = Math.random()
    return Min + Math.round(Rand * Range) //四舍五入
  }

  const handleSearch = close => {
    props.changeDifficuty(difficuty)
    close()
  }

  const changeDifficuty = e => {
    setDifficuty(e.target.value)
  }

  /**
   * 题目列表
   */
  const questionColumns = [
    {
      title: (
        <div style={{ display: 'flex' }}>
          题目{' '}
          <div
            className='question-count-box'
            style={{ marginLeft: '10px', color: 'rgba(0, 0, 0, 0.5)' }}
          >
            （当前
            <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}> {props.total || 0} </span>
            道题）
          </div>
        </div>
      ),
      key: 'questionNo',
      align: 'centlefter',
      render: (item, record) => {
        return (
          <div className='question-info-container'>
            <div className='question-info-desc'>{record.subjectName}</div>
            <div className='question-info-tags'>
              {item?.labelName?.length > 0 &&
                item.labelName.map(tagsItem => {
                  return (
                    <div
                      className='question-info-tag'
                      key={tagsItem}
                      style={{ backgroundColor: colors[RandomNumBoth(0, 7)] }}
                    >
                      {tagsItem}
                    </div>
                  )
                })}
            </div>
          </div>
        )
      }
    },
    {
      title: '难度',
      dataIndex: 'subjectDifficult',
      key: 'subjectDifficult',
      align: 'center',
      filterDropdown: ({ close }) => (
        <div style={{ padding: 16 }} onKeyDown={e => e.stopPropagation()}>
          <div
            style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', marginBottom: 10 }}
          >
            请选择
          </div>
          <Radio.Group
            style={{ width: '100%', textAlign: 'center' }}
            value={difficuty}
            onChange={changeDifficuty}
          >
            <Space direction='vertical'>
              {filterDifficulty.map(item => {
                return (
                  <Radio value={item.id} key={item.id}>
                    {item.title}
                  </Radio>
                )
              })}
            </Space>
          </Radio.Group>

          <Button
            block
            size='small'
            type='primary'
            style={{ marginTop: 12 }}
            onClick={() => handleSearch(close)}
          >
            确定
          </Button>
        </div>
      ),
      width: 90,
      render: key => {
        return <Tag color={gradeObject?.[key]?.color}>{gradeObject?.[key]?.title}</Tag>
      }
    }
  ]

  /**
   * 进入详情
   * @param {*} item
   * @param {*} type
   * @returns
   */
  const onChangeAction = item => () => {
    // navigate('/brush-question/' + item.id)
    window.open('/brush-question/' + item.id, '_blank')
    // let { isNotToDetail } = props;
    // !isNotToDetail &&
    // if (!isNotToDetail) return;
  }

  /**
   * 过滤框-搜索框-模块
   * @returns
   */
  const renderFilterContainer = () => {
    const { total, isShowSearch, setSearchStr } = props
    return (
      <div className='question-filter-container'>
        {isShowSearch && (
          <Search
            placeholder='请输入感兴趣的内容～'
            onSearch={value => setSearchStr(value)}
            style={{ width: 240 }}
            allowClear
            size='small'
          />
        )}
      </div>
    )
  }

  const { questionList, isHideSelect } = props

  return (
    <Fragment>
      <div className='question-list-filter'>
        {!isHideSelect && renderFilterContainer()}
        <div className='question-list-container'>
          <Table
            onRow={(record, index) => {
              return {
                onClick: onChangeAction(record, index) // 点击行
              }
            }}
            columns={questionColumns}
            dataSource={questionList}
            rowKey='id'
            pagination={false}
            rowClassName='question-table-row'
          />
        </div>
      </div>
    </Fragment>
  )
}

export default QuestionList
