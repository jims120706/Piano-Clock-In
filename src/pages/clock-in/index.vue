<template>
  <view class="clock-in">
    <comp-plan-card :totalHours="totalHours" @onBtnClick="_handlePlanAddClick">
    </comp-plan-card>
    <view class="container p-0">
      <view class="row no-gutters">
        <view class="col">
          <u-charts
            :opts="chartOptions"
            :cWidth="chartWidth"
            v-if="showChart"
          ></u-charts>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { log, getSystemInfo, rpxToPx } from "@/utils/utils";
import CompPlanCard from "./components/PlanCard";
import ClockInPopup from "./components/ClockInPopup";
import UCharts from "@/components/UCharts";
import chartMockData from "@/utils/chart-mock.json";

export default {
  components: {
    CompPlanCard,
    ClockInPopup,
    UCharts,
  },
  data() {
    return {
      title: "clock-in",
      chartWidth: 0,
      // 打卡总时长
      totalHours: 0,
      chartOptions: {
        categories: [
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
        ],
        series: [
          {
            name: "成交量A",
            data: [35, 8, 25, 37, 4, 20, 13, 14, 15, 16],
          },
        ],
      },
      systemInfo: {},
      // cs设置了 0 40rpx, X2
      chartPadding: 0,
      showChart: false,
    };
  },
  onShow() {
    // 每次进入该页面都要刷新打卡总时长
    this._refreshClockInTotalHours();
    // 获取图表数据
    this._getDailycheckCounts();
  },
  onLoad() {
    rpxToPx(80).then((res) => {
      log("padding", res);
      this.chartWidth = res.screenWidth - res.trans;
      log("this.chartWidth", this.chartWidth);
      this.showChart = true;
    });
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
