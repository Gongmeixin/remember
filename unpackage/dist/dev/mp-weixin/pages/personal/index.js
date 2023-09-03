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
      }
    };
  },
  methods: {
    goTestDetail() {
      common_vendor.index.navigateTo({
        url: "testDatile/testDatile"
      });
    },
    goPersonalInfo() {
      common_vendor.index.navigateTo({
        url: "personalInfo/personalInfo"
      });
    },
    weixinLogin() {
      common_vendor.index.login({
        provider: "weixin",
        //使用微信登录
        success: function(loginRes) {
          console.log(loginRes.code);
          common_vendor.index.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              "appid": "wx52d880560f439605",
              "secret": "a874878c77ccb8dc3b0e599503379899",
              "js_code": loginRes.code,
              "grant_type": "authorization_code"
            },
            method: "GET",
            success: (res) => {
              console.log(res);
            },
            fail: (err) => {
              console.log(err);
            }
          });
        }
      });
    },
    getStatusBarHeight() {
      var systemInfo = common_vendor.index.getSystemInfoSync();
      this.statusBarHeight = systemInfo["statusBarHeight"];
      console.log(this.statusBarHeight);
    }
  },
  //第一次加载时调用
  created() {
    this.getStatusBarHeight();
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
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.t($data.text),
    c: $data.userInfo.avatarUrl,
    d: common_vendor.t($data.userInfo.nickName),
    e: common_vendor.o(($event) => $options.weixinLogin()),
    f: `url(${$data.userInfo.avatarUrl})`,
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
    l: common_vendor.o(($event) => $options.goPersonalInfo()),
    m: common_vendor.p({
      type: "forward",
      size: "30"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/index.vue"]]);
wx.createPage(MiniProgramPage);
