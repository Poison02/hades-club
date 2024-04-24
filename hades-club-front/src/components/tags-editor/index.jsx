import React, { Component } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import req from '@utils/request'
import { Input, Tag, Tooltip, message } from 'antd'
import { ModuleType, apiName } from './constant'
import './index.less'

const apiNameModule = {
  [ModuleType.second]: [apiName.addInterviewCategory, apiName.deleteInterviewCategory],
  [ModuleType.third]: [apiName.addInterviewLabel, apiName.deleteInterviewLabel]
}

export default class TagsEditor extends Component {
  saveInputRef = input => (this.input = input)

  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      inputValue: ''
    }
  }

  /**
   * 点击X号
   * @param {*} index 当前index
   * @param {*} categoryId 当前id
   */
  handleClose = (index, categoryId) => {
    const { moduleType, categoryList } = this.props
    let params = {
      id: categoryId
    }
    let url = apiNameModule[moduleType][1]
    req({
      method: 'post',
      data: params,
      url: url
    })
      .then(res => {
        if (res.data) {
          let list = categoryList.filter(item => {
            return item.id !== categoryId
          })
          this.props.onChangeLabel(list, this.formatList(list))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * 展示输入框
   */
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  /**
   * 输入框改变内容
   * @param {*} e
   */
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value })
  }

  /**
   * 增加标签
   */
  handleInputConfirm = () => {
    let { categoryList } = this.props
    let { inputValue } = this.state
    let equalList = [],
      formatInputValue = inputValue.trim()
    if (!formatInputValue) {
      this.setState({
        inputValue: '',
        inputVisible: false
      })
      return
    }
    if (categoryList.length > 0) {
      equalList = categoryList.filter(item => {
        return item.categoryName.toLowerCase() === formatInputValue.toLowerCase()
      })
    }
    if (equalList.length <= 0) {
      this.postAddInterviewCategory(formatInputValue)
    } else {
      message.info('所增内容已存在', 0.3)
      this.setState({
        inputValue: ''
      })
    }
  }

  /**
   * 增加标签
   * @param {*} inputValue 当前的值
   */
  postAddInterviewCategory = inputValue => {
    const { parentCategoryValue, moduleType, categoryList } = this.props
    let params_2 = {
      categoryName: inputValue,
      categoryType: 2,
      parentId: parentCategoryValue[0]
    }
    let params_3 = {
      labelName: inputValue,
      primaryCategoryId: parentCategoryValue[0]
    }
    let params = moduleType == ModuleType.third ? params_3 : params_2
    req({
      method: 'post',
      data: params,
      url: apiNameModule[moduleType][0]
    })
      .then(res => {
        if (res.data) {
          let id = res.data
          let list = [
            ...categoryList,
            {
              categoryName: inputValue,
              categoryId: id,
              isShowClose: true
            }
          ]
          let formatList = this.onHandleLabelSelectState(list, list.length - 1, false)
          this.setState(
            {
              inputVisible: false,
              inputValue: ''
            },
            () => {
              this.props.onChangeLabel(formatList, this.formatList(formatList))
            }
          )
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * 选中/未选中-标签
   * @param {*} tagIndex 选择的标签
   * @param {*} active 选择的标签的当前状态
   * @returns
   */
  onChangeLabel = (tagIndex, active) => () => {
    let { categoryList, isDisabledReverseSelection } = this.props
    if (active && isDisabledReverseSelection) {
      return
    }
    let formatLabelList = this.onHandleLabelSelectState(categoryList, tagIndex, active)
    this.props.onChangeLabel(formatLabelList, this.formatList(formatLabelList))
  }

  /**
   * 处理数据选中/未选中（单选/多选）
   * @param {*} list 分类列表
   * @param {*} tagIndex 当前索引
   * @param {*} active 当前选中状态
   * @returns
   */
  onHandleLabelSelectState = (list, tagIndex, active) => {
    const { isSingleChoice } = this.props
    let formatLabelList = []
    // 单选
    if (isSingleChoice) {
      formatLabelList = list.map((item, index) => {
        let flag = false
        if (index == tagIndex) {
          flag = !active // 将三级标签设置选中/未选中
        }
        return {
          ...item,
          active: flag
        }
      })
    } else {
      // 多选
      formatLabelList = list.map((item, index) => {
        let flag = item.active
        if (index == tagIndex) {
          flag = !active // 将三级标签设置选中/未选中
        }
        return {
          ...item,
          active: flag
        }
      })
    }
    return formatLabelList
  }

  /**
   * 格式化数据-获得选中项id列表
   * @param {*} list
   * @returns
   */
  formatList = list => {
    let labelList = []
    list.forEach(item => {
      if (item.active) {
        labelList.push(item.id)
      }
    })
    return labelList
  }

  render() {
    const { moduleType, categoryList, isAddTag, isDeleteTag } = this.props
    const { inputVisible, inputValue } = this.state
    let labelList = categoryList
    // 数组中存在 -9999 表示暂无数据，需要支持新增
    if (
      categoryList.filter(item => {
        return item.id === -9999
      }).length > 0
    ) {
      labelList = categoryList.slice(1, categoryList.length)
    }
    return (
      <div className='tags-editor-box'>
        {labelList?.length > 0 &&
          labelList.map((item, index) => {
            const isLongTag = item.categoryName?.length > 20
            const tagElem = (
              <Tag
                style={{
                  margin: '4px',
                  height: '40px',
                  lineHeight: '40px',
                  fontSize: '13px',
                  padding: '0px 16px',
                  border: '1px solid #d9d9d9',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
                key={(item.id || item.categoryId) + '_' + item.categoryName}
                // 支持删除标签
                closable={item.isShowClose && isDeleteTag}
                className={`tags-editor-item ${item.active ? 'tag-active' : ''}`}
                onClick={this.onChangeLabel(index, item.active)}
                onClose={() => this.handleClose(index, item.id)}
              >
                {isLongTag ? `${item.categoryName.slice(0, 20)}...` : item.categoryName}
              </Tag>
            )
            return isLongTag ? (
              <Tooltip
                title={item.categoryName}
                key={(item.id || item.categoryId) + '_' + item.categoryName}
              >
                {tagElem}
              </Tooltip>
            ) : (
              <div key={(item.id || item.categoryId) + '_' + item.categoryName}>{tagElem}</div>
            )
          })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 78, height: 40, marginTop: '4px' }}
            max={10}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {/* 支持手动增加标签 */}
        {!inputVisible && isAddTag && (
          <Tag
            onClick={this.showInput}
            style={{
              background: '#fff',
              borderColor: 'rgba(60, 110, 238, 1)',
              borderStyle: 'dashed',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              height: '40px',
              padding: '0px 16px',
              marginTop: '4px'
            }}
          >
            <PlusOutlined />
            &nbsp;新增{moduleType == ModuleType.third ? '标签' : '分类'}
          </Tag>
        )}
        {!isAddTag && labelList.length === 0 && <div className='tag-empty-tip'>暂无数据呦～</div>}
      </div>
    )
  }
}
