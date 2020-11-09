export default {
  getDataFromStorage({commit}) {
    const tokenCache = uni.getStorageSync('token') || ''
    commit("setToken", tokenCache)
  }
}