<template>
  <p class="other-input-text">
    <span class="label">{{ label }}</span>
    <span class="value seat" ref="value" contenteditable @blur="blur" @input="input" @focus="focus"></span>
    <span class="seat" @click="clickSeat">{{ seat }}</span>
    <span v-if="comma">，</span>
  </p>

</template>

<script>
export default {
  name: 'fillblank',
  props: {
    // 题目label
    label: {
      type: String
    },
    // 填空内容
    value: {
      type: String
    },
    // 末尾是否显示逗号
    comma: {
      type: Boolean
    }
  },
  model: {
    prop: 'value',
    event: 'changeValue'
  },
  data() {
    return {
      inputValue: ''
    };
  },
  computed: {
    // 占位空格内容
    seat() {
      let minLength = 15;
      let detaLength = minLength - this.inputValue.length;

      if (detaLength > 0) {
        return new Array(detaLength).fill(' ').join('');
      }

      return '';
    }
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    inputValue(value) {
      this.$emit('changeValue', value);
    }
  },
  mounted() {
    this.inputValue = this.value || '';
    this.$refs.value.innerHTML = this.inputValue;
  },
  methods: {
    // 点击占位空格时聚焦可编辑元素
    clickSeat() {
      this.$refs.value && this.$refs.value.focus();
    },
    // 聚焦时定位光标位置
    focus(e) {
      setTimeout(() => {
        this.setFocus(this.inputValue.length);
      }, 0);
    },
    // 失焦时再赋值一遍
    blur() {
      this.inputValue = this.$refs.value.innerText;
      console.log(this.$refs.value.innerText);
    },
    // 输入时进行赋值
    input() {
      this.inputValue = this.$refs.value.innerText;
    },
    // 聚焦后把光标放到最后
    setFocus(index) {
      let obj = this.$refs.value;

      if (document.createRange) {
        // 获取选定对象
        let selection = getSelection();
        let range = document.createRange();

        range.setStart(obj.firstChild || obj, index);
        range.setEnd(obj.firstChild || obj, index);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
};

</script>

<style scoped>

</style>
