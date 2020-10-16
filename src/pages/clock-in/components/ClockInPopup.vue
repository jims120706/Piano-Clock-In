<template>
  <popup-container title="添加打卡记录" ref="popup" class="clock-in-popup">
    <view class="container p-0">
      <view class="date row no-gutters">
        <picker
          mode="date"
          :value="initDate"
          start="2000-01-01"
          :end="initDate"
          @change="_handlePlanDateChange"
          v-if="mode === 'someday'"
        >
          <!-- 补卡模式 -->
          <view class="weui-cell col-12">
            <view class="weui-cell__hd">
              <label class="weui-label label">打卡日期:</label>
            </view>
            <view class="weui-cell__bd">
              <text>{{ initDate }}</text>
              <image
                src="@/static/images/arrow-down.svg"
                :lazy-load="true"
                class="icon"
              ></image>
            </view>
          </view>
        </picker>
        <!-- 打卡模式 -->
        <view class="weui-cell col-12" v-if="mode === 'today'">
          <view class="weui-cell__hd">
            <label class="weui-label label">打卡日期:</label>
          </view>
          <view class="weui-cell__bd">
            <text>{{ initDate }}</text>
          </view>
        </view>
      </view>
      <view class="time row no-gutters">
        <!-- 补卡模式 -->
        <view class="weui-cell col-12" v-if="mode === 'someday'">
          <view class="weui-cell__hd">
            <label class="weui-label label">打卡时间:</label>
          </view>
          <view class="weui-cell__bd">
            <picker-view class="time-picker">
              <picker-view-column>
                <view
                  class="column"
                  v-for="(item, index) in somedayHours"
                  :key="index"
                  >{{ item }} 小时</view
                >
              </picker-view-column>
              <picker-view-column class="column">
                <view
                  class="column"
                  v-for="(item, index) in minutes"
                  :key="index"
                  >{{ item }} 分钟</view
                >
              </picker-view-column>
            </picker-view>
          </view>
        </view>

        <!-- 打卡模式 -->
        <view class="weui-cell col-12" v-if="mode === 'today'">
          <view class="weui-cell__hd">
            <label class="weui-label label">开始时间:</label>
          </view>
          <view class="weui-cell__bd">
            <picker-view
              class="time-picker"
              @change="_handleStartTimePickerChange"
              :value="startTimePickerList"
            >
              <picker-view-column>
                <view
                  class="column"
                  v-for="(item, index) in todayHours"
                  :key="index"
                  >{{ item }} 时</view
                >
              </picker-view-column>
              <picker-view-column class="column">
                <view
                  class="column"
                  v-for="(item, index) in minutes"
                  :key="index"
                  >{{ item }} 分</view
                >
              </picker-view-column>
            </picker-view>
          </view>
        </view>

        <!-- 结束时间占位, 防止重新渲染结束时间组件时页面的跳动 -->
        <view
          class="weui-cell col-12 today-end-time"
          v-if="mode === 'today' && reRenderEndTime"
        >
          <view class="weui-cell__hd">
            <label class="weui-label label">结束时间:</label>
          </view>
          <view class="weui-cell__bd">
            <picker-view class="time-picker" :value="endTimePickerList">
              <picker-view-column>
                <view
                  class="column"
                  v-for="(item, index) in todayEndHours"
                  :key="index"
                  >{{ item }} 时</view
                >
              </picker-view-column>
              <picker-view-column class="column">
                <view
                  class="column"
                  v-for="(item, index) in todayEndMins"
                  :key="index"
                  >{{ item }} 分</view
                >
              </picker-view-column>
            </picker-view>
          </view>
        </view>

        <view
          class="weui-cell col-12 today-end-time"
          v-if="mode === 'today' && !reRenderEndTime"
          style="position: relative"
        >
          <view class="weui-cell__hd">
            <label class="weui-label label">结束时间:</label>
          </view>
          <view class="weui-cell__bd">
            <picker-view
              class="time-picker"
              @change="_handleEndPickerChange"
              :value="endTimePickerList"
            >
              <picker-view-column>
                <view
                  class="column"
                  v-for="(item, index) in todayEndHours"
                  :key="index"
                  >{{ item }} 时</view
                >
              </picker-view-column>
              <picker-view-column class="column">
                <view
                  class="column"
                  v-for="(item, index) in todayEndMins"
                  :key="index"
                  >{{ item }} 分</view
                >
              </picker-view-column>
            </picker-view>
          </view>
        </view>
      </view>
      <view class="feeling row no-gutters">
        <view class="weui-cell col-12">
          <view class="weui-cell__hd">
            <label class="weui-label label">打卡心得:</label>
          </view>
          <view class="weui-cell__bd">
            <textarea
              class="weui-textarea textarea"
              placeholder="欢迎分享你的心得"
              rows="2"
            ></textarea>
          </view>
        </view>
      </view>
      <view class="row no-gutters mt-4">
        <custom-button
          class="col-12"
          color="white"
          bgColor="rgb(233, 117, 40)"
          text="添加"
          textspan="3"
          :icon="require('@/static/images/submit.svg')"
          @click.native="_handlePlanSubmit"
        ></custom-button>
      </view>
    </view>
  </popup-container>
