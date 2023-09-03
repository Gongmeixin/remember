"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      rightWordsArr: [
        {
          "_id": "64a94d6d7df0533b3190ac88",
          "word": "restroom",
          "pronounce": "[restru:m]",
          "paraphrase": "n. （美）洗手间；公共厕所",
          "unit": 3
        },
        {
          "_id": "64a94d6d7df0533b3190ac89",
          "word": "stamp",
          "pronounce": "[stæmp]",
          "paraphrase": "n. 邮票；印章",
          "unit": 3
        },
        {
          "_id": "64a94d6d7df0533b3190ac8b",
          "word": "grape",
          "pronounce": "[greip]",
          "paraphrase": "n. 葡萄",
          "unit": 3
        },
        {
          "_id": "64a94d6d7df0533b3190aca1",
          "word": "direction",
          "pronounce": "[direkʃn; dairekʃn]",
          "paraphrase": "n. 方向；方位",
          "unit": 3
        },
        {
          "_id": "64a94d6d7df0533b3190ac9e",
          "word": "choice",
          "pronounce": "[tʃɔis]",
          "paraphrase": "n. 选择；挑选",
          "unit": 3
        }
      ],
      userWordsArr: [
        {
          "_id": "64ae673de0ec1967647460fa",
          "id": 1,
          "userWord": "brashroom",
          "unit": "3",
          "word_id": "64a94d6d7df0533b3190ac88"
        },
        {
          "_id": "64ae673de0ec1967647460fb",
          "id": 2,
          "userWord": "postpone",
          "unit": "3",
          "word_id": "64a94d6d7df0533b3190ac89"
        },
        {
          "_id": "64ae673de0ec1967647460fc",
          "id": 3,
          "userWord": "manager",
          "unit": "3",
          "word_id": "64a94d6d7df0533b3190ac8a"
        }
      ],
      unitIdArr: []
    };
  },
  methods: {
    //获取用户的测试答案
    getUsrWords() {
      common_vendor.Ds.callFunction({
        name: "getUserWords",
        data: {}
      }).then((res) => {
        this.userWordsArr = res.result.data;
        console.log(this.userWordsArr);
        this.getUnitId();
      });
    },
    //获取用户答过题的单元id
    getUnitId() {
      const unitId = [];
      this.userWordsArr.forEach((item) => {
        let res = unitId.some((i) => i == item.unit);
        if (!res) {
          unitId.push(item.unit);
          console.log(item.unit);
          this.getRightWords(item.unit);
        }
        this.unitIdArr = unitId;
        console.log(this.unitIdArr);
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
        console.log(res.result.data);
        this.rightWordsArr.push(res.result.data);
        console.log(this.rightWordsArr);
        common_vendor.index.hideLoading();
      });
    }
  },
  onLoad() {
  },
  computed: {
    //查找用户的答案
    findUserWord() {
      return function(_id) {
        let AIndex = this.userWordsArr.findIndex((item) => item.word_id == _id);
        if (AIndex <= -1) {
          return "您未作答！";
        } else {
          return this.userWordsArr[AIndex].userWord;
        }
      };
    },
    isRight() {
      return function(_id) {
        let AIndex = this.userWordsArr.findIndex((item) => item.word_id == _id);
        if (AIndex <= -1) {
          return false;
        } else {
          return true;
        }
      };
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.rightWordsArr, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.word),
        b: common_vendor.t($options.findUserWord(item._id)),
        c: $options.isRight(item._id)
      }, $options.isRight(item._id) ? {
        d: "e4ce76ae-0-" + i0,
        e: common_vendor.p({
          type: "checkmarkempty",
          size: "30"
        })
      } : {
        g: "e4ce76ae-1-" + i0,
        h: common_vendor.p({
          type: "closeempty",
          size: "30"
        })
      }, {
        f: $options.isRight(item._id),
        i: common_vendor.t(item.pronounce),
        j: common_vendor.t(item.paraphrase),
        k: item._id
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/HTML5/前端框架/RememberWords/pages/personal/testDatile/testDatile.vue"]]);
wx.createPage(MiniProgramPage);
