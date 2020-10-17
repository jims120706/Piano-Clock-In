<template>
  <view class="clock-in">
    <comp-plan-card :totalHours="totalHours" @onBtnClick="_handlePlanAddClick">
    </comp-plan-card>
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
      // 打卡总时长
      totalHours: 0,
    };
  },
  onShow() {
    // 每次进入该页面都要刷新打卡总时长
    this._refreshClockInTotalHours();
    // 获取图表数据
    this._getDailycheckCounts();
  },
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
        url: `/pages/clock-in/add?type=${type}`,
      });
    },
    /**
     * 刷新打卡总时长
     */
    _refreshClockInTotalHours() {
      this.$api.clockInApi.dailycheckHoursTotal().then((res) => {
        log("打卡总时长", res.item.toFixed(1));
        this.totalHours = parseFloat(res.item.toFixed(1));
      });
    },
    /**
     * 打卡图表数据
     * @param {number} index
     * @param {number} size
     */
    _getDailycheckCounts() {
      this.$api.clockInApi
        .getDailycheckCounts({
          data: {
            index: 0,
            size: 10,
          },
        })
        .then((res) => {
          log("打卡图表数据", res.item);
        });
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
