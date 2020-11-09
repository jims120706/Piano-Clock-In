export default {
  setToken(state, token) {
    state.token = token;
    uni.setStorageSync("token", token)
  }
}