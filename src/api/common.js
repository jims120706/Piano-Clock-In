import { requestGet, requestPost } from '@/utils/request'
/**
 * 获取sessionKey
 */
function getSessionKey(options = {}) {
  return requestGet({
    url: '/wechat/getSessionKey',
    ...options
  })
}

function login(options = {}) {
  return requestPost({
    url: '/authentication/login',
    ...options
  })
}

const apis = {
  getSessionKey,
  login
}

export default apis
