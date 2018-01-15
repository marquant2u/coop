import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Home from '@/components/Home'
import store from '@/store'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
    	path: '/',
    	name: 'home',
    	component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ]
})

router.beforeEach((to, from, next) => {
	if(to.name != 'signin' && ! store.getters['auth/isConnected']) {
    next({name: 'signin', query: {redirect: to.fullPath}})
  }
  else if (to.name == 'signin' && store.getters['auth/isConnected']) {
    console.log("test test test")
  	next({name: 'home'})
  }
  else {
    next()
  }
})
