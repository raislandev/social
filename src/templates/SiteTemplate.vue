<template>
  <div id="app">
    <header >
      <nav-bar url="/" cor="teal darken-1">
         <div class="top">
            <li><router-link to="/">Home</router-link></li>
            <li v-if="!usuario"><router-link to="/login">Login</router-link></li>
            <li v-if="!usuario"><router-link to="/cadastro">Cadastro</router-link></li>
            <li><router-link to="/amigos">Amigos </router-link></li>
            <li v-if="usuario"><router-link to="/perfil">{{usuario.name}}</router-link></li>
            <li v-if="usuario"><a @click="sair()">Sair</a></li>
         </div>
         
       </nav-bar>
    </header>
    <main>
      <div class="container">
        <div class="row">
          <grid-vue size="4">
            <card-menu-vue>
              <slot name="menuesquerdo"/>
            </card-menu-vue>
            <card-menu-vue>
              <slot name="menuesquerdoamigos"/>
             
            </card-menu-vue>
          </grid-vue>
          <grid-vue size="8">
             <slot name="principal"/>
          </grid-vue>
        </div>
      </div>
    </main>
    
    <footer-vue>
        <li>
          <a href="https://github.com/raislandev/social" target="_blank" class="grey-text text-lighten-3" title="Github" >
            <i class="fa fa-github" aria-hidden="true"></i>
          </a>
          <a href="mailto:raislan6@gmail.com" target="_blank" class="grey-text text-lighten-3" title="Email">
            <i class="fa fa-envelope" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/in/raislan-da-silva-nascimento-a7a324143/" target="_blank" class="grey-text text-lighten-3" title="Linkedin">
            <i class="fa fa-linkedin-square" aria-hidden="true"></i>
          </a>
          
        </li>

        
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
    }else{
      this.$router.push('/login')
    }
  },
  methods:{
    sair(){
      this.$store.commit('setUsuario',null)
      sessionStorage.clear()
      this.usuario = false
      this.$router.push('/login')
    }
  }
}
</script>

<style>

  .grey-text i{
  font-size: 2.3em;
  padding-right: 8px;
}

.grey-text i:hover{
  color:rgb(211, 194, 168);
}

</style>
