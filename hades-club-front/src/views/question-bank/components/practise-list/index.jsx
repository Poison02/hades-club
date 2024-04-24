import req from '@utils/request'
import React, { Component, Fragment } from 'react'
import { RankingType, apiName } from '../../constant'
import RankingBox from '../ranking-box'
// import {} from 'react-router-dom'

class PracticeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contributionList: [],
      contributeType: 0,
      isLoading: false
    }
  }

  componentDidMount() {
    this.getPracticeRankList()
  }

  /**
   * 获得练习榜
   */
  getPracticeRankList() {
    req(
      {
        method: 'post',
        url: apiName.getPracticeRankList
      },
      '/practice'
    )
      .then(res => {
        if (res.success && res.data) {
          this.setState({
            contributionList: res.data,
            isLoading: false
          })
        } else {
          this.setState({
            contributionList: [],
            isLoading: false
          })
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 切换排行榜
   * @param {*} index
   * @returns
   */
  onChangeRanking = index => {
    this.setState({
      contributeType: index
    })
  }

  /**
   * 去练题
   */
  onChangeJump = () => {
    window.open('/practise-questions', '_blank')
  }

  render() {
    const { contributionList, isLoading, contributeType } = this.state
    return (
      <Fragment>
        {contributionList?.length > 0 && (
          <RankingBox
            isLoading={isLoading}
            contributionList={contributionList}
            currentActive={contributeType}
            rankingType={RankingType.practice}
            onHandleRanking={this.onChangeRanking}
            onHandleJump={this.onChangeJump}
          />
        )}
      </Fragment>
    )
  }
}

export default PracticeList
