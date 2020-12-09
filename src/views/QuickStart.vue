<template>
  <div class="quick-start">
    <div class="quick-start-content">
      <div v-for="d in doc">
        <h1>{{ d.title }}</h1>
        <div v-for="s in d.sections">
          <p v-if="s.type === 'text'" v-html="s.content"></p>
          <ol v-if="s.type === 'list'">
            <li v-for="l in s.content" v-html="l"></li>
          </ol>
          <pre v-if="s.type === 'code'">{{ s.content }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'QuickStart',
  components: {
  },
  data() {
    var doc = [
      {
        title: `安装`,
        sections: [
          {
            type: 'text',
            content: `DataFlux 支持完全离线方式进行安装。`,
          },
        ]
      },
      {
        title: `系统要求`,
        sections: [
          {
            type: 'text',
            content: `运行DataFlux Func 需要满足以下条件：`,
          },
          {
            type: 'list',
            content: [
              `CPU 核心数 >= 2`,
              `内存容量 >= 4GB`,
              `磁盘空间 >= 20GB`,
              `操作系统为 Ubuntu 16.04 LTS/CentOS 7.6 以上`,
              `纯净系统（安装完操作系统后，除了配置网络外没有进行过其他操作）`,
            ],
          },
          {
            type: 'text',
            content: `如需要在更低配置下运行的，请咨询驻云官方`,
          }
        ]
      },
      {
        title: `下载携带版`,
        sections: [
          {
            type: 'text',
            content: `运行以下命令，即可自动下载DataFlux Func携带版的所需文件：`,
          },
          {
            type: 'code',
            content: `/bin/bash -c "$(curl -fsSL https://t.dataflux.cn/func-portable-download)"`,
          },
          {
            type: 'text',
            content: `命令执行完成后，所有所需文件都保存在当前目录下新创建的<code>dataflux-func-portable</code>目录下。`
                     + `直接将整个目录通过U盘等移动存储设备复制到目标机器中。`,
          },
        ]
      },
      {
        title: `多网卡注意点`,
        sections: [
          {
            type: 'text',
            content: `如果本机存在多个网卡，需要在Docker Swarm 初始化命令中指定网卡，如：`,
          },
          {
            type: 'code',
            content: `docker swarm init --advertise-addr=ens33`,
          },
          {
            type: 'text',
            content: `可以直接修改<code>run-portable.sh</code>后执行脚本，也可以自行安装Docker并初始化Swarm后运行脚本。`,
          },
          {
            type: 'text',
            content: `本机网卡列表可以通过<code>ifconfig</code>或者<code>ip addr</code>查询。`,
          },
        ]
      },
      {
        title: `安装携带版`,
        sections: [
          {
            type: 'text',
            content: `在已经下载的<code>dataflux-func-portable</code>目录下，运行以下命令，即可自动配置并最终启动整个DataFlux Func：`,
          },
          {
            type: 'code',
            content: `# 使用root用户【推荐】`
                     + `\n/bin/bash run-portable.sh`
                     + `\n`
                     + `\n# 或者，使用非root用户`
                     + `\nsudo /bin/bash run-portable.sh`,
          },
          {
            type: 'text',
            content: `执行完成后，可以使用浏览器访问<a href="http://localhost:8088">localhost:8088</a>进行初始化操作界面。`,
          },
        ]
      },
      {
        title: `相关文档`,
        sections: [
          {
            type: 'list',
            content: [
              `<a target="_blank" href="https://t.dataflux.cn/func-portable-readme">DataFlux Func 安装文档 (Markdown)</a>`,
              `<a target="_blank" href="https://t.dataflux.cn/func-user-guide">DataFlux Func 用户手册 (PDF)</a>`,
            ]
          }
        ]
      },
    ];
    return {
      doc,
    }
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
.quick-start h1 {
  color: #51505B;
  padding-top: 50px;
  border-bottom: dashed 1px lightgrey;
}
.quick-start p,
.quick-start li {
  color: #767681;
  font-size: 16px;
}
.quick-start pre {
  font-size: 16px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  color: white;
  background-color: black;
}
.quick-start a {
  color: #FF6600;
  text-decoration: underline;
}
</style>

<style>
.quick-start code {
  font-weight: bold;
  padding: 3px 5px;
  margin: 0 3px;
  border: solid 1px #aaa;
  border-radius: 3px;
  background-color: #eee;
}
</style>
