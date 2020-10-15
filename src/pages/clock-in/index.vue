<template>
  <view class="clock-in">
    <comp-plan-card @onAddBtnClick="_handlePlanAddClick"></comp-plan-card>
    <popup-container title="添加打卡记录" ref="popup" class="clock-in-popup">
      <view class="date">
        <picker
          mode="date"
          :value="initDate"
          start="2018-01-01"
          end="2022-12-31"
          @change="_handlePlanDateChange"
        >
          <view class="weui-cell">
            <view class="weui-cell__hd">
              <label class="weui-label label">打卡日期:</label>
            </view>
            <view class="weui-cell__bd">
              <text>{{ initDate }}</text>
            </view>
          </view>
        </picker>
        <view class="time">
          <view class="weui-cell">
            <view class="weui-cell__hd">
              <label class="weui-label label">打卡时间:</label>
            </view>
            <view class="weui-cell__bd">
              <text>{{ initDate }}</text>
            </view>
          </view>
        </view>
      </view>
    </popup-container>
    <!-- <button @click="_showPopup">显示弹出层</button> -->
  </view>
</template>

<script>
import { log } from "@/utils/utils";
import CompPlanCard from "./components/PlanCard";
import PopupContainer from "@/components/Popup";
export default {
  components: {
    CompPlanCard,
    PopupContainer,
  },
  data() {
    return {
      title: "clock-in",
      initDate: "2020-10-15",
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
    }
  }
}
</style>
