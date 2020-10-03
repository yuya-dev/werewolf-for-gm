<template>
  <v-container style="position: relative; height: 100%" fluid>
    <v-row
      class="text-center mb-4"
      v-for="(player, i) in editPlayers"
      :key="i"
      dense
      style="border-bottom: solid 1px"
    >
      <v-col outlined :cols="8" align-center>
        {{ player }}
      </v-col>
      <v-col :cols="4">
        <deleteBtn
          :click="
            () => {
              editPlayers.splice(i, 1)
            }
          "
        >
        </deleteBtn>
      </v-col>
    </v-row>

    <backBtn to="/"></backBtn>
    <addBtn
      :click="
        () => {
          dialog = true
        }
      "
    >
    </addBtn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">プレイヤー追加</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="player name"
              v-model="player"
              :rules="[required]"
              maxlength="10"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" left text @click="dialog = false">
            閉じる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="submit">
            追加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import backBtn from './parts/btn/back.vue'
import deleteBtn from './parts/btn/delete.vue'
import addBtn from './parts/btn/add.vue'

export default Vue.extend({
  name: 'player',
  components: {
    backBtn,
    addBtn,
    deleteBtn,
  },
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
