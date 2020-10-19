<template>
  <view class="popup-comp" v-show="visible" :animation="animationData">
    <view class="bg" @click.stop="maskClose" :style="bgStyle"></view>
    <view class="_container" :style="ctnStyle">
      <view class="_head" v-if="showHead">
        <text>{{ title }}</text>
        <image
          v-if="closeIcon"
          @click="_handleClick"
          src="@/static/images/close.svg"
          class="close-btn"
          :lazy-load="true"
        ></image>
      </view>
      <view class="_body">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script>
// 创建动画对象
import AnimationCreator from "@/utils/animate";
const AnimationManager = new AnimationCreator({
  duration: 250,
});

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    cWidth: {
      type: String,
      default: "80",
    },
    cHeight: {
      type: String,
      default: "",
    },
    bgTransparent: {
      type: Boolean,
      default: false,
    },
    showHead: {
      type: Boolean,
      default: true,
    },
    closeIcon: {
      type: Boolean,
      default: true,
    },
    maskCloseable: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    ctnStyle() {
      return `width: ${this.cWidth}vw;height: ${
        this.cHeight ? this.cHeight + "vh" : "auto"
      };max-height: 80vh;`;
    },
    bgStyle() {
      return `opacity: ${this.bgTransparent ? 0 : 0.5};`;
    },
  },
  data() {
    return {
      visible: false,
      animationData: null,
    };
  },
  mounted() {
    AnimationManager.startAnimation({
      opacity: [0],
    }).then((animationData) => {
      this.animationData = animationData;
    });
  },
  methods: {
    open() {
      this.visible = true;
      setTimeout(() => {
        AnimationManager.startAnimation({
          opacity: [1],
        }).then((animationData) => {
          this.animationData = animationData;
        });
      }, 100);
    },
    close() {
      AnimationManager.startAnimation({
        opacity: [0],
      }).then((animationData) => {
        this.animationData = animationData;
        setTimeout(() => {
          this.visible = false;
        }, 300);
      });
    },
    maskClose() {
      if(!this.maskCloseable) return;
      this.close()
    },
    _handleClick() {
      this.$emit("onBeforeClose");
      this.close();
      this.$emit("onClose");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-comp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  > .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    z-index: 1001;
  }
  > ._container {
    position: relative;
    background: white;
    overflow: hidden;
    z-index: 1002;
    // padding: 20rpx;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    > ._head {
      text-align: center;
      width: 100%;
      font-size: 48rpx;
      font-weight: bold;
      border-bottom: 1px solid #ebedf0;
      height: 100rpx;
      position: relative;
      > .close-btn {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        right: 0;
        top: 17rpx;
      }
    }
    > ._body {
      flex: 1;
      font-size: 32rpx;
      padding: 40rpx;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
}
</style>