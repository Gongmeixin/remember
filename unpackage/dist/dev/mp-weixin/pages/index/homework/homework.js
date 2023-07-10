"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      classes: "1-1",
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
      ]
    };
  },
  onLoad() {
    this.db = common_vendor.Ds.database();
  },
  methods: {
    onchange(e) {
      console.log("onchange:", e);
      console.log(typeof e);
    },
    goHomeworkDetail() {
      var mynavData = JSON.stringify(this.classes);
      common_vendor.index.navigateTo({
        url: "homeworkDetail?class=" + mynavData
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_data_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_section)();
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
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/homework/homework.vue"]]);
wx.createPage(MiniProgramPage);
