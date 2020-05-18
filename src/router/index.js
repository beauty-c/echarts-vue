/*
 * @Author: your name
 * @Date: 2020-05-18 09:53:48
 * @LastEditTime: 2020-05-18 10:09:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel_cc:\Users\Administrator\Desktop\learn\echarts-vue\src\router\index.js
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import report1 from '@/components/report1'
import report2 from '@/components/report2'
import report3 from '@/components/report3'
import report4 from '@/components/report4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/report1',
      name: '艾森克人格测试',
      component: report1
    },
    {
      path: '/report2',
      name: '卡特尔16种个性因素测验',
      component: report2
    },
    {
      path: '/report3',
      name: '卡特尔16种个性因素测验',
      component: report3
    },
    {
      path: '/report4',
      name: '卡特尔16种个性因素测验',
      component: report4
    },
  ]
})
