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
  const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  let dateObj = new Date(dateStr.replace(/-/ig, "/"));
  return week[dateObj.getDay()]
}

/**
 * 获取本周周一
 */
function getMondayOfWeek(dateStr, resultType = 'obj') {
  let dateObj = new Date(dateStr.replace(/-/ig, "/"));
  let day = dateObj.getDay() || 7;
  if (resultType === 'obj') {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 - day);
  }else {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 - day).toLocaleDateString()
  }
};

/**
 * 获取本周周日
 */
function getSundayOfWeek(dateStr, resultType = 'obj') {
  let dateObj = new Date(dateStr.replace(/-/ig, "/"));
  let day = dateObj.getDay() || 7;
  if (resultType === 'obj') {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 + day);
  }else {
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1 + day).toLocaleDateString()
  }
};

/**
 * 当前日期是否在本周中
 */
function isDateInWeek(dateStr) {
  let monday = getMondayOfWeek(dateStr, 'str');
  monday += " 00:00:00";
  monday = new Date(monday);
  let sunday = getSundayOfWeek(dateStr, 'str');
  sunday += " 23:59:59"
  sunday = new Date(sunday);
  let dateObj = new Date(dateStr.replace(/-/ig, "/"));
  return dateObj.getTime() >= monday.getTime() && dateObj.getTime() <= sunday.getTime()
}

/**
 * 获取本月有多少天
 */
function getMonthDay(year, month) {
  let days = new Date(year, month + 1, 0).getDate()
  return days
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
  getMonthDay
}