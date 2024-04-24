import { debounce } from '@utils'
import req from '@utils/request'
import { Input, Modal, Spin, message } from 'antd'
import React, { Component, Fragment, createRef } from 'react'
import { apiName } from '../../constant'
import OptionInputBox from '../option-input-box'
import RankLabelBox from '../rank-label-box'
import RepeatContentBox from '../repeat-content-box'
import './index.less'
export default class JudgeQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectName: '', // 题目
      isDisabledSubmit: true, //是否禁止输入
      isShowModalBox: false, // 是否展示重复率弹框
      isSubmit: true // 是否支持提交
    }
  }
  // rankLabelBox = RankLabelBox | null
  rankLabelBox = createRef()
  optionInputBox = OptionInputBox | null
  currentActive = [] // 当前选中的项
  scoreValue = '' // 分数
  subjectAnalysis = '' //试题解析
  rankId = 1 //职级
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
   * 一次确认录入
   */
  onSubmit = debounce(() => {
    const { subjectName, isDisabledSubmit, isSubmit } = this.state
    if (isDisabledSubmit || !isSubmit) {
      return
    }
    this.setState({
      isSubmit: false
    })
    let params = {
      subjectName: subjectName,
      subjectDifficult: this.rankId,
      subjectType: 3,
      subjectScore: this.scoreValue,
      subjectParse: this.subjectAnalysis,
      optionList: [{ isCorrect: this.currentActive[0] }],
      categoryIds: this.secondCategoryValue.filter(item => item.active).map(t => t.id),
      labelIds: this.thirdCategoryValue.filter(item => item.active).map(t => t.id)
    }
    console.log('判断录入 ----', params)
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
      this.currentActive?.length <= 0 ||
      !!!this.firstCategoryValue ||
      this.secondCategoryValue.length <= 0 ||
      this.thirdCategoryValue.length <= 0 ||
      !!!this.scoreValue
    ) {
      isDisabledSubmit = true
    }
    return isDisabledSubmit
  }

  /**
   * 取消
   */
  onCancel = () => {
    this.currentActive = [] // 选项列表
    this.scoreValue = '' // 分数
    this.subjectAnalysis = '' //试题解析
    this.rankId = 1
    this.firstCategoryValue = '' // 一级分类的值
    this.secondCategoryValue = [] // 二级分类的值
    this.thirdCategoryValue = [] // 三级标签的值
    this.repeatInfo = {}
    this.rankLabelBox.current.initRankLabel()
    this.optionInputBox.handleClearOption()
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
    this.rankId = list[0]
    let isDisabledSubmit = this.checkData()
    this.setState({
      isDisabledSubmit
    })
  }
  /**
   * 选项操作
   * @param {*} currentActive 选项列表
   * @param {*} scoreValue 分值
   * @param {*} subjectAnalysis 解析
   */
  handleChangeOption = (currentActive, scoreValue, subjectAnalysis) => {
    this.currentActive = currentActive
    this.scoreValue = scoreValue
    this.subjectAnalysis = subjectAnalysis
    let isDisabledSubmit = this.checkData()
    this.setState({
      isDisabledSubmit
    })
  }

  render() {
    const { subjectName, isDisabledSubmit, isSubmit, isShowModalBox } = this.state
    const { questionsType } = this.props
    return (
      <Spin spinning={!isSubmit}>
        <Fragment>
          <div className='judge-questions-container'>
            <div className='judge-questions-title'>题目名称：</div>
            <Input
              placeholder='输入题目'
              style={{ height: 48, width: '100%' }}
              value={subjectName}
              maxLength={64}
              onChange={e => this.onChangeSubjectName(e)}
            />
          </div>
          <OptionInputBox
            ref={ref => {
              this.optionInputBox = ref
            }}
            isJudge={true}
            handleChangeOption={this.handleChangeOption}
          />
          <RankLabelBox
            ref={this.rankLabelBox}
            subjectName={subjectName}
            onChangeRankLabel={this.onChangeRankLabel}
            handleChangeRank={this.handleChangeRank}
          />
          <div className='judge-questions-btns-container'>
            <div className='judge-questions-btn' onClick={this.onCancel}>
              清空
            </div>
            <div
              className={`judge-questions-btn judge-questions-submit ${
                isDisabledSubmit && 'judge-questions-disabled-submit'
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
      </Spin>
    )
  }
}
