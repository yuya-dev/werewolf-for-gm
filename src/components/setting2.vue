<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        ゲーム設定
      </v-col>
      <v-col cols="12">
        <v-switch
          v-model="gameSetting.firstDayFortune"
          style="flex-direction: row-reverse;"
          label="初日占い"
        >
        </v-switch>
      </v-col>
      <v-col cols="12">
        <v-switch v-model="gameSetting.continuousGuard" label="連続ガード"> </v-switch>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="gameSetting.discussionTime"
          label="議論時間"
          type="number"
          min="1"
          max="20"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <backBtn to="/setting-1"></backBtn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import backBtn from './parts/btn/back.vue'

export default Vue.extend({
  name: 'setting2',
  components: {
    backBtn,
  },
  computed: {
    ...mapState(['gameSetting']),
  },
  watch: {
    gameSetting() {
      this.saveSetting(this.gameSetting)
    },
  },
  mounted() {
    this.$emit('next', '/setting-3')
  },
  methods: {
    ...mapActions(['saveSetting']),
  },
})
</script>
