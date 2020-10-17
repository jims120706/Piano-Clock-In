/**
 * appid: wx7da451220f27323b
  appsecret: 327dfe29a57b1b1fe51af4c0c93d515d
 */


const dev = {
  api1: 'http://47.112.209.215:8080',
  api2: 'http://47.112.209.215:8080',
  api3: 'http://47.112.209.215:8080'
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
  'test': 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJZYWVoZXJBUEkiLCJzdWIiOiIxIiwibmJmIjoxNjAyNDk2NDgwLCJyb2xlcyI6W10sImlzcyI6IllhZWhlckFQSSIsImV4cCI6MTYwMjg1NjQ4MCwiaWF0IjoxNjAyNDk2NDgwfQ.ZuSL5a1zUrf3Usln8X8stHNJRRZ3cmJ1BAisP2m_6Ek',
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
export const useMockToken = true // 是否使用mockToken
export const useLocalBaseUrl = false // 是否使用本地url作为请求的baseUrl，本地联调开发时用
export const mockToken = tokenList['test']// 写死的mockToken
export const localBaseUrl = localBaseUrlList['kai'] // 本地联调时的baseUrl