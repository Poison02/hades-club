import req from '@utils/request'
import { Spin } from 'antd'
import React, { Component } from 'react'
import { ApiName, IdKeyLetterKey } from '../../constant'
import './index.less'

export default class AnswerAnalysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectList: [], // 题目列表
      subjectName: '',
      optionList: [], // 选项列表
      labelNames: '', // 标签列表
      respondAnswer: [], // 你的答案
      subjectParse: '', // 解析
      correctAnswer: [], // 正确答案
      currentIndex: 0, // 当前选中的下标
      isLoading: false
    }
  }

  componentDidMount() {
    this.getScoreDetail()
  }

  /**
   * 答案解析-获得题目列表
   */
  getScoreDetail = () => {
    const { practiceId } = this.props
    let params = {
      practiceId: practiceId
    }
    req(
      {
        method: 'post',
        data: params,
        url: ApiName.getScoreDetail
      },
      '/practice'
    )
      .then(res => {
        if (res?.data && res?.data?.length > 0) {
          this.setState(
            {
              subjectList: res.data
            },
            () => {
              this.getSubjectDetail(0, res.data[0])
            }
          )
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 答案解析-获得答案详情
   * @param {*} index 当前index
   * @param {*} subjectItem 当前item
   */
  getSubjectDetail = (index, subjectItem) => {
    const { practiceId } = this.props
    let params = {
      practiceId: practiceId,
      subjectId: subjectItem.subjectId,
      subjectType: subjectItem.subjectType
    }
    req(
      {
        method: 'post',
        data: params,
        url: ApiName.getSubjectDetail
      },
      '/practice'
    )
      .then(res => {
        if (res.data) {
          let respondAnswer = res.data.respondAnswer
          let optionList = []
          res.data.optionList.forEach(element => {
            let obj = {
              isCorrect: element.isCorrect,
              optionContent: element.optionContent,
              optionType: element.optionType,
              isAnswer: 0
            }
            if (respondAnswer.includes(element.optionType)) {
              obj.isAnswer = 1
            }
            optionList.push(obj)
          })
          this.setState({
            isLoading: false,
            currentIndex: index,
            subjectName: res.data.subjectName,
            optionList: optionList, // 选项列表
            labelNames: res.data.labelNames, // 标签列表
            respondAnswer: respondAnswer, // 你的答案
            subjectParse: res.data.subjectParse, // 解析
            correctAnswer: res.data.correctAnswer // 正确答案
          })
        }
      })
      .catch(err => console.log(err))
  }

  onChangeOption = (index, item) => () => {
    let { currentIndex } = this.state
    if (index === currentIndex) {
      return
    }
    this.getSubjectDetail(index, item)
  }

  render() {
    const {
      subjectList,
      subjectName,
      optionList,
      labelNames,
      respondAnswer,
      subjectParse,
      correctAnswer,
      currentIndex,
      isLoading
    } = this.state
    const isRight = correctAnswer.join('') !== respondAnswer.join('')
    return (
      <Spin spinning={isLoading}>
        <div className='answer-analysis-box'>
          {subjectList?.length > 0 && (
            <div className='answer-analysis-paging'>
              <div className='answer-analysis-paging-tip'>每题得分</div>
              <div className='answer-analysis-paging-list'>
                {subjectList.map((item, index) => {
                  return (
                    <div
                      className={`answer-analysis-paging-item ${
                        item.isCorrect === 1 ? 'answer-analysis-rigth' : 'answer-analysis-error'
                      } ${currentIndex == index ? 'answer-analysis-paging-item-active' : ''}`}
                      onClick={this.onChangeOption(index, item)}
                      key={`${item.subjectId}_${index}`}
                    >
                      {index + 1}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <div className='answer-analysis-name'>
            <div className='answer-analysis-name-num'>{currentIndex + 1}</div>
            <div className='answer-analysis-name-text'>{subjectName}</div>
          </div>
          <div className='answer-analysis-answer'>
            正确答案：
            {correctAnswer?.length > 0
              ? correctAnswer.map((item, index) => {
                  return <span key={`correct_answer_${index}`}>{IdKeyLetterKey[item] + ' '}</span>
                })
              : '空'}
            你的答案：
            {respondAnswer?.length > 0
              ? respondAnswer.map((item, index) => {
                  return <span key={`respond_answer_${index}`}>{IdKeyLetterKey[item] + ' '}</span>
                })
              : '空'}
            <span style={isRight ? { color: '#ff431e' } : { color: 'rgba(60, 110, 238, 1)' }}>
              &nbsp;({isRight ? '错误' : '正确'})
            </span>
          </div>
          {optionList?.length > 0 && (
            <div className='answer-analysis-option-list'>
              {optionList.map((item, index) => {
                return (
                  <div
                    key={`option_${index}`}
                    className={`answer-analysis-option-item ${
                      item.isCorrect === 1
                        ? 'answer-analysis-option-item-rigth'
                        : item.isAnswer === 1
                        ? 'answer-analysis-option-item-error'
                        : ''
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: item.optionContent
                    }}
                  ></div>
                )
              })}
            </div>
          )}
          {labelNames?.length > 0 && (
            <div className='answer-analysis-points'>
              <div className='answer-analysis-points-tip'>本题知识点</div>
              <div className='answer-analysis-points-list'>
                {labelNames.map((item, index) => {
                  return (
                    <div
                      key={`answer_analysis_points_${index}`}
                      className='answer-analysis-points-item'
                    >
                      {item}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {!!subjectParse && (
            <div className='answer-analysis-parse'>
              <div className='answer-analysis-parse-tip'>参考解析</div>
              <div className='answer-analysis-parse-text'>{subjectParse}</div>
            </div>
          )}
        </div>
      </Spin>
    )
  }
}
