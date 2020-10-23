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
      <view class="row no-gutters mt-2" v-show="current === 0">
        <view class="col">
          <e-charts
            canvasId="week"
            :categories="weekOptions.categories"
            :datas="weekOptions.datas"
            :cWidth="chartWidth"
            :options="weekOptions.option"
            v-if="showChart"
          ></e-charts>
        </view>
      </view>
      <view class="row no-gutters mt-2" v-show="current === 1">
        <view class="col">
          <e-charts
            canvasId="month"
            :categories="monthOptions.categories"
            :datas="monthOptions.datas"
            :cWidth="chartWidth"
            :options="monthOptions.option"
            v-if="showChart"
          ></e-charts>
        </view>
      </view>
      <view class="row no-gutters mt-2" v-show="current === 2">
        <view class="col">
          <e-charts
            canvasId="year"
            :categories="yearOptions.categories"
            :datas="yearOptions.datas"
            :cWidth="chartWidth"
            :options="yearOptions.option"
            v-if="showChart"
          ></e-charts>
        </view>
      </view>
    </view>
    <view class="container p-0"
      ><view class="row no-gutters mt-2">
        <view class="col">
          <custom-button
            class="detail-btn"
            color="white"
            bgColor="rgb(233, 117, 40)"
            text="查看明细"
            :icon="require('@/static/images/clock-in/add.svg')"
            @click.native="_openChartDetail"
          >
          </custom-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { log, getSystemInfo, rpxToPx, getRandomArr } from "@/utils/utils";
import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
import CompPlanCard from "./components/PlanCard";
import ClockInPopup from "./components/ClockInPopup";
import ECharts from "@/components/Echarts";
import chartMockData from "@/utils/chart-mock.json";
import CustomButton from "@/components/CustomButton";

export default {
  components: {
    uniSegmentedControl,
    CompPlanCard,
    ClockInPopup,
    ECharts,
    CustomButton,
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
        datas: getRandomArr(7),
        option: {},
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
        datas: getRandomArr(30),
        option: {
          grid: {
            left: "10%",
            right: "10%",
            top: "10%",
            bottom: "20%",
          },
          dataZoom: [
            {
              type: "slider",
              show: true,
              xAxisIndex: [0],
              bottom: "10%",
              bottom: -5,
              start: 0,
              end: 30, //初始化滚动条
            },
          ],
        },
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
        datas: getRandomArr(12),
        option: {},
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
        this.chartWidth = res.windowWidth - res.trans;
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
    /**
     * 查看图表明细
     */
    _openChartDetail() {
      uni.navigateTo({
        url: "/pages/clock-in/chart-detail",
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
  overflow-x: hidden;
  overflow-y: scroll;
  > .detail-btn {
    height: 200rpx;
  }
}
</style>
