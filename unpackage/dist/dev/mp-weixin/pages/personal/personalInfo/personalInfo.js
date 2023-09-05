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
      isExit: true,
      rules: {
        name: {
          rules: [
            {
              required: true,
              errorMessage: "请输入姓名"
            },
            {
              minLength: 3,
              maxLength: 5,
              errorMessage: "姓名长度在 {minLength} 到 {maxLength} 个字符"
            }
          ]
        },
        shcool: {
          rules: [{
            format: "email",
            errorMessage: "请输入正确的邮箱地址"
          }]
        },
        class: {},
        phone: {}
      }
    };
  },
  // 进入页面从缓存获取用户openid
  onShow() {
    var that = this;
    common_vendor.index.getStorage({
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
    },
    goBack() {
      var pages = getCurrentPages();
      console.log(pages.length);
      var pageLen = pages.length - 1;
      common_vendor.index.navigateBack({
        delta: pageLen
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
    a: $data.information.avatarUrl,
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: common_vendor.o(($event) => $data.information.username = $event),
    d: common_vendor.p({
      type: "text",
      placeholder: "请输入姓名",
      modelValue: $data.information.username
    }),
    e: common_vendor.p({
      label: "姓名",
      required: true,
      name: "name"
    }),
    f: common_vendor.o(($event) => $data.information.school = $event),
    g: common_vendor.p({
      type: "text",
      placeholder: "请输入您所在学校",
      modelValue: $data.information.school
    }),
    h: common_vendor.p({
      label: "学校",
      required: true,
      name: "school"
    }),
    i: common_vendor.o(($event) => $data.information.classId = $event),
    j: common_vendor.p({
      type: "text",
      placeholder: "您所在学校的班级",
      modelValue: $data.information.classId
    }),
    k: common_vendor.p({
      label: "班级",
      required: true,
      name: "class"
    }),
    l: common_vendor.o(($event) => $data.information.phonNum = $event),
    m: common_vendor.p({
      type: "text",
      placeholder: "我们可以成功与您沟通的联系方式",
      modelValue: $data.information.phonNum
    }),
    n: common_vendor.p({
      label: "手机",
      required: true,
      name: "phone"
    }),
    o: common_vendor.sr("baseForm", "81ddb26e-0"),
    p: common_vendor.p({
      modelValue: $data.information,
      rules: $data.rules
    }),
    q: !$data.isExit
  }, !$data.isExit ? {} : {}, {
    r: $data.isExit,
    s: common_vendor.o(($event) => $options.upInfo()),
    t: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/personalInfo/personalInfo.vue"]]);
wx.createPage(MiniProgramPage);
