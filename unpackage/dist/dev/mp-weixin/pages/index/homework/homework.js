"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      classes: "0",
      dataTree: [
        {
          text: "七年级英语",
          value: "1-0",
          children: [
            {
              text: "上册",
              value: "1-1"
            },
            {
              text: "下册",
              value: "1-2"
            }
          ]
        },
        {
          text: "八年级英语",
          value: "2-0",
          children: [
            {
              text: "上册",
              value: "2-1"
            },
            {
              text: "下册",
              value: "2-2"
            }
          ]
        },
        {
          text: "九年级英语",
          value: "3-0",
          children: [{
            text: "全一册",
            value: "3-1",
            children: [{
              text: "Unit 1",
              value: "3-1-1"
            }, {
              text: "Unit 2",
              value: "3-1-2"
            }, {
              text: "Unit 3",
              value: "3-1-3"
            }, {
              text: "Unit 4",
              value: "3-1-4"
            }, {
              text: "Unit 5",
              value: "3-1-5"
            }, {
              text: "Unit 6",
              value: "3-1-6"
            }, {
              text: "Unit 7",
              value: "3-1-7"
            }, {
              text: "Unit 8",
              value: "3-1-8"
            }, {
              text: "Unit 9",
              value: "3-1-9"
            }, {
              text: "Unit 10",
              value: "3-1-10"
            }, {
              text: "Unit 11",
              value: "3-1-11"
            }, {
              text: "Unit 12",
              value: "3-1-12"
            }, {
              text: "Unit 13",
              value: "3-1-13"
            }, {
              text: "Unit 14",
              value: "3-1-14"
            }]
          }]
        }
      ],
      tipContent: "",
      selectInfo: [],
      isGo: false
    };
  },
  onLoad() {
    console.log("页面加载");
  },
  methods: {
    onchange(e) {
      console.log("onchange:", e);
      this.selectInfo = e.detail.value;
    },
    goHomeworkDetail() {
      var msg = "";
      for (var i = 0; i < this.selectInfo.length; i++) {
        console.log(this.selectInfo[i].text);
        msg += this.selectInfo[i].text;
      }
      if (msg != "") {
        this.tipContent = `你即将进行《${msg}》的测试，是否确认？`;
        this.isGo = true;
      } else {
        this.tipContent += "你未选择课程单元！！！";
        this.isGo = false;
      }
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      console.log("点击了确认");
      if (this.isGo) {
        var mynavData = JSON.stringify(this.classes);
        common_vendor.index.navigateTo({
          url: "homeworkDetail?class=" + mynavData
        });
      }
    },
    dialogClose() {
      console.log("点击了取消");
    }
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_data_picker2 + _easycom_uni_section2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_section + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onchange),
    b: common_vendor.o(($event) => $data.classes = $event),
    c: common_vendor.p({
      placeholder: "请选择英语书及单元",
      ["popup-title"]: "请选择书册单元",
      localdata: $data.dataTree,
      modelValue: $data.classes
    }),
    d: common_vendor.o(($event) => $options.goHomeworkDetail()),
    e: common_vendor.p({
      title: "选择您要测试的单元",
      type: "line",
      padding: true
    }),
    f: common_vendor.o($options.dialogConfirm),
    g: common_vendor.o($options.dialogClose),
    h: common_vendor.p({
      type: "warn",
      cancelText: "取消",
      confirmText: "确认",
      title: "提示",
      content: $data.tipContent
    }),
    i: common_vendor.sr("alertDialog", "15f82a99-2"),
    j: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/homework/homework.vue"]]);
wx.createPage(MiniProgramPage);
