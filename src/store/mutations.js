export default {
  setToken(state, token) {
    state.token = token;
    uni.setStorageSync("token", token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    uni.setStorageSync("userInfo", userInfo)
  }
}