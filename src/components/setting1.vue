<template>
  <v-container>
    <v-row class="text-center" dense>
      <v-col cols="12">
        <p>役職設定</p>
      </v-col>

      <template v-for="(position, i) in gameSetting.positions">
        <v-col cols="6" :key="`first-${i}`">
          <v-select
            v-model="position.key"
            :items="editablePosition(position.key)"
            label="役職"
            outlined
            item-text="name"
            item-value="key"
          ></v-select>
        </v-col>
        <v-col cols="3" :key="`second-${i}`">
          <v-text-field
            v-model.number="position.number"
            type="number"
            label="人数"
            min="1"
            max="20"
          >
          </v-text-field>
        </v-col>
        <v-col cols="2" :key="`third-${i}`">
          <deleteBtn
            :click="
              () => {
                gameSetting.positions.splice(i, 1)
              }
            "
          ></deleteBtn>
        </v-col>
      </template>
    </v-row>
    <backBtn to="/"></backBtn>
    <addBtn v-if="players.length > this.gameSetting.positions.length" :click="add"></addBtn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'
import backBtn from './parts/btn/back.vue'
import deleteBtn from './parts/btn/delete.vue'
import addBtn from './parts/btn/add.vue'

export default Vue.extend({
  name: 'setting1',
  components: {
    backBtn,
    addBtn,
    deleteBtn,
  },
  computed: {
    ...mapState(['positionList', 'gameSetting', 'players']),
    editablePosition(): Function {
      return (key: string) => {
        return this.positionList.filter((position: any) => {
          return (
            position.key === key ||
            !this.gameSetting.positions
              .map((item: { key: string }) => item.key)
              .includes(position.key)
          )
        })
      }
    },
    totalNum(): number {
      return _.sum(
        this.gameSetting.positions.map((position: { key: null | string; number: number }) =>
          position.key !== null ? position.number : 0
        )
      )
    },
    wolfNum(): number {
      const wolf = this.gameSetting.positions.find(
        (position: { key: null | string; number: number }) => position.key === 'wolf'
      )
      return wolf ? wolf.number : 0
    },
    isNext(): boolean {
      if (this.totalNum < 3 || this.wolfNum === 0 || this.totalNum / 2 <= this.wolfNum) {
        return false
      }
      return true
    },
  },
  watch: {
    gameSetting: {
      handler() {
        this.setNextPage()
        this.saveSetting(
          Object.assign(this.gameSetting, {
            totalNumber: this.totalNum,
          })
        )
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(['saveSetting']),
    add() {
      this.gameSetting.positions.push({ key: null, number: 1 })
    },
    setNextPage() {
      this.$emit('next', this.isNext ? '/setting-2' : null)
    },
  },
  mounted() {
    this.setNextPage()
  },
})
</script>
