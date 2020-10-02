<template>
  <v-container style="position: relative; height: 100%" fluid>
    <v-row
      class="text-center mb-4"
      v-for="(player, i) in editPlayers"
      :key="i"
      dense
      style="border-bottom: solid 1px"
    >
      <v-col outlined :cols="8">
        {{ player }}
      </v-col>
      <v-col class="mb-4" :cols="4">
        <v-btn @click="editPlayers.splice(i, 1)">削除</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" absolute bottom right dark fab color="indigo" style="bottom: 10px">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-form ref="form"> </v-form>
          <v-text-field
            label="player name"
            v-model="player"
            :rules="[required]"
            maxlength="10"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-btn block @click="submit">
            追加
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block @click="dialog = false">
            閉じる
          </v-btn>
        </v-list-item>
      </v-list>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'player',
  computed: {
    ...mapState(['players']),
  },
  data() {
    return {
      player: '',
      dialog: false,
      editPlayers: [] as string[],
      required: (value: string) => !!value || '必ず入力してください', // 入力必須の制約
    }
  },
  watch: {
    dialog() {
      this.player = ''
    },
  },
  async mounted() {
    this.editPlayers = this.players || []
  },
  methods: {
    ...mapActions(['savePlayers']),
    submit() {
      if (this.player !== '') {
        this.editPlayers.push(this.player)
        this.dialog = false
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.savePlayers(this.editPlayers)
    next()
  },
})
</script>
