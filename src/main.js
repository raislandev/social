// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import slug from 'slug'

let slug2= function(string){
  string = string.replace(' ','_')
  return string.toLowerCase()
}

let uppercase  = function(string){
  string = string[0].toUpperCase()+string.slice(1); 
  return string
}

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlApi = 'http://localhost:8000/api/'
Vue.prototype.$slug = slug
Vue.prototype.$uppercase = uppercase
Vue.use(Vuex)

var store ={
  state:{
    usuario:sessionStorage.getItem('usuario')? JSON.parse(sessionStorage.getItem('usuario')) : null,
    conteudoLinhaTempo:[],
    usuariosGeralAmigos:[]
  },
  getters:{
    getUsuario:state =>{
      return state.usuario
    },
    getToken:state =>{
      return state.usuario.token
    },
    getConteudoLinhaTempo:state =>{
      return state.conteudoLinhaTempo
    },
    
    getUsuariosGeralAmigos:state =>{
      return state.usuariosGeralAmigos
    }

  },
  mutations:{
    setUsuario(state,n){
      state.usuario = n
    },
    setConteudoLinhaTempo(state,n){
      state.conteudoLinhaTempo = n
    },
    setPaginacaoLinhaTempo(state,lista){
      for(let item of lista){
        state.conteudoLinhaTempo.push(item)
      }
    },

    setUsuariosGeralAmigos(state,n){
      state.usuariosGeralAmigos = n
    },
    setPaginacaoUsuariosGeralAmigos(state,lista){
      for(let item of lista){
        state.usuariosGeralAmigos.push(item)
      }
    }

  }
}

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:new Vuex.Store(store),
  router,
  components: { App },
  template: '<App/>'
})
