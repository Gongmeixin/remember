"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/personal/index.js";
  "./pages/search/index.js";
  "./pages/index/homework/homework.js";
  "./pages/index/homework/homeworkDetail.js";
  "./pages/personal/testDatile/testDatile.js";
  "./pages/personal/personalInfo/personalInfo.js";
  "./components/login/login.js";
  "./pages/index/dictationTest/dictationTest.js";
  "./pages/index/dictationTest/dictationTestDetail.js";
  "./pages/personal/D_testDetail/D_testDetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/HTML5/前端框架/RememberWords/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
