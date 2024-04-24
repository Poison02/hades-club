import { debounce } from '@utils'
import req from '@utils/request'
import { Input, Modal, Spin, message } from 'antd'
import React, { Component, Fragment, createRef } from 'react'
import { apiName } from '../../constant'
import OptionInputBox from '../option-input-box'
import RankLabelBox from '../rank-label-box'
import RepeatContentBox from '../repeat-content-box'
import './index.less'
const defalutLabel = '请使用富文本编辑器输入选项内容'
export default class SingleQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subjectName: '', // 题目
      isDisabledSubmit: true, //是否禁止输入
      isShowModalBox: false, // 是否展示重复率弹框
      isSubmit: true // 是否支持提交
    }
  }
  rankLabelBox = createRef()

  optionInputBox = OptionInputBox | null

  currentActive = [] // 选项列表
  scoreValue = '' // 分数
  subjectAnalysis = '' //试题解析
  rankId = 1 //职级
  subjectAnswer = '' // 选项内容

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
    if (!isSubmit) {
      return
    }
    if (!!!subjectName) {
      message.warning('请输入题目名称')
      return
    }
    if (!this.currentActive.length) {
      message.warning('请录入答案')
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
      subjectType: 1,
      subjectScore: this.scoreValue,
      subjectParse: this.subjectAnalysis,
      categoryIds: this.secondCategoryValue.filter(item => item.active).map(t => t.id),
      labelIds: this.thirdCategoryValue.filter(item => item.active).map(t => t.id),
      optionList: this.currentActive
    }
    req({
      method: 'post',
      data: params,
      url: apiName.add
    })
      .then(res => {
        // this.repeatInfo = {}
        // if (res.data && res.data.insertStatus) {
        //   this.setState(
        //     {
        //       isSubmit: true
        //     },
        //     () => {
        //       this.successModalConfirm()
        //     }
        //   )
        // } else if (!res.data.insertStatus) {
        //   this.repeatInfo = {
        //     repeatDocId: res.data.docId, // 重复题目id
        //     repeatRate: res.data.repeatRate, // 重复率
        //     repeatSubjectName: res.data.subjectName, // 重复题目
        //     repeatOptionList: res.data.optionList, // 重复列表项
        //     repeatSetterErp: res.data.subjectSetterErp, // 出题人erp
        //     repeatSetterName: res.data.subjectSetterName // 出题人姓名
        //   }
        //   this.setState({
        //     isShowModalBox: true,
        //     isSubmit: true
        //   })
        // }
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
    let list = this.currentActive.filter(item => item.optionContent === defalutLabel)
    let isDisabledSubmit = false
    if (
      !!!subjectName ||
      list.length > 0 ||
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
    this.subjectAnswer = '' // 选项内容
    this.firstCategoryValue = '' // 一级分类的值
    this.secondCategoryValue = [] // 二级分类的值
    this.thirdCategoryValue = [] // 三级标签的值
    this.rankLabelBox.current.initRankLabel()
    this.optionInputBox.handleClearOption()
    this.repeatInfo = {}
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
          <div className='single-questions-container'>
            <div className='single-questions-title'>题目名称：</div>
            <Input
              placeholder='输入题目'
              style={{ height: 48, width: '100%' }}
              value={subjectName}
              maxLength={64}
              onChange={e => this.onChangeSubjectName(e)}
            />
          </div>
          <OptionInputBox
            key='single-option-input'
            ref={ref => {
              this.optionInputBox = ref
            }}
            handleChangeOption={this.handleChangeOption}
          />
          <RankLabelBox
            ref={this.rankLabelBox}
            subjectName={subjectName}
            onChangeRankLabel={this.onChangeRankLabel}
            handleChangeRank={this.handleChangeRank}
          />
          <div className='single-questions-btns-container'>
            <div className='single-questions-btn' onClick={this.onCancel}>
              清空
            </div>
            <div
              className={`single-questions-btn single-questions-submit ${
                isDisabledSubmit && 'single-questions-disabled-submit'
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
