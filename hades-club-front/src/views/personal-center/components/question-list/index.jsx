import { SnippetsTwoTone } from '@ant-design/icons'
import React from 'react'

import './index.less'

const CollectionQuestion = props => {
  const { total, list, name } = props

  const handleJump = id => {
    window.open('/brush-question/' + id)
  }

  return (
    <div className='collection-bag-component-tab1-body'>
      <div className='collection-bag-component-tab1-head-title'>
        <div className='collection-bag-component-tab1-head-title-icon'>
          <SnippetsTwoTone twoToneColor='#FF0000' />
        </div>
        <div>
          {name}的题目({total})
        </div>
      </div>
      {list.map(item => {
        return (
          <div
            className='collection-bag-component-tab1-body-item'
            key={`collection_question_${item.subjectId}`}
          >
            <div className='collection-bag-component-tab1-body-item-question'>
              <span
                className='collection-bag-component-tab1-body-item-question-content'
                onClick={() => handleJump(item.subjectId)}
              >
                {item.subjectName}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CollectionQuestion
