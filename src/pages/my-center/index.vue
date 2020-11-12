<template>
  <view class="my-center">
    <image class="user-logo" :src="userLogo" :lazy-load="true"></image>
    <view class="user-name" v-if="hasUserInfo">
      <text>{{ userInfo.username }}</text>
    </view>
    <view class="more">
      更多功能敬请期待~~
    </view>
    <!-- <button
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
      v-if="!hasUserInfo"
    >
      {{ username }}
    </button> -->
  </view>
</template>

<script>
import { getUserInfo, log } from "@/utils/utils";
import { mapGetters } from "@/store";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
    hasUserInfo() {
      return this.userInfo && this.userInfo.nickName;
    },
    userLogo() {
      return (
        (this.userInfo && this.userInfo.avatarUrl) ||
        require("@/static/images/my-center/default-user-logo.svg")
      );
    },
  },
  onLoad() {},
  methods: {},
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
  .more{
    color: #14c5b4;
  }
}
</style>
