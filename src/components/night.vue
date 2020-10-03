<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <span class="display-2">夜時間</span>
      </v-col>
    </v-row>
    <v-dialog v-model="fortuneVisible">
      <v-card>
        <v-card-title>
          <span class="headline">占い先選択</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="fortuned"
            :items="livePlayers"
            item-text="name"
            item-value="name"
            return-object
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!fortuned" color="blue darken-1" left text @click="fortuneEnd">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="wolfVisible">
      <v-card>
        <v-card-title>
          <span class="headline">襲撃先選択</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="raider"
            :items="humans"
            item-text="name"
            item-value="name"
            return-object
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="!fortuned" color="blue darken-1" left text @click="fortuneEnd">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  name: 'night',
  components: {
    call,
  },
  data() {
    return {
      fortuned: null as any,
      message: '',
      isCall: false,
      fortuneVisible: false,
      initial: (() => {
        return true
      }) as Function,
      resolve: (() => {
        return true
      }) as Function,
      closeCallBack: null as null | Function,
      deadPlayers: [] as any,
      wolfVisible: false,
      raider: null,
    }
  },
  watch: {
    fortuned(value) {
      const judge = this.positionColor(value.position) ? '👍' : '👎'
      this.message = `その方の判定は${judge}です`
      this.isCall = true
    },
    isCall(bool) {
      if (!bool) {
        this.closeCallBack = null
      }
    },
    raider(player) {
      if (player && player.position !== 'fox') {
        player.live = false
        this.deadPlayers.push(player.name)
      }
      this.message = '顔を伏せてください'
      this.closeCallBack = () => {
        this.wolfEnd()
      }
      this.isCall = true
    },
  },
  computed: {
    ...mapState(['gameSetting']),
    ...mapGetters(['isFortune', 'livePlayers', 'positionColor', 'isSharer']),
    humans(): any {
      return this.livePlayers.filter((player: any) => player.position !== 'wolf')
    },
  },
  methods: {
    ...mapActions(['countUpDate', 'saveSetting', 'judge']),
    fortuneCall() {
      this.message = '占い師の方、顔を上げてください。<br>占いたいプレイヤーを指差してください。'
      this.isCall = true
    },
    fortuneDo() {
      return new Promise(resolve => {
        if (!this.isFortune) {
          resolve()
          return
        }
        this.resolve = resolve
        this.fortuneVisible = true
        this.fortuneCall()
      })
    },
    fortuneEnd() {
      if (this.fortuned.position === 'fox') {
        this.fortuned.live = false
        this.deadPlayers.push(this.fortuned.name)
      }
      this.fortuneVisible = false
      this.resolve()
      this.resolve = this.initial
    },
    sharerCall() {
      this.message = '共有者の方、顔を上げてください。<br>相方を確認したら顔を伏せてください。'
      this.isCall = true
    },
    sharerDo() {
      return new Promise(resolve => {
        if (!this.isSharer) {
          resolve()
          return
        }
        this.resolve = resolve
        this.closeCallBack = this.sharerEnd
        this.sharerCall()
      })
    },
    sharerEnd() {
      this.resolve()
      this.resolve = this.initial
    },
    wolfCall() {
      this.message = '人狼の方、顔を上げてください。'
      if (this.gameSetting.date === 0) {
        this.message += '<br>相方を確認したら顔を伏せてください。'
      } else {
        this.message += '<br>襲撃したい人物を指差してください。'
        this.closeCallBack = () => {
          this.wolfVisible = true
        }
      }
      this.isCall = true
    },
    wolfDo() {
      return new Promise(resolve => {
        this.resolve = resolve
        this.closeCallBack = this.wolfEnd
        this.wolfCall()
      })
    },
    wolfEnd() {
      this.wolfVisible = false
      this.resolve()
      this.resolve = this.initial
    },
    callClose() {
      if (this.closeCallBack) {
        this.closeCallBack()
      }
      this.isCall = false
    },
  },
  async mounted() {
    await this.fortuneDo()
    await this.sharerDo()
    await this.wolfDo()

    this.countUpDate()
    this.gameSetting.deadPlayers = this.deadPlayers
    this.saveSetting(this.gameSetting)
    this.judge()
    if (!this.gameSetting.isEnd) {
      this.$router.push('/noon')
    }
  },
})
</script>
