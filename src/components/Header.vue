<template>
  <div class="header">
    <img id="logo" src="@/assets/img/00-logo-small.png" />

    <div id="nav">
      <router-link to="/">DataFlux Func</router-link>
      | <router-link to="/quick-start">Quick Start</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 30px;
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 1200px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
}
</style>

<style>
#logo {
  position: absolute;
  left: 30px;
}

#nav {
  position: absolute;
  right: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ff6600;
}
</style>
