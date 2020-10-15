<template>
  <view
    class="custom-button justify-content-center align-items-center text-center"
    :style="btnStyle"
  >
    <image :src="icon" :lazy-load="true" class="icon"></image>
    <text :class="textSpanClass" class="text">{{ text }}</text>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "green",
    },
    color: {
      type: String,
      default: "black",
    },
    textspan: {
      type: String,
      default: '1'
    }
  },
  computed: {
    textSpanClass() {
      return `pl-${this.textspan}`
    },
    btnStyle() {
      return `color: ${this.color};background-color: ${this.bgColor};`;
    },
  },
};
</script>

<style lang="scss">
.custom-button {
  width: 100%;
  border-radius: 5px;
  padding: 20rpx 0;
  display: flex;
  > .icon {
    width: 50rpx;
    height: 50rpx;
  }
  > .text {
    font-size: 32rpx;
  }
}
</style>