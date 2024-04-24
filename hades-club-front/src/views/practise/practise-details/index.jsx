import Timer from '@components/timerCom/FlipClock'
import { getCurrentTime } from '@utils'
import req from '@utils/request'
import { Checkbox, Modal, Radio } from 'antd'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PracticeAction from './components/practise-action'
import PracticeAdvance from './components/practise-advance'
import PracticePaging from './components/practise-paging'
import { ApiName, ImgObj, quetionsType } from './constant'
import './index.less'

const PracticeDetails = props => {
  const navigate = useNavigate()
  const { setId } = useParams()
  const [isMark, setIsMark] = useState(0) // 是否标记
  const [currentActive, setCurrentActive] = useState('')
  const [subjectList, setSubjectList] = useState([])
  const [subjectObject, setSubjectObject] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShowAdvanOverceBox, setIsShowAdvanOverceBox] = useState(false)
  const [isShowStopBox, setIsShowStopBox] = useState(false)
  const [subjectInfo, setSubjectInfo] = useState({
    practiceId: null,
    subjectTitle: '热门题目练习',
    singleLength: 0,
    multipleLength: 0,
    judgeLength: 0
  })

  const timerRef = React.createRef()

  const isLast = currentIndex === subjectList?.length - 1

  /**
   * 获得题目列表
   */
  const getSubjectList = () => {
    let params = {
      setId
    }
    req(
      {
        method: 'post',
        data: params,
        url: ApiName.getSubjects
      },
      '/practice'
    )
      .then(res => {
        if (res.data && res.data?.subjectList?.length > 0) {
          const { subjectList, title, practiceId } = res.data
          setSubjectInfo({
            practiceId,
            subjectTitle: title,
            singleLength: subjectList.filter(item => item.subjectType === 1).length,
            multipleLength: subjectList.filter(item => item.subjectType === 2).length,
            judgeLength: subjectList.filter(item => item.subjectType === 3).length
          })
          getPracticeSubject(subjectList[0], subjectList, 0, [])
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    timerRef.current.run()
    getSubjectList()
  }, [])

  /**
   * 获得题目详情
   * @param {*} item 选择的项
   * @param {*} subjectList 题目列表
   * @param {*} index 选择的下标
   * @param {*} activeList 选中的列表
   * @param {*} isMark 是否被标记
   */
  const getPracticeSubject = (item, subjectList, index, activeList, isMark = 0) => {
    let params = {
      subjectId: item.subjectId,
      subjectType: item.subjectType
    }
    req(
      {
        method: 'post',
        data: params,
        url: ApiName.getPracticeSubject
      },
      '/practice'
    )
      .then(res => {
        if (res.data) {
          let subjectObject = res.data
          if (subjectObject.subjectType === 3) {
            subjectObject.optionList = [
              {
                optionContent: '正确',
                optionType: 1
              },
              {
                optionContent: '错误',
                optionType: 0
              }
            ]
          }
          setCurrentActive(subjectObject.subjectType === 2 ? activeList : activeList[0])
          setCurrentIndex(index)
          setSubjectObject({ ...subjectObject, isMark })
          setSubjectList(subjectList)
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 选择单选
   * @param {*} e
   * @returns
   */
  const onChangeRadio = e => () => {
    const list = [...subjectList]
    _.set(list, [currentIndex, 'activeList'], [e])
    setCurrentActive(e)
    setSubjectList([...list])
  }

  /**
   * 选择多选
   * @param {*} e
   * @returns
   */
  const onChangeCheck = e => {
    const list = [...subjectList]
    _.set(list, [currentIndex, 'activeList'], e)
    setCurrentActive(e)
    setSubjectList([...list])
  }

  /**
   * 暂停计时
   */
  const onChangeStop = () => {
    setIsShowStopBox(true)
    timerRef.current.stop()
  }

  /**
   * 标记一下
   */
  const onChangeMark = () => {
    const list = [...subjectList]
    let flag = 1
    if (list[currentIndex]?.isMark) {
      flag = 0
    }
    _.set(list, [currentIndex, 'isMark'], flag)
    setSubjectList([...list])
    setIsMark(flag)
  }

  /**
   * 选择答题卡
   * @param {*} index
   * @param {*} item
   * @returns
   */
  const onChangePaging = index => {
    // 如果点击当前题目，直接return
    if (currentIndex === index) {
      return
    }
    changeData(index)
  }

  /**
   * 交卷
   */
  const onChangeOver = () => {
    timerRef.current.end()
    let params = {
      setId,
      practiceId: subjectInfo.practiceId,
      timeUse: timerRef.current.getUseTime(),
      submitTime: getCurrentTime()
    }
    req(
      {
        method: 'post',
        data: params,
        url: ApiName.submit
      },
      '/practice'
    )
      .then(res => {
        if (res.success) {
          //关闭定时器
          timerRef.current.end()
          navigate('/practise-analytic/' + subjectInfo.practiceId, { replace: true })
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 提前交卷弹框-直接交卷
   */
  const onHandleSubmitModal = () => {
    onChangeOver()
  }

  /**
   * 提前交卷弹框-继续做题
   */
  const onHandleCancelModal = () => {
    setIsShowAdvanOverceBox(false)
  }

  /**
   * 提前交卷
   */
  const onChangeAdvanceOver = () => {
    setIsShowAdvanOverceBox(true)
  }

  /**
   * 下一题
   * @returns
   */
  const onChangeNext = () => {
    console.log(subjectList)
    const { subjectId, subjectType, activeList } = subjectList[currentIndex]

    let params = {
      practiceId: subjectInfo.practiceId,
      timeUse: timerRef.current.getUseTime(),
      subjectId: subjectId,
      subjectType: subjectType,
      answerContents: activeList
    }
    req(
      {
        method: 'post',
        data: params,
        url: ApiName.submitSubject
      },
      '/practice'
    )
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    setCurrentIndex(currentIndex + 1)
    changeData(currentIndex + 1)
  }

  /**
   * 改变数据
   * @param {*} index 当前点击下标
   */
  const changeData = index => {
    const list = [...subjectList]
    let subObj = list[index]
    let activeList = [] // 多选 选中的答案项
    let isMark = 0 // 是否被标记

    // 将其他item设置为未选中
    list.forEach(item => {
      item.active = false
    })
    _.set(list, [index, 'active'], true)

    // if当前选择的有选答案，则直接显示出来
    if (subObj?.activeList?.length > 0) {
      activeList = subObj?.activeList
    }

    // if当前已被标记，则直接显示出来
    if (subObj?.isMark == 1) {
      isMark = 1
    }

    getPracticeSubject(subObj, list, index, activeList, isMark)
  }

  /**
   * 暂停弹框-继续做题
   */
  const onChangeSubmitModal = () => {
    timerRef.current.run()
    setIsShowStopBox(false)
  }

  /**
   * 暂停弹框-再次再做
   */
  const onChangeCancelModal = () => {
    navigate(-1)
  }

  const noAnswerNum =
    subjectList.filter(item => item.activeList && item.activeList.length > 0).length || 0

  return (
    <div className='details-container'>
      <div className='container-box'>
        <div className='container-box-title'>
          <div className='title-title'>{subjectInfo.subjectTitle}</div>
          <div className='title-time'>
            <div className='title-timer-img' onClick={onChangeStop}>
              <img src={isShowStopBox ? ImgObj.stop : ImgObj.run} className='title-timer-icon' />
            </div>
            <Timer ref={timerRef} />
          </div>
        </div>
        <div className='details-question-number'>
          <div className='question-number-number'>
            {currentIndex + 1}/{subjectList?.length}
          </div>
          <img src={ImgObj.questionMark} className='question-number-mark' />
          <div className='question-number-type'>[{quetionsType[subjectObject.subjectType]}]</div>
        </div>
        <div className='practice-main'>
          <div className='practice-text'>
            <div className='practice-question'>{subjectObject.subjectName}</div>
            {subjectObject.subjectType === 2 ? (
              <Checkbox.Group
                className='practice-answer-list'
                onChange={onChangeCheck}
                value={currentActive || []}
                key={currentIndex}
              >
                {subjectObject?.optionList?.length > 0 &&
                  subjectObject?.optionList.map(item => {
                    return (
                      <Checkbox
                        key={item.optionType}
                        className={`practice-answer-item ${
                          currentActive.includes(item.optionType)
                            ? 'practice-answer-item-active'
                            : ''
                        }`}
                        value={item.optionType}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.optionContent
                          }}
                        ></div>
                      </Checkbox>
                    )
                  })}
              </Checkbox.Group>
            ) : (
              <Radio.Group
                className='practice-answer-list'
                value={currentActive}
                key={currentIndex}
              >
                {subjectObject?.optionList?.length > 0 &&
                  subjectObject?.optionList.map(item => {
                    return (
                      <Radio
                        key={item.optionType}
                        onClick={onChangeRadio(item.optionType)}
                        className={`practice-answer-item ${
                          currentActive === item.optionType ? 'practice-answer-item-active' : ''
                        }`}
                        value={item.optionType}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.optionContent
                          }}
                        ></div>
                      </Radio>
                    )
                  })}
              </Radio.Group>
            )}
          </div>
          <PracticeAction
            isLast={isLast}
            isMark={isMark}
            onHandleMark={onChangeMark}
            onHandleOver={onChangeOver}
            onHandleAdvanceOver={onChangeAdvanceOver}
            onHandleNext={onChangeNext}
          />
        </div>
        <PracticePaging
          subjectList={subjectList}
          onHandlePaging={onChangePaging}
          singleLength={subjectInfo.singleLength}
          multipleLength={subjectInfo.multipleLength}
          judgeLength={subjectInfo.judgeLength}
        />
      </div>
      <PracticeAdvance
        isShowModalBox={isShowAdvanOverceBox}
        onHandleSubmitModal={onHandleSubmitModal}
        onHandleCancelModal={onHandleCancelModal}
      />
      <Modal
        closable={false}
        maskClosable={false}
        style={{ padding: 20 }}
        open={isShowStopBox}
        onOk={onChangeSubmitModal}
        onCancel={onChangeCancelModal}
        okText='继续做题'
        cancelText='下次再做'
      >
        <div style={{ padding: 40 }}>
          <img src={ImgObj.info} className='details-container-box-info' />
          休息一下吧！共{subjectList?.length}道题，还剩
          {subjectList?.length - noAnswerNum}道没做哦～
        </div>
      </Modal>
    </div>
  )
}
export default PracticeDetails
