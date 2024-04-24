import React, { Fragment, useEffect, useState } from 'react'

import { CaretDownOutlined, CaretUpOutlined, RightOutlined } from '@ant-design/icons'
import req from '@utils/request'
import { Divider, Modal, Spin } from 'antd'
import _ from 'lodash'
import { apiName } from './constant'
import './index.less'

/**
 * 大分类中的背景图颜色
 */
const categoryBackColor = {
  0: '#23b2ff',
  1: '#ea7d4d',
  2: '#e93532',
  3: '#343d71',
  4: '#dc4ad6',
  5: '#72b633',
  6: '#9047de',
  7: '#dc4077'
}

const categoryShowCount = 4

const cacheMap = {}

/**
 * 上万后展示 W+
 * @param {*} total
 * @returns
 */
const formatTotal = total => {
  if (total >= 10000) {
    return Math.floor(total / 10000) + 'W+'
  }
  return total
}

const CategoryList = ({ primaryCategoryId, categoryList, ...props }) => {
  const [secondCategoryList, setSecondCategoryList] = useState([])
  const [currentActive, setCurrentActive] = useState(categoryList[0])
  const [isPutAway, setIsPutAway] = useState(true)
  const [loading, setLoading] = useState(false)
  const [currentLabelIndex, setCurrentLabelIndex] = useState([])
  const [openMoreFlag, setOpenMoreFlag] = useState(false)

  const getLabels = id => {
    return new Promise(resolve => {
      req({
        method: 'post',
        url: apiName.queryLabelByCategoryId,
        data: { categoryId: id }
      }).then(res => {
        if (cacheMap[id]) {
          resolve(cacheMap[id])
        } else {
          cacheMap[id] = res.data
          resolve(res.data)
        }
      })
    })
  }

  // 获取大类下分类
  const getCategoryByPrimary = () => {
    req({
      method: 'post',
      url: apiName.queryCategoryByPrimary,
      data: { categoryType: 2, parentId: currentActive.id }
    }).then(async res => {
      let list = res.data
      for (let i = 0; i < list.length; i++) {
        list[i].children = await getLabels(list[i].id)
        if (i === 0 && list[i].children.length) {
          list[i].children[0].active = true
        }
      }
      setSecondCategoryList(_.cloneDeep(list))
      setCurrentLabelIndex([0, 0])
      props.onChangeLabel(_.get(list, [0, 'id']), _.get(list, [0, 'children', 0, 'id']))
    })
  }

  useEffect(() => {
    if (primaryCategoryId) {
      getCategoryByPrimary()
    }
  }, [primaryCategoryId])

  /**
   * 切换一级分类
   * @param {*} item
   * @returns
   */
  const onChangeCategory = item => () => {
    if (currentActive.id === item.id) {
      return
    }
    setCurrentActive(item)
    props.onChangeCategory(item)
  }

  /**
   * 一级分类模块
   * @returns
   */
  const renderFirstContainer = () => {
    return (
      <div className='first-category-list'>
        {categoryList.slice(0, 7).map((categoryModuleItem, categoryModuleIndex) => {
          return (
            <div
              className={`first-category-item ${
                categoryModuleItem.id === currentActive.id && 'first-category-item-active'
              }`}
              key={`first_category_${categoryModuleItem.id}`}
              style={{
                backgroundColor: `${categoryBackColor[categoryModuleIndex]}`
              }}
              onClick={onChangeCategory(categoryModuleItem)}
            >
              <div className='first-category-item-title'>{categoryModuleItem.categoryName}</div>
              <div className='first-category-item-count'>{categoryModuleItem.count || 50}道题</div>
            </div>
          )
        })}
        {categoryList.length > 7 && (
          <div className='first-category-more' onClick={() => setOpenMoreFlag(true)}>
            更多
            <RightOutlined />
          </div>
        )}
      </div>
    )
  }

  /**
   * 点击更多的分类项
   * @param {*} id
   * @returns
   */
  const onChangeCategoryMore = cur => () => {
    setOpenMoreFlag(false)
    setCurrentActive(cur)
    let list = [...categoryList].reduce((pre, item) => {
      if (item.id !== cur.id) {
        pre.push(item)
      } else {
        pre.unshift(item)
      }
      return pre
    }, [])
    props.onChangeCategoryMore && props.onChangeCategoryMore(cur.id, list)
  }

  /**
   * 更多分类
   * @returns
   */
  const renderMoreBox = () => {
    return (
      <div className='first-category-more-list'>
        {categoryList.slice(7).map((categoryModuleItem, categoryModuleIndex) => {
          return (
            <div
              className='first-category-item'
              key={`first_more_category_${categoryModuleItem.id}`}
              style={{
                backgroundColor: `${categoryBackColor[categoryModuleIndex]}`
              }}
              onClick={onChangeCategoryMore(categoryModuleItem)}
            >
              <div className='first-category-item-title'>{categoryModuleItem.categoryName}</div>
              <div className='first-category-item-count'>
                {formatTotal(categoryModuleItem.subjectCount)}道题
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  /**
   * 选择标签-支持单选（多选）
   * @param {*} categoryId 一级分类id
   * @param {*} secondCategoryIndex 二级分类对象index
   * @param {*} thirdCategoryIndex 三级标签index
   * @param {*} active 三级标签当前的选中状态
   * @returns
   */
  const onChangeLabel = (secondCategoryIndex, thirdCategoryIndex, active) => () => {
    const { isMultipleChoice } = props
    const list = _.cloneDeep(secondCategoryList)
    if (isMultipleChoice) {
      // 三级标签支持多选
      _.set(list, [secondCategoryIndex, 'children', thirdCategoryIndex, 'active'], !active)
      setSecondCategoryList(list)
    } else {
      // 三级标签支持单选
      if (currentLabelIndex.length) {
        _.set(list, [currentLabelIndex[0], 'children', currentLabelIndex[1], 'active'], false)
      }
      _.set(list, [secondCategoryIndex, 'children', thirdCategoryIndex, 'active'], !active)
      setCurrentLabelIndex([secondCategoryIndex, thirdCategoryIndex])
      setSecondCategoryList(list)
    }
    props.onChangeLabel(
      _.get(list, [secondCategoryIndex, 'id']),
      _.get(list, [secondCategoryIndex, 'children', thirdCategoryIndex, 'id'])
    )
  }

  /**
   * 展开/收起
   * @param {*} secondCategoryIndex
   * @returns
   */
  const onChangeOpenStatus = (secondCategoryIndex, isOpen) => () => {
    const _list = _.cloneDeep(secondCategoryList)
    _.set(_list, [secondCategoryIndex, 'isOpen'], !isOpen)
    setSecondCategoryList(_list)
  }

  /**
   * 展开/收起
   */
  const onChangePutAway = () => {
    setIsPutAway(!isPutAway)
  }

  /**
   * 二级分类模块
   * @returns
   */
  const renderSecondContainer = () => {
    return (
      <Spin spinning={loading}>
        <div className='second-category-list'>
          {secondCategoryList.map((secondCategoryItem, secondCategoryIndex) => {
            return (
              <div
                style={{
                  display: secondCategoryIndex >= categoryShowCount && isPutAway ? 'none' : 'flex'
                }}
                className='second-category-item'
                key={`second_category_${secondCategoryItem.id}`}
              >
                <div className='second-category-item-title'>
                  {secondCategoryItem.categoryName}：
                </div>
                {secondCategoryItem?.children?.length > 0 && (
                  <div className='second-category-item-box'>
                    <div
                      style={{
                        height: secondCategoryItem.isOpen ? 'auto' : 43
                      }}
                      className='second-category-item-list'
                      id={`id_${secondCategoryIndex}`}
                    >
                      {secondCategoryItem.children.map((thirdCategoryItem, thirdCategoryIndex) => {
                        return (
                          <div
                            className={`third-category-item ${
                              thirdCategoryItem.active ? 'third-category-item-active' : ''
                            }`}
                            key={`third_category_${thirdCategoryItem.id}`}
                            onClick={onChangeLabel(
                              secondCategoryIndex,
                              thirdCategoryIndex,
                              thirdCategoryItem.active || false
                            )}
                          >
                            {thirdCategoryItem.labelName}
                          </div>
                        )
                      })}
                    </div>
                    {/* {secondCategoryItem.children.length > 5 ? (
                      <div
                        id={`second_id_${secondCategoryIndex}`}
                        className='second-category-item-status'
                        onClick={onChangeOpenStatus(
                          secondCategoryIndex,
                          secondCategoryItem.isOpen || false
                        )}
                      >
                        <div className='second-category-item-type' style={{ fontSize: 12 }}>
                          {secondCategoryItem.isOpen ? '收起' : '展开'}
                        </div>
                        <div className='second-category-item-icon' style={{ fontSize: 12 }}>
                          {secondCategoryItem.isOpen ? <UpOutlined /> : <DownOutlined />}
                        </div>
                      </div>
                    ) : null} */}
                  </div>
                )}
              </div>
            )
          })}
          {secondCategoryList?.length >= categoryShowCount && (
            <Divider
              onClick={onChangePutAway}
              dashed
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              {isPutAway ? '展开' : '收起'}
              {isPutAway ? (
                <CaretDownOutlined style={{ marginLeft: 4 }} />
              ) : (
                <CaretUpOutlined style={{ marginLeft: 4 }} />
              )}
            </Divider>
          )}
        </div>
      </Spin>
    )
  }

  return (
    <div className='category-box'>
      <Fragment>{categoryList?.length && renderFirstContainer()}</Fragment>
      <Fragment>{secondCategoryList?.length > 0 && renderSecondContainer()}</Fragment>
      <Modal
        open={openMoreFlag}
        footer={null}
        closable={true}
        centered
        onCancel={() => setOpenMoreFlag(false)}
      >
        {renderMoreBox()}
      </Modal>
    </div>
  )
}

export default CategoryList
