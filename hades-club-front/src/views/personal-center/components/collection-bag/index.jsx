import { Card, Pagination, Spin } from 'antd'
import React, { Component } from 'react'
import { collectTabType } from '../../constant'
import EmptyBox from '../empty-box'
import QuestionList from '../question-list'
import './index.less'
const tabList = [
  {
    key: 'testQuestions',
    tab: '收藏的试题'
  }
  //   {
  //     key: 'posts',
  //     tab: '收藏的帖子',
  //   },
]

export default class CollectionBag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: collectTabType.testQuestions, // 选中的tab 默认选中第一个
      collectionList: [],
      isShowSpin: false,
      isShowSkeleton: true
    }
  }

  total = 0 // 总题数
  pageIndex = 1
  pageSize = 10

  componentDidMount() {
    this.getCollectionList()
  }

  /**
   * 切换tab
   * @param {*} key
   */
  onTabChange = key => {
    this.setState(
      {
        currentKey: key
      },
      () => {
        this.pageIndex = 1
        this.getCollectionList()
      }
    )
  }

  /**
   * 获取一级分类数据
   */
  getCollectionList() {
    this.total = 3
    this.setState({
      collectionList: [
        {
          id: 100,
          subjectName: 'Redis支持哪几种数据类型？'
        },
        {
          id: 101,
          subjectName: 'Redis的高级数据类型有什么？'
        },
        {
          id: 102,
          subjectName: 'Redis的优点有什么？'
        }
      ]
    })
  }

  /**
   * 分页
   * @param {*} pageIndex
   */
  onChangePagination = pageIndex => {
    this.pageIndex = pageIndex
    this.getCollectionList()
  }

  render() {
    const { currentKey, collectionList, isShowSpin } = this.state
    return (
      <div className='collection-bag-component'>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={currentKey}
          onTabChange={key => {
            this.onTabChange(key)
          }}
        >
          <Spin spinning={isShowSpin}>
            {collectionList?.length > 0 ? this.renderContent(currentKey) : <EmptyBox />}
            {this.total > 10 && (
              <Pagination
                style={{
                  padding: '24px 0',
                  textAlign: 'center'
                }}
                showQuickJumper
                current={this.pageIndex}
                defaultCurrent={this.pageIndex}
                total={this.total}
                onChange={this.onChangePagination}
              />
            )}
          </Spin>
        </Card>
      </div>
    )
  }

  /**
   * 渲染内容
   * @param {*} type
   * @returns
   */
  renderContent = type => {
    const { collectionList } = this.state
    switch (type) {
      // 收藏的试题
      case collectTabType.testQuestions:
        return (
          <div>
            <QuestionList list={collectionList} total={this.total} name='收藏' />
          </div>
        )
    }
  }
}
