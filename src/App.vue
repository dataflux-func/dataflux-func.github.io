<template>
  <div id="app">
    <div id="page-wrapper">
      <Header />
      <router-view />
      <div id="footer-push"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
html {
  min-width: 1280px;
}
html, body {
  height: 100%;
  margin: 0;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#page-wrapper {
  min-height: 100%;
}
#footer-push {
  height: 400px; /* Footer 高度 */
}
</style>
