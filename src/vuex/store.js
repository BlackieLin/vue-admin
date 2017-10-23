// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const userStore = new Vuex.Store({
  actions,
  getters,
  state: {
    count: 2000
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default userStore
