import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Top from '../components/top.vue'
import Player from '../components/player.vue'
import S1 from '../components/setting1.vue'
import S2 from '../components/setting2.vue'
import S3 from '../components/setting3.vue'
import Night from '../components/night.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'top',
    component: Top,
  },
  {
    path: '/player',
    name: 'player',
    component: Player,
  },
  {
    path: '/setting-1',
    name: 'setting1',
    component: S1,
  },
  {
    path: '/setting-2',
    name: 'setting2',
    component: S2,
  },
  {
    path: '/setting-3',
    name: 'setting3',
    component: S3,
  },
  {
    path: '/night',
    name: 'night',
    component: Night,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
