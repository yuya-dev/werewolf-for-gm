<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn text to="/">人狼 for GM</v-btn>
      <v-spacer></v-spacer>
      <v-btn text v-if="nextPage" @click="next">NEXT</v-btn>
    </v-app-bar>

    <v-main v-if="isLoad">
      <router-view @next="nextPage = $event"></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'App',
  watch: {
    $route: function(to, from) {
      if (to.path !== from.path) {
        this.nextPage = null
      }
    },
  },
  data() {
    return {
      nextPage: null as null | string,
    }
  },
  computed: {
    ...mapState(['isLoad']),
  },
  methods: {
    ...mapActions(['load']),
    next() {
      if (this.nextPage) {
        this.$router.push(this.nextPage)
      }
    },
  },
  async mounted() {
    if (!this.isLoad) {
      await this.load()
    }
  },
})
</script>
