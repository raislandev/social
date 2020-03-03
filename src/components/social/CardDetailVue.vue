<template>
 <span>
    <div v-if="image" class="card-image">
        <img :src="image">
        <span class="card-title">{{ title }}</span>
    </div>
    <div v-if="description" class="card-content">
        <p>{{ description }}</p>
    </div>        
 </span>            
</template>

<script>

export default {
  name: 'CardDetailVue',
  props:['image','title','description'],
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>