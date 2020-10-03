<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <span class="display-2">昼時間</span>
      </v-col>
      <v-col cols="12">
        <v-progress-circular
          :rotate="-90"
          :size="250"
          :width="30"
          :value="part"
          color="primary"
          @click="isStart ? stopInterval() : startInterval()"
        >
          <div>
            <p>{{ discussionTime }}</p>
            <p>{{ isStart ? '中断' : '開始' }}</p>
          </div>
        </v-progress-circular>
      </v-col>
      <v-col col="12" v-if="discussionTime === 0">
        <v-select
          v-model="executioner"
          :items="livePlayers"
          item-text="name"
          item-value="name"
          return-object
          label="処刑者"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-dialog v-model="gameSetting.isEnd">
      <v-card>
        <v-card-title>
          <span class="headline">{{ gameSetting.winner }}の勝利です！</span>
        </v-card-title>
        <v-card-actions>
          <v-btn color="blue darken-1" left text to="/">
            終了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <call :message="message" @close="callClose" :show="isCall"></call>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import call from './parts/modal/call.vue'

export default Vue.extend({
  name: 'noon',
  components: {
    call,
  },
  data() {
    return {
      message: '',
      isCall: false,
      closeCallBack: null as null | Function,
      deadPlayers: [] as any,
      interval: null as any,
      value: 0,
      isStart: false,
      discussionTime: 60 as number,
      executioner: null,
    }
  },
  watch: {
    isCall(bool) {
      if (!bool) {
        this.closeCallBack = null
      }
    },
    discussionTime(time) {
      if (time === 0) {
        this.message = '議論をやめてください。<br>'
        this.message += '処刑したい人を指差してください。'
        this.isCall = true
      }
    },
    executioner(player) {
      this.message = `議論の結果${player.name}さんが処刑されました。`
      this.closeCallBack = () => {
        player.live = false
        this.judge()
        if (!this.gameSetting.isEnd) {
          setTimeout(() => {
            this.message = '皆さん顔を伏せてください。'
            this.closeCallBack = () => {
              this.$router.push('/night')
            }
            this.isCall = true
          }, 100)
        }
      }
      this.isCall = true
    },
  },
  computed: {
    ...mapState(['gameSetting']),
    ...mapGetters(['livePlayers']),
    part(): number {
      return (this.discussionTime / this.gameSetting.discussionTime / 60) * 100
    },
  },
  methods: {
    ...mapActions(['saveSetting', 'judge']),
    callClose() {
      if (this.closeCallBack) {
        this.closeCallBack()
      }
      this.isCall = false
    },
    initialCall() {
      this.message = '皆さん、おはようございます<br>'
      this.message +=
        this.deadPlayers.length > 0
          ? this.deadPlayers.map((p: any) => `${p}さん`).join(',') +
            'が無残な死体で発見されました。'
          : '本日の犠牲者はいませんでした。'
      this.message += '<br><br>'
      this.message += `議論時間は${this.gameSetting.discussionTime}分です`
      this.isCall = true
    },
    startInterval() {
      this.interval = setInterval(() => {
        if (this.discussionTime < 1) {
          return this.stopInterval()
        }
        this.discussionTime -= 1
      }, 1000)
      this.isStart = true
    },
    stopInterval() {
      clearInterval(this.interval)
      this.isStart = false
    },
  },
  async mounted() {
    if (this.gameSetting.date === 1) {
      this.deadPlayers.push('初日犠牲者')
    }
    this.deadPlayers.concat(this.gameSetting.deadPlayers)
    this.discussionTime = this.gameSetting.discussionTime * 60
    this.initialCall()
  },
})
</script>
