import { debounce } from '@utils'
import React from 'react'
import { RecommendBackImg } from '../../constant'
import './index.less'

export default function RecommendList(props) {
  const { recommendSetList } = props
  /**
   * 点击推荐套题
   * @param {*} setId
   * @returns
   */
  const onChangeSetId = setId =>
    debounce(() => {
      props.onHandleSetId && props.onHandleSetId(setId)
    })
  return (
    <div className='assessment-report-recommend'>
      <div className='assessment-report-recommend-tip'>根据本次练习，为你推荐以下内容</div>
      <div className='assessment-report-recommend-list'>
        {recommendSetList.map((item, index) => {
          return (
            <div
              className='recommend-item'
              key={item.setId}
              style={{
                backgroundImage: `url(${RecommendBackImg[index % 4]})`
              }}
              onClick={onChangeSetId(item.setId)}
            >
              <div className='recommend-item-name'>{item.setName}</div>
              <div className='recommend-item-heat'>热度指数：{item.setHeat}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
