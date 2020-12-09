<template>
  <div class="home">
    <div class="section big-view">
      <img src="@/assets/img/01-big-view.png" />
      <h2>{{ bigViewSection.preTitle }}</h2>
      <h1>{{ bigViewSection.title }}</h1>
      <span>{{ bigViewSection.desc }}</span>
    </div>

    <div class="section float-panel">
      <div class="section-content">
        <h1>{{ floatPanelSection.title }}</h1>
        <div class="section-columns">
          <div v-for="item in floatPanelSection.items" class="section-column-item">
            <img :src="item.img" />
            <h1>{{ item.title }}</h1>
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="section bg-column-area">
      <div class="section-content">
        <h1>{{ bgColumnAreaSection.title }}</h1>
        <div class="section-columns">
            <div v-for="item, i in bgColumnAreaSection.items" class="section-column-item">
              <h1>{{ item.title }}</h1>
              <span>{{ item.desc }}</span>
            </div>
          </div>
      </div>
    </div>

    <div class="section card-area">
      <div class="section-content">
        <h1>{{ cardAreaSection.title }}</h1>
        <div class="section-columns">
          <div v-for="item in cardAreaSection.items" class="section-column-item">
            <img :src="item.img" />
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import img_database   from '@/assets/img/10-database.png'
import img_code       from '@/assets/img/10-code.png'
import img_link       from '@/assets/img/10-link.png'
import img_ai         from '@/assets/img/20-ai.png'
import img_iot        from '@/assets/img/20-iot.png'
import img_timeSeries from '@/assets/img/20-time-series.png'

export default {
  name: 'Home',
  components: {
  },
  data() {
    var bigViewSection = {
      preTitle: 'DataFlux Func',
      title   : '数据处理开发平台',
      desc: `DataFlux Func 是一款在线 ServerLess 函数开发平台。`
            + `简单易用、无需管理服务器等基础设施，`
            + `只需编写代码并发布，自动为函数生成HTTP API接口共外部调用。`
    };
    var floatPanelSection = {
      title: '功能特性',
      items: [
        {
          img  : img_database,
          title: '多种数据源支持',
          desc: `集成主流数据库支持，`
                + `可接入MySQL、Redis、InfluxDB、SQL Server、Oracle、ES等多种类型数据库`,
        },
        {
          img  : img_code,
          title: '直接编写业务代码',
          desc: `基于Python语言的运行时环境，同时提供多种内置功能。`
                + `发布后函数可自动生成API，轻松进行应用开发，提高效率`,
        },
        {
          img  : img_link,
          title: '开箱即用',
          desc: `完全基于Docker构建，部署简单。`
                + `同时提供携带版，无公网环境也能运行`,
        },
      ]
    };
    var bgColumnAreaSection = {
      title: '产品优势',
      items: [
        {
          title: '功能丰富',
          desc: `开箱即用，每个函数都可以生成API接口，且可以随时开关和指定有效期。`
                + `API接口支持同步、异步，甚至自动定时调用`,
        },
        {
          title: '简单易用',
          desc: `用户只需关心面向业务的“核心代码”的具体实现，`
                + `程序的运行、网络、存储、服务器等资源都交由DataFlux Func 负责处理，无需考虑运维问题。`
                + `极大地降低了服务搭建的复杂性，有效提升开发速度`,
        },
        {
          title: '灵活部署',
          desc: `单机部署最低只需1核1G的入门虚拟机，高可用方案可以选择k8s，`
                + `支持面向不同场景的不同部署方式`,
        },
      ]
    };
    var cardAreaSection = {
      title: '应用场景',
      items: [
        {
          img: img_timeSeries,
          desc: `将格式各异的监控数据进行转换，`
                + `实现与数据可视化（大屏）系统的快速集成`,
        },
        {
          img: img_ai,
          desc: `利用监控数据开发基于AI（机器学习，深度学习等）的算法模型，`
                + `实现高阶的预测与异常检测，快速对外提供API接口`,
        },
        {
          img: img_iot,
          desc: `实现基于实时数据的对外部系统发送指令，通过数据来驱动IoT设备。`
                + `（如当电压负载过高时自动命令设备关机）`,
        },
      ]
    };
    return {
      bigViewSection,
      floatPanelSection,
      bgColumnAreaSection,
      cardAreaSection,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
}
.section {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}
.section > img {
  width: 100%;
}
.section-content {
  width: 1200px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
}
.section-content > h1 {
  color: #51505B;
  font-size: 40px;
}
.section-columns {
  display: flex;
  justify-content: space-around;
}
.section-column-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
}
.section-column-item > img {
  padding-bottom: 20px;
  /*width: 100%;*/
}
.section-column-item > h1 {
  font-size: 20px;
  color: #51505B;
}
.section-column-item > span {
  font-size: 14px;
  display: block;
  text-align: left;
  color: #767681;
}

.section.big-view > h2 {
  position: absolute;
  color: #ff6600;
  font-size: 38px;
  top: 90px;
  left: 20%;
}
.section.big-view > h1 {
  position: absolute;
  color: #51505B;
  font-size: 54px;
  top: 135px;
  left: 20%;
}
.section.big-view > span {
  position: absolute;
  color: #767681;
  font-size: 16px;
  top: 255px;
  left: 20.2%;
  width: 25%;
  text-align: left;
}
.section.float-panel > .section-content {
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 4px 8px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -100px;
}
.section.bg-column-area {
  background-image: url(../assets/img/01-bg-column-area.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.section.bg-column-area > .section-content {
  position: relative;
  top: -30px;
}
.section.card-area .section-column-item {
  border: 1px solid #E9EBF0;;
  border-radius: 5px;
  padding: 20px;
}
.section.card-area .section-column-item > img {
  width: 100%;
}
</style>
