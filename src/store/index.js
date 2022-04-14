import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

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
    user,
    permission
  },
  getters,
  state: {
    numx: 0,
    isDown:false,
    fillItems:[
      {id:1,input:'',},
      {id:2,input:'',},
      {id:3,input:'',},
      {id:4,input:'',},
      {id:5,input:'',},
      {id:6,input:'',},
      {id:7,input:'',},
      {id:8,input:'',},
      {id:9,input:'',},
      {id:10,input:'',},
    ],
    check:[],
    fillSum:1,
    tableData: [],
    topic:[
      {
        id:1,
        title:'单选题',
        question:[
          {id:'', main:'',type:'',score:'',answer:''}
        ]
      }
    ],
    question:[
      {id:'', main:'',type:'',score:'',answer:''}
    ]
  },
  mutations: {
    gradingThis(state){
      state.isDown = true
    },
    gradingDown(state){
      state.isDown = false
    },
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
    updateFillItems(state,newFillItems){
      state.fillItems = newFillItems
    },
    updateFillSum(state,newFillSum){
      state.fillSum = newFillSum
    },
    updateCheck(state,newCheck){
      state.check = newCheck
    },
    ADD(state, form) {
      console.log('mutations中的ADD被调用了')
      state.tableData.push(form)
      console.log(state.tableData)
    },
    Delete(state, id) {
      state.tableData = state.tableData.filter((u) => {
        return u.userid.indexOf(id) === -1
      })
    },
  }
})

export default store
