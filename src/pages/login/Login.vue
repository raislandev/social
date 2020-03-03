<template>
    <login-template>
        <span slot="menuesquerdo">
            <img src="https://cakeerp.com/wp-content/uploads/2019/10/capa-2-1080x675.png" class="responsive-img" alt="image">
        </span>
        <span slot="principal">
            <h2>Login</h2>
            <input type="text" placeholder="E-mail" v-model="email">
            <input type="password" placeholder="Senha" v-model="password">
            <button class="btn" @click="login()">Entrar</button>
            <router-link class="btn orange" to="/cadastro">Cadastre-se</router-link>
        </span>
    </login-template>
</template>

<script>
import LoginTemplate from "@/templates/LoginTemplate"
import axios from 'axios'


export default {
  name: 'Login',
  data () {
    return {
      email:'',
      password:''
    }
  },
  components:{
    LoginTemplate,
   
  },
  methods:{
    login(){
      console.log("ok")
      axios
      .post('http://localhost:8000/api/login',{
          email:this.email,
          password: this.password
      })
      .then(response => {
        if(response.data.token){
          console.log("Login com sucesso")
          sessionStorage.setItem('usuario',JSON.stringify(response.data))
          this.$router.push('/')
        }else if(response.data.status == false){
          console.log("login não existe")
          alert("login ou senha inválidos")
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
