<template>
  <view class="chart-detail-page">
    <e-charts
      canvasId="datail"
      :categories="weekOptions.categories"
      :datas="weekOptions.datas"
      :cWidth="chartWidth"
      :cHeight="chartHeight"
      :options="weekOptions.option"
      v-if="showChart"
    ></e-charts>
  </view>
</template>

<script>
import { log, getSystemInfo, rpxToPx, getRandomArr } from "@/utils/utils";
import ECharts from "@/components/Echarts";

export default {
  components: {
    ECharts,
  },
  data() {
    return {
      chartWidth: 0,
      chartHeight: 0,
      weekOptions: {
        datas: getRandomArr(30),
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
            data: [
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
          },
        },
      },
      showChart: false,
    };
  },
  onLoad(options = {}) {
    // 通过id查询明细数据
    let id = options.id || 0;
    this._renderChart();
  },
  methods: {
    /**
     * 渲染图表
     */
    _renderChart() {
      rpxToPx(0).then((res) => {
        log("渲染图表", res);
        this.chartWidth = res.windowWidth;
        this.chartHeight = res.windowHeight;
        this.showChart = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.chart-detail-page {
}
</style>