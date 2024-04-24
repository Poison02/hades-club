export const apiName = {
  /**
   * 查询分类
   */
  queryPrimaryCategory: '/category/queryPrimaryCategory',
  /**
   * 获取二级和三级标签
   */
  getCategoryLabelInfo: '/admin/question/category/getCategoryLabelInfo',

  /**
   * 查询大类下分类
   */
  queryCategoryByPrimary: '/category/queryCategoryByPrimary',

  // 根据分类查标签
  queryLabelByCategoryId: '/label/queryLabelByCategoryId',

  // 查询分类及标签
  queryCategoryAndLabel: '/category/queryCategoryAndLabel'
}

/**
 * 大分类中的背景图颜色
 */
export const categoryBackColor = {
  0: '#23b2ff',
  1: '#ea7d4d',
  2: '#e93532',
  3: '#343d71',
  4: '#dc4ad6',
  5: '#72b633',
  6: '#9047de',
  7: '#dc4077',
  8: '#dc4077'
}

export const mockCategoryList = [
  {
    title: '后端',
    total: 50,
    id: 1
  },
  {
    title: '前端1',
    total: 50,
    id: 2
  },
  {
    title: '前端2',
    total: 50,
    id: 3
  },
  {
    title: '前端3',
    total: 50,
    id: 4
  },
  {
    title: '前端4',
    total: 50,
    id: 5
  },
  {
    title: '前端5',
    total: 50,
    id: 6
  },
  {
    title: '前端6',
    total: 50,
    id: 7
  },
  {
    title: '前端7',
    total: 50,
    id: 8
  },
  {
    title: '前端8',
    total: 50,
    id: 9
  }
]
