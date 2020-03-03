<template>
    <site-template>
        <span slot="menuesquerdo">
            <img :src="usuario.imagem" class="responsive-img" alt="image">
        </span>
        <span slot="principal">
            <h2>Perfil</h2>
            <input type="text" placeholder="Nome" v-model="name">
            <input type="email" placeholder="E-mail" v-model="email">
            <div class="file-field input-field">
                <div class="btn">
                    <span>Imagem</span>
                    <input type="file" @change="getBase64">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text">
                </div>
            </div>
            <input type="password" placeholder="Senha" v-model="password">
            <input type="password" placeholder="Confirmar Senha" v-model="password_confirmation">
            <button class="btn" @click="perfil()">Atualizar</button>
        </span>
    </site-template>
</template>

<script>
import SiteTemplate from "@/templates/SiteTemplate"
import axios from 'axios'


export default {
  name: 'Perfil',
  data () {
    return {
      usuario:false,   
      name:"",
      email:'',
      password:'',
      password_confirmation:'',
      imagem:''
    }
  },
  components:{
    SiteTemplate,
   
  },
  created(){
    let usuario = sessionStorage.getItem('usuario')
    if(usuario){
      this.usuario = JSON.parse(usuario)
      this.name = this.usuario.name
      this.email = this.usuario.email
    }
  },
  methods:{
    getBase64(e) {
        //var file = document.querySelector('input[type=file]').files[0];
        var file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
        this.imagem = reader.result
        };
        reader.onerror = error => reject(error);
    },
    perfil(){
      console.log(this.imagem)
      axios
      .put('http://localhost:8000/api/perfil',{
          name: this.name,
          email:this.email,
          imagem: this.imagem,
          password: this.password,
          password_confirmation: this.password_confirmation
      },{"headers":{"authorization":"Bearer "+this.usuario.token}})
      .then(response => {
        if(response.data.token){
          console.log(response.data)
          this.usuario = response.data
          sessionStorage.setItem('usuario',JSON.stringify(this.usuario))
          alert("Dados atualizados com sucesso!")
        }else{
          console.log("erro de validação")
          let erros=""
          for(let erro of Object.values(response.data)){
            erros += erro+" "
          }
          alert(erros) 
        }
        
      })
      .catch(e  =>{
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