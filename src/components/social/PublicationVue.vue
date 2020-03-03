<template>
    <div class="row">
        <grid-vue class="input-field col s12">
        <textarea v-model="value" class="materialize-textarea"></textarea>
        <label for="textarea1">O que está acontecendo</label>
        </grid-vue>
        <p>
        <grid-vue v-if="value" class="btn waves-effect waves-light" size="2 offset-s10">Publicar</grid-vue>
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
      value:""
    }
  },
  components:{
    GridVue
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>