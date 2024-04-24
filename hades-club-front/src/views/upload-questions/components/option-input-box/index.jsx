import { CloseCircleFilled } from '@ant-design/icons'
import { debounce } from '@utils'
import { Input, Select, Tooltip, message } from 'antd'
import _ from 'lodash'
import React, { Component, Fragment, createRef } from 'react'
import { optionLetter } from '../../constant'
import QuestionEditor from '../question-editor'

import './index.less'
const { TextArea } = Input
const { Option } = Select
const defalutLabel = '请使用富文本编辑器输入选项内容'
// 判断题
const judgeList = [
  {
    label: '错误',
    value: 0
  },
  {
    label: '正确',
    value: 1
  }
]
const optionLetterLength = 7 // ABCD的长度
const showDeleteLength = 3 // 展示删除icon的最短长度
export default class OptionInputBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionList: [
        {
          label: defalutLabel,
          value: 1
        },
        {
          label: defalutLabel,
          value: 2
        },
        {
          label: defalutLabel,
          value: 3
        },
        {
          label: defalutLabel,
          value: 4
        }
      ], // 选项列表
      currentActiveList: [], // 当前选中的项
      scoreValue: '', // 分数
      subjectAnalysis: '' //试题解析
    }
  }

  // kindEditor = KindEditor | null
  kindEditor = createRef()
  subjectAnswer = '' // 选项内容

  /**
   * 新增/删除
   * @param {*} len
   * @param {*} type add-新增 / del-删除
   * @returns
   */
  onChangeAddOption = (len, type) => () => {
    let { optionList, currentActiveList } = this.state
    let list = []
    // 新增
    if (type === 'add') {
      if (len === optionLetterLength) {
        return
      }
      optionList.push({ label: defalutLabel, value: optionLetter[len].value })
    } else {
      // 删除
      currentActiveList = []
      optionList.splice(len, 1)
      // 重新初始化ABCD对应的id
      list = optionList.map((item, index) => {
        return {
          label: item.label,
          value: optionLetter[index].value
        }
      })
    }
    this.setState(
      {
        optionList: type === 'add' ? optionList : list,
        currentActiveList
      },
      () => {
        this.handleChangeOption()
      }
    )
  }

  /**
   * 确认/取消 编辑框
   * @param {*} index
   * @param {*} type submit/cancel
   * @returns
   */
  onChangeOptEditor = (index, type) => () => {
    let { optionList } = this.state
    if (type === 'submit') {
      _.set(optionList, [index, 'label'], !!this.subjectAnswer ? this.subjectAnswer : defalutLabel)
    }
    this.kindEditor && this.kindEditor.current.onClear()
    _.set(optionList, [index, 'isShowEditor'], false)
    this.subjectAnswer = ''
    this.setState(
      {
        optionList
      },
      () => {
        this.handleChangeOption()
      }
    )
  }

  /**
   * 展开 编辑项
   * @param {*} index
   * @returns
   */
  onChangeShowEditor = index =>
    debounce(() => {
      let { optionList } = this.state
      if (optionList.filter(item => item.isShowEditor).length > 0) {
        return message.info('请先确认正在编辑的选项内容')
      }
      _.set(optionList, [index, 'isShowEditor'], true)
      this.setState(
        {
          optionList
        },
        () => {
          this.kindEditor && this.kindEditor.current.onCashBack()
        }
      )
    })

  /**
   * 富文本编辑器
   * @param {*} e
   */
  onChangeEditor = e => {
    this.subjectAnswer = e
  }

  /**
   * 正确选项
   * @param {*} value
   */
  onChangeSelect = value => {
    const { isMultiple } = this.props
    let str = value
    if (!isMultiple) {
      // 单选，格式化成数组
      str = [value]
    }
    this.setState(
      {
        currentActiveList: str
      },
      () => {
        this.handleChangeOption()
      }
    )
  }

  /**
   * 本题分值
   */
  onChangeScore = e => {
    this.setState(
      {
        scoreValue: e.target.value.trim()
      },
      () => {
        this.handleChangeOption()
      }
    )
  }

  /**
   * 试题解析
   * @param {*} e
   */
  onChangeSubjectAnalysis = e => {
    this.setState(
      {
        subjectAnalysis: e.target.value.trim()
      },
      () => {
        this.handleChangeOption()
      }
    )
  }

  /**
   * 清空
   */
  handleClearOption = () => {
    this.subjectAnswer = '' // 选项内容
    this.setState({
      optionList: [
        {
          label: defalutLabel,
          value: 1
        },
        {
          label: defalutLabel,
          value: 2
        },
        {
          label: defalutLabel,
          value: 3
        },
        {
          label: defalutLabel,
          value: 4
        }
      ], // 选项列表
      currentActiveList: [], // 当前选中的项
      scoreValue: '', // 分数
      subjectAnalysis: '' //试题解析
    })
  }

  /**
   * 向父组件传值
   */
  handleChangeOption = () => {
    let { currentActiveList, scoreValue, subjectAnalysis, optionList } = this.state
    const { isJudge } = this.props
    let activeList = []
    if (!isJudge) {
      // 单选/多选
      activeList = optionList.map(item => {
        let flag = 0
        if (currentActiveList.includes(item.value)) {
          flag = 1
        }
        return {
          optionType: item.value,
          optionContent: item.label,
          isCorrect: flag
        }
      })
    } else {
      // 判断
      activeList = currentActiveList
    }
    console.log('向父组件传值', activeList, scoreValue, subjectAnalysis)
    // this.props.handleChangeOption(activeList, scoreValue, subjectAnalysis);
    this.props.handleChangeOption(activeList, 1, subjectAnalysis)
  }

  render() {
    const { subjectAnalysis } = this.state
    const { isJudge } = this.props
    return (
      <Fragment>
        {!isJudge && this.renderOption()}
        {this.renderOptionBtn()}
        <div className='option-input-container'>
          <div className='option-input-title'>试题解析：</div>
          <TextArea
            placeholder='试题解析（非必填 限500字）'
            value={subjectAnalysis}
            style={{ height: 48, width: '100%' }}
            maxLength={500}
            autoSize={{ minRows: 3, maxRows: 4 }}
            onChange={e => this.onChangeSubjectAnalysis(e)}
          />
        </div>
      </Fragment>
    )
  }

  /**
   * 选项模块
   * @returns
   */
  renderOption = () => {
    const { optionList } = this.state
    let listLen = optionList.length
    return (
      <Fragment>
        {optionList.length > 0 &&
          optionList.map((item, index) => {
            const isShowTip = item.label === defalutLabel
            return (
              <div
                className='option-input-container'
                style={{ flexDirection: 'column' }}
                key={`option_input_${index}`}
              >
                <div className='option-input-main'>
                  <div className='option-input-title-option'>
                    {optionLetter[item.value - 1].label}&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className='option-input-item' key={`option_id_${item.value}`}>
                    <Tooltip title='点击可输入该选项内容' onClick={this.onChangeShowEditor(index)}>
                      <div
                        className='option-input-item-header'
                        style={
                          isShowTip
                            ? {
                                color: 'rgba(51,51,51,0.3)'
                              }
                            : {
                                color: 'rgba(51,51,51,0.9)'
                              }
                        }
                        dangerouslySetInnerHTML={{
                          __html: item.label
                        }}
                      ></div>
                    </Tooltip>
                    <div className='option-input-item-delete'>
                      {listLen > showDeleteLength && (
                        <Tooltip title='删除选项' onClick={this.onChangeAddOption(index, 'del')}>
                          <CloseCircleFilled style={{ fontSize: '18px' }} />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
                {item.isShowEditor && (
                  <div
                    key={`option_editor_${index}`}
                    className='option-input-main'
                    style={{ marginTop: 19 }}
                  >
                    <div className='option-input-editor'>
                      <QuestionEditor onChange={this.onChangeEditor} ref={this.kindEditor} />
                      <div className='option-input-editor-btns'>
                        <Tooltip title='取消后内容将不会更新到选项框内'>
                          <div
                            className='option-input-editor-btn'
                            onClick={this.onChangeOptEditor(index, 'cancel')}
                          >
                            取消
                          </div>
                        </Tooltip>
                        <Tooltip title='确定后内容将会更新到选项框内'>
                          <div
                            className='option-input-editor-btn option-input-editor-submit-btn'
                            onClick={this.onChangeOptEditor(index, 'submit')}
                          >
                            确定
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </Fragment>
    )
  }

  /**
   * 选项模块-操作按钮
   * @returns
   */
  renderOptionBtn = () => {
    const { optionList, scoreValue, currentActiveList } = this.state
    const { isMultiple, isJudge } = this.props
    let listLen = optionList.length
    return (
      <div className='option-input-container'>
        <div className='option-input-title option-input-title-required'>题目操作：</div>
        <div style={{ display: 'flex', width: '100%' }}>
          {!isJudge && (
            <div
              className='option-input-option-btn'
              onClick={this.onChangeAddOption(listLen, 'add')}
            >
              添加选项
            </div>
          )}
          <div className='option-input-option-btn option-input-option-input'>
            正确选项
            <Select
              mode={isMultiple && 'multiple'}
              defaultActiveFirstOption={false}
              value={currentActiveList}
              placeholder='请选择'
              style={{ minWidth: isMultiple ? '84px' : '88px', marginLeft: 4 }}
              onChange={this.onChangeSelect}
            >
              {isJudge
                ? judgeList.map((item, index) => {
                    return (
                      <Option key={`option_select_${item.value}`} value={item.value}>
                        {item.label}
                      </Option>
                    )
                  })
                : optionList.map((item, index) => {
                    return (
                      <Option key={`option_select_${item.value}`} value={item.value}>
                        {optionLetter[index].label}
                      </Option>
                    )
                  })}
            </Select>
          </div>
        </div>
      </div>
    )
  }
}
