<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        ゲーム設定2
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'setting2',
  mounted() {
    this.$emit('next', '/setting-3')
  },
})
</script>
