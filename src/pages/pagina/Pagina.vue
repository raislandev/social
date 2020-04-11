<template>
<site-template>
  <span slot="menuesquerdo">
      <div class="row valign-wrapper">
        <grid-vue size="6">
          <img :src="donoPagina.imagem" :alt="donoPagina.name" class="circle responsive-img"> <!-- notice the "circle" class -->
        </grid-vue>
        <grid-vue size="6">
          <span class="black-text">
            <h5>{{ donoPagina.name }}</h5>
          </span>
        </grid-vue>
      </div>
      <button v-if="donoPagina.id != usuario.id" @click="seguir(donoPagina.id)" class="waves-effect waves-light btn" >{{ btnValue }}</button>
  </span>

  <span slot="menuesquerdoamigos"> 
    <h6>Seguindo</h6>
     <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{replacement:'_',lower: true})">
        <li>{{ item.name }}</li>
     </router-link>   
    <li v-if="!amigos.length">Nenhum Amigo</li>

     <h6>Seguidores</h6>
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
  name: 'Pagina',
  data () {
    return {
      usuario:false,
      urlProxPage:null,
      pararScrool:false,
      donoPagina:{name:"",imagem:""},
      amigos:[],
      amigosLogado:[],
      btnValue:'',
      seguidores:[]
    }
  },

  created(){
    this.atualizaPagina()

  },

  components:{
    SiteTemplate,
    CardConteudoVue,
    CardDetailVue,
    PublicationVue,
    GridVue,
  },
   
  watch:{
    '$route':'atualizaPagina'
  },

  methods:{

    atualizaPagina(){
      console.log(this.pararScrool)
      let usuario = this.$store.getters.getUsuario
      if(usuario){
        this.usuario = this.$store.getters.getUsuario
        this.name = this.usuario.name
        this.email = this.usuario.email
      }

        this.$http
        .get(this.$urlApi+'conteudo/page/lista/'+this.$route.params.id,{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
          //console.log(response)
          if(response.data.status ){
            //this.conteudos = response.data.conteudos.data
            console.log(response.data.donoPagina)
            this.$store.commit('setConteudoLinhaTempo',response.data.conteudos.data)
            this.urlProxPage = response.data.conteudos.next_page_url
            this.donoPagina = response.data.donoPagina

            this.$http.get(this.$urlApi+'usuario/listamigoslogado/'+this.donoPagina.id,{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
            .then(response => {
                if(response.data.status){
                  this.amigos = response.data.amigos
                  this.amigosLogado = response.data.amigosLogado
                  this.seguidores = response.data.seguidores
                  this.eAmigo()
                  
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

    handleScroll(){
      if(this.pararScroll){
        return
      }
      if (window.scrollY >= document.body.clientHeight-949) {
        this.pararScroll = true
        this.carregaPaginacao()
        
      }

    },

    eAmigo(){
      for(let amigo of this.amigosLogado){
        if(amigo.id == this.donoPagina.id){
          this.btnValue = "Deixar de seguir"
          return
        }
      }
      this.btnValue = "Seguir"
    },

    seguir(id){
      this.$http.post(this.$urlApi+'usuario/amigo/',{id:id},
        {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
            if(response.data.status){
               this.amigosLogado = response.data.amigos
               this.seguidores = response.data.seguidores
               this.eAmigo()
            }else{
               alert(response.data.erro)
            }

        }).catch(e  =>{
            console.log(e)
            alert("Error, Tente novamente mais tarde!")
        })
    },

    carregaPaginacao(){
      if(!this.urlProxPage){
        return;
      }
      this.$http
      .get(this.urlProxPage,{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        console.log(response)
        if(response.data.status && this.$route.name == "Pagina"){
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
