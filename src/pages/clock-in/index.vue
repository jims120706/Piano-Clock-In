<template>
  <view class="clock-in">
    <!-- <comp-plan-card></comp-plan-card> -->
    <popup-container title="aaa" ref="popup">
      <view style="color:red;">title</view>
      123456789
    </popup-container>
    <button @click="_showPopup">显示弹出层</button>
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
    };
  },
  onLoad() {},
  methods: {
    _showPopup() {
      log('this.$refs.popup', this.$refs.popup)
      this.$refs.popup.open()
    }
  },
};
</script>

<style lang="scss" scoped>
.clock-in {
  background: #f3f0f0;
  height: 100%;
  padding: 0 40rpx;
  overflow: hidden;
}
</style>
