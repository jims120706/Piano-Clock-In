import { requestGet, requestPost } from '@/utils/request'
/**
 * 打卡
 * @param {string} startTimeStr
 * @param {string} endTimeStr
 */
function dailycheckCommit(options = {}) {
  return requestPost({
    url: '/dailycheck/commit',
    ...options
  })
}

/**
 * 补卡
 * @param {string} date
 * @param {string} minutes
 */
function dailycheckSupply(options = {}) {
  return requestPost({
    url: '/dailycheck/supply',
    ...options
  })
}

const apis = {
  dailycheckCommit,
  dailycheckSupply
}

export default apis
