"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      rightWordsArr: [],
      userWordsArr: [],
      unitIdArr: [],
      score: 0,
      current: 0,
      ritghtAnswerArr: [],
      currentUnit: 1,
      isShow: true
    };
  },
  methods: {
    //获取用户的测试答案
    getUsrWords(_id) {
      common_vendor.Ds.callFunction({
        name: "getUserWords",
        data: {
          openid: _id
        }
      }).then((res) => {
        if (res.result.data.length != 0) {
          this.userWordsArr = res.result.data;
          console.log(this.userWordsArr);
          this.getUnitId();
        } else {
          common_vendor.index.hideLoading();
          this.isShow = false;
        }
      });
    },
    //获取用户答过题的单元id
    getUnitId() {
      let unitId = this.unitIdArr;
      this.userWordsArr.forEach((item) => {
        let res = unitId.some((i) => i == item.unit + "单元");
        if (!res) {
          this.unitIdArr.push(item.unit + "单元");
          this.getRightWords(item.unit);
        }
      });
    },
    //获取用户答过题的正确单元单词
    getRightWords(id) {
      common_vendor.Ds.callFunction({
        name: "getWords",
        data: {
          unitId: id
        }
      }).then((res) => {
        let newArr = [];
        newArr = res.result.data;
        this.rightWordsArr = this.rightWordsArr.concat(newArr);
        common_vendor.index.hideLoading();
      });
    },
    playAudio: function(word) {
      const innerAudioContext = common_vendor.index.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = "http://dict.youdao.com/dictvoice?type=0&audio=" + word;
      innerAudioContext.onPlay(() => {
        console.log("开始播放");
      });
      innerAudioContext.onError((res) => {
        console.log(res.errMsg);
        console.log(res.errCode);
      });
    },
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
        this.currentUnit = this.unitIdArr[this.current].split("")[0];
      }
    },
    getRightAnswer() {
      this.rightWordsArr.forEach((item) => {
        console.log(this.findUserWord(item._id, item.word) == item.word);
      });
    }
  },
  onLoad() {
    var that = this;
    common_vendor.index.showLoading({
      title: "加载中...",
      mask: false
    }).then((res) => {
      common_vendor.index.getStorage({
        key: "openid",
        success(res2) {
          console.log(res2);
          that.getUsrWords(res2.data);
        }
      });
    });
  },
  computed: {
    //查找用户的答案
    findUserWord() {
      return function(_id, word) {
        let AIndex = this.userWordsArr.findIndex((item) => item.word_id === _id);
        if (AIndex <= -1) {
          return "您未作答！";
        } else {
          return this.userWordsArr[AIndex].userWord;
        }
      };
    }
    // computScore() {
    // 	return function(unit) {
    // 		return this.score
    // 	}
    // }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_segmented_control2 + _easycom_uni_icons2)();
}
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.unitIdArr,
      ["style-type"]: "text",
      ["active-color"]: "'#007aff'"
    }),
    c: common_vendor.f($data.rightWordsArr, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.word),
        b: common_vendor.t($options.findUserWord(item._id)),
        c: $options.findUserWord(item._id, item.word) == item.word
      }, $options.findUserWord(item._id, item.word) == item.word ? {
        d: "e4ce76ae-1-" + i0,
        e: common_vendor.p({
          type: "checkmarkempty",
          size: "30",
          color: "green"
        })
      } : {
        g: "e4ce76ae-2-" + i0,
        h: common_vendor.p({
          type: "closeempty",
          size: "30",
          color: "red"
        })
      }, {
        f: $options.findUserWord(item._id, item.word) == item.word,
        i: common_vendor.t(item.pronounce),
        j: common_vendor.o(($event) => $options.playAudio(item.word), index),
        k: "e4ce76ae-3-" + i0,
        l: common_vendor.t(item.paraphrase),
        m: index,
        n: $data.current + 1 == item.unit
      });
    }),
    d: common_vendor.p({
      ["custom-prefix"]: "custom-icon",
      type: "sound",
      size: "18"
    }),
    e: $data.isShow,
    f: !$data.isShow
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/testDatile/testDatile.vue"]]);
wx.createPage(MiniProgramPage);
