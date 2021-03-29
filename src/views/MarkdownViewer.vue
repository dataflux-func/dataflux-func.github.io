<template>
  <div class="markdown-viewer">
    <div class="markdown-viewer-content">
      <a id="donwload-doc-src" v-if="docURL" :href="docURL">下载源文档（Markdown）</a>
      <div v-html="docHTML"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import marked from 'marked'

export default {
  name: 'MarkdownViewer',
  components: {
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.docHTML = 'Loading...';

        this.docURL = this.BASE_MARKDOWN_URL + this.$route.query.q;
        axios.get(this.docURL).then(resp => {
          let mdLines = resp.data.split('\n');

          let reducedMDLines = [];
          mdLines.forEach(l => {
            if (l.indexOf('<!-- MarkdownTOC ') === 0) {
              reducedMDLines.push(`<div id="index">`);
            } else if (l.indexOf('<!-- /MarkdownTOC ') === 0) {
              reducedMDLines.push(`</div>`);
            } else {
              reducedMDLines.push(l);
            }
          });

          this.docHTML = marked(reducedMDLines.join('\n'), { headerIds: false });
        });
      }
    },
  },
  computed: {
    BASE_MARKDOWN_URL() {
      return 'https://zhuyun-static-files-production.oss-cn-hangzhou.aliyuncs.com/dataflux-func/resource/docs';
    },
  },
  data() {
    return {
      docURL : '',
      docHTML: '',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markdown-viewer {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.markdown-viewer-content {
  text-align: left;
  width: 800px;
}
</style>

<style>
.markdown-viewer h1 {
  color: #51505B;
  padding-top: 50px;
  border-bottom: dashed 1px lightgrey;
}
.markdown-viewer p,
.markdown-viewer li {
  color: #767681;
  font-size: 16px;
  line-height: 35px;
}
.markdown-viewer code {
  font-weight: bold;
  padding: 3px 5px;
  margin: 0 3px;
  border-radius: 3px;
  background-color: #eee;
}
.markdown-viewer pre {
  font-size: 16px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  color: white;
  background-color: black;
}
.markdown-viewer pre code {
  background-color: unset;
  margin: 0;
  padding: 0;
}
.markdown-viewer table {
  width: 100%;
  border-collapse: collapse;
}
.markdown-viewer th {
  background-color: #eee;
  font-weight: bold;
}
.markdown-viewer th,
.markdown-viewer td {
  padding: 15px 5px;
  border-bottom: 1px dashed #eee;
}

#donwload-doc-src {
  position: fixed;
  right: 35px;
  top: 50px;
}

#index * {
  font-size: 14px !important;
}
#index li {
  color: #ff6600;
  font-size: 16px;
  line-height: 26px;
}
#index > ul > li > ol {
  list-style: decimal;
}
#index ul,
#index ol {
  list-style: none;
}
</style>
