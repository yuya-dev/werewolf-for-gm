<template>
  <v-btn @click="click" dark fab color="indigo">
    <v-icon dark>
      mdi-delete
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'btn',
  props: {
    click: {
      type: Function,
      required: true,
    },
  },
})
</script>
