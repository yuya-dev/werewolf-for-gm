<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <v-btn block color="primary" x-large to="/setting-1">
          ゲーム開始
        </v-btn>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-btn block color="secondary" x-large to="/player">
          プレイヤー設定
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'top',
  mounted() {
    this.resetSetting()
  },
  methods: {
    ...mapActions(['resetSetting']),
  },
})
</script>
