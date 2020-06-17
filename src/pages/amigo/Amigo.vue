<template>
    <site-template>
     <span slot="menuesquerdo">
       <img src="https://cdn.pixabay.com/photo/2015/11/06/11/51/friends-1026523_960_720.jpg" class="responsive-img" alt="image">
     </span> 
     <ul slot="menuesquerdoamigos">
       <h6>Seguindo</h6>
      <router-link v-for="item in amigos" :key="item.id" :to="'/pagina/'+item.id+'/'+$slug(item.name,{replacement:'_',lower: true})">
          <li>{{ $uppercase(item.name) }}</li>
      </router-link>   
      <li v-if="!amigos.length">Nenhum Amigo</li>

      <h6>Seguidores</h6>
      <router-link v-for="item in seguidores" :key="item.id+new Date().getTime()" :to="'/pagina/'+item.id+'/'+$slug(item.name,{replacement:'_',lower: true})">
          <li>{{ $uppercase(item.name) }}</li>
      </router-link>   
      <li v-if="!seguidores.length">Nenhum Amigo</li>
     </ul>
     <span slot="principal">
      <!-- v-for="item in usuarioGeral" :key="item.id"-->
       <ul class="collection with-header">
        <li class="collection-header"><h5>Encontre amigos</h5></li>
        <li class="collection-item avatar" v-for="item in listaUsuariosGeral" :key="item.id">
          <router-link :to="'/pagina/'+item.id+'/'+$slug(item.name,{replacement:'_',lower: true})">
            <img :src="item.imagem" alt="" class="circle">
            <span class="title">{{$uppercase(item.name)}}</span>
            <p v-if="item.seguidor == true">Segue você</p>
            <p v-else>novo no spa</p>
          </router-link>
         
          <a href="#!" @click="seguir(item.id)" class="secondary-content">Seguir</a>
        </li>
       </ul> 
       <button v-if="urlProxPage" @click="carregaPaginacao()" class="btn blue">mais...</button>
      <div v-scroll="handleScroll"></div>
     </span>
    </site-template>
</template>

<script>
import SiteTemplate from "@/templates/SiteTemplate"
import CardAmigoVue from "@/components/social/CardAmigoVue"
export default {
  name: 'Amigos',
  data () {
    return {
      usuario:'',
      usuariosGeral:'', 
      amigos:[],
      seguidores:[],
      amigosLogado:[],
      urlProxPage:null,
      pararScrool:false,

    }
  },
  components:{
    SiteTemplate,
    CardAmigoVue
    
  },

  created(){
    this.usuario = this.$store.getters.getUsuario
    this.listUser()
  },
  methods:{
    listUser(){
      this.$http.get(this.$urlApi+'usuario/listgeralamigos/'+this.usuario.id,{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
            if(response.data.status){
              //this.usuariosGeral = response.data.sugestao_amigos.data
              this.$store.commit('setUsuariosGeralAmigos',response.data.sugestao_amigos.data)
              this.urlProxPage = response.data.sugestao_amigos.next_page_url

      
              this.$http.get(this.$urlApi+'usuario/listamigoslogado/'+this.usuario.id,{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
              .then(response => {
                  if(response.data.status){
                    this.amigos = response.data.amigos
                    this.seguidores = response.data.seguidores
                    this.amigosLogado = response.data.amigosLogado

                    
                  }else{
                    alert(response.data.erro)
                  }
                })
                .catch(e  =>{
                  console.log(e)
                  alert("Error, Tente novamente mais tarde!")
                })  

                console.log(response.data.sugestao_amigos.data)
                  
            }else{
              alert(response.data.erro)
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
      if (window.scrollY >= document.body.clientHeight-1100) {
        this.pararScroll = true
        this.carregaPaginacao()
        
      }

    },



    seguir(id){
      this.$http.post(this.$urlApi+'usuario/amigo/',{id:id},
        {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
            if(response.data.status){
                this.listUser()
               /*this.amigosLogado = response.data.amigos
               this.seguidores = response.data.seguidores
               this.eAmigo()*/
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
        if(response.data.status && this.$route.name == "Amigo"){
          //this.conteudos = response.data.conteudos.data
          this.$store.commit('setPaginacaoUsuariosGeralAmigos',response.data.sugestao_amigos.data)
          this.urlProxPage = response.data.sugestao_amigos.next_page_url
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
    listaUsuariosGeral(){
      return this.$store.getters.getUsuariosGeralAmigos
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>