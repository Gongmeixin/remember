"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // 导航栏高度
      navBarHeight: 82 + 11,
      screenHeight: 0,
      tipContent: "",
      selectInfo: [],
      isGo: false
    };
  },
  onLoad() {
  },
  methods: {
    goHomeWork() {
      let _this = this;
      common_vendor.index.getStorage({
        key: "openid",
        success(res) {
          console.log(res.data);
          if (res.data != "") {
            common_vendor.index.navigateTo({
              url: "homework/homework"
            });
          }
        },
        fail(err) {
          console.log(err.errMsg);
          if (err.errMsg == "getStorage:fail data not found") {
            _this.goLogin();
          }
        }
      });
    },
    goLogin() {
      this.$refs.alertDialog.open();
      this.tipContent = `您未登录，请先登录！`;
      this.isGo = true;
    },
    dialogConfirm() {
      console.log("点击了确认");
      if (this.isGo) {
        common_vendor.index.navigateTo({
          url: "../../components/login/login"
        });
      }
    },
    dialogClose() {
      console.log("点击了取消");
    },
    goDictation() {
      let _this = this;
      common_vendor.index.getStorage({
        key: "openid",
        success(res) {
          console.log(res.data);
          if (res.data != "") {
            common_vendor.index.navigateTo({
              url: "dictationTest/dictationTest"
            });
          }
        },
        fail(err) {
          console.log(err.errMsg);
          if (err.errMsg == "getStorage:fail data not found") {
            _this.goLogin();
          }
        }
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
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.statusBarHeight + "px",
    b: common_vendor.o(($event) => $options.goHomeWork()),
    c: common_vendor.o(($event) => $options.goDictation()),
    d: `translate(0px,${$data.screenHeight - $data.statusBarHeight - 440}px)`,
    e: `translate(0px,${$data.screenHeight - $data.statusBarHeight - 44 - 300 - 50}px)`,
    f: common_vendor.o($options.dialogConfirm),
    g: common_vendor.o($options.dialogClose),
    h: common_vendor.p({
      type: "warn",
      cancelText: "取消",
      confirmText: "去登录",
      title: "提示",
      content: $data.tipContent
    }),
    i: common_vendor.sr("alertDialog", "dae05488-0"),
    j: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
