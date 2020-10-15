class Animation {
  constructor(options = {}) {
    this._animationCtx = uni.createAnimation(options)
  }
  /**
   * 载入动画, 执行动画step, 返回动画的export
   * animationOptions: 动画参数对象
   * animationOptions.value 必须要是数组
   */
  startAnimation(animationOptions = {}) {
    // 动画参数的所有key值
    let _animationKeys = Object.keys(animationOptions);
    // 动画上下文未初始化
    // if (!this._animationCtx) {
    //   console.error('animationCtx 未初始化')
    //   return
    // }
    // 没有参数直接退出，不执行动画
    if (_animationKeys.length === 0) {
      return this._animationCtx.export();
    }
    // 累加执行动画
    _animationKeys.reduce((prev, curr, idx, arr) => {
      if (idx !== (_animationKeys.length - 1)) {
        return prev[curr](...animationOptions[curr])
      }else {
        // 最后一个执行step
        return prev[curr](...animationOptions[curr]).step()
      }
    }, this._animationCtx)
    return Promise.resolve(this._animationCtx.export())
  }
}

module.exports = Animation;
