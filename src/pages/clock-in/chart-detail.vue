<template>
  <view class="chart-detail-page">
    <e-charts
      canvasId="datail"
      :categories="weekOptions.categories"
      :datas="weekOptions.datas"
      :cWidth="chartWidth"
      :cHeight="chartHeight"
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
        categories: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datas: getRandomArr(7),
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
        log("渲染图表", res)
        this.chartWidth = res.screenWidth;
        this.chartHeight = res.screenHeight;
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