import { AppstoreOutlined } from '@ant-design/icons'
import { debounce } from '@utils'
import React, { Fragment } from 'react'
import './index.less'

export default function PracticePaging(props) {
  const { subjectList, singleLength, multipleLength, judgeLength } = props
  const onChangePaging = index =>
    debounce(() => {
      props.onHandlePaging && props.onHandlePaging(index)
    })
  return (
    <Fragment>
      {subjectList?.length > 0 && (
        <div className='practice-paging-box'>
          <div className='practice-paging-tips'>
            <div>答题卡</div>
            <div className='practice-paging-tip'>
              <AppstoreOutlined style={{ marginRight: 4 }} />
              单选题{singleLength}道 ｜ 多选题{multipleLength}道 ｜ 判断题
              {judgeLength}道
            </div>
          </div>
          <div className='practice-paging-list'>
            {subjectList.map((item, index) => {
              return (
                <div
                  key={`paging_${item.subjectId}`}
                  className={`practice-paging-item
                                            ${
                                              item?.isMark == 1 ? 'practice-paging-item-mark' : ''
                                            } ${
                                              item?.active
                                                ? 'practice-paging-item-active'
                                                : item?.activeList?.length > 0
                                                ? 'practice-paging-item-answer'
                                                : 'practice-paging-item-unactive'
                                            } `}
                  onClick={onChangePaging(index)}
                >
                  {index + 1}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </Fragment>
  )
}
