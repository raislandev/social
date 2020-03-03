<template>
<site-template>
  <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue size=10>
          <img :src="usuario.imagem" :alt="usuario.name" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>
        <grid-vue size="8">
          <span class="black-text">
            <h5>{{ usuario.name }}</h5>
            
          </span>
        </grid-vue>
      </div>
  </span>
  <span slot="principal">
    <publication-vue></publication-vue>
    <card-conteudo-vue 
      perfil="https://materializecss.com/images/yuna.jpg"
      name="Maria Silva" 
      date="19/02/2020">
        <card-detail-vue 
        image="https://materializecss.com/images/sample-1.jpg"
        title="" 
        description="I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively."/>
    </card-conteudo-vue>
  </span>
  

</site-template>
</template>

<script>
import SiteTemplate from "@/templates/SiteTemplate"
import CardConteudoVue from "@/components/social/CardConteudoVue"
import CardDetailVue from "@/components/social/CardDetailVue"
import PublicationVue from "@/components/social/PublicationVue"
import GridVue from "@/components/layouts/GridVue"


export default {
  name: 'Home',
  data () {
    return {
      usuario:false
    }
  },

  created(){
    let usuario = sessionStorage.getItem('usuario')
    if(usuario){
      this.usuario = JSON.parse(usuario)
      this.name = this.usuario.name
      this.email = this.usuario.email
    }
  },

  components:{
    SiteTemplate,
    CardConteudoVue,
    CardDetailVue,
    PublicationVue,
    GridVue,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
