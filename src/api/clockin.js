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
    url: '/dailycheck/userTotalHours',
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

/**
 * 一周打卡数据统计
 * @param {number} index
 * @param {number} size
 */
function getHoursWeek(options = {}) {
  return requestGet({
    url: '/dailycheck/hoursWeek',
    ...options
  })
}

/**
 * 一月打卡数据统计
 * @param {number} index
 * @param {number} size
 */
function getHoursMonths(options = {}) {
  return requestGet({
    url: '/dailycheck/hoursMonths',
    ...options
  })
}
/**
 * 本年打卡统计
 */
function getHoursYear(options = {}) {
  return requestGet({
    url: '/dailycheck/hoursYear',
    ...options
  })
}

/**
 * 按时间查询的打卡数据统计
 * @param {number} index
 * @param {number} size
 */
function findCondition(options = {}) {
  return requestPost({
    url: '/dailycheck/findCondition',
    ...options
  })
}

/**
 * 当日打卡明细数据统计
 * @param {number} index
 * @param {number} size
 */
function getTodayDetails(options = {}) {
  return requestPost({
    url: '/dailycheck/details',
    ...options
  })
}



const apis = {
  dailycheckCommit,
  dailycheckSupply,
  dailycheckHoursTotal,
  getDailycheckCounts,
  getHoursWeek,
  getHoursMonths,
  findCondition,
  getTodayDetails,
  getHoursYear
}

export default apis
