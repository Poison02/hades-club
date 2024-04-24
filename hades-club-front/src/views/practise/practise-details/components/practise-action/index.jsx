import { debounce } from '@utils'
import { Button } from 'antd'
import React, { Fragment } from 'react'
import { ImgObj, mark } from '../../constant'
import './index.less'

export default function PracticeAction(props) {
  const { isLast, isMark } = props

  /**
   * 标记一下
   * @returns
   */
  const onChangeMark = debounce(() => {
    props.onHandleMark && props.onHandleMark()
  })

  /**
   * 交卷
   * @returns
   */
  const onChangeOver = debounce(() => {
    props.onHandleOver && props.onHandleOver()
  })

  /**
   * 提前交卷
   * @returns
   */
  const onChangeAdvanceOver = debounce(() => {
    props.onHandleAdvanceOver && props.onHandleAdvanceOver()
  })

  /**
   * 下一题
   * @returns
   */
  const onChangeNext = debounce(() => {
    props.onHandleNext && props.onHandleNext()
  })

  return (
    <Fragment>
      <div className='practice-action-box'>
        <div className='practice-action-list'>
          <div className='practice-action-item' onClick={onChangeMark}>
            <img src={ImgObj.mark} className='action-mark-icon' />
            {mark[isMark]}
          </div>
        </div>
        <div className='practice-action-list'>
          <div className='practice-action-button'>
            {isLast ? (
              <Button className='action-button-submit' type='primary' onClick={onChangeOver}>
                交卷
              </Button>
            ) : (
              <Button
                className='action-button-advance-submit'
                type='primary'
                onClick={onChangeAdvanceOver}
              >
                提前交卷
              </Button>
            )}
          </div>
          {!isLast && (
            <div className='practice-action-button'>
              <Button type='primary' onClick={onChangeNext}>
                下一题
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className='practice-action-tips'>*交卷即可查看全部答案和解析</div>
    </Fragment>
  )
}
