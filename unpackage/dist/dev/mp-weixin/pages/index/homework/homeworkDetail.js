"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      testHour: 0,
      testMinute: 2,
      testSecond: 0,
      class: null,
      answerArr: [],
      total: 0,
      currentIndex: 0,
      userAnswer: "",
      userAnswerArr: [],
      bookId: 0,
      volumeId: 0,
      unitId: 0
    };
  },
  onLoad(option) {
    console.log(option);
    this.class = JSON.parse(option.class);
    var selectdetail = this.class.split("-");
    console.log(this.class.split("-"));
    if (selectdetail.length > 0) {
      this.bookId = selectdetail[0];
      if (selectdetail.length > 1) {
        this.volumeId = selectdetail[1];
        if (selectdetail.length > 2) {
          this.unitId = selectdetail[2];
        }
      }
    }
    console.log(this.bookId, this.volumeId, this.unitId);
    this.getWords();
  },
  methods: {
    timeup() {
      common_vendor.index.showToast({});
    },
    getWords() {
      common_vendor.Ds.callFunction({
        name: "getWords",
        data: {
          unitId: this.unitId
        }
      }).then((res) => {
        console.log(res);
        this.answerArr = res.result.data;
        this.total = this.answerArr.length;
      });
    },
    lastOne() {
      if (this.currentIndex >= 1) {
        this.currentIndex--;
        let s = {
          id: this.currentIndex + 1
        };
        console.log(s.id, this.userAnswerArr.findIndex((item) => item.id === s.id));
        if (this.userAnswerArr.findIndex((item) => item.id === s.id) > -1) {
          var index = this.userAnswerArr.findIndex((item) => item.id === s.id);
          this.userAnswer = this.userAnswerArr[index].word;
        } else {
          this.userAnswer = "";
        }
      }
    },
    nextOne() {
      let uAnswerArr = this.userAnswerArr;
      this.currentIndex++;
      if (this.currentIndex < this.answerArr.length - 1) {
        let u = {
          id: this.currentIndex,
          word: this.userAnswer
        };
        console.log(this.userAnswerArr);
        if (this.userAnswerArr.findIndex((item) => item.id === u.id) <= -1 && this.userAnswer != "") {
          console.log(uAnswerArr.push(u));
          console.log(this.userAnswerArr);
        }
        if (this.userAnswerArr.findIndex((item) => item.word === u.word) > -1) {
          var index = this.userAnswerArr.findIndex((item) => item.word === u.word);
          this.userAnswer = this.userAnswerArr[index].word;
        }
        this.userAnswer = "";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_countdown2 + _easycom_uni_section2)();
}
const _easycom_uni_countdown = () => "../../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.timeup),
    b: common_vendor.p({
      ["show-day"]: false,
      hour: $data.testHour,
      minute: $data.testMinute,
      second: $data.testSecond
    }),
    c: common_vendor.p({
      title: "答题时间还剩",
      type: "line"
    }),
    d: common_vendor.f($data.answerArr, (item, index, i0) => {
      return {
        a: common_vendor.t(item.paraphrase),
        b: $data.currentIndex == index,
        c: item._id
      };
    }),
    e: $data.userAnswer,
    f: common_vendor.o(($event) => $data.userAnswer = $event.detail.value),
    g: common_vendor.n($data.currentIndex == 0 ? "notSelect" : ""),
    h: common_vendor.o(($event) => $options.lastOne()),
    i: common_vendor.t($data.currentIndex + 1 + "/" + $data.total),
    j: common_vendor.n($data.currentIndex == $data.answerArr.length - 1 ? "notSelect" : ""),
    k: common_vendor.o(($event) => $options.nextOne())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/homework/homeworkDetail.vue"]]);
wx.createPage(MiniProgramPage);
