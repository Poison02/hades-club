import type { GetProp, MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState } from 'react'
import FrontEnd from './components/front-end/index1'
import PaperEnd from './components/paper-end'

import './index.less'

type MenuItem = GetProp<MenuProps, 'items'>[number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

const PracticeQuestions = () => {
  const [selectKeys, setSelectKeys] = useState(['1'])

  const menuItems = [getItem('专项练习', '1'), getItem('模拟套卷', '2'), getItem('我未完成', '3')]

  const clickMenu = ({ key }: { key: string }) => {
    setSelectKeys([key])
  }

  const renderPage = () => {
    const pageMap = {
      '1': <FrontEnd />,
      '2': <PaperEnd type='backend' key='backend' />,
      '3': <PaperEnd type='unfinish' key='unfinish' />
    }
    return pageMap[selectKeys[0]]
  }

  return (
    <div className='practice-questions-container'>
      <div className='practice-questions-menu'>
        <Menu
          style={{ width: 200 }}
          selectedKeys={selectKeys}
          defaultOpenKeys={['2']}
          mode='inline'
          items={menuItems}
          onClick={clickMenu}
        />
      </div>
      <div className='practice-questions-box'>{renderPage()}</div>
    </div>
  )
}

export default PracticeQuestions
