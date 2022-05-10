function addZero(item:number):string {
  if(item < 10)
    return '0'+item
  return item + ''
}

function formateDate(time:string|number) : string {
  if(!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    + ' '+ addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
}

export default formateDate