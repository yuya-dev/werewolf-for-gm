<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/wlogo.png')" class="my-3" contain height="200" />
      </v-col>

      <v-col v-if="isStart" class="mb-4">
        <v-btn block color="primary" x-large to="/setting-1">
          ゲーム開始
        </v-btn>
      </v-col>
      <v-col v-if="!isStart" class="mb-4">
        ゲームを開始するためには3人以上のプレイヤーの登録が必要です。
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-btn block color="secondary" x-large to="/player">
          プレイヤー設定
        </v-btn>
      </v-col>
    </v-row>
    <span>v0.1.2</span>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  name: 'top',
  computed: {
    ...mapState(['players']),
    isStart() {
      return this.players.length > 2
    },
  },
  mounted() {
    this.resetSetting()
  },
  methods: {
    ...mapActions(['resetSetting']),
  },
})
</script>
