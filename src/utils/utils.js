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

  return function() {
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

export {
  getUserInfo,
  log,
  curry,
  toast,
  getSystemInfo,
  rpxToPx,
  pxToRpx
}