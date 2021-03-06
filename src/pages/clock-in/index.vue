<template>
  <view class="clock-in">
    <comp-plan-card
      :totalHours="totalHours"
      :todayHours="todayHours"
      :weekHours="weekHours"
      :monthHours="monthHours"
      :yearHours="yearHours"
      @onBtnClick="_handlePlanAddClick"
    >
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
    <view class="container p-0">
      <view class="row no-gutters mt-4 mb-4">
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

    <popup-container
      ref="authDialog"
      title="欢迎使用打卡小程序"
      :closeIcon="false"
      :maskCloseable="false"
      :autoInitAnimation="false"
    >
      <view class="dialog-tip"> 专为钢琴爱好者提供的打卡时长统计 </view>
      <button
        open-type="getUserInfo"
        @getuserinfo="_onGetUserInfo"
        class="mt-2"
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
  getFloat,
  compatibleDateString
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
      } else {
        this._WxLogin();
      }
    },
  },
  data() {
    return {
      username: "点击授权后使用",
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
      todayHours: 0,
      weekHours: 0,
      monthHours: 0,
      yearHours: 0,

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
      this._WxLogin();
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
    ...mapMutations(["setToken", "setUserInfo"]),
    _WxLogin() {
      return new Promise((resolve, reject) => {
        uni.login({
          scopes: "auth_user",
          success: (res) => {
            log("登录成功", res);
            this.$Api.commonApi
              .getSessionKey({
                data: {
                  code: res.code,
                },
              })
              .then((res) => {
                this.openid = res.item.openid;
                log("请求成功", res);
                this.$refs.authDialog.open();
                resolve(res);
              });
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
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
      // 存到store
      this.setUserInfo(res.userInfo);
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
    // 生成累计时间
    _genereteHours(data, filter = null) {
      if (!filter) {
        return data.reduce(
          (prev, curr, index, arr) => {
            if (index === arr.length - 1) {
              return prev.hours + curr.hours;
            }
            return { hours: prev.hours + curr.hours };
          },
          { hours: 0 }
        );
      } else {
        let res = data.filter(filter);
        return res.length > 0
          ? res.reduce(
              (prev, curr, index, arr) => {
                if (index === arr.length - 1) {
                  return prev.hours + curr.hours;
                }
                return { hours: prev.hours + curr.hours };
              },
              { hours: 0 }
            )
          : 0;
      }
    },
    /**
     * 刷新打卡总时长
     */
    _refreshClockInTotalHours() {
      this.$api.clockInApi.dailycheckHoursTotal().then((res) => {
        if (res.item) {
          log("打卡总时长", res.item);
          const floatUnit = 1;
          this.totalHours = getFloat(res.item.total, floatUnit);
          this.todayHours = getFloat(res.item.today, floatUnit);
          this.weekHours = getFloat(this._genereteHours(res.item.week), floatUnit);
          // this.monthHours = getFloat(this._genereteHours(res.item.month, item => {
          //   return new Date(compatibleDateString(item.checkDate)).getMonth() + 1 === new Date().getMonth() + 1
          // }), floatUnit);
          this.monthHours = getFloat(this._genereteHours(res.item.month), floatUnit);
          this.yearHours = getFloat(this._genereteHours(res.item.year), floatUnit);
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
        // this.showChart = true;
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
        // console.log("本周打卡数组", arr);
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
      this.showChart = false;
      this.$api.clockInApi.getHoursYear().then((res) => {
        const data = res.item || [];
        log("本年打卡时长", data);
        const arr = ChartDataFactory.generateChartData(data, "year");
        this.yearOptions.datas = arr;
        this.showChart = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-in {
  background: #f7f7f7;
  padding: 0 40rpx;
  overflow-x: hidden;
  > .detail-btn {
    height: 200rpx;
  }
  .dialog-tip {
    text-align: center;
    font-size: 32rpx;
    line-height: 48rpx;
    color: #14c5b4;
  }
}
</style>
