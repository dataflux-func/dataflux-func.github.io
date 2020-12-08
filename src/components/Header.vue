<template>
  <div class="header">
    <img id="logo" src="@/assets/img/00-logo-small.png" />

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/doc">Document</router-link> |
      <router-link to="/about">About</router-link>
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
  padding: 10px 30px;
}
</style>

<style>
#logo {
  float: left;
  height: 100%;
}

#nav {
  float: right;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ff6600;
}
</style>
