<template>
  <view class="clock-in">
    <comp-plan-card @onBtnClick="_handlePlanAddClick"></comp-plan-card>
  </view>
</template>

<script>
import { log } from "@/utils/utils";
import CompPlanCard from "./components/PlanCard";
import ClockInPopup from "./components/ClockInPopup";
export default {
  components: {
    CompPlanCard,
    ClockInPopup,
  },
  data() {
    return {
      title: "clock-in",
    };
  },
  onLoad() {},
  mounted() {},
  methods: {
    /**
     * 点击打卡或补卡按钮回调
     * @param {string} type
     * replenish 补卡
     * clockIn 打卡
     */
    _handlePlanAddClick(type) {
      uni.navigateTo({
        url: `/pages/clock-in/add?type=${type}`
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-in {
  background: #f3f0f0;
  height: 100%;
  padding: 0 40rpx;
  overflow: hidden;
}
</style>
