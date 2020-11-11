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
  box-shadow: 0px 6px 12px 6px rgba(87, 86, 96, 0.05);
  > .icon {
    width: 50rpx;
    height: 50rpx;
  }
  > .text {
    font-size: 32rpx;
  }
}
</style>