<template>
    <site-template>
     <h4 slot="menuesquerdo">Perfis mais curtidos</h4>
     <ul slot="menuesquerdoamigos">
       <li>sheila</li>
       <li>regina</li>
      <li>maria</li>
     </ul>
    </site-template>
</template>

<script>
import SiteTemplate from "@/templates/SiteTemplate"
export default {
  name: 'Amigos',
  data () {
    return {
      
    }
  },
  components:{
    SiteTemplate,
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>