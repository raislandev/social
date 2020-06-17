<template>
  <footer class="page-footer teal darken-1">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">{{ logo || 'Social'}}</h5>
                <p class="grey-text text-lighten-4">{{ description || "Rede social desenvolvida para fins de conhecimento em desenvolvimento web" }}</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Contatos</h5>
                <ul>
                  <slot></slot>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            © 2020 Copyright
            </div>
          </div>
    </footer>
</template>

<script>
export default {
  name: 'FooterVue',
  props:['logo','description'],
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
