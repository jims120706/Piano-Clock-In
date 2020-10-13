import { requestGet, requestPost } from '@/utils/request'
/**
 * 获取sessionKey
 */
async function getSessionKey(options) {
  return await requestGet({
    url: '/wechat/getSessionKey',
    ...options
  })
}

const apis = {
  getSessionKey
}

export default apis
