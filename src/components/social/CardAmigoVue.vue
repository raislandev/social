<template>
  <li>
     <img :src="image" alt="" class="circle">
    <span class="title">{{name}}</span>
    <p>First Line <br>
    Second Line
    </p>
    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
  </li>
 
</template>

<script>
import GridVue from "@/components/layouts/GridVue"
export default {
  name: 'CardAmigoVue',
  props:['name','image'],
  data () {
    return {
      
    }
  },
  components:{
    GridVue,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>