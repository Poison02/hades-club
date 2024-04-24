import { ClockCircleTwoTone, ContainerTwoTone, SnippetsTwoTone } from '@ant-design/icons'
import { Button, Card, Checkbox, Pagination, Table } from 'antd'
import React, { Component } from 'react'
import './index.less'

export default class BrushQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: 'tab1', //选中的tab
      lookFinish: false, //是否只看已完成，默认否
      total: 9
    }
  }
  pageIndex = 1
  tabList = [
    {
      key: 'tab1',
      tab: '试卷'
    },
    {
      key: 'tab2',
      tab: '错题集'
    }
  ]

  columns = [
    {
      title: '题目',
      dataIndex: 'question',
      key: 'qusetion',
      render: text => <a>{text}</a>
    },
    {
      title: '知识点',
      dataIndex: 'knowledge',
      key: 'knowledge'
    },
    {
      title: '来自',
      dataIndex: 'from',
      key: 'from'
    },
    {
      title: () => <Checkbox onChange={this.onLookErrorChange}>只看已完成的</Checkbox>,
      key: 'tags',
      dataIndex: 'tags',
      render: () => <Button type='primary'>查看详情</Button>
    }
  ]

  data = [
    {
      key: '1',
      question: '在哈希法存储中，冲突指的是 （ ）',
      knowledge: '哈希',
      from: '考卷1'
      // tags: ['nice', 'developer'],
    },
    {
      key: '2',
      question: '在深度为5的满二叉树中，结点的个数为多少个？',
      knowledge: '树',
      from: '考卷2'
      // tags: ['loser'],
    }
  ]

  onTabChange = key => {
    console.log('----', key)
    this.setState({
      currentKey: key
    })
  }
  onLookChange = () => {
    this.setState({
      lookFinish: true
    })
  }
  onLookErrorChange = key => {
    console.log('----', key)
  }
  handleNext() {
    console.log('再做一次')
  }
  handleLook() {
    console.log('查看详情')
  }
  onChangePagination = pageIndex => {
    this.pageIndex = pageIndex
  }
  render() {
    const { currentKey, total } = this.state
    return (
      <div className='brush-question-component'>
        <Card
          style={{ width: '100%' }}
          tabList={this.tabList}
          bordered={false}
          activeTabKey={currentKey}
          onTabChange={key => {
            this.onTabChange(key, 'key')
          }}
        >
          {currentKey === 'tab1' && (
            <div>
              <div className='brush-question-component-tab1-head'>
                <div className='brush-question-component-tab1-head-title'>
                  <div className='brush-question-component-tab1-head-title-icon'>
                    <SnippetsTwoTone twoToneColor='#FF0000' />
                  </div>
                  <div>练习的试卷（21）</div>
                </div>
                <div className='brush-question-component-tab1-head-filter'>
                  <Checkbox onChange={this.onLookChange}>只看已完成的</Checkbox>
                </div>
              </div>
              <div className='brush-question-component-tab1-body'>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                  <div className='brush-question-component-tab1-body-item'>
                    <div style={{ backgroundColor: 'rgb(234, 235, 236)' }}>
                      <div className='brush-question-component-tab1-body-label'>专项练习</div>
                      <div className='brush-question-component-tab1-body-item-title'>
                        计算机专业技能-网络基础专项练习
                      </div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ClockCircleTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>完成时间：2021-12-13</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-content'>
                      <div className='brush-question-component-tab1-body-item-content-icon'>
                        <ContainerTwoTone twoToneColor='#AAAAAA' />
                      </div>
                      <div>得分：0</div>
                    </div>
                    <div className='brush-question-component-tab1-body-item-footer'>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleNext}
                      >
                        再做一次
                      </div>
                      <div
                        className='brush-question-component-tab1-body-item-footer-button'
                        onClick={this.handleLook}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                </div>

                <div className='brush-question-component-tab1-page'>
                  {total > 8 && (
                    <Pagination
                      style={{
                        padding: '24px 0',
                        textAlign: 'center'
                      }}
                      showQuickJumper
                      current={this.pageIndex}
                      defaultCurrent={1}
                      total={total}
                      defaultPageSize={8}
                      onChange={this.onChangePagination}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {currentKey === 'tab2' && (
            <div>
              <div className='brush-question-component-tab2-head'>
                <div className='brush-question-component-tab2-head-title'>
                  <div className='brush-question-component-tab2-head-title-icon'>
                    <SnippetsTwoTone twoToneColor='#FF0000' />
                  </div>
                  <div>历史错题总数（21）</div>
                </div>
                <div className='brush-question-component-tab2-head-button'>
                  <Button type='primary'>错题组卷练习</Button>
                </div>
              </div>
              <div className='brush-question-component-tab2-body'>
                <Table columns={this.columns} dataSource={this.data} />
              </div>
            </div>
          )}
        </Card>
      </div>
    )
  }
}