</template>

<script>
import { log } from "@/utils/utils";
import CustomButton from "@/components/CustomButton";
import PopupContainer from "@/components/Popup";

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
  "5",
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

export default {
  props: {
    /**
     * 打卡模式
     * today: 打卡
     * someday：补卡
     */
    mode: {
      type: String,
      default: "today",
    },
  },
  components: {
    PopupContainer,
    CustomButton,
  },
  computed: {},
  data() {
    return {
      initDate: new Date().toLocaleDateString().replace(/\//gi, "-"),
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
        "24",
      ],
      // 打卡小时数组
      todayHours,
      minutes,
      // 开始选择器值
      startTimePickerList: [0, 0],
      // 结束选择器值
      endTimePickerList: [0, 0],
      todayEndHours: todayHours.slice(),
      todayEndMins: minutes.slice(),
      // 结束小时缓存
      endHour: todayHours.slice()[0],
      // 结束分钟缓存
      endMin:  minutes.slice()[0],
      // 重新渲染结束时间组件
      reRenderEndTime: false,
    };
  },
  methods: {
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    // 打卡日期切换回调
    _handlePlanDateChange(event) {
      log("打卡日期切换回调", event);
      this.initDate = event.detail.value;
    },
    // 提交打卡记录
    _handlePlanSubmit() {
      log("提交打卡记录");
      this.close();
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
      log("开始小时", startHour)
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
      if (startHour === this.endHour) {
        log("小时相等");
        // 从分钟列表截取出结束分钟列表
        const newMinutes = minutes.slice(startMinIndex);
        // 找出小时在新结束小时数组中的下标，没有置为0
        let index = newMinutes.findIndex(
          (min) => "" + min === "" + this.endMin
        );
        log("分钟下标", startMinIndex, newMinutes, index);
        // 重新缓存结束时间
        if (index === -1) {
          this.endMin = newMinutes[0];
        }
        this._reRenderEndTimeComponent();
        // 结束选择器值的小时部分
        this.endTimePickerList[1] = index === -1 ? 0 : index;
        // 更新结束小时列表
        this.todayEndMins = newMinutes;
      }
      // 否则分钟不用变，返回原分钟列表
      else {
        log("小时不相等");
        const newMinutes = minutes.slice();
        // 找出小时在新结束小时数组中的下标，没有置为0
        let index = newMinutes.findIndex(
          (min) => "" + min === "" + this.endMin
        );
        this._reRenderEndTimeComponent();
        // 结束选择器值的小时部分
        this.endTimePickerList[1] = index;
        // 更新结束小时列表
        this.todayEndMins = minutes;
      }
    },
  },
};
</script>

<style lang="scss">
.clock-in-popup {
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
      height: 120rpx;
      border: 1px solid #323233;
    }
  }
}
</style>