export const mark = {
  0: '标记一下',
  1: '已标记'
}

export const collection = {
  0: '未收藏',
  1: '已收藏'
}

export enum Type {
  /**单选 */
  Single = 1,
  Multiple,
  Judge
}

export const quetionsType = {
  [Type.Single]: '单选题',
  [Type.Multiple]: '多选题',
  [Type.Judge]: '判断题'
}

export const ApiName = {
  /**
   * 获取练习题目
   */
  getSubjects: '/practice/set/getSubjects',

  /**
   * 获取练习题目详情
   */
  getPracticeSubject: '/practice/set/getPracticeSubject',

  /**
   * 单个题目提交
   *  */
  submitSubject: '/practice/detail/submitSubject',

  /**
   * 交卷
   */
  submit: '/practice/detail/submit'
}

export const ImgObj = {
  stop: 'https://img10.360buyimg.com/imagetools/jfs/t1/206561/1/10729/2819/619f783cE77dd49ed/54eb1fc4b3144a97.png',
  run: 'https://img11.360buyimg.com/imagetools/jfs/t1/161735/6/25253/2598/619f783cEa897a673/fbf4e8c05d40feb5.png',
  info: 'https://img13.360buyimg.com/imagetools/jfs/t1/217399/4/5733/2641/619f7b91E0894649e/2f6353fe0d35fb46.png',
  questionMark:
    'https://img12.360buyimg.com/imagetools/jfs/t1/201809/8/16630/2674/61a04963E92475548/ede8a7f006113cae.png',
  mark: 'https://img12.360buyimg.com/imagetools/jfs/t1/207329/30/11079/2474/61a70ad0E64730d1c/ed75ee746fb33926.png',
  advanceTip:
    'https://img11.360buyimg.com/imagetools/jfs/t1/161028/16/25609/6746/61a08d83E06659dfa/e6418acdab948134.png'
}
