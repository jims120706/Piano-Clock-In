<template>
  <view class="clock-in-add">
    <view class="container p-0">
      <view class="date row no-gutters">
        <!-- 补卡模式 -->
        <uni-card
          class="col-12 mt-4"
          title="日期"
          is-full="true"
          is-shadow="true"
          v-if="mode === 'replenish'"
        >
          <picker
            class="col-12"
            mode="date"
            :value="initDate"
            start="2000-01-01"
            :end="initDate"
            @change="_handlePlanDateChange"
          >
            <text>{{ initDate }}</text>
            <image
              src="@/static/images/arrow-down.svg"
              :lazy-load="true"
              class="icon"
            ></image>
          </picker>
        </uni-card>
        <!-- 打卡模式 -->
        <uni-card
          is-full="true"
          is-shadow="true"
          class="col-12 mt-4"
          :title="textConfig.action + '日期'"
          v-if="mode === 'clockIn'"
        >
          <picker
            class="col-12"
            mode="date"
            :value="initDate"
            start="2000-01-01"
            :end="initDate"
            @change="_handleClockDateChange"
          >
            <text>{{ initDate }}</text>
            <image
              src="@/static/images/arrow-down.svg"
              :lazy-load="true"
              class="icon"
            ></image>
          </picker>
        </uni-card>
      </view>
      <view class="time row no-gutters">
        <!-- 补卡模式 -->
        <uni-card
          is-full="true"
          is-shadow="true"
          class="col-12 mt-4"
          :title="textConfig.action + '时间'"
          v-if="mode === 'replenish'"
        >
          <picker-view
            :value="supplyTimePickerList"
            class="time-picker"
            @change="_handleSupplyTimeChange"
          >
            <picker-view-column>
              <view
                class="column"
                v-for="(item, index) in somedayHours"
                :key="index"
                >{{ item }} 小时</view
              >
            </picker-view-column>
            <picker-view-column class="column">
              <view class="column" v-for="(item, index) in minutes" :key="index"
                >{{ item }} 分钟</view
              >
            </picker-view-column>
          </picker-view>
        </uni-card>

        <!-- 打卡模式 -->
        <uni-card
          is-full="true"
          is-shadow="true"
          class="col-12 mt-4"
          :title="textConfig.action + '时间'"
          v-if="mode === 'clockIn'"
        >
          <picker-view
            :value="clockInTimePickerList"
            class="time-picker"
            @change="_handleClockInTimeChange"
          >
            <picker-view-column>
              <view
                class="column"
                v-for="(item, index) in todayHours"
                :key="index"
                >{{ item }} 小时</view
              >
            </picker-view-column>
            <picker-view-column class="column">
              <view class="column" v-for="(item, index) in minutes" :key="index"
                >{{ item }} 分钟</view
              >
            </picker-view-column>
          </picker-view>
        </uni-card>
      </view>
      <!-- 结束时间占位, 防止重新渲染结束时间组件时页面的跳动 -->
      <view class="row no-gutters mt-4 mb-4">
        <custom-button
          class="col-12"
          color="white"
          text="添加"
          textspan="3"
          btnPadding="30"
          :icon="require('@/static/images/submit.svg')"
          @click.native="_handlePlanSubmit"
        ></custom-button>
      </view>
    </view>
  </view>
</template>

<script>
import uniCard from "@dcloudio/uni-ui/lib/uni-card/uni-card.vue";
import { log, toast, handleDateTimeStr, getDateString } from "@/utils/utils";
import CustomButton from "@/components/CustomButton";
import textConfig from "@/utils/text-config";

const todayHours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
const minutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
// 上一次操作结束小时的缓存
const lastEndHoursCache = [];
const initDate = handleDateTimeStr(getDateString(new Date()));

