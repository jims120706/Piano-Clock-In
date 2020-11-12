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
    canvasId: {
      type: String,
      required: true,
    },
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
        color: "#14c5b4",
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
            rotate: 40,
            textStyle: {
              color: "#333",
            },
            align: "center",
            padding: [10, 10, 2, 2],
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.datas,
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  [
                    { offset: 0, color: "#28dcca" },
                    { offset: 1, color: "#14c5b4" },
                  ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                ),
              },
            },
            label: {
              normal: {
                show: true,
                position: this.canvasId.includes("detail") ? "right" : "top",
              },
            },
          },
        ],
      };
      option = Object.assign({}, option, this.options);
      console.log("this.canvasId", this.canvasId, option);
      chart.setOption(option);
      this.$refs.chart.setChart(chart);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>