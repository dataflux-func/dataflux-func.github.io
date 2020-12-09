<template>
  <div class="footer">
    <div class="copyright">{{ copyright }}</div>

    <div class="column" v-for="col in columns">
      <span class="column-title">{{ col.title }}</span>

      <template v-for="item in col.items">
        <a v-if="item.link" :href="item.link" target="_blank">{{ item.title }}</a>
        <span v-else>{{ item.title }}</span>
        <br>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    var copyright = `© 2013-${ new Date().getFullYear() }
                    上海驻云信息科技有限公司
                    沪公网安备 31011502010862号 | 沪ICP备 13034243号-4`;
    var columns = [
      {
        title: '文档与支持',
        items: [
          { title: '帮助中心',   link: 'https://help.dataflux.cn/' },
          { title: 'APP下载',    link: 'https://www.dataflux.cn/mobile' },
          { title: '开源项目',   link: 'https://github.com/CloudCare' },
          { title: '云市场店铺', link: 'https://shop0753v9m2.market.aliyun.com/?spm=5176.730005.productlist.d_4924991.f22c3524ONCely' },
        ]
      },
      {
        title: '相关协议',
        items: [
          { title: '服务协议',         link: 'https://help.dataflux.cn/doc/e90ce9998ee3e23a288ed332d8a0367c0bfe4f2a' },
          { title: '法律声明',         link: 'https://help.dataflux.cn/doc/d52d288bf14ea21ec038a56e826d53828dc53fa8' },
          { title: '数据安全保密协议', link: 'https://help.dataflux.cn/doc/7e05880bf8a23c26603784a7b017c878b1729ef5' },
        ]
      },
      {
        title: '关于我们',
        items: [
          { title: '公司简介',      link: 'https://www.cloudcare.cn/about.html?type=about_1' },
          { title: 'DataFlux 视频', link: 'https://www.dataflux.cn/video' },
        ]
      },
      {
        title: '联系方式',
        items: [
          { title: '热线电话：400-882-3320'},
          { title: '联系邮箱：marketing@jiagouyun.com'},
          { title: '总部地址：上海市浦东新区科苑路 399号张江创新园 7号楼'},
        ]
      }
    ]

    return {
      copyright,
      columns,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  position: relative;
  margin-top: -300px; /* Footer 高度的负值 - 上下padding总量 */
  height: 200px;

  background: #303037;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 60px;
  display: flex;
  align-items: top;
  justify-content: center;
}
.footer .column:last-child > .column-title {
  padding-right: 0;
}
.column, .column a {
  font-size: 14px;
  color: #B4B4B4;
  line-height: 32px;
  text-align: left;
  text-decoration: none;
}
.column .column-title {
  font-size: 18px;
  color: #F1F1F1;
  line-height: 24px;
  display: block;
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 15px;
  padding-right: 100px;
  border-bottom: 1px solid #545454;
}
.copyright {
  height: 40px;
  background: #212127;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 14px;
  color: #939393;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
