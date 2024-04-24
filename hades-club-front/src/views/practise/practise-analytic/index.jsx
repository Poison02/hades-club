import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AnswerAnalysis from './components/answer-analysis'
import AssessmentReport from './components/assessment-report'
import { ModuleName } from './constant'
import './index.less'

const { TabPane } = Tabs

const practiceAnalyticTabList = [
  { tab: '评估报告', key: ModuleName.assessment },
  { tab: '答案解析', key: ModuleName.analysis }
]

const PracticeAnalytic = () => {
  const [currentKey, setCurrentKey] = useState(ModuleName.assessment)
  const { id } = useParams()

  /**
   * 切换card tab
   * @param {*} key
   */
  const onTabChange = key => {
    setCurrentKey(key)
  }
  return (
    <div className='practice-analytic-box'>
      <Tabs
        size='default'
        type='card'
        style={{ width: '100%' }}
        activeKey={currentKey}
        defaultActiveKey={currentKey}
        tabBarStyle={{
          height: '41px',
          background: '#fff',
          borderBottom: '1px solid #1890ff',
          margin: 0
        }}
        onChange={onTabChange}
      >
        {practiceAnalyticTabList.map(item => {
          return <TabPane tab={item.tab} key={item.key}></TabPane>
        })}
      </Tabs>
      {currentKey == ModuleName.assessment ? (
        <AssessmentReport onHandleAnswerAnalysis={onTabChange} practiceId={id} />
      ) : (
        <AnswerAnalysis practiceId={id} />
      )}
    </div>
  )
}

export default PracticeAnalytic
