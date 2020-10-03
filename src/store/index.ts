import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    isLoad: false,
    positionList: [
      { key: 'citizen', name: '市民' },
      { key: 'wolf', name: '人狼' },
      { key: 'fortuneTeller', name: '占い師' },
      { key: 'psychic', name: '霊能力者' },
      { key: 'madman', name: '狂人' },
      { key: 'fox', name: '妖狐' },
      { key: 'teru', name: 'てるてる坊主' },
      { key: 'sharer', name: '共有者' },
    ],
    defaultSetting: {
      totalNumber: 0,
      players: [],
      positions: [],
      firstDayFortune: false,
      continuousGuard: false,
      discussionTime: 5,
    },
    gameSetting: {},
  },
  mutations: {
    savePlayers(state, players) {
      localStorage.setItem('players', JSON.stringify(players))
      state.players = players
    },
    load(state) {
      const players = JSON.parse(localStorage.getItem('players') || '[]')
      state.players = players
      state.isLoad = true
    },
    saveSetting(state, setting) {
      state.gameSetting = setting
    },
    resetSetting(state) {
      state.gameSetting = _.cloneDeep(state.defaultSetting)
    },
  },
  actions: {
    load({ commit }) {
      commit('load')
    },
    savePlayers({ commit }, players) {
      commit('savePlayers', players)
    },
    saveSetting({ commit }, setting) {
      commit('saveSetting', setting)
    },
    resetSetting({ commit }) {
      commit('resetSetting')
    },
  },
  modules: {},
})