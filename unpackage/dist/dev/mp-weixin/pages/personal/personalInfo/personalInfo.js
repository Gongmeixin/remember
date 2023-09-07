"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      information: {
        userInfo: {
          openid: "",
          nickName: "",
          // school: '',
          // classId: '',
          phonNum: "",
          avatarUrl: "../../../static/image/0.png"
        }
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
        that.information.userInfo.openid = res.data;
        console.log(that.information.userInfo.openid);
        if (that.information.userInfo.openid != "") {
          that.getUserInfo(that.information.userInfo.openid);
        }
      }
    });
  },
  methods: {
    //保存用户信息
    upInfo() {
      common_vendor.Ds.callFunction({
        name: "saveUserInfo",
        data: this.information.userInfo
      }).then((res) => {
        console.log(res.result.id);
        if (res.result.id != "") {
          this.goBack();
        }
      });
    },
    onChooseAvatar(e) {
      if (e.detail) {
        console.log(e.detail);
        this.information.userInfo.avatarUrl = e.detail.avatarUrl;
      }
    },
    getUserInfo(id) {
      common_vendor.Ds.callFunction({
        name: "getUserInfo",
        data: {
          openid: this.information.userInfo.openid
        }
      }).then((res) => {
        console.log(res.result.data[0]);
        if (res.result.data[0] != null) {
          this.information.userInfo = res.result.data[0];
          this.isExit = true;
        } else {
          this.isExit = false;
        }
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
    a: $data.information.userInfo.avatarUrl,
    b: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    c: common_vendor.o(($event) => $data.information.userInfo.nickName = $event),
    d: common_vendor.p({
      type: "text",
      placeholder: "我们对您的称呼",
      modelValue: $data.information.userInfo.nickName
    }),
    e: common_vendor.p({
      label: "昵称",
      required: true,
      name: "name"
    }),
    f: common_vendor.o(($event) => $data.information.userInfo.phonNum = $event),
    g: common_vendor.p({
      type: "text",
      placeholder: "我们可以成功与您沟通的联系方式",
      modelValue: $data.information.userInfo.phonNum
    }),
    h: common_vendor.p({
      label: "手机",
      required: true,
      name: "phone"
    }),
    i: common_vendor.sr("baseForm", "81ddb26e-0"),
    j: common_vendor.p({
      modelValue: $data.information,
      rules: $data.rules
    }),
    k: !$data.isExit
  }, !$data.isExit ? {} : {}, {
    l: $data.isExit,
    m: common_vendor.o(($event) => $options.upInfo()),
    n: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    o: $data.isExit
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/personalInfo/personalInfo.vue"]]);
wx.createPage(MiniProgramPage);
