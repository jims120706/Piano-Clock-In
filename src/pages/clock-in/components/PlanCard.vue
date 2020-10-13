<template>
  <view class="container plan-card p-0 mt-2">
    <view class="row row1 no-gutters align-items-center">
      <view class="my-col col-3 justify-content-center text-center">
        <image
          src="@/static/images/clock-in/piano.svg"
          :lazy-load="true"
          class="icon"
        ></image>
      </view>
      <view class="my-col col-6">
        <view class="pl-2 title">钢琴</view>
        <view class="pl-2 date pt-1">2020-10-13</view>
      </view>
      <view class="my-col col-3 justify-content-center text-center">
        <view class="time">42</view>
        <view class="unit pt-1">hours</view>
      </view>
    </view>
    <view class="row row2 no-gutters align-items-center">
      <view class="col justify-content-center text-center">
        <view class="unit">20</view>
        <view class="text pt-1">坚持天数</view>
      </view>
      <view class="col justify-content-center text-center">
        <view class="unit">10h</view>
        <view class="text pt-1">平均每周</view>
      </view>
      <view class="col justify-content-center text-center">
        <view class="unit">0h</view>
        <view class="text pt-1">最近7天</view>
      </view>
      <view class="col justify-content-center text-center">
        <view class="unit">9h</view>
        <view class="text pt-1">距离目标</view>
      </view>
    </view>
    <view class="row row3 no-gutters justify-content-center align-items-center mt-3 pb-4">
      <view class="col-5 align-items-center">
        <custom-button color="white" bgColor="rgb(233, 117, 40)" text="分享" :icon="require('@/static/images/clock-in/share.svg')"></custom-button>
      </view>
      <view class="col-5 ml-4 align-items-center">
        <custom-button color="white" bgColor="rgb(233, 117, 40)" text="添加" :icon="require('@/static/images/clock-in/add.svg')"></custom-button>
      </view>
    </view>
  </view>
</template>

<script>
import CustomButton from "@/components/CustomButton";
export default {
  components: {
    CustomButton,
  },
};
</script>

<style lang="scss">
.plan-card {
  border-radius: 10px;
  background: white;
  > .row1 {
    height: 200rpx;
    .icon {
      width: 100rpx;
      height: 100rpx;
      background: orange;
      border-radius: 50%;
      padding: 10rpx;
    }
    .title {
      font-size: 48rpx;
      font-weight: bold;
    }
    .date {
      font-size: 32rpx;
    }
    .time {
      font-size: 48rpx;
      color: rgb(233, 117, 40);
    }
    .unit {
      font-size: 32rpx;
      color: rgb(233, 117, 40);
    }
  }
  > .row2 {
    .unit {
      font-size: 48rpx;
      color: rgb(233, 117, 40);
    }
    .text {
      font-size: 32rpx;
    }
  }
  >.row3 {
  }
}
</style>