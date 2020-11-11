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
      default: "#2A9F93",
    },
    color: {
      type: String,
      default: "black",
    },
    textspan: {
      type: String,
      default: "1",
    },
    btnPadding: {
      type: String,
      default: "20",
    },
  },
  computed: {
    textSpanClass() {
      return `pl-${this.textspan}`;
    },
    btnStyle() {
      return `color: ${this.color};background-color: ${this.bgColor};padding: ${this.btnPadding}rpx 0;`;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  width: 100%;
  border-radius: 5px;
  display: flex;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  > .icon {
    width: 50rpx;
    height: 50rpx;
  }
  > .text {
    font-size: 32rpx;
  }
}
</style>