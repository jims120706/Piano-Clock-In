/**
 * appid: wx7da451220f27323b
  appsecret: 327dfe29a57b1b1fe51af4c0c93d515d
 */


const dev = {
  api1: 'http://shenqindaka.top:8080',
  api2: 'http://shenqindaka.top:8080',
  api3: 'http://shenqindaka.top:8080'
}

const prod = {
  api1: 'http://shenqindaka.top:8080',
  api2: 'http://shenqindaka.top:8080',
  api3: 'http://shenqindaka.top:8080'
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
  'test': "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWthIiwic3ViIjoiMSIsIm5iZiI6MTYwNDg5MjM1OCwicm9sZXMiOltdLCJpc3MiOiJkYWthIiwiZXhwIjoxNjA1MjUyMzU4LCJpYXQiOjE2MDQ4OTIzNTh9.2wf9c4JAeQWOZ0lGd6k_0To-Vib9Arjwe7Lj3xq_J7Y"
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
const accountInfo = uni.getAccountInfoSync()
export const env = accountInfo.miniProgram.envVersion

if (!env) {
  console.error("获取运行环境失败!")
}

export default apiConfig[env]
export const useMockToken = false // 是否使用mockToken
export const useLocalBaseUrl = false // 是否使用本地url作为请求的baseUrl，本地联调开发时用
export const mockToken = tokenList['test']// 写死的mockToken
export const localBaseUrl = localBaseUrlList['kai'] // 本地联调时的baseUrl