<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        プレイヤー設定
      </v-col>
      <template v-for="(player, i) in gameSetting.players">
        <v-col cols="5" :key="`first-${i}`">
          <v-select
            v-model="player.name"
            :items="editablePlayers(player.name)"
            :label="`プレイヤー${i}`"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="4" :key="`second-${i}`">
          <v-select
            v-model="player.position"
            :items="selectablePostions(player.position)"
            label="役職"
            item-text="name"
            item-value="key"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="2" :key="`third-${i}`">
          <deleteBtn
            :click="
              () => {
                gameSetting.players.splice(i, 1)
              }
            "
          ></deleteBtn>
        </v-col>
      </template>
    </v-row>
    <backBtn to="/setting-2"></backBtn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import backBtn from './parts/btn/back.vue'
import deleteBtn from './parts/btn/delete.vue'
import _ from 'lodash'

export default Vue.extend({
  name: 'setting3',
  components: {
    backBtn,
    deleteBtn,
  },
  computed: {
    ...mapState(['gameSetting', 'players', 'positionList']),
    editablePlayers(): Function {
      return (key: string) => {
        return this.players.filter((player: string) => {
          return player === key || !this.gameSetting.players.find((p: any) => p.name === player)
        })
      }
    },
    allPositions(): Array<string> {
      return this.gameSetting.positions
        .map((position: any) => Array(position.number).fill(position.key))
        .flat()
    },
    selectablePostions(): Function {
      return (key: string) => {
        const editable: any = _.cloneDeep(this.allPositions)
        this.gameSetting.players.forEach((player: any) => {
          const index = editable.findIndex((e: any) => e === player.position)
          if (index >= 0) {
            editable.splice(index, 1)
          }
        })
        if (key !== '') {
          editable.push(key)
        }
        return _.uniq(editable).map((e: any) => {
          return {
            key: e,
            name: this.positionList.find((p: any) => {
              return p.key === e
            }),
          }.name
        })
      }
    },
    isNext(): boolean {
      if (this.gameSetting.players.find((p: any) => p.name === '' || p.position === '')) {
        return false
      }
      return true
    },
  },
  watch: {
    gameSetting: {
      handler() {
        this.setNextPage()
        this.saveSetting(this.gameSetting)
      },
      deep: true,
    },
  },
  mounted() {
    this.gameSetting.players = Array(this.gameSetting.totalNumber)
      .fill(null)
      .map(e => {
        return { name: '', position: '' }
      })
  },
  methods: {
    ...mapActions(['saveSetting']),
    add() {
      this.gameSetting.players.push({
        name: '',
        position: '',
      })
    },
    setNextPage() {
      this.$emit('next', this.isNext ? 'night' : null)
    },
  },
})
</script>
