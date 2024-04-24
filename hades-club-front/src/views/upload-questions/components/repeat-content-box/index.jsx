import { Modal, Tooltip } from 'antd'
import React, { Fragment } from 'react'
import { judgeList, letterList } from '../../constant'
import './index.less'
export default function RepeatContentBox(props) {
  const { isShowModalBox, repeatInfo, repeatQuestionsType } = props
  /**
   * 确认录入
   */
  const onSubmitRepeatModal = e => {
    props.handleSubmitRepeatModal && props.handleSubmitRepeatModal()
  }
  /**
   * 取消录入
   */
  const onCancelRepeatModal = () => {
    props.handleCancelRepeatModal && props.handleCancelRepeatModal()
  }

  const renderRepeat = (type, repeatInfo) => {
    switch (type) {
      case 1:
        return renderBriefQuestions(repeatInfo)
      case 2:
      case 3:
        return renderSelectQuestions(type, repeatInfo)
      case 4:
        return renderJudgeQuestions(repeatInfo)
    }
  }

  /**
   * 展示重复内容-问答型
   * @returns
   */
  const renderBriefQuestions = repeatInfo => {
    return (
      <div className='repeat-content-box'>
        <div className='repeat-subject-box'>
          <div className='repeat-subject-title'>问答题</div>
          <div className='repeat-subject-text'>{repeatInfo.repeatSubjectName}</div>
        </div>
        <div className='repeat-subject-box'>
          <div className='repeat-subject-title'>参考答案</div>
          <div
            className='repeat-subject-text'
            dangerouslySetInnerHTML={{
              __html: repeatInfo.repeatSubjectAnswe
            }}
          ></div>
        </div>
        <div className='repeat-subject-box repeat-subject-info-box'>
          <div className='repeat-subject-title'>来自</div>
          <Tooltip title={repeatInfo.repeatSetterErp} placement='right' style={{ fontSize: 14 }}>
            {repeatInfo.repeatSetterName}
          </Tooltip>
        </div>
      </div>
    )
  }

  /**
   * 展示重复内容-单选/多选
   * @returns
   */
  const renderSelectQuestions = (type, repeatInfo) => {
    // 过滤获得正确选项
    let repeatRightKey = repeatInfo?.repeatOptionList?.filter(item => item.isCorrect === 1)
    return (
      <div className='repeat-content-box'>
        <div className='repeat-subject-box'>
          <div className='repeat-subject-title'>{type === 2 ? '单选题' : '多选题'}</div>
          <div className='repeat-subject-text'>{repeatInfo.repeatSubjectName}</div>
        </div>
        {repeatInfo?.repeatOptionList?.length > 0 && (
          <div className='repeat-subject-box'>
            <div className='repeat-subject-title'>选项内容</div>
            <div className='repeat-subject-list'>
              {repeatInfo.repeatOptionList.map((item, index) => {
                return (
                  <div className='repeat-subject-item' key={`repeat_option_${index}`}>
                    {/* <div className="repeat-subject-label">
                                            {letterList[item.optionType]}
                                        </div> */}
                    <div
                      className='repeat-subject-text'
                      dangerouslySetInnerHTML={{
                        __html: item.optionContent
                      }}
                    ></div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {repeatRightKey?.length > 0 && (
          <div className='repeat-subject-box'>
            <div className='repeat-subject-title'>答案</div>
            <div className='repeat-subject-list'>
              {repeatRightKey.map((item, index) => {
                return <span key={`repeat_answe_${index}`}>{letterList[item.optionType]} </span>
              })}
            </div>
          </div>
        )}
        {!!repeatInfo.repeatSubjectAnswe && (
          <div className='repeat-subject-box'>
            <div className='repeat-subject-title'>题目解析</div>
            <div
              className='repeat-subject-text'
              dangerouslySetInnerHTML={{
                __html: repeatInfo.repeatSubjectAnswe
              }}
            ></div>
          </div>
        )}
        <div className='repeat-subject-box repeat-subject-info-box'>
          <div className='repeat-subject-title'>来自</div>
          <Tooltip title={repeatInfo.repeatSetterErp} placement='right' style={{ fontSize: 14 }}>
            {repeatInfo.repeatSetterName}
          </Tooltip>
        </div>
      </div>
    )
  }

  /**
   * 展示重复内容-判断
   * @returns
   */
  const renderJudgeQuestions = repeatInfo => {
    return (
      <div className='repeat-content-box'>
        <div className='repeat-subject-box'>
          <div className='repeat-subject-title'>判断题</div>
          <div className='repeat-subject-text'>{repeatInfo.repeatSubjectName}</div>
        </div>
        <div className='repeat-subject-box'>
          <div className='repeat-subject-title'>答案</div>
          <div className='repeat-subject-list'>{judgeList[repeatInfo.repeatIsCorrect]}</div>
        </div>
        {!!repeatInfo.repeatSubjectAnswe && (
          <div className='repeat-subject-box'>
            <div className='repeat-subject-title'>题目解析</div>
            <div
              className='repeat-subject-text'
              dangerouslySetInnerHTML={{
                __html: repeatInfo.repeatSubjectAnswe
              }}
            ></div>
          </div>
        )}
        <div className='repeat-subject-box repeat-subject-info-box'>
          <div className='repeat-subject-title'>来自</div>
          <Tooltip title={repeatInfo.repeatSetterErp} placement='right' style={{ fontSize: 14 }}>
            {repeatInfo.repeatSetterName}
          </Tooltip>
        </div>
      </div>
    )
  }

  return (
    <Modal
      className='repeat-content-repeat-box'
      open={isShowModalBox}
      title={
        <Fragment>
          <span
            style={{
              color: 'rgba(60, 110, 238, 0.8)',
              fontSize: 50,
              marginRight: 10
            }}
          >
            {repeatInfo.repeatRate || '10%'}
          </span>
          重复率
        </Fragment>
      }
      onOk={onSubmitRepeatModal}
      onCancel={onCancelRepeatModal}
      okText='确认录入'
      cancelText='取消录入'
    >
      {renderRepeat(repeatQuestionsType, repeatInfo)}
    </Modal>
  )
}
