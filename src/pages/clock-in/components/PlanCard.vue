<template>
  <view class="container plan-card p-0 mt-4">
    <view class="row row1 no-gutters align-items-center">
      <view class="my-col col-3 justify-content-center text-center">
        <image
          src="@/static/images/clock-in/piano.png"
          :lazy-load="true"
          class="icon"
        ></image>
      </view>
      <view class="my-col col-6">
        <view class="pl-2 title">{{ textConfig.theme }}</view>
        <view class="pl-2 date pt-1">{{ today }}</view>
      </view>
      <view class="my-col col-3 justify-content-center text-center">
        <view class="time">{{ totalHours }}h</view>
        <view class="unit pt-1">累计时间</view>
      </view>
    </view>
    <view class="row row2 no-gutters align-items-center">
      <view class="col justify-content-center text-center">
        <view class="unit">{{ todayHours }}h</view>
        <view class="text pt-1">今日累计</view>
      </view>
      <view class="col justify-content-center text-center">
        <view class="unit">{{ weekHours }}h</view>
        <view class="text pt-1">本周累计</view>
      </view>
      <view class="col justify-content-center text-center">
        <view class="unit">{{ monthHours }}h</view>
        <view class="text pt-1">本月累计</view>
      </view>
      <!-- <view class="col justify-content-center text-center">
        <view class="unit">{{ totalHours }}h</view>
        <view class="text pt-1">累计时间</view>
      </view> -->
      <view class="col justify-content-center text-center">
        <view class="unit">{{ yearHours }}h</view>
        <view class="text pt-1">本年累计</view>
      </view>
      <!-- <view class="col justify-content-center text-center">
        <view class="unit">{{ targetDistanceHours }}h</view>
        <view class="text pt-1">距离目标</view>
      </view> -->
    </view>
    <view
      class="row row3 no-gutters justify-content-center align-items-center mt-3 pb-4"
    >
      <view class="col-5 align-items-center">
        <custom-button
          color="white"
          text="补卡"
          :icon="require('@/static/images/clock-in/replenish.svg')"
          @click.native="_onBtnClick('replenish')"
        ></custom-button>
      </view>
      <view class="col-5 ml-4 align-items-center">
        <custom-button
          color="white"
          :text="textConfig.action"
          :icon="require('@/static/images/clock-in/add.svg')"
          @click.native="_onBtnClick('clockIn')"
        ></custom-button>
      </view>
    </view>
  </view>
</template>

<script>
import { getDateString } from "@/utils/utils";
import CustomButton from "@/components/CustomButton";
import textConfig from "@/utils/text-config";
export default {
  props: {
    todayHours: {
      type: Number,
      default: 0,
    },
    yearHours: {
      type: Number,
      default: 0,
    },
    weekHours: {
      type: Number,
      default: 0,
    },
    monthHours: {
      type: Number,
      default: 0,
    },
    totalHours: {
      type: Number,
      default: 0,
    },
  },
  components: {
    CustomButton,
  },
  methods: {
    _onBtnClick(type) {
      this.$emit("onBtnClick", type);
    },
  },
  data() {
    return {
      textConfig,
      today: getDateString(new Date()),
    };
  },
};
</script>

<style lang="scss" scoped>
.plan-card {
  border-radius: 10px;
  background: white;
  color: #14c5b4;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  > .row1 {
    height: 200rpx;
    .icon {
      width: 100rpx;
      height: 100rpx;
      // background: orange;
      border-radius: 50%;
      border: 1px solid #14c5b4;
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
    }
    .unit {
      font-size: 32rpx;
    }
  }
  > .row2 {
    .unit {
      font-size: 36rpx;
    }
    .text {
      font-size: 32rpx;
    }
  }
  > .row3 {
  }
}
</style>