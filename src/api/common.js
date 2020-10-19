import { requestGet, requestPost } from '@/utils/request'
/**
 * 获取sessionKey
 */
function getSessionKey(options = {}) {
  return requestGet({
    url: '/wechat/getSessionKey',
    isToken: false,
    ...options
  })
}

function login(options = {}) {
  return requestPost({
    url: '/authentication/login', 
    isToken: false,
    ...options
  })
}

const apis = {
  getSessionKey,
  login
}

export default apis
