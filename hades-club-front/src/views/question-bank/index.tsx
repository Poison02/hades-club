// import CategoryList from '@components/category-list'
import CategoryList from '@components/category-list/index-new.jsx'
import QuestionList from '@components/question-list'
import req from '@utils/request'
import { memo, useEffect, useState } from 'react'
import ContributionList from './components/contribution-list'
import PracticeList from './components/practise-list'
import { apiName } from './constant'
import './index.less'

const QuestionBank = () => {
  const [questionList, setQuestionList] = useState([])
  const [labelList, setLabelList] = useState<string | number>() // 选中的标签列表
  const [difficulty, setDiffculty] = useState('') //困难度（全部）
  const [total, setTotal] = useState(0) // 总条数
  const [pageIndex, setPageIndex] = useState(0)

  const [selectedValue, setSelectedValue] = useState({
    primaryId: '', // 大类ID
    categoryId: '', // 二级分类ID,
    labelId: '' // 标签ID
  })

  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [switchFlag, setSwitchFlag] = useState(false)

  /**
   * 选择标签时，请求列表数据
   * @param {*} secondCategoryId 一级分类id
   * @param {*} assembleIds 三级标签 assembleIds
   */
  const onChangeLabel = values => {
    setSelectedValue(values)
    setQuestionList([])
    setTotal(0)
    setPageIndex(1)
  }

  const queryQuestionList = () => {
    setLoading(true)
    const params = {
      pageNo: pageIndex,
      pageSize: 20,
      labelId: selectedValue.labelId,
      categoryId: selectedValue.categoryId,
      subjectDifficult: difficulty || ''
    }
    req({
      method: 'post',
      url: apiName.getSubjectPage,
      data: params
    })
      .then(res => {
        setLoading(false)
        let lastList = [...questionList]
        const { total = 0, result } = res.data
        setTotal(total)
        if (result.length) {
          lastList = lastList.concat(result)
          setQuestionList(lastList)
          if (result.length < 20 || lastList.length >= total) {
            setFinished(true)
          } else {
            setFinished(false)
            setSwitchFlag(false)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (selectedValue.labelId) {
      queryQuestionList()
    }
  }, [pageIndex, selectedValue.labelId, difficulty])

  const scrollHandler = e => {
    let scrollTop = e.target.scrollTop // listBox 滚动条向上卷曲出去的长度，随滚动变化
    let clientHeight = e.target.clientHeight // listBox 的视口可见高度，固定不变
    let scrollHeight = e.target.scrollHeight // listBox 的整体高度，随数据加载变化
    let saveHeight = 30 // 安全距离，距离底部XX时，触发加载
    let tempVal = scrollTop + clientHeight + saveHeight
    // 如果不加入 saveHeight 安全距离，在 scrollTop + clientHeight == scrollHeight 时，触发加载
    // 加入安全距离，相当于在 scrollTop + clientHeight >= scrollHeight - 30 时，触发加载，比前者更早触发
    if (tempVal >= scrollHeight) {
      if (!finished && !switchFlag) {
        // 数据加载未结束 && 未加锁
        setPageIndex(pageIndex + 1)
      }
      setSwitchFlag(true)
    }
  }

  const changeDifficuty = cur => {
    if (cur === difficulty) return
    setPageIndex(1)
    setDiffculty(cur)
    setQuestionList([])
  }

  return (
    <div className='question-bank-box'>
      <div className='mask-box' onScroll={scrollHandler}>
        <div className='question-box'>
          <div className='category-list-box'>
            <CategoryList onChangeLabel={onChangeLabel} />
          </div>
          <div className='question-list-box'>
            <QuestionList
              pageIndex={pageIndex}
              total={total}
              questionList={questionList}
              changeDifficuty={changeDifficuty}
              labelList={labelList}
            />
          </div>

          <div className='loading-more'>
            {questionList.length == 0
              ? ''
              : loading && !finished
              ? '努力加载中...'
              : '我是有底线的（：'}
          </div>
        </div>
      </div>
      <div className='ranking-box'>
        <ContributionList />
        <PracticeList />
      </div>
    </div>
  )
}

export default memo(QuestionBank)
