<template>
  <view :style="canvasStyle">
    <mpvue-echarts ref="chart" :echarts="echarts" @onInit="initChart" />
  </view>
</template>

<script>
// diy_echart.js是在Echarts官网上按照所需要的模块定制的js,体积会小很多。
import echarts from "./echarts.min.js";
import mpvueEcharts from "./mpvue-charts";

export default {
  props: {
    cWidth: {
      type: Number,
      default: 375,
    },
    cHeight: {
      type: Number,
      default: 250,
    },
    categories: {
      type: Array,
      default: () => {
        return [];
      },
    },
    datas: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    canvasStyle() {
      return `width: ${this.cWidth}px; height: ${this.cHeight}px`;
    },
  },
  components: {
    mpvueEcharts,
  },
  methods: {
    initChart(e) {
      let { width, height } = e;
      let canvas = this.$refs.chart.canvas;
      echarts.setCanvasCreator(() => canvas);
      const chart = echarts.init(canvas, null, {
        width: this.cWidth,
        height: this.cHeight,
      });
      canvas.setChart(chart);
      let option = {
        grid: {
          left: "10%",
          right: "10%",
          top: "10%",
          bottom: "10%",
        },
        // dataZoom: [
        //   {
        //     type: "slider",
        //     show: true,
        //     xAxisIndex: [0],
        //     left: "9%",
        //     bottom: -5,
        //     start: 0,
        //     end: 10, //初始化滚动条
        //   },
        // ],
        xAxis: {
          type: "category",
          data: this.categories,
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 30,
            textStyle: {
              color: "#333",
            },
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.datas,
            type: "bar",
          },
        ],
      };
      option = Object.assign({}, option, this.options);
      chart.setOption(option);
      this.$refs.chart.setChart(chart);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>