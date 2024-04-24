import { MailOutlined } from '@ant-design/icons'
import req from '@utils/request'
import { Menu } from 'antd'
import React, { Component, Fragment } from 'react'
import PaperEnd from './components/paper-end/index'
import { ApiName } from './constant'
import './index.less'

const { SubMenu } = Menu

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  }
}

export default class PracticeQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentKey: '1', // 选中的menu
      subMenuList: [
        {
          title: '模拟套卷',
          menuId: '1',
          menuType: 1
        },
        {
          title: '模拟套卷',
          detailVOS: [
            {
              menuName: '后端',
              menuId: '10',
              menuType: 2
            }
          ]
        }
      ]
    }
  }

  /**
   * 当前选择的二级菜单
   */
  currentKeyMap = {}

  /**
   * 当前选择的二级菜单对应的一级菜单
   */
  currentKeyFirstMenuType = 1

  componentDidMount() {
    // this.getPracticeMenu()
  }

  /**
   * 获取左侧菜单
   */
  getPracticeMenu() {
    this.currentKeyMap = {
      menuName: '试卷',
      menuId: '10',
      menuType: 2
    }
    this.setState({
      currentKey: '10',
      subMenuList: [
        {
          title: '模拟套卷',
          detailVOS: [
            {
              menuName: '后端',
              menuId: '10',
              menuType: 2
            }
          ]
        }
      ]
    })
    return
    // return new Promise(resolve => {
    //   resolve()
    // })
    req({
      method: 'post',
      data: {},
      url: ApiName.getPracticeMenu
    })
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.currentKeyMap = res.data[0].detailVOS[0]
          this.setState({
            subMenuList: res.data,
            currentKey: this.currentKeyMap.menuId
          })
        }
      })
      .catch(err => console.log(err))
  }

  /**
   * 切换菜单
   * @param {*} e
   */
  handleClick = e => {
    console.log(e)
    let { subMenuList, currentKey } = this.state
    if (currentKey === e.key) {
      return
    }
    // 获得当前选择的下标
    let index = e.keyPath[1].split('_')[2]
    // this.currentKeyFirstMenuType = subMenuList[index].id;
    this.currentKeyFirstMenuType = index // 记录一级菜单

    subMenuList[index].detailVOS.forEach(element => {
      // 获得当前选中的菜单项
      if (element.menuId == e.key) {
        this.currentKeyMap = element
      }
    })
    this.setState({
      currentKey: e.key
    })
  }

  render() {
    const { currentKey, subMenuList } = this.state
    return (
      <Fragment>
        {subMenuList?.length > 0 && (
          <div className='practice-questions-container'>
            <div className='practice-questions-menu'>
              <Menu
                mode='inline'
                onClick={this.handleClick}
                style={{ width: 256 }}
                defaultOpenKeys={['sub_menu_0']}
                defaultSelectedKeys={[currentKey + '']}
              >
                {subMenuList.map((subMenuItem, subMenuIndex) => {
                  return (
                    <SubMenu
                      key={`sub_menu_${subMenuIndex}`}
                      title={subMenuItem.title}
                      icon={<MailOutlined />}
                    >
                      {subMenuItem?.detailVOS?.length > 0 ? (
                        subMenuItem?.detailVOS?.map(menuItem => {
                          return (
                            <Menu.Item key={menuItem.menuId}>
                              {menuItem.menuType == 1 ? 'GRADE ' : ''}
                              {menuItem.menuName}
                            </Menu.Item>
                          )
                        })
                      ) : (
                        <Menu.Item key={subMenuItem.menuId}>
                          {/* {subMenuItem.menuType == 1 ? 'GRADE ' : ''} */}
                          {/* {subMenuItem.menuName} */}
                        </Menu.Item>
                      )}
                    </SubMenu>
                  )
                })}
              </Menu>
            </div>
            <div className='practice-questions-box' key={this.currentKeyMap.menuId}>
              {/* {this.currentKeyFirstMenuType == 0 ? (
                <FrontEnd
                  menuId={this.currentKeyMap.menuId}
                  menuType={this.currentKeyMap.menuType}
                />
              ) : (
                <PaperEnd
                  menuId={this.currentKeyMap.menuId}
                  menuType={this.currentKeyMap.menuType}
                />
              )} */}
              <PaperEnd menuId={this.currentKeyMap.menuId} menuType={this.currentKeyMap.menuType} />
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}
