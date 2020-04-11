<template>
    <div class="row">
        <grid-vue class="input-field col s12">
        <input type="text" v-model="value.titulo">  
        <textarea v-if="value.titulo" placeholder="Conteúdo" v-model="value.texto" class="materialize-textarea"></textarea>
        <label for="textarea1">O que está acontecendo</label>
        <input v-if="value.titulo && value.texto" type="text" placeholder="link" v-model="value.link">
        <input v-if="value.titulo && value.texto" type="text" placeholder="url" v-model="value.imagem">
        </grid-vue>
        <p class="right-align">
          <button @click="addConteudo()" v-if="value.titulo && value.texto" class="btn waves-effect waves-light">Publicar</button>
        </p>
    </div>    
</template> 

<script>
import GridVue from "@/components/layouts/GridVue"
export default {
  name: 'PublicationVue',
  props:[],
  data () {
    return {
      value:{titulo:"",texto:"",link:"",imagem:""}
    }
  },
  components:{
    GridVue
  },
  methods:{
    addConteudo(){
      console.log(this.value)
      this.$http.post(this.$urlApi+'conteudo/add',{
         titulo: this.value.titulo,
         texto: this.value.texto,
         link: this.value.link,
         imagem: this.value.imagem
      },{"headers":{"authorization":"Bearer "+this.$store.getters.getToken}})
      .then(response => {
        if(response.data.status){
          this.value ={titulo:"",texto:"",link:"",imagem:""}
          this.$store.commit('setConteudoLinhaTempo',response.data.conteudos.data)
        }else if(response.data.status == false && response.data.validacao){
          console.log("erro de validação")
          let erros=""
          for(let erro of Object.values(response.data.erros)){
            erros += erro+" "
          }
          alert(erros)
          //
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