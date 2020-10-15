/**
 * appid: wx7da451220f27323b
  appsecret: 327dfe29a57b1b1fe51af4c0c93d515d
 */


const dev = {
  api1: 'http://www.dailycheck.top:8080',
  api2: 'http://www.dailycheck.top:8080',
  api3: 'http://www.dailycheck.top:8080'
}

const prod = {
  api1: 'http://www.dailycheck.top:8080',
  api2: 'http://www.dailycheck.top:8080',
  api3: 'http://www.dailycheck.top:8080'
}

const apiConfig = {
  // 开发版
  develop: dev,
  // 体验版
  trial: prod,
  // 正式版
  release: prod
}

// token对象
const tokenList = {
  'xiaohuaha1': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWM3hPTmFGTHNIeC1ySjMqSXdANk8iLCJuYmYiOjE1NzE4MTY4NjAsIm9wZW5pZCI6Ik4vQSIsInJvbGVzIjpbXSwiaXNzIjoiY29tLnlhZWhlciIsImV4cCI6NDEwMjQ0NDc5OSwiaWF0IjoxNjcxODE2ODYwfQ.ep8a6V-_Ng6O5zEPv1EEsuMYiHMfhha6gc_iZ3Ez0is',
  'xiaoxiao': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5ZmViUXlnaTpWWUJSWlBmN1U1SmYiLCJuYmYiOjE1OTU5OTQ4MjIsInJvbGVzIjpbXSwiaXNzIjoidXNlcmluZm8tdmF1bHQiLCJleHAiOjE2OTYwMDkyMjIsImlhdCI6MTU5NTk5NDgyMn0.n8OdKAYQs0bXNIu4dP-pz5JyFVMs3SPvdVYCEUpo1Pg',
  'zhoujun': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJJflFudDM5bWluTWF1dkxALlQ2QG4iLCJuYmYiOjE1NzE4MTY4NjAsIm9wZW5pZCI6Ik4vQSIsInJvbGVzIjpbXSwiaXNzIjoiY29tLnlhZWhlciIsImV4cCI6NDEwMjQ0NDc5OSwiaWF0IjoxNjcxODE2ODYwfQ.Q9wUp2BznEeik7xBkaoV0DpUnkbMe8FOw3_YM921y0Q',
  'xiaoxiao_new': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJRbXVxWGNkZXhXNFE2OFQyR0RtZkMiLCJuYmYiOjE1OTU5OTQ4MjIsInJvbGVzIjpbXSwiaXNzIjoidXNlcmluZm8tdmF1bHQiLCJleHAiOjE2OTYwMDkyMjIsImlhdCI6MTU5NTk5NDgyMn0.-ZZ_bCFQVFXbpr7-HuXA1JzsnJQQUn96Vdle-YC8ajM'
}

// 本地联调的baseUrl列表，一般他们不会关机，所以不用改
const localBaseUrlList = {
  kai: 'http://192.168.2.111:8080', // 凯哥电脑
}

/*
 * env类型
 * develop	开发版
 * trial	体验版
 * release	正式版
 */
const accountInfo = wx.getAccountInfoSync()
export const env = accountInfo.miniProgram.envVersion

if (!env) {
  console.error("获取运行环境失败!")
}

export default apiConfig[env]
export const useMockToken = false // 是否使用mockToken
export const useLocalBaseUrl = false // 是否使用本地url作为请求的baseUrl，本地联调开发时用
export const mockToken = tokenList['xiaoxiao']// 写死的mockToken
export const localBaseUrl = localBaseUrlList['kai'] // 本地联调时的baseUrl