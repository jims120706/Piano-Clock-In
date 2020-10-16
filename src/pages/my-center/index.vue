<template>
  <view class="my-center">
    <image class="user-logo" :src="userLogo" :lazy-load="true"></image>
    <view class="user-name" v-if="hasUserInfo">
      <text>{{ username }}</text>
    </view>
    <button
      open-type="getUserInfo"
      @getuserinfo="getUserInfo"
      v-if="!hasUserInfo"
    >
      {{ username }}
    </button>
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
      openid: "",
    };
  },
  computed: {
    hasUserInfo() {
      return this.userInfo.nickName;
    },
  },
  onLoad() {
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
          });
      },
    });
  },
  methods: {
    // 获取用户信息
    getUserInfo(event) {
      log("用户信息", event.detail);
      let res = event.detail;
      // if (this.hasUserInfo()) return;
      // getUserInfo({
      //   success: (res) => {
      //     log("用户信息", res);
      this.userLogo = res.userInfo.avatarUrl;
      this.username = "你好，" + res.userInfo.nickName;
      this.userInfo = res.userInfo;
      let reqJson = JSON.parse(res.rawData);
      reqJson.openId = this.openid;
      console.log('reqJson', reqJson)
      console.log('JSON.stringify(reqJson)', JSON.stringify(reqJson))
      this.$Api.commonApi
        .login({
          data: {
            userInfo: JSON.stringify(reqJson),
          },
        })
        .then((res) => {
          log("登录成功", res);
        });
      //   },
      // });
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
