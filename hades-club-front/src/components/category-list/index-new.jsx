import { useState } from 'react'
import LabelList from './label-list'
import PrimaryList from './primary-list'

const CategoryList = props => {
  const [selectValue, setSelectValue] = useState({
    primaryId: '', // 大类ID
    categoryId: '', // 二级分类ID,
    labelId: '' // 标签ID
  })

  const changePrimaryId = primaryId => {
    setSelectValue({
      ...selectValue,
      primaryId
    })
  }

  const changeLabel = ids => {
    const [categoryId, labelId] = ids.split('_')
    const values = {
      ...selectValue,
      categoryId,
      labelId
    }
    setSelectValue({ ...values })
    props.onChangeLabel({ ...values })
  }

  return (
    <div className='category-list-container'>
      <PrimaryList changePrimaryId={changePrimaryId} />
      <LabelList primaryId={selectValue.primaryId} changeLabel={changeLabel} />
    </div>
  )
}

export default CategoryList
