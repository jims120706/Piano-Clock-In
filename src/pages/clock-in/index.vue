<template>
  <view class="clock-in">
    <comp-plan-card @onAddBtnClick="_handlePlanAddClick"></comp-plan-card>
    <popup-container title="添加打卡记录" ref="popup" class="clock-in-popup">
      <view class="container p-0">
        <view class="date row no-gutters">
          <picker
            mode="date"
            :value="initDate"
            start="2018-01-01"
            end="2022-12-31"
            @change="_handlePlanDateChange"
          >
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
        </view>
        <view class="time row no-gutters">
          <view class="weui-cell col-12">
            <view class="weui-cell__hd">
              <label class="weui-label label">打卡时间:</label>
            </view>
            <view class="weui-cell__bd">
              <picker-view class="time-picker">
                <picker-view-column>
                  <view
                    class="column"
                    v-for="(item, index) in hours"
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
    <!-- <button @click="_showPopup">显示弹出层</button> -->
  </view>
</template>

<script>
import { log } from "@/utils/utils";
import CompPlanCard from "./components/PlanCard";
import CustomButton from "@/components/CustomButton";
import PopupContainer from "@/components/Popup";
export default {
  components: {
    CompPlanCard,
    PopupContainer,
    CustomButton,
  },
  data() {
    return {
      title: "clock-in",
      initDate: "2020-10-15",
      hours: [
        "--",
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
      ],
      minutes: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    };
  },
  onLoad() {},
  mounted() {
    this._showPopup();
  },
  methods: {
    _showPopup() {
      this.$refs.popup.open();
    },
    // 点击添加打卡按钮回调
    _handlePlanAddClick() {
      this._showPopup();
    },
    // 打卡日期切换回调
    _handlePlanDateChange(event) {
      log("打卡日期切换回调", event);
      this.initDate = event.detail.value;
    },
    // 提交打卡记录
    _handlePlanSubmit() {
      log("提交打卡记录");
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-in {
  background: #f3f0f0;
  height: 100%;
  padding: 0 40rpx;
  overflow: hidden;
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
        }
      }
    }
  }
}
</style>
