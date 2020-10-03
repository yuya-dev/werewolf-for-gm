<template>
  <v-btn :to="to" absolute bottom left dark fab color="indigo" style="bottom: 10px">
    <v-icon dark>
      mdi-arrow-left
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'btn',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
})
</script>
