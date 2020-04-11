<template>
 <span>
    <div v-if="image && image!='#'" class="card-image">
        <a v-if="link && link!='#'" :href="link" target="_blank">
          <img :src="image">
          <span class="card-title">{{ title }}</span>
        </a>
        <span  v-if="!link || link=='#'">
           <img :src="image">
           <span class="card-title">{{ title }}</span>
        </span>
    </div>
    <div v-if="description" class="card-content">
        <span  v-if="!image || image=='#'">
           <span class="card-title">{{ title }}</span>
        </span>
        <p>{{ description }}</p>
        <p v-if="link && link!='#'"><a :href="link" target="_blank">Confira mais aqui</a></p>
    </div>        
 </span>            
</template>

<script>

export default {
  name: 'CardDetailVue',
  props:['image','title','description','link'],
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>