import req from '@utils/request'
import { Button, Card, Checkbox, Descriptions } from 'antd'
import type { CardTabListType } from 'antd/es/card'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'
const apiName = {
  /**
   * 查询专项练习
   */
  getSpecialPracticeContent: '/practice/set/getSpecialPracticeContent',

  /**
   * 开始练习
   */
  addPractice: 'practice/set/addPractice'
}

const PracticeHome = () => {
  const navigate = useNavigate()

  const [primaryList, setPrimaryList] = useState<CardTabListType[]>([])
  const [dataList, setDataList] = useState([])
  const [currentCateId, setCurrentCateId] = useState()
  const [checkedInfo, setCheckedInfo] = useState({})

  const getContent = () => {
    req(
      {
        method: 'post',
        url: apiName.getSpecialPracticeContent
      },
      '/practice'
    ).then((res: any) => {
      if (res.success && res.data) {
        setPrimaryList(
          res.data.map(t => ({ tab: t.primaryCategoryName, key: t.primaryCategoryId }))
        )
        setDataList(
          res.data[0].categoryList.map(item => {
            return {
              ...item,
              children: item.labelList.map(t => ({ label: t.labelName, value: t.assembleId }))
            }
          })
        )
        setCurrentCateId(res.data[0].primaryCategoryId)
      }
    })
  }

  useEffect(() => {
    getContent()
  }, [])

  const onCheckAllChange = (e: any, categoryId: number) => {
    const checked = e.target.checked
    const checkedInfoNew = { ...checkedInfo }
    checkedInfoNew[categoryId] = checked
      ? dataList.filter(t => t.categoryId === categoryId)[0].children.map(t => t.value)
      : []
    setCheckedInfo({ ...checkedInfoNew })
  }

  const changeItem = (id, value) => {
    setCheckedInfo({
      ...checkedInfo,
      [id]: value
    })
  }

  const startPractice = () => {
    console.log(checkedInfo)
    const params = {
      assembleIds: Object.values(checkedInfo).flat()
    }
    req(
      {
        method: 'post',
        url: apiName.addPractice,
        data: params
      },
      '/practice'
    ).then(res => {
      if (res.success && res.data) {
        navigate('/practise-detail/' + res.data.setId)
      }
    })
  }

  return (
    <div>
      <Card tabList={primaryList}>
        {dataList.map((item: { categoryName: string; categoryId: number; children: any[] }) => {
          return (
            <Descriptions
              title={item.categoryName}
              extra={
                <Checkbox
                  onChange={e => onCheckAllChange(e, item.categoryId)}
                  checked={checkedInfo?.[item.categoryId]?.length === item.children.length}
                  indeterminate={
                    checkedInfo?.[item.categoryId]?.length > 0 &&
                    checkedInfo?.[item.categoryId]?.length < item.children.length
                  }
                >
                  全选
                </Checkbox>
              }
              key={item.categoryId}
            >
              <Descriptions.Item>
                <Checkbox.Group
                  value={checkedInfo[item.categoryId]}
                  options={item.children}
                  onChange={value => changeItem(item.categoryId, value)}
                />
              </Descriptions.Item>
            </Descriptions>
          )
        })}
      </Card>
      <div className='bottom-btn'>
        <Button
          onClick={startPractice}
          type='primary'
          shape='round'
          size='large'
          disabled={Object.values(checkedInfo).flat().length === 0}
        >
          开始练习
        </Button>
      </div>
    </div>
  )
}

export default PracticeHome
