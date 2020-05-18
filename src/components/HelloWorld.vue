<!--
 * @Author: your name
 * @Date: 2020-05-18 09:53:48
 * @LastEditTime: 2020-05-18 10:15:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel_cc:\Users\Administrator\Desktop\learn\echarts-vue\src\components\HelloWorld.vue
--> 
<template>
  <div class="hello">
    <button @click='report1'>艾森克人格测试</button>
    <button @click='report2'>卡特尔16种个性因素测验</button>
    <button @click='report3'>SCL-90症状</button>
    <button @click='report4'>22</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    report1() {
      this.$router.push({path: '/report1'})
    },
    report2() {
      this.$router.push({path: '/report2'})
    },
    report3() {
      this.$router.push({path: '/report3'})
    },
    report4() {
      this.$router.push({path: '/report4'})
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
