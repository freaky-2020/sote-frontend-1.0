import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  state: {
    tableData: [{
      userid: '190101', password: '123556', name: '王小0', status: '1', univ: '中国石油大学华东', unit: '计科'
    }, {
      userid: '190102', password: '12355', name: '王小1', status: '2', univ: '中国石油大学华东', unit: '计科'
    }, {
      userid: '190103', password: '123553', name: '王小2', status: '3', univ: '中国石油大学华东', unit: '计科'
    }, {
      userid: '190104', password: '123554', name: '王小3', status: '3', univ: '中国石油大学华东', unit: '计科'
    }, {
      userid: '190105', password: '123552', name: '王小4', status: '3', univ: '中国石油大学华东', unit: '计科'
    }],
    topic:[
      {
        id:1,
        name:'第一大题',
        question:[
          {id:'', main:'',type:'',score:'',answer:''}
        ]
      }
    ]
  },
  mutations: {
    ADD(state, form) {
      console.log('mutations中的ADD被调用了')
      state.tableData.push(form)
      console.log(state.tableData)
    },
    Delete(state, id) {
      state.tableData = state.tableData.filter((u) => {
        return u.userid.indexOf(id) === -1
      })
    }
  }
})

export default store
