<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title>
        <span class="">読み上げ</span>
      </v-card-title>
      <v-card-text v-html="message"> </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" left block @click="$emit('close')">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'call',
  props: {
    message: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
