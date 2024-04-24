export const apiName = {
  /**
   * 查询分类
   */
  queryPrimaryCategory: '/category/queryPrimaryCategory',

  /**
   * 查询大类下分类
   */
  queryCategoryByPrimary: '/category/queryCategoryByPrimary',

  // 获取题目列表
  getSubjectPage: '/getSubjectPage',

  /**
   * 贡献榜
   */
  getContributeList: '/getContributeList',

  // 练题榜
  getPracticeRankList: '/practice/detail/getPracticeRankList'
}

/**
 * 模块类型
 */
export const RankingType = {
  /**
   * 贡献榜
   */
  contribution: 1,
  /**
   * 排行榜
   */
  practice: 2
}

/**
 * 模块名称
 */
export const RankingTypeText = {
  [RankingType.practice]: '综合练习榜',
  [RankingType.contribution]: '出题贡献榜'
}

/**
 * 对应按钮名字
 */
export const RankingTypeBtnText = {
  [RankingType.contribution]: '去出题',
  [RankingType.practice]: '去练习'
}
