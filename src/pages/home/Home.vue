<template>
<site-template>
  <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue size="6">
          <router-link :to="'/pagina/'+usuario.id+'/'+$slug(usuario.name,{replacement:'_',lower: true})">
            <img :src="usuario.imagem" :alt="usuario.name" class="circle responsive-img"> <!-- notice the "circle" class -->
          </router-link>
          
        </grid-vue>
        <grid-vue size="6">
          <span class="black-text">
            <router-link :to="'/pagina/'+usuario.id+'/'+$slug(usuario.name,{replacement:'_',lower: true})">
              <h5 >{{ usuario.name }}</h5>
            </router-link>
          </span>
        </grid-vue>
      </div>
  </span>
  <span slot="menuesquerdoamigos"> 
    <h6>Seguindo</h6>
    <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{replacement:'_',lower: true})">
      <li>{{ item.name }}</li>
    </router-link>
    <li v-if="!amigos.length">Nenhum Amigo</li>

    <h6>seguidores</h6>
    <router-link v-for="item in seguidores" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{replacement:'_',lower: true})">
      <li>{{ item.name }}</li>
    </router-link>
    <li v-if="!seguidores.length">Nenhum Amigo</li>
  </span>
  <span slot="principal">
    <publication-vue ></publication-vue>
    <card-conteudo-vue v-for="item in listaConteudos" :key="item.id"
      :id="item.id"
      :usuarioid="item.user.id"
      :comentarios="item.comentarios"
      :totalcurtidas="item.total_curtidas"
      :curtiuConteudo="item.curtiu_conteudo"
      :perfil="item.user.imagem"
      :name="item.user.name" 
      :date="item.data">
        <card-detail-vue 
        :image="item.imagem"
        :title="item.titulo" 
        :description="item.texto"
        :link="item.link"/>
    </card-conteudo-vue>
    <button v-if="urlProxPage" @click="carregaPaginacao()" class="btn blue">mais...</button>
    <div v-scroll="handleScroll"></div>
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
      usuario:{name:"",imagem:""},
      urlProxPage:null,
      pararScrool:false,
      amigos:[],
      seguidores:[],
    }
  },

  created(){
    //console.log(this.pararScrool)
    let usuario = this.$store.getters.getUsuario
    if(usuario){
      this.usuario = this.$store.getters.getUsuario
      this.name = this.usuario.name
      this.email = this.usuario.email
    }

      this.$http
      .get(this.$urlApi+'conteudo/lista',{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        //console.log(response)
        if(response.data.status){
          //this.conteudos = response.data.conteudos.data
          this.$store.commit('setConteudoLinhaTempo',response.data.conteudos.data)
          this.urlProxPage = response.data.conteudos.next_page_url
           
          this.$http.get(this.$urlApi+'usuario/listamigos',{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
          .then(response => {
              if(response.data.status){
                this.amigos = response.data.amigos
                this.seguidores = response.data.seguidores
                
              }else{
                alert(response.data.erro)
              }
            })
            .catch(e  =>{
              console.log(e)
              alert("Error, Tente novamente mais tarde!")
            })
        }

      })
      .catch(e  =>{
        console.log(e)
        alert("Error, Tente novamente mais tarde!")
      })

  },

  components:{
    SiteTemplate,
    CardConteudoVue,
    CardDetailVue,
    PublicationVue,
    GridVue,
  },
  methods:{
    handleScroll(){
      if(this.pararScroll){
        return
      }
      if (window.scrollY >= document.body.clientHeight-949) {
        this.pararScroll = true
        this.carregaPaginacao()
        
      }

    },

    carregaPaginacao(){
      if(!this.urlProxPage){
        return;
      }
      this.$http
      .get(this.urlProxPage,{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        console.log(response)
        if(response.data.status && this.$route.name == "Home"){
          //this.conteudos = response.data.conteudos.data
          this.$store.commit('setPaginacaoLinhaTempo',response.data.conteudos.data)
          this.urlProxPage = response.data.conteudos.next_page_url
          this.pararScroll = false
        }
      })
      .catch(e  =>{
        console.log(e)
        alert("Error, Tente novamente mais tarde!")
      })
    }
  },
  computed:{
    listaConteudos(){
      return this.$store.getters.getConteudoLinhaTempo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
