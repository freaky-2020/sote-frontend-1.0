import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    numX: 0,
    nextDisabled: false, // 下禁用按钮
    detailDate: null
  },
  mutations: {
    addNum(state) {
      state.numX += 1
    },
    reduceNum(state) {
      if (state.numX === 0) {
        state.numX = 0
      } else {
        state.numX -= 1
      }
    },
    setNum(state, index) {
      state.numX = index
    },
    nextDisableTrue(state) {
      state.nextDisabled = true
    },
    nextDisableFalse(state) {
      state.nextDisabled = false
    },
    setDetailDate(state, response) {
      state.detailDate = response
    }
  },
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
