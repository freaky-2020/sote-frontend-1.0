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
    addnum(state) {
      state.numx += 1
    },
    reducenum(state) {
      if (state.numx === 0) {
        state.numx = 0
      } else {
        state.numx -= 1
      }
    },
    setnum(state, index) {
      state.numx = index
    },
    nextDisable() {

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
