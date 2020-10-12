/**
 * 获取用户信息
 */
function getUserInfo(options = {}) {
  uni.getUserInfo({
    withCredentials: false,
    lang: 'zh-CN',
    success: () => { },
    fail: () => { },
    complete: () => { },
    ...options,
  })
}

/**
 * 我的log，给输出的文字添加上-----
 */
function log() {
  let args = Array.prototype.slice.call(arguments, 1, arguments.length);
  console.log(`-----${arguments[0]}-----`, ...args);
}

export {
  getUserInfo,
  log
}