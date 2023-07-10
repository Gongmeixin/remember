"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      screenHeight: 0
    };
  },
  onLoad() {
  },
  methods: {
    goHomeWork() {
      common_vendor.index.navigateTo({
        url: "homework/homework"
      });
    }
  },
  //第一次加载时调用
  created() {
    var systemInfo = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = systemInfo["statusBarHeight"];
    console.log(this.statusBarHeight);
    this.screenHeight = systemInfo["screenHeight"];
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o(($event) => $options.goHomeWork()),
    c: `translate(0px,${$data.screenHeight - $data.statusBarHeight - 440}px)`,
    d: `translate(0px,${$data.screenHeight - $data.statusBarHeight - 44 - 300 - 50}px)`
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
