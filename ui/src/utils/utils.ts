export function toThousands(num: any) {
  return num?.toString().replace(/\d+/, function (n: any) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}
export function numberFormat(num: number) {
  return num < 1000 ? toThousands(num) : toThousands((num / 1000).toFixed(1)) + 'k'
}

export function filesize(size: number) {
  if (!size) return ''
  /* byte */
  const num = 1024.0

  if (size < num) return size + 'B'
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'K' //kb
  if (size < Math.pow(num, 3)) return (size / Math.pow(num, 2)).toFixed(2) + 'M' //M
  if (size < Math.pow(num, 4)) return (size / Math.pow(num, 3)).toFixed(2) + 'G' //G
  return (size / Math.pow(num, 4)).toFixed(2) + 'T' //T
}

/*
  随机id
*/
export const randomId = function () {
  return Math.floor(Math.random() * 10000) + ''
}

/*
  获取文件后缀
*/
export function fileType(name: string) {
  const suffix = name.split('.')
  return suffix[suffix.length - 1]
}

/*
  获得文件对应图片
*/
const typeList: any = {
  txt: ['txt', 'pdf', 'docx', 'md', 'html', 'zip', 'xlsx', 'xls', 'csv'],
  table: ['xlsx', 'xls', 'csv'],
  QA: ['xlsx', 'csv', 'xls', 'zip']
}

export function getImgUrl(name: string) {
  const list = Object.values(typeList).flat()

  const type = list.includes(fileType(name).toLowerCase()) ? fileType(name).toLowerCase() : 'unknow'
  return new URL(`../assets/fileType/${type}-icon.svg`, import.meta.url).href
}
// 是否是白名单后缀
export function isRightType(name: string, type: string) {
  return typeList[type].includes(fileType(name).toLowerCase())
}

/*
  从指定数组中过滤出对应的对象
*/
export function relatedObject(list: any, val: any, attr: string) {
  const filterData: any = list.filter((item: any) => item[attr] === val)?.[0]
  return filterData || null
}

// 排序
export function arraySort(list: Array<any>, property: any, desc?: boolean) {
  return list.sort((a: any, b: any) => {
    return desc ? b[property] - a[property] : a[property] - b[property]
  })
}

// 判断对象里所有属性全部为空
export function isAllPropertiesEmpty(obj: object) {
  return Object.values(obj).every(
    (value) =>
      value === null || typeof value === 'undefined' || (typeof value === 'string' && !value)
  )
}

// 数组对象中某一属性值的集合
export function getAttrsArray(array: Array<any>, attr: string) {
  return array.map((item) => {
    return item[attr]
  })
}

// 求和
export function getSum(array: Array<any>) {
  return array.reduce((total, item) => total + item, 0)
}

// 下载
export function downloadByURL(url: string, name: string) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('download', name)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// 截取文件名
export function cutFilename(filename: string, num: number) {
  const lastIndex = filename.lastIndexOf('.')
  const suffix = lastIndex === -1 ? '' : filename.substring(lastIndex + 1)
  return filename.substring(0, num - suffix.length - 1) + '.' + suffix
}

export function getNormalizedUrl(url: string) {
  if (url && !url.endsWith('/') && !/\.[^/]+$/.test(url)) {
    return url + '/'
  }
  return url
}
