import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    numx: 0,
    nextDisabled: false // 下禁用按钮
  },
  mutations: {
    addNum(state) {
      state.numx += 1
    },
    reduceNum(state) {
      if (state.numx === 0) {
        state.numx = 0
      } else {
        state.numx -= 1
      }
    },
    setNum(state, index) {
      state.numx = index
    },
    nextDisableTrue(state) {
      state.nextDisabled = true
    },
    nextDisableFalse(state) {
      state.nextDisabled = false
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
