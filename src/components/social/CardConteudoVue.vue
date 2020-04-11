<template>
    <div class="row">
        <div class="card">
            <div class="card-content">
                <div class="row valign-wrapper">
                    <grid-vue size=1>
                        <router-link v-if="$route.name == 'Home'" :to="'pagina/'+usuarioid+'/'+$slug(name,{replacement:'_',lower: true})">    
                            <img :src="perfil" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                        </router-link>
                            <img v-if="$route.name == 'Pagina'" :src="perfil" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
                    </grid-vue>
                    <grid-vue size="11">
                    <span id="publication" class="black-text">
                         <router-link v-if="$route.name == 'Home'" :to="'pagina/'+usuarioid+'/'+$slug(name,{replacement:'_',lower: true})">
                           <p><strong> {{ name }}</strong>- <small>{{ date }}</small></p> 
                         </router-link>
                         <span v-if="$route.name == 'Pagina'">
                             <p><strong>{{ name }}</strong> - <small>{{ date }}</small></p>   
                         </span>
                              
                    </span>
                    </grid-vue>
                </div>
                <slot/>
            </div>
            <div class="card-action">
            <p>
                <a @click="curtir(id)" style="cursor:pointer"><i class="material-icons">{{ curtiu }}</i>{{ totalcurtidas?totalcurtidas:0 }}</a>
                <a style="cursor:pointer" @click="abrirComentarios()"><i class="material-icons">insert_comment</i>{{ comentarios?comentarios.length:[].length }}</a>
            </p> 

            <p v-if="exibirComentario" class="right-align">
                <input type="text" v-model="textoComentario" placeholder="Comentar">
                <button v-if="textoComentario" @click="comentar(id)" class="btn waves-effect waves-light orange"><i class="material-icons">send</i></button>
            </p> 

            <p v-if="exibirComentario">
                <ul class="collection">
                    <li class="collection-item avatar" v-for="item in comentarios" :key="item.id" >
                        <img :src="item.user.imagem" alt="" class="circle">
                        <span class="title">{{ item.user.name }} <small> - {{ item.data}}</small></span>
                        <p>
                           {{ item.texto }}
                        </p>
                    </li>
                </ul>

                </p>
            </div>
        </div>
    </div>      
</template>

<script>
import GridVue from "@/components/layouts/GridVue"

export default {
  name: 'CardConteudoVue',
  props:['id','perfil','name','date','totalcurtidas','curtiuConteudo','comentarios','usuarioid'],
  data () {
    return {
      curtiu:this.curtiuConteudo ?'favorite':'favorite_border',
      totalCurtidas:this.totalcurtidas,
      exibirComentario:false,
      textoComentario:'',
         
    }
  },
  components:{
    GridVue
  },
  methods:{
      curtir(id){
        let url =''
        if(this.$route.name == "Home"){
            url = 'conteudo/curtir/'
        }else{
            url = 'conteudo/curtirPagina/'
        } 
         
        this.$http.put(this.$urlApi+url+id,{},
        {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
            if(response.data.status){
                this.totalCurtidas = response.data.curtidas
                this.$store.commit('setConteudoLinhaTempo',response.data.lista.conteudos.data)
                console.log(this.totalCurtidas)
                if(this.totalCurtidas > 0){
                    this.curtiu = "favorite"
                }else{
                    this.curtiu = "favorite_border"
                }
            }else{
               alert(response.data.erro)
            }

        }).catch(e  =>{
            console.log(e)
            alert("Error, Tente novamente mais tarde!")
        })

      },
      abrirComentarios(){
          this.exibirComentario = !this.exibirComentario
      },
      comentar(id){
        if(!this.textoComentario){
            return
        }

        let url =''
        if(this.$route.name == "Home"){
            url = 'conteudo/comentar/'
        }else{
            url = 'conteudo/comentarPagina/'
        } 

        this.$http.post(this.$urlApi+url+id,{texto:this.textoComentario},
        {"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
        .then(response => {
            if(response.data.status){
                this.textoComentario = ""
                this.$store.commit('setConteudoLinhaTempo',response.data.lista.conteudos.data)
            
            }else if(response.data.status == false && response.data.validacao){
                console.log("erro de validação")
                let erros=""
                for(let erro of Object.values(response.data.erros)){
                    erros += erro+" "
                }
                alert(erros)
            }else{
                alert(response.data.erro)
            }

        }).catch(e  =>{
            console.log(e)
            alert("Error, Tente novamente mais tarde!")
        })
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>