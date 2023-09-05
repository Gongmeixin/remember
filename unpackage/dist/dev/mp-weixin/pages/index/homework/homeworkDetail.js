"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      testHour: 99,
      testMinute: 99,
      testSecond: 99,
      class: null,
      answerArr: [],
      total: 0,
      currentIndex: 0,
      userAnswer: "",
      userAnswerArr: [],
      bookId: 0,
      volumeId: 0,
      unitId: 0,
      isShow: true,
      tipContent: "",
      canBack: false,
      openid: ""
    };
  },
  onLoad(option) {
    var that = this;
    common_vendor.index.getStorage({
      key: "openid",
      success(res) {
        that.openid = res.data;
        console.log(that.openid);
      }
    });
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
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: true
    }).then((res) => {
      console.log(res);
      this.getWords();
    });
  },
  methods: {
    //倒计时结束
    timeup() {
      common_vendor.index.showToast({
        title: "时间已到，答题结束",
        //将值设置为 success 或者直接不用写icon这个参数
        icon: "success",
        //显示持续时间为 2秒
        duration: 2e3
      }).then((res) => {
        console.log(res);
        this.SubmitAnswer();
        this.backHome();
      });
    },
    //获取词库
    getWords() {
      if (this.unitId == 0) {
        common_vendor.index.hideLoading();
        this.isShow = false;
      } else {
        console.log(this.unitId);
        common_vendor.Ds.callFunction({
          name: "getWords",
          data: {
            unitId: this.unitId
          }
        }).then((res) => {
          console.log(res);
          this.answerArr = res.result.data;
          this.total = this.answerArr.length;
          var time = this.total * 5;
          this.testSecond = time % 60;
          this.testMinute = parseInt(time / 60);
          this.testHour = parseInt(time / 3600);
          console.log(this.total, this.testHour, this.testMinute, this.testSecond);
          common_vendor.index.hideLoading();
        });
      }
    },
    //上一题
    lastOne() {
      if (this.currentIndex >= 1) {
        let s = {
          id: this.currentIndex + 1,
          userWord: this.userAnswer
        };
        this.saveAnswer(s.id, s.word);
        this.currentIndex--;
        console.log(s);
        this.showAnswer(this.currentIndex + 1);
      }
    },
    //下一题
    nextOne() {
      if (this.currentIndex < this.answerArr.length - 1) {
        this.currentIndex++;
        this.saveAnswer(this.currentIndex, this.userAnswer);
        this.showAnswer(this.currentIndex + 1);
      }
    },
    //题号是否已经存在
    isInUAnswerArr_id(id) {
      if (this.userAnswerArr.findIndex((item) => item.id === id) <= -1) {
        return false;
      } else {
        return true;
      }
    },
    //答案是否已经存在
    isInUAnswerArr_word(word) {
      if (this.userAnswerArr.findIndex((item) => item.userWord === word) <= -1) {
        return false;
      } else {
        return true;
      }
    },
    //显示已经答题了的答案
    showAnswer(index) {
      if (this.isInUAnswerArr_id(index)) {
        this.userAnswerArr.forEach((item) => {
          if (item.id == index) {
            this.userAnswer = item.userWord;
          }
        });
      } else {
        this.userAnswer = "";
      }
    },
    //保存答案
    saveAnswer(index, word) {
      let u = {
        id: index,
        userWord: word,
        unit: this.unitId,
        word_id: this.answerArr[index - 1]._id,
        openid: this.openid
      };
      console.log(u.id, this.isInUAnswerArr_id(u.id));
      if (!this.isInUAnswerArr_id(u.id) && this.userAnswer != "") {
        if (!this.isInUAnswerArr_word(u.word) || !this.isInUAnswerArr_id(u.id)) {
          this.userAnswerArr.push(u);
          console.log("新答案保存成功");
        }
      } else {
        console.log(u.word, this.isInUAnswerArr_word(u.word));
        if (!this.isInUAnswerArr_word(u.word) && this.userAnswer != "" || this.isInUAnswerArr_id(u.id) && this.userAnswer != "") {
          this.userAnswerArr.forEach((item) => {
            if (item.id == u.id) {
              item.word = u.word;
              console.log("答案更新成功");
            }
          });
        }
        console.log(this.userAnswerArr);
      }
    },
    dialogConfirm() {
      console.log("点击了确认");
      this.canBack = true;
      common_vendor.index.switchTab({
        url: "../index"
      });
    },
    dialogClose() {
      console.log("点击了取消");
    },
    //上传答案
    SubmitAnswer() {
      common_vendor.index.showLoading({
        title: "正在提交...",
        mask: true
      }).then((res) => {
        common_vendor.Ds.callFunction({
          name: "UploadAnswer",
          data: {
            userAnswer: this.userAnswerArr
          }
        }).then((res2) => {
          console.log(res2);
          common_vendor.index.showToast({
            title: "提交成功！",
            icon: "success",
            duration: 2e3,
            mask: true
          });
          this.backHome();
        }).catch((err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: err,
            icon: "none",
            duration: 2e3,
            mask: true
          });
          this.backHome();
        });
      });
    },
    backHome() {
      common_vendor.index.hideLoading().then((res) => {
        common_vendor.index.showToast({
          title: "提交成功",
          //将值设置为 success 或者直接不用写icon这个参数
          icon: "success",
          //显示持续时间为 2秒
          duration: 2e3
        }).then((res2) => {
          common_vendor.index.switchTab({
            url: "../index"
          });
        });
      });
    },
    fpNumInput(e) {
      const o = e.detail;
      const inputRule = /[^a-zA-Z]/g;
      this.$nextTick(function() {
        this.userAnswer = o.value.replace(inputRule, "");
      });
    }
  },
  onHide() {
    common_vendor.index.showLoading();
  }
};
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_countdown2 + _easycom_uni_section2 + _easycom_uni_notice_bar2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_countdown = () => "../../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_notice_bar = () => "../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_uni_section + _easycom_uni_notice_bar + _easycom_uni_popup_dialog + _easycom_uni_popup)();
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
    e: common_vendor.o([($event) => $data.userAnswer = $event.detail.value, (...args) => $options.fpNumInput && $options.fpNumInput(...args)]),
    f: $data.userAnswer,
    g: common_vendor.n($data.currentIndex == 0 ? "notSelect" : ""),
    h: common_vendor.o(($event) => $options.lastOne()),
    i: common_vendor.t($data.currentIndex + 1 + "/" + $data.total),
    j: common_vendor.n($data.currentIndex == $data.answerArr.length - 1 ? "notSelect" : ""),
    k: common_vendor.o(($event) => $options.nextOne()),
    l: $data.currentIndex < $data.answerArr.length - 1,
    m: common_vendor.n($data.currentIndex == $data.answerArr.length - 1 ? "" : "notSelect"),
    n: common_vendor.o(($event) => $options.SubmitAnswer()),
    o: $data.currentIndex >= $data.answerArr.length - 1,
    p: $data.isShow,
    q: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      text: "暂无该单元的数据,试试别的功能吧!"
    }),
    r: common_vendor.p({
      title: "提示",
      type: "line"
    }),
    s: !$data.isShow,
    t: common_vendor.o($options.dialogConfirm),
    v: common_vendor.o($options.dialogClose),
    w: common_vendor.p({
      type: "warn",
      cancelText: "取消",
      confirmText: "确认",
      title: "提示",
      content: $data.tipContent
    }),
    x: common_vendor.sr("alertDialog", "7a6c6c6c-4"),
    y: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/index/homework/homeworkDetail.vue"]]);
wx.createPage(MiniProgramPage);
