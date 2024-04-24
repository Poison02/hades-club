import { LikeTwoTone } from '@ant-design/icons'
import req from '@utils/request'
import React, { Component } from 'react'
import './index.less'

export default class GoodCollectionError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGood: false, //是否点赞
      goodAmount: 0, //点赞数量
      question: [], //题目列表
      questionId: '' //题目id
    }
  }
  componentDidMount() {
    const {
      detail: { id, liked, likedCount }
    } = this.props
    this.setState({
      isGood: liked,
      goodAmount: likedCount,
      questionId: id
    })
  }

  /**
   *
   * @returns 点击点赞按钮
   */
  handleChangeGood = () => {
    const { isGood, goodAmount, questionId } = this.state
    let params = {
      subjectId: questionId,
      status: isGood ? 0 : 1
    }
    this.setState(
      {
        isGood: !isGood,
        goodAmount: isGood ? goodAmount - 1 : goodAmount + 1
      },
      () => {
        req(
          {
            method: 'post',
            data: params,
            url: '/subjectLiked/add'
          },
          '/subject'
        ).catch(err => console.log(err))
      }
    )
  }
  render() {
    const { isGood, goodAmount } = this.state
    return (
      <div className='left'>
        <div
          className='good'
          size='middle'
          onClick={() => {
            this.handleChangeGood()
          }}
        >
          <LikeTwoTone twoToneColor={!isGood ? 'grey' : 'blue'} style={{ marginRight: 4 }} />(
          {goodAmount})
        </div>
      </div>
    )
  }
}
