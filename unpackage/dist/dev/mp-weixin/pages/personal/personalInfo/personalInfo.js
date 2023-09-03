"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      information: {
        openid: "",
        avatarUrl: "../../../static/image/0.png",
        username: "",
        school: "",
        classId: "",
        phonNum: ""
      },
      isExit: true
    };
  },
  // 进入页面从缓存获取用户openid
  onShow() {
    var that = this;
    common_vendor.wx$1.getStorage({
      key: "openid",
      success(res) {
        that.information.openid = res.data;
        console.log(that.information.openid);
        if (that.information.openid == "") {
          that.isExit = !that.isExit;
          that.upInfo();
        } else {
          that.getUserInfo(that.information.openid);
        }
      }
    });
  },
  methods: {
    upInfo() {
      common_vendor.Ds.callFunction({
        name: "saveUserInfo",
        data: this.information
      }).then((res) => {
        console.log(res);
      });
    },
    onChooseAvatar(e) {
      console.log(e.detail.avatarUrl);
      this.information.avatarUrl = e.detail.avatarUrl;
    },
    getUserInfo(id) {
      common_vendor.Ds.callFunction({
        name: "getUserInfo",
        data: {
          openid: this.information.openid
        }
      }).then((res) => {
        console.log(res.result.data[0]);
        this.information = res.result.data[0];
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $data.information.phonNum = $event),
    b: common_vendor.p({
      placeholder: "手机号",
      modelValue: $data.information.phonNum
    }),
    c: common_vendor.p({
      required: true,
      label: "手机号",
      name: "mob"
    }),
    d: common_vendor.o(($event) => $data.information.phonNum = $event),
    e: common_vendor.p({
      placeholder: "身份证",
      modelValue: $data.information.phonNum
    }),
    f: common_vendor.p({
      required: true,
      label: "身份证",
      name: "id_num"
    }),
    g: common_vendor.sr("form", "81ddb26e-0"),
    h: $data.information.avatarUrl,
    i: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    j: $data.information.username,
    k: common_vendor.o(($event) => $data.information.username = $event.detail.value),
    l: $data.information.school,
    m: common_vendor.o(($event) => $data.information.school = $event.detail.value),
    n: $data.information.classId,
    o: common_vendor.o(($event) => $data.information.classId = $event.detail.value),
    p: $data.information.phonNum,
    q: common_vendor.o(($event) => $data.information.phonNum = $event.detail.value),
    r: !$data.isExit
  }, !$data.isExit ? {} : {}, {
    s: $data.isExit,
    t: common_vendor.o(($event) => $options.upInfo())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/personalInfo/personalInfo.vue"]]);
wx.createPage(MiniProgramPage);
