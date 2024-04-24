import GoodCollectionError from '@components/good-collection-error'
import req from '@utils/request'
import { Pagination } from 'antd'
import { Component, Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './index.less'

const grade: Record<string, string> = {
  1: '初级',
  2: '中级',
  3: '高级',
  4: '资深',
  5: '专家'
}

const BrushQuestions = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState<Record<string, any>>(null)
  const [index, setIndex] = useState(1)

  useEffect(() => {
    if (!id) return
    req({
      method: 'post',
      data: {
        id
      },
      url: '/querySubjectInfo'
    })
      .then(res => {
        if (res.success && res.data) {
          setQuestion(res.data)
        }
      })
      .catch(err => console.log(err))
  }, [id])

  return (
    <div className='brush-questions-box'>
      <div className='question-box'>
        <div className='question'>
          <div className='question-type'>
            <div className='number'>{index}</div>
            <div className='type'>问答题</div>
          </div>
        </div>
      </div>
      {question ? (
        <Fragment>
          <div className='question-content'>
            <div className='difficulty'>
              {grade[question.subjectDifficult]}-{question?.labelName.join('、')}
            </div>
            <div>{question.subjectName}</div>
          </div>
          <div className='answer-box'>
            <div className='reference-answer'>参考答案</div>
            <div
              className='answer-content wang-editor-style'
              dangerouslySetInnerHTML={{
                __html: question.subjectAnswer
              }}
            ></div>
            <br />
          </div>
          <div className='change-question-box'>
            <GoodCollectionError detail={question} />
          </div>
        </Fragment>
      ) : null}
    </div>
  )
}

export default BrushQuestions

class BrushQuestions1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGood: 0,
      isCollection: 0,
      index: 1,
      question: [
        {
          id: 1,
          labelNames: ['原理'],
          subjectName: 'JDK 和 JRE 有什么区别？',
          difficulty: 1,
          subjectAnswer: `<p>JDK：Java Development Kit 的简称，Java 开发工具包，提供了 Java 的开发环境和运行环境。</p>
          <p>JRE：Java Runtime Environment 的简称，Java 运行环境，为 Java 的运行提供了所需环境。</p>
          <p>具体来说 JDK 其实包含了 JRE，同时还包含了编译 Java 源码的编译器 Javac，还包含了很多 Java 程序调试和分析的工具。</p>
          <p>简单来说：如果你需要运行 Java 程序，只需安装 JRE 就可以了，如果你需要编写 Java 程序，需要安装 JDK。</p>`
        }
      ],
      // answer: '',
      isModal: false, //是否显示纠错弹框
      value: 1, //纠错类型对应值
      inputValue: '' //纠错详情内容
    }
  }
  pageIndex = 1
  total = 0
  assembleIds: string[] = [] // 选中的标签列表
  difficulty = 0 //困难度（全部）
  primaryCategoryId = '' //第一个大类id
  grade: Record<string, string> = {
    1: '初级',
    2: '中级',
    3: '高级',
    4: '资深',
    5: '专家'
  }
  goodCollectionError = GoodCollectionError | null
  componentDidMount() {
    // const urlParams = queryParse(this.props.location.search)
    const urlParams = {
      index: 1,
      difficulty: 1,
      primaryCategoryId: '1',
      labelList: '1,2,3,4'
    }
    this.pageIndex = Number(urlParams.index)
    this.difficulty = urlParams.difficulty //困难度（全部）
    this.primaryCategoryId = urlParams.primaryCategoryId //第一个大类id
    this.assembleIds = !!urlParams.labelList ? urlParams.labelList.split(',') : []
    // this.getInterviewSubjectList()
  }
  async getInterviewSubjectList() {
    let params = {
      pageInfo: {
        pageIndex: this.pageIndex,
        pageSize: 1
      },
      difficulty: this.difficulty,
      primaryCategoryId: this.primaryCategoryId,
      assembleIds: this.assembleIds
    }
    return await req({
      method: 'post',
      data: params,
      url: '/querySubjectInfo'
    })
      .then(res => {
        if (res.data && res.data?.pageList?.length > 0) {
          this.total = res.data.pageInfo.total
          this.setState(
            {
              question: res.data.pageList
            },
            () => {
              this.goodCollectionError.getDetail()
            }
          )
        }
      })
      .catch(err => console.log(err))
  }

  onChangePagination = async pageIndex => {
    this.pageIndex = pageIndex
    this.setState({ index: pageIndex })
    // await this.getInterviewSubjectList()
  }

  handleNextQuestion = async value => {
    let { index } = this.state
    this.pageIndex += value
    index += value
    this.setState({
      index: index
    })
    // await this.getInterviewSubjectList()
  }

  render() {
    const { index, question } = this.state
    return (
      <div className='brush-questions-box'>
        <div className='question-box'>
          <div className='question'>
            <div className='question-type'>
              <div className='number'>{index}</div>
              <div className='type'>问答题</div>
            </div>
            {/* <div className="question-number">
              <div className="now-number">{index}</div>
              <div className="all-number">/{this.total}</div>
            </div> */}
          </div>
        </div>
        <Fragment>
          {question.map((item, index) => {
            return (
              <div key={index}>
                <div className='question-content'>
                  <div className='difficulty'>
                    {this.grade[item.difficulty]}-{item.labelNames.join('、')}
                  </div>
                  <div>{item.subjectName}</div>
                </div>
                <div className='answer-box'>
                  <div className='reference-answer'>参考答案</div>
                  <div
                    className='answer-content wang-editor-style'
                    dangerouslySetInnerHTML={{
                      // __html: item.subjectAnswer,
                      __html: item.subjectAnswer
                    }}
                  ></div>
                  <br />
                </div>
                <div className='change-question-box'>
                  <GoodCollectionError
                    questionId={question[0].id}
                    ref={ref => {
                      this.goodCollectionError = ref
                    }}
                  />
                  {/* <div className="right">
                    <Button
                      disabled={this.pageIndex <= 1 ? true : false}
                      className="last"
                      onClick={() => {
                        this.handleNextQuestion(-1)
                      }}
                    >
                      上一题
                    </Button>

                    <Button
                      className="next"
                      disabled={this.pageIndex >= this.total ? true : false}
                      onClick={() => {
                        this.handleNextQuestion(1)
                      }}
                    >
                      下一题
                    </Button>
                  </div> */}
                </div>
              </div>
            )
          })}
        </Fragment>

        <div className='jump-question'>
          {this.total > 0 && (
            <Pagination
              style={{
                padding: '24px 0',
                textAlign: 'center'
              }}
              showQuickJumper
              current={this.pageIndex}
              defaultCurrent={this.pageIndex}
              total={this.total}
              defaultPageSize={1}
              onChange={this.onChangePagination}
            />
          )}
        </div>
      </div>
    )
  }
}
