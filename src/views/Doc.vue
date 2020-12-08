<template>
  <div class="doc">
    This is Document page
    <p v-for="x, i in 'x'.repeat(30)">{{ i + 1 }}内容</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Doc',
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.doc {
}
</style>
