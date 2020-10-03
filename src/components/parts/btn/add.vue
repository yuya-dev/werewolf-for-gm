<template>
  <v-btn @click="click" absolute bottom right dark fab color="indigo" style="bottom: 10px">
    <v-icon dark>
      mdi-plus
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
