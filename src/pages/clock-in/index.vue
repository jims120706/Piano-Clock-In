<template>
  <view class="clock-in">
    <comp-plan-card :totalHours="totalHours" @onBtnClick="_handlePlanAddClick">
    </comp-plan-card>
    <view class="mt-4">
      <uni-segmented-control
        :current="current"
        :values="items"
        @clickItem="_onClickItem"
        style-type="button"
        active-color="rgb(233, 117, 40)"
      ></uni-segmented-control>
    </view>
    <view class="container p-0">
      <view class="row no-gutters mt-2" v-if="current === 0">
        <view class="col">
          <u-charts
            canvasId="week"
            :opts="weekOptions"
            :cWidth="chartWidth"
            v-if="showChart"
          ></u-charts>
        </view>
      </view>
      <view class="row no-gutters mt-2" v-if="current === 1">
        <view class="col">
          <u-charts
            canvasId="month"
            :opts="monthOptions"
            :cWidth="chartWidth"
            v-if="showChart"
          ></u-charts>
        </view>
      </view>
      <view class="row no-gutters mt-2" v-if="current === 2">
        <view class="col">
          <u-charts
            canvasId="year"
            :opts="yearOptions"
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
import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
import CompPlanCard from "./components/PlanCard";
import ClockInPopup from "./components/ClockInPopup";
import UCharts from "@/components/UCharts";
import chartMockData from "@/utils/chart-mock.json";

// 生成随机数值
function getRandomArr(arrLen, maxValue = 100) {
  let arr = [];
  for(let i = 0; i < arrLen; i++) {
    arr.push(parseInt(Math.random() * maxValue) + 1);
  }
  return arr
}

export default {
  components: {
    uniSegmentedControl,
    CompPlanCard,
    ClockInPopup,
    UCharts,
  },
  data() {
    return {
      // 选项卡
      items: ["本周统计", "本月统计", "本年统计"],
      current: 0,

      title: "clock-in",
      chartWidth: 0,
      // 打卡总时长
      totalHours: 0,
      weekOptions: {
        categories: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        series: [
          {
            name: "",
            data: getRandomArr(7),
          },
        ],
      },
      monthOptions: {
        categories: [
          "1号",
          "2号",
          "3号",
          "4号",
          "5号",
          "6号",
          "7号",
          "8号",
          "9号",
          "10号",
          "11号",
          "12号",
          "13号",
          "14号",
          "15号",
          "16号",
          "17号",
          "18号",
          "19号",
          "20号",
          "21号",
          "22号",
          "23号",
          "24号",
          "25号",
          "26号",
          "27号",
          "28号",
          "29号",
          "30号",
        ],
        series: [
          {
            name: "",
            data: getRandomArr(30),
          },
        ],
      },
      yearOptions: {
        categories: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        series: [
          {
            name: "",
            data: getRandomArr(12),
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
    this._renderChart();
  },
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
    /**
     * 渲染图表
     */
    _renderChart() {
      rpxToPx(80).then((res) => {
        this.chartWidth = res.screenWidth - res.trans;
        this.showChart = true;
      });
    },
    /**
     * 标签切换回调
     */
    _onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-in {
  background: #f3f0f0;
  height: 100%;
  padding: 0 40rpx;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
