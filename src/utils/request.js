import {
  curry
} from './utils';
import config, {
  useMockToken,
  useLocalBaseUrl,
  mockToken,
  localBaseUrl
} from './request-config'
const {
  api1,
  api2,
  api3,
} = config

// 是否使用本地url作为请求的baseUrl，本地联调开发时用
let baseUrl = useLocalBaseUrl ? localBaseUrl : api1

/**
 * 公用请求函数
 */
function _request(method = 'GET', options = {}) {
  let _baseUrl = options.baseUrl || baseUrl;
  options.header = options.header || {}
  let header = Object.assign({}, options.header, {
    "Content-Type": "application/json",
  });
  let url = options.url || '';
  let data = options.data || {};
  let useLoading = ('' + options.useLoading === 'false' || '' + options.useLoading === 'true') ? options.useLoading : true;
  const {
    responseType = 'text',
      isToken = true, // 是否需要token请求
      loadingTitle = '加载中'
  } = options;
  /**
   * 如果参数必须要放在url中，对url进行处理
   */
  if (options.isQuery) {
    let keys = Object.keys(data);
    keys.forEach((key, index) => {
      url += `${index === 0 ? '?' : ''}${key}=${data[key]}${keys.length > 0 && index !== (keys.length - 1) ? '&' : ''}`
    })
    data = {}
  }
  if (isToken) {
    let token = useMockToken ? mockToken : uni.getStorageSync('token')
    if (!useLocalBaseUrl) {
      _baseUrl = url.includes('/api/TencentCosAccessTokenType') ? api3 : api2
    }
    if (token) {
      header = {
        ...header,
        'Authorization': `Bearer ${token}`
      }
    }
  }
  return new Promise((resolve, reject) => {
    if (useLoading) {
      uni.showLoading({
        title: loadingTitle,
        mask: true
      })
    }
    uni.request({
      url: _baseUrl + url,
      method,
      data,
      header,
      responseType,
      complete: () => {
        if (useLoading) {
          uni.hideLoading()
        }
      },
      success: (res) => {
        resolve(res.data)
      },
      fail(err) {
        uni.showToast({
          title: '请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

// get请求
export const requestGet = curry(_request, ['GET']);
// post请求
export const requestPost = curry(_request, ['POST']);