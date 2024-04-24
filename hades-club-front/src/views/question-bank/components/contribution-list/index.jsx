import req from '@utils/request'
import { message } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RankingType, apiName } from '../../constant'
import { mockRankingModuleList } from '../../mock'
import RankingBox from '../ranking-box'

const ContributionList = props => {
  const [contributionList, setContributionList] = useState(mockRankingModuleList[1].rankingList)
  const [loading, setLoading] = useState(false)
  const [contributeType, setContributeType] = useState(0)
  const navigate = useNavigate()

  /**
   * 获得贡献榜
   */
  const getContributeList = () => {
    req({
      method: 'post',
      data: {},
      url: apiName.getContributeList
    })
      .then(res => {
        if (res.success && res.data) {
          setLoading(false)
          setContributionList(res.data)
        } else {
          setLoading(false)
          setContributionList([])
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getContributeList()
  }, [])

  /**
   * 切换排行榜
   * @param {*} index
   * @returns
   */
  const onChangeRanking = index => {
    setContributeType(index)
  }

  /**
   * 去录题
   */
  const onChangeJump = () => {
    const userInfoStorage = localStorage.getItem('userInfo')
    if (!userInfoStorage) {
      return message.info('请登录')
    }
    const { loginId } = JSON.parse(userInfoStorage)
    req(
      {
        method: 'get',
        url: '/permission/getPermission',
        params: {
          userName: loginId
        }
      },
      '/auth'
    ).then(res => {
      if (res.success && res.data) {
        if (res.data.includes('subject:add')) {
          window.open('/upload-question')
        } else {
          message.info('暂无权限')
        }
      } else {
        message.info('暂无权限')
      }
    })
  }

  return (
    <Fragment>
      {contributionList?.length > 0 && (
        <RankingBox
          isLoading={loading}
          contributionList={contributionList}
          currentActive={contributeType}
          rankingType={RankingType.contribution}
          onHandleRanking={onChangeRanking}
          onHandleJump={onChangeJump}
        />
      )}
    </Fragment>
  )
}

export default ContributionList
