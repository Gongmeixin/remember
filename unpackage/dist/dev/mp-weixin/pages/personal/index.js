"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      text: "我的",
      // 状态栏高度
      statusBarHeight: 0,
      studyNum: 0,
      reviewNum: 0,
      userInfo: {
        avatarUrl: "../../static/image/logo.png",
        nickName: "昵称"
      },
      isShowLoginButton: true
    };
  },
  methods: {
    goTestDetail() {
      common_vendor.index.navigateTo({
        url: "testDatile/testDatile"
      });
    },
    goD_TestDetail() {
      common_vendor.index.navigateTo({
        url: "D_testDetail/D_testDetail"
      });
    },
    goPersonalInfo() {
      if (this.isShowLoginButton) {
        common_vendor.index.showToast({
          title: "您未登录，请先登录！",
          icon: "none",
          //显示持续时间为 2秒
          duration: 2e3
        });
      } else {
        common_vendor.index.navigateTo({
          url: "personalInfo/personalInfo"
        });
      }
    },
    weixinLogin() {
      common_vendor.index.navigateTo({
        url: "../../components/login/login"
      });
    },
    getStatusBarHeight() {
      var systemInfo = common_vendor.index.getSystemInfoSync();
      this.statusBarHeight = systemInfo["statusBarHeight"];
      console.log(this.statusBarHeight);
    },
    getUserInfo(id) {
      common_vendor.Ds.callFunction({
        name: "getUserInfo",
        data: {
          openid: id
        }
      }).then((res) => {
        console.log(res.result.data[0]);
        if (res.result.data[0] != null) {
          this.userInfo.avatarUrl = res.result.data[0].avatarUrl;
          console.log(this.userInfo.avatarUrl);
          this.userInfo.nickName = res.result.data[0].nickName;
          this.isShowLoginButton = false;
        }
      });
    }
  },
  onShow() {
    this.getStatusBarHeight();
    let that = this;
    common_vendor.index.getStorage({
      key: "openid",
      success(res) {
        console.log(res.data);
        that.getUserInfo(res.data);
      },
      fail(err) {
        console.log(err.errMsg);
        that.isShowLoginButton = true;
      }
    });
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.statusBarHeight + "px",
    b: common_vendor.t($data.text),
    c: $data.userInfo.avatarUrl,
    d: common_vendor.t($data.userInfo.nickName),
    e: $data.isShowLoginButton
  }, $data.isShowLoginButton ? {
    f: common_vendor.o((...args) => $options.weixinLogin && $options.weixinLogin(...args))
  } : {}, {
    g: common_vendor.t($data.studyNum),
    h: common_vendor.t($data.reviewNum),
    i: common_vendor.p({
      type: "forward",
      size: "30"
    }),
    j: common_vendor.o((...args) => $options.goTestDetail && $options.goTestDetail(...args)),
    k: common_vendor.p({
      type: "forward",
      size: "30"
    }),
    l: common_vendor.o((...args) => $options.goD_TestDetail && $options.goD_TestDetail(...args)),
    m: common_vendor.p({
      type: "forward",
      size: "30"
    }),
    n: common_vendor.o(($event) => $options.goPersonalInfo())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/index.vue"]]);
wx.createPage(MiniProgramPage);
