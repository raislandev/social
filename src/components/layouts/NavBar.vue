<template>
    <nav :class="cor || 'blue'">
      <div class="nav-wrapper container">
        <router-link :to="url || '/'" class="brand-logo" >{{logo || 'Social'}}</router-link>
        <a href="#"  class="sidenav-trigger" data-target="mobile-nav">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <slot/>
        </ul>
        <ul class="sidenav teal darken-1" id="mobile-nav">
           <li><a class="sidenav-close" href="#!"><i style="color:white" class="material-icons">close</i></a></li>
          <slot/>
        </ul>
      </div>
    </nav>
    
</template>

<script>

$(document).ready(function(){
 		$('.sidenav').sidenav();
});
export default {
  name: 'NavBar',
  props:['cor','url','logo'],
  data () {
    return {
      
    }
  },
  created(){
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });
  },
  
  
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav ul li a{
    color:white;
  }    
</style>
