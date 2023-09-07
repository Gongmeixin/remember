"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "login",
  data() {
    return {
      code: ""
    };
  },
  methods: {
    ulogin() {
      let _this = this;
      common_vendor.index.showLoading({
        title: "加载中...",
        mask: true
      });
      common_vendor.index.login({
        provider: "weixin",
        univerifyStyle: {
          fullScreen: true
        },
        success: function(loginRes) {
          this.code = loginRes.code;
          _this.getOpenId(this.code);
        }
      });
    },
    goPersonalInfo() {
      common_vendor.index.navigateTo({
        url: "../../pages/personal/personalInfo/personalInfo"
      });
    },
    close() {
      common_vendor.index.navigateBack();
    },
    getOpenId: function(code) {
      let _this = this;
      common_vendor.Ds.callFunction({
        name: "login_fn",
        data: {
          code
        },
        success: function(res) {
          let result = res.result.data;
          console.log(result);
          common_vendor.index.setStorage({
            key: "openid",
            data: result.openid
          }).then((res2) => {
            return common_vendor.index.setStorage({
              key: "session_key",
              data: result.session_key
            });
          }).then((res2) => {
            return common_vendor.index.hideLoading();
          }).then((res2) => {
            return _this.goPersonalInfo();
          });
        }
      });
    }
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
    a: common_vendor.p({
      ["custom-prefix"]: "custom-icon",
      type: "weixin",
      size: "40"
    }),
    b: common_vendor.o((...args) => $options.ulogin && $options.ulogin(...args)),
    c: common_vendor.o($options.close),
    d: common_vendor.p({
      ["custom-prefix"]: "custom-icon",
      type: "close",
      size: "60"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/components/login/login.vue"]]);
wx.createPage(MiniProgramPage);
