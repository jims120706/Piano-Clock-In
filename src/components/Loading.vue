<template>
  <popup-container
    class="loading-popup"
    ref="popup"
    :showHead="false"
    :closeIcon="false"
    :maskCloseable="false"
    cWidth="50"
  >
    <view>
      <image
        src="@/static/images/loading.gif"
        :lazy-load="true"
        class="icon"
        mode="widthFix"
      ></image>
    </view>
    <view class="text">
      <text class="span">加</text>
      <text class="span">载</text>
      <text class="span">中</text>
      <text class="span">.</text>
      <text class="span">.</text>
      <text class="span">.</text>
    </view>
  </popup-container>
</template>

<script>
import PopupContainer from "@/components/Popup";
export default {
  components: {
    PopupContainer,
  },
  methods: {
    show() {
      this.$refs.popup.open();
    },
    hide() {
      this.$refs.popup.close();
    },
  },
  mounted() {
    this.$loading = this.$refs.popup;
  },
};
</script>

<style lang="scss">
.loading-popup {
  .icon {
    width: 300rpx;
  }
  .text {
    margin-top: 20rpx;
    text-align: center;
    font-size: 38rpx;
    color: #323233;
    > .span {
      text-transform: uppercase;
      font-weight: 600;
      opacity: 0;
      display: inline-block;
      padding: 0 10rpx;
      animation: letterWave 1.2s infinite linear;
    }
    > .span:nth-child(0) {
      animation-delay: 0ms;
    }
    > .span:nth-child(1) {
      animation-delay: 250ms;
    }
    > .span:nth-child(2) {
      animation-delay: 500ms;
    }
    > .span:nth-child(3) {
      animation-delay: 750ms;
    }
    > .span:nth-child(4) {
      animation-delay: 1000ms;
    }
    > .span:nth-child(5) {
      animation-delay: 1250ms;
    }
    > .span:nth-child(6) {
      animation-delay: 1500ms;
    }
  }
}
@keyframes letterWave {
  0%,
  100% {
    transform: translateY(0) scale(1);
    padding: 0 5rpx;
    opacity: 0.8;
  }
  25% {
    transform: translateY(-10rpx) scale(0.8);
    padding: 0 0rpx;
    opacity: 0.6;
  }
  75% {
    transform: translateY(10rpx) scale(1.5);
    padding: 0px 10rpx;
    opacity: 1;
  }
}
</style>