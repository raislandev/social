<template>
    <login-template>
        <span slot="menuesquerdo">
            <img src="https://cakeerp.com/wp-content/uploads/2019/10/capa-2-1080x675.png" class="responsive-img" alt="image">
        </span>
        <span slot="principal">
            <h2>Cadastro</h2>
            <input type="text" placeholder="Nome" v-model="name">
            <input type="email" placeholder="E-mail" v-model="email">
            <input type="password" placeholder="Senha" v-model="password">
            <input type="password" placeholder="Confirmar Senha" v-model="password_confirmation">
            <button class="btn" @click="cadastro()">Salvar</button>
            <router-link class="btn orange" to="/login">Já Tenho Conta</router-link>
        </span>
    </login-template>
</template>

<script>
import LoginTemplate from "@/templates/LoginTemplate"
import axios from 'axios'


export default {
  name: 'Cadastro',
  data () {
    return {
      name:"",
      email:'',
      password:'',
      password_confirmation
    }
  },
  components:{
    LoginTemplate,
   
  },
  methods:{
    cadastro(){
      console.log("ok")
      axios
      .post('http://localhost:8000/api/cadastro',{
          name: this.name,
          email:this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
      })
      .then(response => {
        if(response.data.token){
          console.log("Cadastro realizado com sucesso")
          sessionStorage.setItem('usuario',JSON.stringify(response.data))
          this.$router.push('/')
        }else if(response.data.status == false){
          alert("Erro ao cadastrar o usuário")
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