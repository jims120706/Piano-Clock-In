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
              @pickstart="_handleStartTimePickerStart"
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

        <view
          class="weui-cell col-12"
          v-if="mode === 'today'"
          style="position: relative"
        >
          <view class="mask1" v-if="startPickerDragging"></view>
          <view class="mask2" v-if="startPickerDragging"></view>
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
  computed: {
    // 打卡结束小时选择器
    /**
     * 开始时间改变后，结束时间数组会发生变化，但是下标没变，所以要手动更改下标
     */
    // todayEndHours() {
    //   // 从开始小时截取出结束小时
    //   const newEndHours = todayHours.slice(this.startTimePickerList[0]);
    //   log("newEndHours", newEndHours);
    //   log("this.endHour", this.endHour);
    //   // 找出小时在新数组中的下标，没有置为0
    //   let index = newEndHours.findIndex(
    //     (hour) => "" + hour === "" + this.endHour
    //   );
    //   log("打卡结束小时选择器", index);
    //   this.endTimePickerList[0] = index === -1 ? 0 : index;
    //   return newEndHours;
    // },
    // 打卡结束分钟选择器
    // todayEndMins() {
    //   const oldArr = [];
    //   // 从开始分钟截取出结束分钟
    //   const newEndMins = minutes.slice(this.startTimePickerList[1]);
    //   // 找出分钟在新数组中的下标，没有置为0
    //   let index = oldArr
    //     ? newEndMins.findIndex(
    //         (min) => min === oldArr[this.endTimePickerList[1]]
    //       )
    //     : -1;
    //   // log("打卡结束分钟选择器", index);
    //   this.endTimePickerList[1] = index === -1 ? 0 : index;
    //   return newEndMins;
    // },
  },
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
      endHour: 0,
      // 结束分钟缓存
      endMin: 0,
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
    _handleStartTimePickerStart() {
      this.startPickerDragging = true;
    },
    // 打卡开始时间变化
    _handleStartTimePickerChange(event) {
      log("打卡开始时间变化", event.detail.value);
      const arr = event.detail.value.slice();
      const [hourIndex, minIndex] = arr;
      const startHour = todayHours[hourIndex];

      this._generateEndHoursList(hourIndex);
      // this._generateEndMinutesList(startHour, minIndex);
      this.startPickerDragging = false;
    },
    // 打卡结束时间变化
    _handleEndPickerChange(event) {
      if(this.startPickerDragging) return;
      const arr = event.detail.value.slice();
      const todayEndHours = this.todayEndHours.slice();
      log("打卡结束时间变化", arr, todayEndHours);
      const [hourIndex, minIndex] = arr;
      this.endTimePickerList = arr;
      // 缓存当前结束小时
      this.endHour = todayEndHours[hourIndex];
      // 缓存当前结束分钟
      this.endMin = this.todayEndMins[minIndex];
      log("当前缓存小时", this.endHour);
      // log("当前缓存分钟", this.endMin);
    },
    // 生成结束小时列表
    _generateEndHoursList(startHourIndex) {
      // 从小时列表截取出结束小时列表
      const newEndHours = todayHours.slice(startHourIndex);
      // 找出小时在新结束小时数组中的下标，没有置为0
      const index = newEndHours.findIndex(
        (hour) => "" + hour === "" + this.endHour
      );
      log("找出下标", newEndHours, "          " + index);
      const newIndex = index === -1 ? 0 : index;
      const minIndex = this.endTimePickerList[1];
      // 更新结束小时列表
      this.todayEndHours = newEndHours;
      this.$nextTick(() => {
        // 结束选择器值的小时部分
        this.endTimePickerList = [newIndex, minIndex];
      });
    },
    // 生成结束分钟列表
    _generateEndMinutesList(startHour, startMinIndex) {
      // // 如果开始和结束的小时值相等, 截取分钟值
      // if ("" + startHour === "" + this.endHour) {
      //   // 从分钟列表截取出结束分钟列表
      //   const newMinutes = minutes.slice(startMinIndex);
      //   // 找出小时在新结束小时数组中的下标，没有置为0
      //   let index = newMinutes.findIndex(
      //     (min) => "" + min === "" + this.endMin
      //   );
      //   // 结束选择器值的小时部分
      //   this.endTimePickerList[1] = index === -1 ? 0 : index;
      //   // 更新结束小时列表
      //   this.todayEndMins = newMinutes;
      // }
      // // 否则分钟不用变，返回原分钟列表
      // else {
      //   // 更新结束小时列表
      //   this.todayEndMins = minutes;
      // }
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
      .mask1 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 500;
      }
      .mask2 {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 600;
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