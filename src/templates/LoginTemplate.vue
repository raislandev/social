<template>
  <div id="app">
    <header >
      <nav-bar url="/" cor="teal darken-1">
         <span class="top">
            <li v-if="!usuario"><router-link to="/login">Login</router-link></li>
            <li v-if="!usuario"><router-link to="/cadastro">Cadastro</router-link></li>
            <li v-if="usuario"><router-link to="/perfil">{{usuario.name}}</router-link></li>
            <li v-if="usuario"><a @click="sair()">Sair</a></li>
         </span>
       </nav-bar>
    </header>
    <main>
      <div class="container">
         <div class="row">
            <grid-vue size="8">
                <card-menu-vue>
                    <slot name="menuesquerdo"/>
                </card-menu-vue>
            </grid-vue>
            <grid-vue size="4">
                <slot name="principal"/>
            </grid-vue>
         </div>
      </div>
    </main>
    
    <footer-vue>
        <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
        <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
    </footer-vue>
  </div>
</template>

<script>
import NavBar from "@/components/layouts/NavBar"
import FooterVue from "@/components/layouts/FooterVue"
import GridVue from "@/components/layouts/GridVue"
import CardMenuVue from "@/components/layouts/CardMenuVue"



export default {
  name: 'SiteTemplate',
  data () {
    return {
      usuario:false,
     
    }
  },
  components:{
    NavBar,FooterVue,GridVue,CardMenuVue
  },
  created(){
    let usuario = this.$store.getters.getUsuario
    if(usuario){
      this.usuario = this.$store.getters.getUsuario
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
