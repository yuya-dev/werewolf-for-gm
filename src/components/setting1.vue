<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        ゲーム設定1
      </v-col>
      <template v-for="(position, i) in positions">
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
          <v-text-field v-model="position.number" type="number" label="人数" min="1" max="20">
          </v-text-field>
        </v-col>
        <v-col cols="2" :key="`third-${i}`">
          <v-btn @click="positions.splice(i, 1)" dark fab color="indigo" style="bottom: 10px">
            <v-icon dark>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-col>
      </template>
    </v-row>
    <v-btn @click="add" absolute bottom right dark fab color="indigo" style="bottom: 10px">
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import _ from 'lodash'

export default Vue.extend({
  name: 'setting1',
  computed: {
    ...mapState(['positionList']),
    editablePosition(): Function {
      return (key: string) => {
        return this.positionList.filter((position: any) => {
          return (
            position.key === key || !this.positions.map(item => item.key).includes(position.key)
          )
        })
      }
    },
    totalNum(): number {
      return _.sum(
        this.positions.map(position => (position.key !== null ? Number(position.number) : 0))
      )
    },
    wolfNum(): number {
      const wolf = this.positions.find(position => position.key === 'wolf')
      return wolf ? Number(wolf.number) : 0
    },
    isNext(): boolean {
      if (this.totalNum < 3 || this.wolfNum === 0 || this.totalNum / 2 <= this.wolfNum) {
        return false
      }
      return true
    },
  },
  watch: {
    isNext(next) {
      this.$emit('next', next ? '/setting-2' : null)
    },
  },
  data() {
    return {
      positions: [] as Record<string, any>[],
    }
  },
  methods: {
    add() {
      this.positions.push({ key: null, number: 1 })
    },
  },
})
</script>
