import { debounce, splicingQuery } from '@utils'
import req from '@utils/request'
import { Button, Card, Checkbox, Descriptions, Spin } from 'antd'
import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { ApiName } from '../../constant'
import './index.less'

const CheckboxGroup = Checkbox.Group
class FrontEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabList: [],
      secondCategoryList: [],
      isShowSpin: false,
      currentKey: '', //当前的大类id
      difficulty: 1
    }
  }
  allCategoryMap = {}
  selectList = []

  componentDidMount() {
    this.getSpecialPracticeContent()
  }

  /**
   * 获取菜单对应的内容
   */
  getSpecialPracticeContent() {
    const { menuId, menuType } = this.props
    let params = {
      menuId: menuId,
      menuType: menuType
    }
    req({
      method: 'post',
      data: params,
      url: ApiName.getSpecialPracticeContent
    })
      .then(res => {
        if (res.data && res.data?.length > 0) {
          let tabList = res.data.map(item => {
            return {
              tab: item.primaryCategoryName,
              key: item.primaryCategoryId
            }
          })
          res.data.forEach(item => {
            this.allCategoryMap[item.primaryCategoryId] = item.categoryList
          })

          this.setState({
            currentKey: tabList[0].key,
            tabList: tabList,
            secondCategoryList: this.allCategoryMap[res.data[0].primaryCategoryId],
            isShowSpin: false
          })
        } else {
          this.setState({
            tabList: [],
            secondCategoryList: [],
            isShowSpin: false
          })
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 生成setId接口
   */
  addPractice = debounce(() => {
    const { menuId } = this.props
    let params = {
      difficulty: menuId,
      assembleIds: this.selectList
    }
    req({
      method: 'post',
      data: params,
      url: '/admin/practice/set/addPractice'
    })
      .then(res => {
        if (res.data) {
          this.props.history.push(
            splicingQuery('/practise-details', {
              setId: res.data.setId
            })
          )
        }
      })
      .catch(err => console.log(err))
  })

  /**
   * 复选框-选中/未选中
   * @param {*} index 二级分类下标
   * @returns
   */
  onChange = index => list => {
    let { secondCategoryList } = this.state
    _.set(secondCategoryList, [index, 'activeList'], list)
    this.setState({ secondCategoryList })
    this.getAssembleIdList(secondCategoryList)
  }

  /**
   * 切换一级分类
   * @param {*} key
   */
  onTabChange = debounce(key => {
    let { secondCategoryList } = this.state
    // 切换一级大类时，将activeList全重置为空
    secondCategoryList.forEach(item => {
      item.activeList = []
    })
    this.getAssembleIdList([])
    this.setState({
      currentKey: key,
      secondCategoryList: this.allCategoryMap[key]
    })
  })

  /**
   * 获取选中的assembleId列表
   * @param {*} list
   */
  getAssembleIdList = list => {
    let activeList = []
    list.forEach(item => {
      if (item.activeList && item.activeList?.length !== 0) {
        activeList = _.concat(activeList, item.activeList)
      }
    })
    this.selectList = activeList
  }

  /**
   * 全选
   * @param {*} index 二级分类下标
   * @returns
   */
  onCheckAllChange = index => e => {
    let { secondCategoryList } = this.state
    let activeList = []
    if (e.target.checked) {
      activeList = secondCategoryList[index].labelList.map(item => item.assembleId)
    }
    _.set(secondCategoryList, [index, 'activeList'], activeList)
    this.setState({ secondCategoryList })
    this.getAssembleIdList(secondCategoryList)
  }

  render() {
    const { secondCategoryList, isShowSpin, currentKey, tabList } = this.state
    return (
      <Spin spinning={isShowSpin}>
        {tabList?.length > 0 && (
          <div className='front-box'>
            <Card
              style={{ width: '100%' }}
              tabList={tabList}
              bordered={false}
              activeTabKey={currentKey + ''}
              onTabChange={key => {
                this.onTabChange(key, 'key')
              }}
            >
              <div>
                {secondCategoryList?.length > 0 &&
                  secondCategoryList.map((secondItem, secondIndex) => {
                    let labelList = secondItem.labelList.map(item => {
                      return {
                        label: item.labelName,
                        value: item.assembleId
                      }
                    })
                    return (
                      <Descriptions
                        key={`second_category_${secondIndex}`}
                        size='default'
                        title={
                          <Fragment>
                            <div className='box'>
                              <div id={secondItem.categoryId} className='box1'>
                                {secondItem.categoryName}
                              </div>
                              <div className='box2'>
                                <Checkbox
                                  checked={
                                    secondItem?.activeList?.length == secondItem.labelList.length
                                  }
                                  onChange={this.onCheckAllChange(secondIndex)}
                                >
                                  全选
                                </Checkbox>
                              </div>
                            </div>
                          </Fragment>
                        }
                      >
                        <Descriptions.Item label=''>
                          <CheckboxGroup
                            value={secondItem.activeList}
                            options={labelList}
                            onChange={this.onChange(secondIndex)}
                          />
                        </Descriptions.Item>
                      </Descriptions>
                    )
                  })}
              </div>
            </Card>
            <div className='but'>
              <Button
                disabled={this.selectList.length === 0}
                style={{ opacity: this.selectList.length === 0 ? 0.5 : 1 }}
                className='button'
                size='large'
                onClick={() => {
                  this.addPractice()
                }}
              >
                开始练习
              </Button>
            </div>
          </div>
        )}
      </Spin>
    )
  }
}

export default FrontEnd
