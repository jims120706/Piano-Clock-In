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
        active-color="#14c5b4"
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
      ><view class="row no-gutters mt-4 mb-4">
        <view class="col">
          <custom-button
            class="detail-btn"
            color="white"
            text="查看明细"
            :icon="require('@/static/images/clock-in/add.svg')"
            @click.native="_openChartDetail"
          >
          </custom-button>
        </view>
      </view>
    </view>

    <popup-container ref="authDialog" :showHead="false" :maskCloseable="false">
      <button
        open-type="getUserInfo"
        @getuserinfo="_onGetUserInfo"
        v-if="!hasUserInfo"
      >
        {{ username }}
      </button>
    </popup-container>
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
import uniSegmentedControl from "@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue";
import CompPlanCard from "./components/PlanCard";
import ClockInPopup from "./components/ClockInPopup";
import ECharts from "@/components/Echarts";
import chartMockData from "@/utils/chart-mock.json";
import CustomButton from "@/components/CustomButton";
import ChartDataFactory, { Categories } from "./ChartDataFactory";
import PopupContainer from "@/components/Popup";
import { mapMutations, mapGetters } from "@/store";

export default {
  components: {
    uniSegmentedControl,
    CompPlanCard,
    ClockInPopup,
    ECharts,
    CustomButton,
    PopupContainer,
  },
  computed: {
    ...mapGetters(["token"]),
  },
  watch: {
    token(val) {
      if (val) {
        // 每次进入该页面都要刷新打卡总时长
        this._refreshClockInTotalHours();
        // 获取图表数据
        // this._getDailycheckCounts();
        // 本周打卡时长
        this._getHoursWeek();
        // 本月打卡时长
        this._getHoursMonths();
        this._getHoursYear();
      }
    },
  },
  data() {
    return {
      username: "请先授权登录",
      userInfo: {},
      openid: "",
      // 选项卡
      items: ["本周统计", "本月统计", "本年统计"],
      catrgories: ["week", "month", "year"],
      current: 0,

      title: "clock-in",
      chartWidth: 0,
      // 打卡总时长
      totalHours: 0,

      weekOptions: {
        categories: Categories.week,
        datas: [],
        option: {},
      },
      monthOptions: {
        categories: Categories.month,
        datas: [],
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
        categories: Categories.year,
        datas: [],
        option: {},
      },
      systemInfo: {},
      // cs设置了 0 40rpx, X2
      chartPadding: 0,
      showChart: false,
    };
  },
  onShow() {
    if (!this.token) {
      this.$refs.authDialog.open();
    } else {
      // 每次进入该页面都要刷新打卡总时长
      this._refreshClockInTotalHours();
      // 获取图表数据
      // this._getDailycheckCounts();
      // 本周打卡时长
      this._getHoursWeek();
      // 本月打卡时长
      this._getHoursMonths();
      this._getHoursYear();
    }
  },
  onLoad() {
    this._renderChart();
  },
  methods: {
    ...mapMutations(["setToken"]),
    // 获取用户信息
    _onGetUserInfo(event) {
      log("用户信息", event.detail);
      let res = event.detail;
      // if (this.hasUserInfo()) return;
      // getUserInfo({
      //   success: (res) => {
      //     log("用户信息", res);
      this.userLogo = res.userInfo.avatarUrl;
      this.username = "你好，" + res.userInfo.nickName;
      this.userInfo = res.userInfo;
      let reqJson = JSON.parse(res.rawData);
      reqJson.openId = this.openid;
      console.log("reqJson", reqJson);
      console.log("JSON.stringify(reqJson)", JSON.stringify(reqJson));
      this.$Api.commonApi
        .login({
          data: {
            userInfo: JSON.stringify(reqJson),
          },
        })
        .then((res) => {
          log("登录成功", res);
          this.setToken(res.access_token);
          this.$refs.authDialog.close();
        });
      //   },
      // });
    },
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
        if (res.item) {
          log("打卡总时长", res);
          this.totalHours = parseFloat(res.item.toFixed(1));
        }
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
      const category = this.catrgories[this.current];
      uni.navigateTo({
        url: `/pages/clock-in/chart-detail?category=${category}`,
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
        console.log("本周打卡数组", arr);
        this.weekOptions.datas = arr;
        this.showChart = true;
      });
    },
    /**
     * 获取本月打卡数据
     */
    _getHoursMonths() {
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
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-in {
  background: #f7f7f7;
  height: 100%;
  padding: 0 40rpx;
  overflow-x: hidden;
  overflow-y: scroll;
  > .detail-btn {
    height: 200rpx;
  }
}
</style>
