import ajax from "./axios";
import jsonp from 'jsonp'

const myKey = 'b491c2096dd85ff028af8e37e5e54a45'

export const reqLogin = (username:string|number, password:string|number):any => {
  return ajax('/login', {username, password}, 'POST')
}

export function reqPos():Promise<string> {
  const url = `https://restapi.amap.com/v3/ip?key=${myKey}`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (err, res) => {
      if(!err && res.status === '1') {
        resolve(res.adcode)
      } else {
        alert('获取地址信息失败')
      }
    })
  })
}

interface live {
  city: string;
  weather: string;
}

export function reqWeather(adcode:string):Promise<live> {
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${myKey}&city=${adcode}`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (err, res) => {
      if(!err && res.status === '1') {
        const weatherInfo = res.lives[0]
        resolve(weatherInfo)
      } else {
        alert('获取天气信息失败')
      }
    })
  })
}

export const reqCategorys = (parentId:string) => ajax(
  '/manage/category/list', {parentId}
)

export const reqAddCategory = (parentId:string, categoryName:string) => ajax(
  '/manage/category/add', {
    parentId,
    categoryName
  }, 'POST'
)

export const reqUpdateCategory = (categoryId:string, categoryName:string) => ajax(
  '/manage/category/update', {
    categoryId,
    categoryName
  }, 'POST'
)