import Vue from 'vue'
import Router from 'vue-router'
import Mhead from '../components/m-head/m-head.vue'
import player from '../components/player/player.vue'
import songlist from '../components/songlist/songlist.vue'
Vue.use(Router)

const router = new Router({
    routes:[{
      path:'/songlist/:id',
      name:'songlist',
      component:songlist
    },{
        path:'/',
        name:'home',
        component:Mhead
    },{
      path:'/song/:id',
      name:'song',
      component:player
    }]
})

export default router