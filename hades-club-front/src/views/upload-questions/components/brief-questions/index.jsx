import { Input, Modal, message } from 'antd'
import React, { Component, Fragment, createRef } from 'react'

import { debounce } from '@utils'
import req from '@utils/request'
import { apiName } from '../../constant'
import QuestionEditor from '../question-editor'
import RankLabelBox from '../rank-label-box'
import RepeatContentBox from '../repeat-content-box'
import './index.less'

export default class BriefQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectName: '', // 题目
      isDisabledSubmit: true, //是否禁止输入
      isShowModalBox: false, // 是否展示重复率弹框
      isSubmit: true // 是否支持提交
    }
  }
  kindEditor = createRef()
  rankLabelBox = createRef()
  rankId = 1 //职级
  subjectAnswer = '' // 答案
  firstCategoryValue = '' // 一级分类的值
  secondCategoryValue = [] // 二级分类的值
  thirdCategoryValue = [] // 三级标签的值
  repeatInfo = {} // 重复率

  /**
   * 输入题目
   * @param {*} e
   */
  onChangeSubjectName = e => {
    let str = e.target.value.trim()
    this.setState(
      {
        subjectName: str
      },
      () => {
        // this.rankLabelBox.getThirdCategoryList();
        let isDisabledSubmit = this.checkData()
        this.setState({
          isDisabledSubmit
        })
      }
    )
  }

  /**
   * 富文本编辑器
   * @param {*} e
   */
  onChangeEditor = e => {
    this.subjectAnswer = e
    let isDisabledSubmit = this.checkData()
    this.setState({
      isDisabledSubmit
    })
  }

  /**
   * 一次确认录入
   */
  onSubmit = debounce(() => {
    console.log(this.rankId)
    const { subjectName, isDisabledSubmit, isSubmit } = this.state
    if (isDisabledSubmit || !isSubmit) {
      return
    }
    if (!isSubmit) {
      return
    }
    if (!!!subjectName) {
      message.warning('请输入题目名称')
      return
    }
    if (!!!this.subjectAnswer) {
      message.warning('请输入题目答案')
      return
    }
    if (!!!this.firstCategoryValue) {
      message.warning('请选择一级分类')
      return
    }
    if (this.secondCategoryValue.length <= 0) {
      message.warning('请选择二级分类')
      return
    }
    if (this.thirdCategoryValue.length <= 0) {
      message.warning('请选择三级标签')
      return
    }
    this.setState({
      isSubmit: false
    })
    let params = {
      subjectName: subjectName,
      subjectDifficult: this.rankId,
      subjectType: 4,
      subjectScore: 1,
      subjectParse: '解析什么',
      subjectAnswer: this.subjectAnswer,
      categoryIds: this.secondCategoryValue.filter(item => item.active).map(t => t.id),
      labelIds: this.thirdCategoryValue.filter(item => item.active).map(t => t.id)
    }
    req({
      method: 'post',
      data: params,
      url: apiName.add
    })
      .then(res => {
        this.setState(
          {
            isSubmit: true
          },
          () => {
            this.successModalConfirm()
          }
        )
      })
      .catch(err => {
        this.setState({
          isSubmit: true
        })
        console.log(err)
      })
  })

  /**
   * 校验是否支持点击按钮
   * @returns
   */
  checkData = () => {
    const { subjectName } = this.state
    let isDisabledSubmit = false
    if (
      !!!subjectName ||
      !!!this.subjectAnswer ||
      !!!this.firstCategoryValue ||
      this.secondCategoryValue.length <= 0
      //  ||
      // this.thirdCategoryValue.length <= 0
    ) {
      isDisabledSubmit = true
    }
    return isDisabledSubmit
  }

  /**
   * 取消
   */
  onCancel = () => {
    this.subjectAnswer = '' // 答案
    this.rankId = 1
    this.firstCategoryValue = ''
    this.secondCategoryValue = []
    this.thirdCategoryValue = []
    this.repeatInfo = {}
    this.kindEditor.current.onClear()
    this.rankLabelBox.current.initRankLabel()
    this.setState({
      subjectName: '',
      isShowModalBox: false,
      isSubmit: true // 是否支持提交
    })
  }

  /**
   * 重复率弹框-确认录入
   */
  onSubmitRepeatModal = debounce(
    () => {
      let params = {
        docId: this.repeatInfo.repeatDocId
      }
      req({
        method: 'post',
        data: params,
        url: apiName.addRepeatInterviewSubject
      })
        .then(res => {
          if (res.data) {
            this.successModalConfirm()
          } else {
            message.info('请再次确认')
          }
        })
        .catch(err => {
          console.log(err)
          message.error('请再次确认')
        })
    },
    300,
    true
  )

  /**
   * 重复率弹框-取消录入
   */
  onCancelRepeatModal = () => {
    this.repeatInfo = {}
    this.setState({
      isShowModalBox: false
    })
  }

  /**
   * 录入成功的弹框
   */
  successModalConfirm = () => {
    Modal.confirm({
      title: (
        <div
          style={{
            textAlign: 'center',
            color: 'rgba(60, 110, 238, 1)',
            fontSize: 16
          }}
        >
          录入成功！贡献榜火力值 + 1
        </div>
      ),
      closable: false,
      maskClosable: false,
      icon: ' ',
      onOk: this.onAgainSuccessModal,
      onCancel: this.onGoHomeSuccessModal,
      okText: '再录一题',
      cancelText: '去首页',
      className: 'questions-success-modal-confirm'
    })
  }

  /**
   * 录入成功弹框-再来一题
   */
  onAgainSuccessModal = () => {
    this.onCancel()
  }

  /**
   * 录入成功弹框-去首页
   */
  onGoHomeSuccessModal = () => {
    window.location.href = '/question-bank'
  }

  /**
   * 分类选择
   * @param {*} e
   */
  onChangeRankLabel = (firstCategoryValue, secondCategoryValue, thirdCategoryValue) => {
    this.firstCategoryValue = firstCategoryValue // 一级分类的值
    this.secondCategoryValue = secondCategoryValue // 二级分类的值
    this.thirdCategoryValue = thirdCategoryValue // 三级标签的值
    let isDisabledSubmit = this.checkData()
    this.setState({
      isDisabledSubmit
    })
  }

  /**
   * 职级选择
   * @param {*} list
   */
  handleChangeRank = list => {
    this.rankId = list[0].categoryId
    let isDisabledSubmit = this.checkData()
    this.setState({
      isDisabledSubmit
    })
  }

  render() {
    const { subjectName, isDisabledSubmit, isSubmit, isShowModalBox } = this.state
    const { questionsType } = this.props
    // this.successModalConfirm();

    return (
      // <Spin spinning={!isSubmit}>
      <Fragment>
        <div className='brief-questions-container'>
          <div className='brief-questions-title'>题目名称：</div>
          <div className='brief-questions-main'>
            <Input
              placeholder='输入题目'
              className='brief-questions-input'
              value={subjectName}
              maxLength={64}
              onChange={this.onChangeSubjectName}
            />
          </div>
        </div>
        <div className='brief-questions-container'>
          <div className='brief-questions-title'>题目答案：</div>
          {this.reanderAnser()}
        </div>
        <RankLabelBox
          subjectName={subjectName}
          onChangeRankLabel={this.onChangeRankLabel}
          handleChangeRank={this.handleChangeRank}
          ref={this.rankLabelBox}
        />
        <div className='brief-questions-btns-container'>
          <div className='brief-questions-btn' onClick={this.onCancel}>
            清空
          </div>
          <div
            className={`brief-questions-btn brief-questions-submit ${
              isDisabledSubmit && 'brief-questions-disabled-submit'
            }`}
            onClick={this.onSubmit}
          >
            提交
          </div>
        </div>
        <RepeatContentBox
          isShowModalBox={isShowModalBox}
          repeatQuestionsType={questionsType}
          repeatInfo={this.repeatInfo}
          handleSubmitRepeatModal={this.onSubmitRepeatModal}
          handleCancelRepeatModal={this.onCancelRepeatModal}
        />
      </Fragment>
      // {/* </Spin> */}
    )
  }

  /**
   * 问答题-答案
   */
  reanderAnser = () => {
    return (
      <div className='brief-questions-main'>
        <QuestionEditor onChange={this.onChangeEditor} ref={this.kindEditor} />
      </div>
    )
  }
}
