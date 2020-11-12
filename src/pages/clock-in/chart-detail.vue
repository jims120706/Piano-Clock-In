<template>
  <view class="chart-detail-page">
    <e-charts
      canvasId="detail"
      :categories="detailOptions.categories"
      :datas="detailOptions.datas"
      :cWidth="chartWidth"
      :cHeight="chartHeight"
      :options="detailOptions.option"
      v-if="showChart"
    ></e-charts>
  </view>
</template>

<script>
import {
  log,
  getSystemInfo,
  rpxToPx,
  getRandomArr,
  getWeekDay,
} from "@/utils/utils";
import ECharts from "@/components/Echarts";
import ChartDataFactory, { Categories } from "./ChartDataFactory";

export default {
  components: {
    ECharts,
  },
  computed: {
    detailOptions() {
      const options = this[`${this.currCategory}Options`] || {}
      return options;
    },
  },
  data() {
    return {
      chartWidth: 0,
      chartHeight: 0,
      currCategory: '',
      monthOptions: {
        categories: Categories.month,
        datas: [],
        option: {
          grid: {
            left: "10%",
            right: "5%",
            top: 5,
            bottom: "5%",
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#333",
              },
              align: "center",
              padding: [5, 20, 2, 2],
            },
            data: Categories.month,
          },
        },
      },
      weekOptions: {
        categories: Categories.week,
        datas: [],
        option: {
          grid: {
            left: "10%",
            right: "5%",
            top: 5,
            bottom: "5%",
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#333",
              },
              align: "center",
              padding: [5, 20, 2, 2],
            },
            data: Categories.week,
          },
        },
      },
      yearOptions: {
        categories: Categories.year,
        datas: [],
        option: {
          grid: {
            left: "10%",
            right: "5%",
            top: 5,
            bottom: "5%",
          },
          xAxis: {
            type: "value",
          },
          yAxis: {
            type: "category",
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#333",
              },
              align: "center",
              padding: [5, 20, 2, 2],
            },
            data: Categories.year,
          },
        },
      },
      showChart: false,
    };
  },
  onLoad(options = {}) {
    // 通过id查询明细数据
    let id = options.id || 0;
    let category = options.category || "week";
    this.currCategory = category;
    const reqCate = category[0].toUpperCase() + category.slice(1);
    this._renderChart(() => {
      this[`_getHours${reqCate}`]();
    });
  },
  methods: {
    /**
     * 渲染图表
     */
    _renderChart(cb) {
      rpxToPx(0).then((res) => {
        log("渲染图表", res);
        this.chartWidth = res.windowWidth;
        this.chartHeight = res.windowHeight;
        // this.showChart = true;
        if (cb) {
          cb();
        }
      });
    },

    /**
     * 获取本周打卡数据
     */
    _getHoursWeek() {
      this.showChart = false;
      this.$api.clockInApi.getHoursWeek().then((res) => {
        log("本周打卡时长", res);
        /**
         * checkDate: 打卡日期
         */
        const data = res.item || [];
        const arr = ChartDataFactory.generateChartData(data, "week");
        // console.log("本周打卡数组", arr);
        this.weekOptions.datas = arr;
        this.showChart = true;
      });
    },
    /**
     * 获取本月打卡数据
     */
    _getHoursMonth() {
      this.showChart = false;
      this.$api.clockInApi.getHoursMonths().then((res) => {
        const data = res.item || [];
        const arr = ChartDataFactory.generateChartData(data, "month");
        log("本月打卡时长", res);
        this.monthOptions.datas = arr;
        this.showChart = true;
      });
    },
    /**
     * 获取本年打卡数据
     */
    _getHoursYear() {
      this.yearOptions.datas = getRandomArr(12);
      this.showChart = true;
    },
  },
};
</script>

<style scoped lang="scss">
.chart-detail-page {
}
</style>