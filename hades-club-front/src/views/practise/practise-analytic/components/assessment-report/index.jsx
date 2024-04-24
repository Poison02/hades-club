import AnalysisAtlas from '@components/analysis-atlas'
import { splicingQuery } from '@utils'
import req from '@utils/request'
import { Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiName, ModuleName } from '../../constant'
import RecommendList from '../recommend-list'

import './index.less'

const AssessmentReport = props => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('测试试卷')
  const [correctSubject, setCorrectSubject] = useState('3')
  const [spinning, setSpinning] = useState(false)
  const [recommendSetList, setRecommendSetList] = useState([])
  const [skill, setSkill] = useState([])

  useEffect(() => {
    getReport()
  }, [props.practiceId])

  /**
   * 答案解析-获得评估报告
   */
  const getReport = async () => {
    const { practiceId } = props
    let params = {
      practiceId
    }
    await req(
      {
        method: 'post',
        data: params,
        url: ApiName.getReport
      },
      '/practice'
    )
      .then(res => {
        if (res?.data) {
          const { skill, correctSubject, title } = res.data
          let list = skill || []
          let len = skill.length
          if (len === 1) {
            let l1 = [
              { name: skill[0].name + ' ', star: skill[0].star },
              {
                name: ' ' + skill[0].name + ' ',
                star: skill[0].star
              }
            ]
            list = list.concat(l1)
          } else if (len === 2) {
            let l1 = [{ name: skill[1].name + ' ', star: skill[1].star }]
            list = list.concat(l1)
          }
          setSkill(list)
          setCorrectSubject(correctSubject)
          setTitle(title)
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 练习其他技能
   */
  const onChangePracticeOther = () => {
    navigate('/practise-questions')
  }

  /**
   * 查看答案解析
   */
  const onChangeAnswerAnalysis = () => {
    props.onHandleAnswerAnalysis && props.onHandleAnswerAnalysis(ModuleName.analysis)
  }

  /**
   * 点击推荐套题
   * @param {*} setId
   * @returns
   */
  const onChangeSetId = setId => {
    this.props.history.push(
      splicingQuery('/practise-details', {
        setId
      })
    )
  }

  return (
    <Spin spinning={spinning}>
      <div className='assessment-report-box'>
        <div className='assessment-report-top'>
          <div className='assessment-report-main'>
            <div className='assessment-report-item'>试卷：{title}</div>
            <div className='assessment-report-item'>正确题数：{correctSubject}</div>
            <Button
              className='assessment-report-submit'
              type='primary'
              onClick={onChangePracticeOther}
            >
              练习其他技能
            </Button>
          </div>
          <div className='assessment-report-tupu'>
            <div className='assessment-report-tupu-tip'>你的技能图谱</div>
            <div className='assessment-report-tupu-content'>
              <AnalysisAtlas
                aliasStr='正确率'
                atlasList={skill || []}
                atlasMin={-25}
                atlasWidth={200}
                atlasHeight={200}
              />
            </div>
          </div>
        </div>
        {recommendSetList?.length > 0 && (
          <RecommendList recommendSetList={recommendSetList} onHandleSetId={onChangeSetId} />
        )}
        <div className='assessment-report-answer-analysis'>
          <Button
            className='assessment-report-answer-btn'
            type='primary'
            onClick={onChangeAnswerAnalysis}
          >
            查看答案解析
          </Button>
        </div>
      </div>
    </Spin>
  )
}

export default AssessmentReport
