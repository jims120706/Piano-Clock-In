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

/**
 * 获取打卡总时长
 */
function dailycheckHoursTotal(options = {}) {
  return requestGet({
    url: '/dailycheck/hoursTotal',
    ...options
  })
}

/**
 * 打卡图表数据统计
 * @param {number} index
 * @param {number} size
 */
function getDailycheckCounts(options = {}) {
  return requestGet({
    url: '/dailycheck/pages',
    ...options
  })
}

const apis = {
  dailycheckCommit,
  dailycheckSupply,
  dailycheckHoursTotal,
  getDailycheckCounts
}

export default apis
