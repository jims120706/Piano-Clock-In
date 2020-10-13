<template>
  <view class="clock-in">
    <comp-plan-card></comp-plan-card>
  </view>
</template>

<script>
import { log } from "@/utils/utils";
import CompPlanCard from "./components/PlanCard";
export default {
  components: {
    CompPlanCard,
  },
  data() {
    return {
      title: "clock-in",
    };
  },
  onLoad() {
    uni.login({
      scopes: "auth_user",
      success: (res) => {
        log("登录成功", res);
        this.$Api.commonApi.getSessionKey({
          data: {
            code: res.code
          }
        }).then(res => {
          log('请求成功', res)
        })
      },
    });
  },
  methods: {},
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
