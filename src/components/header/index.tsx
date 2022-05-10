import { FC, ReactElement, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button';
import menuList from '../../config/menuConfig';
import './index.less'
import formateDate from '../../utils/dataUtils';
import { reqPos, reqWeather } from '../../api';

function Header (): ReactElement {

  const user = memoryUtils.user,
    navigate = useNavigate(),
    location = useLocation(),
    [sysTime, setSysTime] = useState(formateDate(Date.now())),
    [city, setCity] = useState(''),
    [weather, setWeather] = useState('')

  var inervalId:NodeJS.Timer

  const setTimeInterval = ():void => {
     inervalId = setInterval(() => {
      setSysTime(formateDate(Date.now()))
    }, 1000)
  }

  interface live {
    city: string;
    weather: string;
  }

  const getWeather = async ():Promise<void> => {
    const adcode:string = await reqPos()
    const lives:live = await reqWeather(adcode)
    setCity(lives.city)
    setWeather(lives.weather)
  }
  
  const logout = ():void => {
    Modal.confirm({
      content: '确定退出吗',
      onOk: () => {
        console.log('ok');
        storageUtils.removeUser()
        memoryUtils.user = {id:''}
        navigate('/login', {replace: true})
      },
      onCancel() {
        console.log('cancel');  
      }
    })
  }

  const getTitle = (path:string):string => {
    let title = ''
    menuList.forEach(menu => {
      if(menu.key === path) {
        title = menu.title
      } else if(menu.children) {
        menu.children.forEach(item => {
          if(item.key === path) {
            title = item.title
          }
        })
      }
    })
    return title
  }

  var path = location.pathname,
    title = getTitle(path)


  useEffect(() => {
    setTimeInterval()
    getWeather()
    return () => {
      clearInterval(inervalId)
    }
  }, [])

  return (
    <div className='header'>
      <div className='header-top'>
        <span>欢迎，{user.id}</span>
        <LinkButton onClick={logout}>退出</LinkButton>
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>{title}</div>
        <div className='header-bottom-right'>
          <span>{sysTime}</span>
          <span>{city}</span>
          <span>{weather}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;