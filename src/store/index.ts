import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    isLoad: false,
    positionList: [
      { key: 'citizen', name: '市民', human: true },
      { key: 'wolf', name: '人狼', human: false },
      { key: 'fortuneTeller', name: '占い師', human: true },
      { key: 'psychic', name: '霊能力者', human: true },
      { key: 'madman', name: '狂人', human: true },
      { key: 'fox', name: '妖狐', human: true },
      { key: 'teru', name: 'てるてる坊主', human: true },
      { key: 'sharer', name: '共有者', human: true },
    ],
    citizenCamp: ['citizen', 'fortuneTeller', 'psychic', 'sharer'],
    wolfCamp: ['wolf', 'madman'],
    defaultSetting: {
      totalNumber: 0,
      players: [],
      positions: [],
      firstDayFortune: false,
      continuousGuard: false,
      discussionTime: 5,
      date: 0,
      deadPlayers: [],
      isEnd: false,
      winner: '',
    },
    gameSetting: {
      totalNumber: 0,
      players: [],
      positions: [],
      firstDayFortune: false,
      continuousGuard: false,
      discussionTime: 5,
      date: 0,
      deadPlayers: [],
      isEnd: false,
      winner: '',
    },
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
    countUpDate(state) {
      state.gameSetting.date += 1
    },
    foxWin(state) {
      state.gameSetting.players.forEach((player: any) => {
        if (player.position === 'fox' && player.live) {
          player.victory = true
        }
      })
      state.gameSetting.isEnd = true
      state.gameSetting.winner = '妖狐陣営'
    },
    citizenWin(state) {
      state.gameSetting.players.forEach((player: any) => {
        if (state.citizenCamp.includes(player.position)) {
          player.victory = true
        }
      })
      state.gameSetting.isEnd = true
      state.gameSetting.winner = '市民陣営'
    },
    wolfWin(state) {
      state.gameSetting.players.forEach((player: any) => {
        if (state.wolfCamp.includes(player.position)) {
          player.victory = true
        }
      })
      state.gameSetting.isEnd = true
      state.gameSetting.winner = '人狼陣営'
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
    countUpDate({ commit }) {
      commit('countUpDate')
    },
    judge({ state, commit, getters }) {
      const isLiveFox = getters.livePlayers.find((player: any) => {
        player.position === 'fox'
      })
      if (getters.liveWolf.length === 0) {
        isLiveFox ? commit('foxWin') : commit('citizenWin')
      }
      if (
        getters.liveWolf.length >=
        getters.livePlayers.filter((lp: any) => lp.position !== 'fox').length / 2
      ) {
        isLiveFox ? commit('foxWin') : commit('wolfWin')
      }
    },
  },
  modules: {},
  getters: {
    isFortune: state => {
      if (!state.gameSetting.positions.find((p: any) => p.key === 'fortuneTeller')) {
        return false
      }
      if (state.gameSetting.firstDayFortune === false && state.gameSetting.date === 0) {
        return false
      }
      return true
    },
    isSharer: state => {
      return (
        state.gameSetting.positions.find((p: any) => p.key === 'sharer') &&
        state.gameSetting.date === 0
      )
    },
    livePlayers: state => {
      return state.gameSetting.players.filter((player: any) => player.live)
    },
    liveWolf: (state, getters) => {
      return getters.livePlayers.filter((player: any) => player.position === 'wolf')
    },
    positionColor: state => (position: any) => {
      const p = state.positionList.find(p => p.key === position)
      return p ? p.human : null
    },
  },
})
