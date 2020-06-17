<template>
    <login-template>
        <span slot="menuesquerdo">
            <img src="https://cdn.pixabay.com/photo/2014/12/26/09/49/social-media-580301_960_720.png" class="responsive-img" alt="image">
        </span>
        <span slot="principal">
            <h2>Cadastro</h2>
            <input type="text" placeholder="Nome" v-model="name">
            <input type="email" placeholder="E-mail" v-model="email">
            <input type="password" placeholder="Senha" v-model="password">
            <input type="password" placeholder="Confirmar Senha" v-model="password_confirmation">
            <div style="margin-top:10px">
              <button class="btn" @click="cadastro()">Salvar</button>
              <router-link class="btn orange" to="/login">Já Tenho Conta</router-link>
            </div>
        </span>
    </login-template>
</template>

<script>
import LoginTemplate from "@/templates/LoginTemplate"


export default {
  name: 'Cadastro',
  data () {
    return {
      name:"",
      email:'',
      password:'',
      password_confirmation:''
    }
  },
  components:{
    LoginTemplate,
   
  },
  methods:{
    cadastro(){
      console.log("ok")
      this.$http
      .post(this.$urlApi+'cadastro',{
          name: this.name,
          email:this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
      })
      .then(response => {
        if(response.data.status){
          console.log("Cadastro realizado com sucesso")
          this.$store.commit('setUsuario',response.data.usuario)
          sessionStorage.setItem('usuario',JSON.stringify(response.data.usuario))
          this.$router.push('/')
        }else if(response.data.status == false && response.data.validacao){
          console.log("erro de validação")
          let erros=""
          for(let erro of Object.values(response.data.erros)){
            erros += erro+" "
          }
          alert(erros)
          
        }else{
  
          alert("Erro ao cadastrar o usuário")  
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