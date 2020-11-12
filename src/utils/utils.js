import {
  weekEngMap,
  weekChiMap,
  monthEngMap,
  monthChiMap,
  monthNumMap
} from './maps'

/**
 * 获取用户信息
 */
function getUserInfo(options = {}) {
  uni.getUserInfo({
    withCredentials: false,
    lang: 'zh-CN',
    success: () => {},
    fail: () => {},
    complete: () => {},
    ...options,
  })
}

/** 
 * 获取系统信息
 * 
 */
async function getSystemInfo() {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 柯理化函数
function curry(fn, args) {
  var length = fn.length; // 函数的形数
  var args = Array.prototype.slice.call(args, 0) || []; // 实参

  return function () {
    var _args = args.slice(0),
      arg, i;
    for (i = 0; i < arguments.length; i++) {

      arg = arguments[i];

      _args.push(arg);

    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

/**
 * 我的log，给输出的文字添加上-----
 */
function log() {
  let args = Array.prototype.slice.call(arguments, 1, arguments.length);
  console.log(`-----${arguments[0]}-----`, ...args);
}

function toast(options = {}) {
  uni.showToast({
    icon: 'none',
    ...options
  })
}

/**
 * 
 * rpx换算px (屏幕宽度/750)
 * 1px = 屏幕宽度/750 * rpx
 */
async function rpxToPx(rpx) {
  const res = await getSystemInfo();
  return {
    trans: res.screenWidth / 750 * rpx,
    ...res
  };
}

/**
 * 
 * px换算rpx (750/屏幕宽度) 
 * 1rpx = 750/屏幕宽度 * px
 */
async function pxToRpx(px) {
  const res = await getSystemInfo();
  return {
    trans: 750 / res.screenWidth * px,
    ...res
  };
}

// 生成随机数值
function getRandomArr(arrLen, maxValue = 100) {
  let arr = [];
  for (let i = 0; i < arrLen; i++) {
    arr.push(parseInt(Math.random() * maxValue) + 1);
  }
  return arr;
}

/**
 * 获取当前日期是周几
 */
function getWeekDay(dateStr) {
  const week = weekChiMap;
  let dateObj = new Date(compatibleDateString(dateStr));
  return week[dateObj.getDay()]
}

/**
 * 获取本周周一
 */
function getMondayOfWeek(dateStr, resultType = 'obj') {
  let dateObj = new Date(compatibleDateString(dateStr));
  let day = dateObj.getDay() || 7;
  if (resultType === 'obj') {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 - day);
  } else {
    return getDateString(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 - day))
  }
};

/**
 * 获取本周周日
 */
function getSundayOfWeek(dateStr, resultType = 'obj') {
  let dateObj = new Date(compatibleDateString(dateStr));
  let day = dateObj.getDay() || 7;
  if (resultType === 'obj') {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 + day);
  } else {
    return getDateString(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 + day))
  }
};

/**
 * 当前日期是否在本周中
 */
function isDateInWeek(dateStr) {
  let monday = getMondayOfWeek(dateStr, 'str');
  monday += " 00:00:00";
  monday = compatibleDateString(monday)
  monday = new Date(monday);
  let sunday = getSundayOfWeek(dateStr, 'str');
  sunday += " 23:59:59"
  sunday = compatibleDateString(sunday)
  sunday = new Date(sunday);
  let dateObj = new Date(compatibleDateString(dateStr));
  // console.log("dateObj.getTime()", dateObj.getTime())
  // console.log("monday.getTime()", monday.getTime())
  // console.log("sunday.getTime()", sunday.getTime())
  return dateObj.getTime() >= monday.getTime() && dateObj.getTime() <= sunday.getTime()
}

/**
 * 获取本月有多少天
 */
function getMonthDay(year, month) {
  let days = new Date(year, month + 1, 0).getDate()
  return days
}

/**
 * 处理数组，小于10补0, 大于10维持
 */
function handleDateTimeStr(str, splitChar = "-") {
  let arr;
  if (str.length <= 0) {
    return ''
  }
  arr = str.split(splitChar);
  arr = arr.map(num => {
    num = parseInt(num);
    if (0 <= num && num < 10) {
      num = `0${num}`
    }
    return `${num}`
  })
  return arr.join(splitChar);
}

function getDateString(dateObj) {
  // "Tue Nov 10 2020 14:30:02 GMT+0800 (中国标准时间)"
  let str = dateObj.toString();
  let s_arr = str.split(" ");
  let year = s_arr[3]
  let monthIndex = monthEngMap.findIndex(month => s_arr[1] === month)
  let month = monthNumMap[monthIndex];
  let date = s_arr[2];
  return `${year}-${month}-${date}`
}

function initUserAuthorize(scope = '') {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success(settings) {
        if (!settings.authSetting[scope]) {
          uni.authorize({
            scope,
            success(res) {
              resolve(res)
            },
            fail(err) {
              console.error('已经授权过', err)
              reject(err)
            }
          })
        } else {
          resolve(settings)
        }
      },
      fail(err) {
        resject(err)
      }
    })
  })
}

function getFloat(number, fixed = 1) {
  return parseFloat(number).toFixed(fixed)
}

function compatibleDateString(dateStr) {
  return dateStr.replace(/\-/ig, "/")
}

export {
  getUserInfo,
  log,
  curry,
  toast,
  getSystemInfo,
  rpxToPx,
  pxToRpx,
  getRandomArr,
  getWeekDay,
  getMondayOfWeek,
  getSundayOfWeek,
  isDateInWeek,
  getMonthDay,
  handleDateTimeStr,
  getDateString,
  initUserAuthorize,
  getFloat,
  compatibleDateString
}