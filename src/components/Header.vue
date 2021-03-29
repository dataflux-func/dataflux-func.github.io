<template>
  <div class="header">
    <img id="logo" src="@/assets/img/00-logo-small.png" />

    <div id="nav">
      <router-link to="/">主页</router-link>
      | <router-link :to="{ name: 'MarkdownViewer', query: { q: 'README.md' }}">快速开始</router-link>
      | <a href="https://t.dataflux.cn/func-user-guide" target="_blank">用户手册（PDF）</a>
      | <router-link :to="{ name: 'MarkdownViewer', query: { q: 'docs/maintenance-guide.md' }}">维护手册</router-link>
      | <router-link :to="{ name: 'MarkdownViewer', query: { q: 'docs/development-guide.md' }}">开发手册</router-link>
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
.header a {
  border: none;
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
