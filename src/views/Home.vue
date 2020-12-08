<template>
  <div class="home">
    <p v-for="i in 'x'.repeat(1)">内容</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
}
</style>
