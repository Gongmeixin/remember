"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      text: "个人中心",
      // 状态栏高度
      statusBarHeight: 0
    };
  },
  methods: {},
  //第一次加载时调用
  created() {
    this.statusBarHeight = common_vendor.index.getSystemInfoSync()["statusBarHeight"];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.t($data.text)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/index.vue"]]);
wx.createPage(MiniProgramPage);
