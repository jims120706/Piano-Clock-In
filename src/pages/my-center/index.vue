<template>
  <view class="my-center" @click="getUserInfo">
    <image class="user-logo" :src="userLogo" :lazy-load="true"></image>
    <view class="user-name">
      <text>{{ username }}</text>
    </view>
  </view>
</template>

<script>
import { getUserInfo, log } from "@/utils/utils";
export default {
  data() {
    return {
      username: "点击授权登录",
      userLogo: require("@/static/images/my-center/default-user-logo.svg"),
      userInfo: {},
    };
  },
  onLoad() {},
  methods: {
    // 获取用户信息
    getUserInfo() {
      if (this.hasUserInfo()) return;
      getUserInfo({
        success: (res) => {
          log("用户信息", res);
          this.userLogo = res.userInfo.avatarUrl;
          this.username = "你好，" + res.userInfo.nickName;
          this.userInfo = res.userInfo;
        },
      });
    },
    // 是否有用户信息
    hasUserInfo() {
      return this.userInfo.nickName;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-logo {
    width: 300rpx;
    height: 300rpx;
    margin: 20rpx 0;
  }
  .user-name {
    color: #8a8a8a;
    font-size: 32rpx;
  }
}
</style>
