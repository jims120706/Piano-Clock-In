import {
  getWeekDay,
  isDateInWeek,
  getMonthDay,
  compatibleDateString,
} from "@/utils/utils";

const today = new Date();

const month = [
  "1号",
  "2号",
  "3号",
  "4号",
  "5号",
  "6号",
  "7号",
  "8号",
  "9号",
  "10号",
  "11号",
  "12号",
  "13号",
  "14号",
  "15号",
  "16号",
  "17号",
  "18号",
  "19号",
  "20号",
  "21号",
  "22号",
  "23号",
  "24号",
  "25号",
  "26号",
  "27号",
  "28号",
  "29号",
  "30号",
  "31号",
]

const Categories = {
  week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  month: month.slice(0, getMonthDay(today.getFullYear(), today.getMonth())),
  year: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
};

// 本周数据生成器
function _generateWeekData(remoteData = [], initHours) {
  remoteData.forEach((item) => {
    let checkDate = item.checkDate;
    // 判断打卡日期是否在本周
    if (isDateInWeek(checkDate)) {
      // 获取今天是周几，找出下标添加时间
      const weekDay = getWeekDay(checkDate);
      // console.log("weekDay", weekDay)
      const index = Categories.week.findIndex(
        (weekday) => weekday === weekDay
      );
      // console.log("index", index)
      if (index !== -1) {
        initHours[index] += item.hours;
      }
    }
  });
  return initHours;
}

// 本月数据生成器
function _generateMonthData(remoteData = [], initHours) {
  remoteData.forEach((item) => {
    let checkDate = item.checkDate;
    // 获取checkDate的日期和month数组中的日期作比较获取下标
    let date = new Date(compatibleDateString(checkDate)).getDate();
    let dateIndex = Categories.month.findIndex(d => parseInt(d) === date);
    if (dateIndex !== -1) {
      initHours[dateIndex] += item.hours;
    }
  });
  return initHours;
}

// 本年数据生成器
function _generateYearData(remoteData = {}, initHours) {
  Object.keys(remoteData).forEach(month => {
    console.log("month", month)
    console.log("remoteData", remoteData[month])
    let month_n = parseInt(month);
    initHours[month_n - 1] = remoteData[month].reduce((prev, curr, index, arr) => {
      if (index === arr.length - 1) {
        return prev.hours + curr.hours
      }
      return {
        hours: prev.hours + curr.hours
      }
    }, {
      hours: 0
    })
  })
  return initHours;
}

const _generateDataFactorey = {
  _generateWeekData,
  _generateMonthData,
  _generateYearData
}

/**
 * 图表工厂函数
 */
class ChartDataFactory {
  static generateChartData(data, category) {
    if (!category || !Categories[category]) {
      throw new Error("category is not exist, please check");
    }
    let initHours;
    switch (category) {
      case 'week':
        initHours = new Array(Categories.week.length).fill(0);
        break;
      case 'month':
        initHours = new Array(Categories.month.length).fill(0);
        break;
      case 'year':
        initHours = new Array(Categories.year.length).fill(0);
        break;
      default:
        initHours = new Array(Categories.week.length).fill(0);
        break;
    }
    const CategoryUpper = category[0].toUpperCase() + category.slice(1);
    return _generateDataFactorey[`_generate${CategoryUpper}Data`](data, initHours)
  }
}

export default ChartDataFactory
export {
  Categories
}