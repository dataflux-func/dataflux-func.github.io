<template>
  <div class="footer">
    <div class="column">
      <span class="column-title">文档与支持</span>

      <span>帮助中心</span><br>
      <span>常见问题</span><br>
      <span>开源项目</span><br>
    </div>

    <div class="column">
      <span class="column-title">相关协议</span>

      <span>服务协议</span><br>
      <span>法律声明</span><br>
      <span>数据安全保密协议</span><br>
    </div>

    <div class="column">
      <span class="column-title">关于我们</span>

      <span>公司简介</span><br>
    </div>

    <div class="column">
      <span class="column-title">联系方式</span>

      <span>热线电话：400-882-3320</span><br>
      <span>联系邮箱：marketing@jiagouyun.com</span><br>
      <span>总部地址：上海市浦东新区科苑路 399号张江创新园 7号楼</span></div>

    <div class="copyright">
      © 2013-{{ new Date().getFullYear() }}
      上海驻云信息科技有限公司
      沪公网安备 31011502010862号 | 沪ICP备 13034243号-4
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
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
.column {
  font-size: 14px;
  color: #B4B4B4;
  line-height: 32px;
  text-align: left;
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
