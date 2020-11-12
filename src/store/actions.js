export default {
  getDataFromStorage({commit}) {
    const tokenCache = uni.getStorageSync('token') || ''
    const userInfo = uni.getStorageSync('userInfo') || {}
    commit("setToken", tokenCache)
    commit("setUserInfo", userInfo)
  }
}