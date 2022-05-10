import { FC, ReactElement, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import menuConfig from '../../config/menuConfig';
import logo from '../../assets/images/logo.png'
import './index.less'

function LeftNav (): ReactElement {

  interface Menu {
    key: string;
    title: string;
    icon: React.ComponentType;
    children?: Menu[]
  }

  const navigate = useNavigate(),
    location = useLocation(),
    SubMenu = Menu.SubMenu

  var isMount = false,
    menuNodes:any,
    OpenKey = ''

  const getMenuNodes = (menuList:Menu[]) => {

    const path = location.pathname

    return menuList.map(item => {
      if(!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon component={item.icon}></Icon>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        if(item.children.find(cItem => path.indexOf(cItem.key)===0)) {
          OpenKey = item.key
        }
        return (
          <SubMenu key={item.key} 
          title={
            <>
              <Icon component={item.icon}></Icon>
              <span>{item.title}</span>
            </>
          } 
          >
            {getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  if(!isMount) {
    menuNodes = getMenuNodes(menuConfig)
    isMount = !isMount
  }

  const selectKey = location.pathname

  return (
    <div className='left-nav'>
      <Link to='/home' className='logo-link'>
        <img src={logo} alt="logo" />
        <h1>管理后台</h1>
      </Link>
      <Menu 
        mode='inline'
        theme='dark'
        selectedKeys={[selectKey]}
        defaultOpenKeys={[OpenKey]}
      >
        {menuNodes}
      </Menu>
    </div>
  );
}

export default LeftNav;