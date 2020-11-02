
import {
  getWeekDay,
  isDateInWeek,
  getMonthDay,
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

function _generateChartData(remoteData = [], data) {
  remoteData.forEach((item) => {
    let checkDate = item.checkDate;
    // 判断打卡日期是否在本周
    if (isDateInWeek(checkDate)) {
      // 获取今天是周几，找出下标添加时间
      const weekDay = getWeekDay(checkDate);
      console.log("weekDay", weekDay)
      const index = Categories.week.findIndex(
        (weekday) => weekday === weekDay
      );
      console.log("index", index)
      if (index !== -1) {
        data[index] += item.hours;
      }
    }
  });
  return data;
}

/**
 * 图表工厂函数
 */
class ChartDataFactory {
  static generateChartData(data = [], category) {
    if (!category || !Categories[category]) {
      throw new Error("category is not exist, please check");
    }
    let arr;
    switch (category) {
      case 'week':
        arr = new Array(Categories.week.length).fill(0);
        break;
      case 'month':
        arr = new Array(Categories.month.length).fill(0);
        break;
      case 'year':
        arr = new Array(Categories.year.length).fill(0);
        break;
      default:
        arr = new Array(Categories.week.length).fill(0);
        break;
    }
    return _generateChartData(data, arr)
  }
}

export default ChartDataFactory
export {
  Categories
}