export default {
  components: {
    CustomButton,
    uniCard,
  },
  onLoad(options = {}) {
    /**
     * 打卡模式
     * clockIn: 打卡
     * replenish：补卡
     */
    const { type = "clockIn" } = options;
    this.mode = type;
    // 获取系统时间生成打卡起始时间
    this._generateTimeByCurrentTime();
  },
  computed: {},
  data() {
    return {
      initDate,
      textConfig,
      // 补卡小时数组
      somedayHours: [
        "--",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "23",
      ],
      // 打卡小时数组
      todayHours,
      minutes,
      // 开始选择器值
      startTimePickerList: [1, 0],
      // 结束选择器值
      endTimePickerList: [2, 0],
      clockInTimePickerList: [0, 6],
      // 补卡选择器值
      supplyTimePickerList: [0, 0],
      todayEndHours: todayHours.slice(),
      todayEndMins: minutes.slice(),
      // 结束小时缓存
      endHour: todayHours.slice()[0],
      // 结束分钟缓存
      endMin: minutes.slice()[0],
      // 重新渲染结束时间组件
      reRenderEndTime: false,
      // 打卡模式
      mode: "",
    };
  },
  methods: {
    // 根据当前时间生成开始结束时间
    _generateTimeByCurrentTime() {
      // 获取系统时间
      const currentTime = new Date().toLocaleTimeString();
      const arr = currentTime.split(":");
      const hourStr = arr[0];
      const currHour = hourStr.includes("上午")
        ? parseInt(hourStr[hourStr.length - 1])
        : parseInt(hourStr[hourStr.length - 1]) + 12;
      const currMin = arr[1];
      const currHourIndex = todayHours.findIndex(
        (hour) => parseInt(hour) === currHour
      );
      this.startTimePickerList = [currHourIndex - 1, 0];
      this.endTimePickerList = [currHourIndex, 0];
      this.endHour = todayHours[currHourIndex];
      // log("小时", currHour, currHourIndex);
      // log("分钟", currMin);
    },
    // 补卡日期切换回调
    _handlePlanDateChange(event) {
      log("补卡日期切换回调", event.detail.value);
      this.initDate = handleDateTimeStr(event.detail.value, "-");
    },
    // 打卡日期切换回调
    _handleClockDateChange(event) {
      log("打卡日期切换回调", event.detail.value);
      this.initDate = handleDateTimeStr(event.detail.value, "-");
    },
    // 打卡开始时间变化
    _handleStartTimePickerChange(event) {
      log("打卡开始时间变化", event.detail.value);
      const arr = event.detail.value.slice();
      const [startHourIndex, startMinIndex] = arr;
      const startHour = todayHours[startHourIndex];
      this.startTimePickerList = arr;

      this._generateEndHoursList(
        startHourIndex,
        this.endTimePickerList.slice()
      );
      this._generateEndMinutesList(startHour, startMinIndex);
    },
    // 打卡时间变化
    _handleClockInTimeChange(event) {
      const arr = event.detail.value.slice();
      this.clockInTimePickerList = arr;
    },
    // 补卡时间变化回调
    _handleSupplyTimeChange(event) {
      log("补卡时间变化", event.detail.value);
      const arr = event.detail.value.slice();
      this.supplyTimePickerList = arr;
    },
    // 重新渲染时间结束组件
    _reRenderEndTimeComponent() {
      this.reRenderEndTime = true;
      this.$nextTick(() => {
        this.reRenderEndTime = false;
      });
    },
    // 打卡结束时间变化
    _handleEndPickerChange(event) {
      const arr = event.detail.value.slice();
      // 原小时
      const todayEndHours = this.todayEndHours.slice();
      // 开始值
      const startArr = this.startTimePickerList.slice();
      log("startArr", startArr);

      // 开始值下标
      const [startHourIndex, startMinIndex] = startArr;
      // 结束值下标
      const [endHourIndex, endMinIndex] = arr;
      // 开始对应小时
      const startHour = todayHours[startHourIndex];
      // 赋值结束值
      this.endTimePickerList = arr;
      // 缓存当前结束小时
      this.endHour = todayEndHours[endHourIndex];
      // 缓存当前结束分钟
      this.endMin = this.todayEndMins[endMinIndex];
      log("开始小时", startHour);
      log("当前缓存小时", this.endHour);
      log("当前缓存分钟", this.endMin);

      this._generateEndMinutesList(startHour, startMinIndex);
    },
    // 生成结束小时列表
    _generateEndHoursList(startHourIndex, endTimePickerList) {
      // 从小时列表截取出结束小时列表
      const newEndHours = todayHours.slice(startHourIndex);
      // 找出小时在新结束小时数组中的下标，没有置为0
      const index = newEndHours.findIndex(
        (hour) => "" + hour === "" + this.endHour
      );
      // 重新缓存结束时间
      if (index === -1) {
        this.endHour = newEndHours[0];
      }
      const newEndHourIndex = index === -1 ? 0 : index;
      const endMinIndex = endTimePickerList[1];
      this._reRenderEndTimeComponent();
      // 更新结束小时列表
      this.todayEndHours = newEndHours;
      // 结束选择器值的小时部分
      this.endTimePickerList = [newEndHourIndex, endMinIndex];
    },
    // 生成结束分钟列表
    _generateEndMinutesList(startHour, startMinIndex) {
      // 如果开始和结束的小时值相等, 截取分钟值
      if (startHour !== this.endHour) {
        startMinIndex = 0;
        log("小时相等");
      }
      // 从分钟列表截取出结束分钟列表
      const newMinutes = minutes.slice(startMinIndex);
      // 找出小时在新结束小时数组中的下标，没有置为0
      let index = newMinutes.findIndex((min) => "" + min === "" + this.endMin);
      log("分钟下标", startMinIndex, newMinutes, index);
      // 重新缓存结束时间
      if (index === -1 && startHour === this.endHour) {
        this.endMin = newMinutes[0];
      }
      this._reRenderEndTimeComponent();
      // 结束选择器值的小时部分
      this.endTimePickerList[1] = index === -1 ? 0 : index;
      // 更新结束小时列表
      this.todayEndMins = newMinutes;
    },
    // 点击提交按钮回调
    _handlePlanSubmit() {
      if (this.mode === "clockIn") {
        this.dailycheckCommit();
      } else if (this.mode === "replenish") {
        this.dailycheckSupply();
      }
    },
    // 打卡
    dailycheckCommit() {
      // 开始时分
      const [hourIndex, minIndex] = this.clockInTimePickerList.slice();
      const hour = parseInt(todayHours[hourIndex]);
      const min = parseInt(minutes[minIndex]);
      const _minutes = hour * 60 + min;

      // 请求打卡接口
      this.$api.clockInApi
        .dailycheckCommit({
          data: { date: this.initDate, minutes: _minutes },
        })
        .then((res) => {
          if (res.success) {
            toast({
              title: `${this.textConfig.action}成功`,
            });
            // uni.navigateBack()
            log("提交打卡成功", res);
            this.backToPrevPage();
          } else {
            toast({
              title: res.msg,
            });
          }
        });
    },
    // 补卡
    dailycheckSupply() {
      const [
        supplyHourIndex,
        supplyMinIndex,
      ] = this.supplyTimePickerList.slice();
      // 补卡时分
      const supplyHour = this.somedayHours[supplyHourIndex];
      const supplyMin = parseInt(minutes[supplyMinIndex]);
      log("补卡时间", supplyHour, supplyMin);
      // 转换小时为分钟数
      const tarnsHourToMins = supplyHour === "--" ? 0 : parseInt(supplyHour);
      // 补卡总分钟数
      const totalMins = tarnsHourToMins * 60 + supplyMin;
      // 请求补卡接口
      this.$api.clockInApi
        .dailycheckSupply({
          data: {
            date: this.initDate,
            minutes: totalMins,
          },
        })
        .then((res) => {
          if (res.success) {
            toast({
              title: "补卡成功",
            });
            // uni.navigateBack()
            log("提交补卡成功", res);
            this.backToPrevPage();
          } else {
            toast({
              title: res.msg,
            });
          }
        });
    },
    // 返回上一页
    backToPrevPage() {
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-in-add {
  width: 100%;
  padding: 0 40rpx;
  box-sizing: border-box;
  color: #323233;
  .date {
    .label {
      font-size: 32rpx;
    }
    .icon {
      margin-left: 20rpx;
      width: 36rpx;
      height: 28rpx;
    }
  }
  .time {
    .time-picker {
      width: 100%;
      height: 200rpx;
      .column {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
    .today-end-time {
      .placeholder-block {
      }
    }
  }
  .feeling {
    .textarea {
      // height: 120rpx;
      width: 100%;
      min-height: 120rpx;
      // border: 1px solid #323233;
    }
  }
}
</style>