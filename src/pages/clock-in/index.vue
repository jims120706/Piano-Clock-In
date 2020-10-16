<template>
  <view class="clock-in">
    <comp-plan-card @onAddBtnClick="_handlePlanAddClick"></comp-plan-card>
    <clock-in-popup ref="clockInPopup"></clock-in-popup>
    <loading ref="loading"></loading>
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
  mounted() {
    log('loading', this.$refs.loading)
    this.$refs.loading.show()
  },
  methods: {
    _showPopup() {
      this.$refs.clockInPopup.open();
    },
    // 点击添加打卡按钮回调
    _handlePlanAddClick() {
      this._showPopup();
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
