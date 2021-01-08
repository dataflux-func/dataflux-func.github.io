<template>
  <div class="quick-start">
    <div class="quick-start-content">
      <div v-html="docHTML"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import marked from 'marked'

const DOC_URL = 'https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/resource/README.md';

export default {
  name: 'QuickStart',
  components: {
  },
  data() {
    return {
      docHTML: 'Loading...',
    }
  },
  mounted() {
    axios.get(DOC_URL).then(resp => {
      let mdLines = resp.data.split('\n');
      let isInTOC = false;

      let reducedMDLines = [];
      mdLines.forEach(l => {
        if (l.indexOf('<!-- MarkdownTOC -->') >= 0) {
          isInTOC = true;
        } else if (l.indexOf('<!-- /MarkdownTOC -->') >= 0) {
          isInTOC = false;
        }

        if (!isInTOC) {
          reducedMDLines.push(l);
        }
      });

      this.docHTML = marked(reducedMDLines.join('\n'), { headerIds: false });
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quick-start {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.quick-start-content {
  text-align: left;
  width: 800px;
}
</style>

<style>
.quick-start h1 {
  color: #51505B;
  padding-top: 50px;
  border-bottom: dashed 1px lightgrey;
}
.quick-start p,
.quick-start li {
  color: #767681;
  font-size: 16px;
  line-height: 35px;
}
.quick-start code {
  font-weight: bold;
  padding: 3px 5px;
  margin: 0 3px;
  border-radius: 3px;
  background-color: #eee;
}
.quick-start pre {
  font-size: 16px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  color: white;
  background-color: black;
}
.quick-start pre code {
  background-color: unset;
  margin: 0;
  padding: 0;
}
.quick-start table {
  width: 100%;
  border-collapse: collapse;
}
.quick-start th {
  background-color: #eee;
  font-weight: bold;
}
.quick-start th,
.quick-start td {
  padding: 15px 5px;
  border-bottom: 1px dashed #eee;
}
</style>
