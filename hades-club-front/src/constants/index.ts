const host = import.meta.env.VITE_IMG_HOST
/**
 * 难度筛选
 */
export const filterDifficulty = [
  {
    id: 0,
    title: '全部'
  },
  {
    id: 1,
    title: '初级'
  },
  {
    id: 2,
    title: '中级'
  },
  {
    id: 3,
    title: '高级'
  },
  {
    id: 4,
    title: '资深'
  },
  {
    id: 5,
    title: '专家'
  }
]

/**
 * 难度等级
 */
export const gradeObject = {
  1: {
    color: 'rgba(60, 110, 238, 0.5)',
    title: '初级'
  },
  2: {
    color: 'rgba(60, 110, 238, 0.6)',
    title: '中级'
  },
  3: {
    color: 'rgba(60, 110, 238, 0.7)',
    title: '高级'
  },
  4: {
    color: 'rgba(60, 110, 238, 0.8)',
    title: '资深'
  },
  5: {
    color: 'rgba(60, 110, 238, 0.9)',
    title: '专家'
  }
}
