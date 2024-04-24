import { Modal } from 'antd'
import React from 'react'
import { ImgObj } from '../../constant'
import './index.less'

export default function PracticeAdvance(props) {
  const { isShowModalBox } = props
  const onSubmitModal = () => {
    props.onHandleSubmitModal && props.onHandleSubmitModal()
  }
  const onCancelModal = () => {
    props.onHandleCancelModal && props.onHandleCancelModal()
  }
  return (
    <Modal
      className='practice-advance-box'
      closable={false}
      maskClosable={false}
      open={isShowModalBox}
      title='提前交卷提示'
      onOk={onSubmitModal}
      onCancel={onCancelModal}
      okText='立即交卷'
      cancelText='继续做题'
    >
      <div className='practice-advance'>
        <div className='practice-advance-img'>
          <img className='practice-advance-icon' src={ImgObj.advanceTip} />
        </div>
        <div className='practice-advance-text'>
          你还有部分题目未完成，交卷即可查看试卷全部答案及解析，是否立即交卷？
        </div>
      </div>
    </Modal>
  )
}
