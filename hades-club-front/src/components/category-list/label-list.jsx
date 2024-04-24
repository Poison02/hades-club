import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import req from '@utils/request'
import { Divider, Spin, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { apiName } from './constant'

const { CheckableTag } = Tag
const maxCount = 4

const LabelList = props => {
  const { primaryId, changeLabel } = props
  const [spinning, setSpinning] = useState(false)
  const [categoryAndLabelList, setCategoryAndLabelList] = useState([])
  const [isPutAway, setIsPutAway] = useState(true)
  const [checkedLabelId, setCheckedLabelId] = useState()

  const getCategoryAndLabel = () => {
    // setSpinning(true)
    req({
      method: 'post',
      url: apiName.queryCategoryAndLabel,
      data: { id: primaryId }
    })
      .then(res => {
        if (res.data && res.data.length > 0) {
          const filterData = [...res.data].filter(item => item?.labelDTOList?.length > 0)
          const ids = `${filterData[0].id}_${filterData[0].labelDTOList[0].id}`
          setCategoryAndLabelList(filterData)
          setCheckedLabelId(ids)
          changeLabel(ids)
        } else {
          setCategoryAndLabelList([])
          setCheckedLabelId('')
          changeLabel('')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChangePutAway = () => {
    setIsPutAway(!isPutAway)
  }

  const changeChecked = (categoryId, labelId) => {
    const ids = `${categoryId}_${labelId}`
    if (ids === checkedLabelId) return
    setCheckedLabelId(ids)
    changeLabel(ids)
  }

  useEffect(() => {
    if (primaryId) {
      getCategoryAndLabel()
    }
  }, [primaryId])

  return (
    <Spin spinning={spinning}>
      <div className='label-list-box'>
        {categoryAndLabelList.map((categoryItem, index) => {
          return (
            <div
              className='label-list-item'
              key={categoryItem.id}
              style={{
                display: index >= maxCount && isPutAway ? 'none' : 'flex'
              }}
            >
              <div className='label-title'>{categoryItem.categoryName}：</div>
              {categoryItem.labelDTOList.map(labelItem => {
                return (
                  <CheckableTag
                    key={labelItem.id}
                    checked={checkedLabelId === `${categoryItem.id}_${labelItem.id}`}
                    className='label-tag'
                    onChange={() => changeChecked(categoryItem.id, labelItem.id)}
                  >
                    {labelItem.labelName}
                  </CheckableTag>
                )
              })}
            </div>
          )
        })}
      </div>
      {categoryAndLabelList.length > maxCount ? (
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
      ) : null}
    </Spin>
  )
}

export default LabelList
