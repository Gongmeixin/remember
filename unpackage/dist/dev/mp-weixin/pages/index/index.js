"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11
    };
  },
  onLoad() {
  },
  methods: {},
  //第一次加载时调用
  created() {
    this.statusBarHeight = common_vendor.index.getSystemInfoSync()["statusBarHeight"];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
