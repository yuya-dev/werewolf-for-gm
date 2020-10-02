<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        ゲーム設定3
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'setting3',
  mounted() {
    this.$emit('next', '/setting-3')
  },
})
</script>
