<template>
  <div class="shaow">
    <div class="no-print" style="textAlign:center;marginTop:10px">
      <button type="primary" size="mini" @click="print">打印</button>
      <button size="mini" @click="close_print">关闭</button>
    </div>
    <div ref="print">
      <div class="list" ref="pdfs">
        <div class="page">
          <div class="hospital">xx医院</div>
          <div class="title">艾森克人格测试</div>
          <div class="patient">
            <div class="patienttitle">【患者信息】</div>
            <hr style="border:1px dashed #000; height:1px" />
            <div class="patientinfo">
              <div class="top">
                <span class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: 程</span>
                <span class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别: 女</span>
                <span class="age">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄: 24</span>
              </div>
              <div class="bottom">
                <div class="patientcard">就诊卡号: 15297919437</div>
                <div class="idcard">身份证号: 362330199603020721</div>
                <div class="time">就诊日期:2018-11-15</div>
              </div>
            </div>
            <hr style="border:1px dashed #000; height:1px" />
          </div>
          <div
            style="text-align: center;font-size: 20px;margin-bottom:20px;margin-top:10px;"
          >艾森克人格测试报告</div>
          <div class="echarts">
            <div id="main" class="no-print" v-if="!flag"></div>
            <img :src="img_echarts" alt v-if="flag" />
          </div>
          <div class="results_title">
            <span>测试结果:</span>
          </div>
          <div class="result">
            <div class="factor">
              <div>
                <span class="name indicators">指标</span>
                <span class="original" style="left: 110px; color: rgb(104, 181, 104);">原始分</span>
                <span class="standard" style="left: 190px; color: rgb(104, 181, 104);">标准分</span>
                <span class="name name1" style="left: 288px;">指标</span>
                <span class="original" style="left: 382px; color: rgb(104, 181, 104);">原始分</span>
                <span class="standard" style="left: 462px; color: rgb(104, 181, 104);">标准分</span>
              </div>
              <div class="sub_factoryList">
                <div class="sub_factory" v-for="(item,i) in detailData.sub_factory_result" :key="i">
                  <span class="factory">{{item.scheme_name}}</span>
                  <span class="originalScore">{{item.origin_score}}</span>
                  <span class="standardScore">{{item.score}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="results1">
            <div class="factor">
              <div class="sub_factoryList">
                <div
                  class="sub_factory"
                  v-for="(item,i) in detailData.third_factory_result"
                  :key="i"
                >
                  <span class="name">{{item.scheme_name}}</span>
                  <span
                    style="color:rgb(45, 45, 254);display:inline-block;width:30px;textAlign:right"
                  >{{item.score}}</span>
                </div>
              </div>
            </div>
          </div>
          <hr style="border:1px dashed #000; height:1px" />
          <div class="opinion">
              <div class="name">因子分:</div>
              <div
                style="padding:0 10px"
                v-for="(item, i,key) in detailData.sub_factory_result"
                :key="key"
              >
                <p class="factors">因子{{i+1}}.{{item.scheme_name}}</p>
                <p class="score">
                  得分: {{item.score}}
                  <span class="schemedesc">[{{item.scheme_desc}}]</span>
                </p>
              </div>
              <div
                style="padding:0 10px"
                v-for="(item, i,key) in detailData.third_factory_result"
                :key="key"
              >
                <p class="factors">{{item.scheme_name}}</p>
                <p class>
                  得分: {{item.score}}
                  <span class="schemedesc">[{{item.scheme_desc}}]</span>
                </p>
              </div>
            </div>
          <div class="opinion">
            <div class="name">医生意见:</div>
            <!-- <div v-for="(item, i) in detailData.sub_factory_result" :key="i">
              <span style="color: rgb(104, 181, 104);">{{item.scheme_name}}:</span>
              <span style="color: rgb(3, 103, 190)">{{item.scheme_desc}}</span>
            </div> -->
            <div class="content" v-html="detailData.total_result.scheme_desc"></div>
          </div>
          <hr style="border:1px dashed #000; height:1px" />
          <div class="footer_report">
            <div class="autograph">
              签名:
              <!-- <img src="./签名.png" alt /> -->
            </div>
            <div class="time">日期: 2018-12-15</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Print from "vue-printjs";
import echarts from "echarts";
// import { detail } from '@/api/api'

Vue.use(Print);

export default {
  props: {
    result_id: {
      type: String
    }
  },
  data() {
    return {
      prod_lists: [],
      img_echarts: "",
      myChart: {},
      flag: false,
      detailData: {
        id: "5ebfb58726aa2e1e1fa16dd7",
        topic_id: "5def58fd212dd4d3f8a719fe",
        topic_name: "艾森克人格问卷",
        total_result: {
          level_type: 1,
          level_name: "默认",
          scheme_name: "测评总分",
          origin_score: 0,
          score: 27,
          scheme_desc: "<p>请参考因子分</p>"
        },
        filter_result: [],
        sub_factory_result: [
          {
            level_type: 0,
            level_name: "",
            scheme_name: "E量表",
            origin_score: 0,
            score: 4,
            scheme_desc:
              "表示人格内向，好和静，富于内省，不喜欢刺激，喜欢有秩序的生活方式，情绪比较稳定。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "N量表",
            origin_score: 0,
            score: 2,
            scheme_desc: "表示情绪稳定。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "P量表",
            origin_score: 0,
            score: 9,
            scheme_desc:
              "表示可能是孤独、不关心他人，难以适应外部环境，不近人情，与别人不友好，喜欢寻衅搅扰，喜欢干奇特的事情，并且不顾危险。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "L量表",
            origin_score: 0,
            score: 12,
            scheme_desc: "表示正常。"
          }
        ],
        third_factory_result: [],
        create_time: "2020-05-16T09:42:31.258Z"
      }
    };
  },
  methods: {
    print() {
      this.flag = true;
      this.img_echarts = this.myChart.getDataURL();
      setTimeout(() => {
        window.close();
        this.$print(this.$refs.print, { "no-print": "no-print" });
        // window.location.reload(true);
      }, 100);
    },
    close_print() {
      this.$router.go(-1);
    },
    echarts() {
      this.myChart = echarts.init(document.getElementById("main"));
      let x_data = [];
      let y_data = [];
      for (let i = 0; i < 30; i++) {
        x_data.push("");
      }
      for (let i = 0; i <= 110; i++) {
        if (i <= 100) {
          x_data.push(i + "");
        }
        y_data.push(i + "");
      }
      for (let i = 0; i < 30; i++) {
        x_data.push("");
      }
      // 绘制图表
      let option = {
        title: {
          text: "E-N关系图",
          textAlign: "auto",
          x: "center",
          y: "10"
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 9
          },
          data: x_data,
          boundaryGap: false
          //   axisTick: { show: false }
        },
        yAxis: {
          //   scale: true,
          type: "category",
          axisLabel: {
            interval: 4
          },
          data: y_data,
          boundaryGap: false
          //   splitLine: { show: true }
          // axisTick: { show: false }
        },
        color: "black",
        series: [
          {
            type: "scatter",
            symbolSize: 15,
            data: [],
            markLine: {
              symbol: "none",
              itemStyle: {
                normal: {
                  label: {
                    formatter: ""
                  }
                }
              },
              data: [
                {
                  yAxis: 60,
                  lineStyle: {
                    // type: 'dash',
                    width: 1,
                    color: "green"
                  }
                },
                {
                  yAxis: 40,
                  lineStyle: {
                    // type: 'dash',
                    width: 1,
                    color: "green"
                  }
                },
                {
                  yAxis: 35,
                  lineStyle: {
                    type: "solid",
                    width: 2,
                    color: "rgb(195, 171, 197)"
                  }
                },
                {
                  yAxis: 65,
                  lineStyle: {
                    type: "solid",
                    width: 2,
                    color: "rgb(195, 171, 197)"
                  }
                },
                {
                  xAxis: 80,
                  label: {
                    formatter: "E"
                  },
                  lineStyle: {
                    type: "solid",
                    width: 4,
                    color: "rgb(0, 23, 117)"
                  }
                },
                {
                  yAxis: 50,
                  label: {
                    formatter: "N"
                  },
                  lineStyle: {
                    type: "solid",
                    width: 4,
                    color: "rgb(0, 23, 117)"
                  }
                },
                {
                  xAxis: 30,
                  lineStyle: {
                    type: "solid",
                    width: 2,
                    color: "rgb(220, 65, 73)"
                  }
                },
                {
                  xAxis: 130,
                  lineStyle: {
                    type: "solid",
                    width: 2,
                    color: "rgb(220, 65, 73)"
                  }
                },
                {
                  xAxis: 60,
                  lineStyle: {
                    // type: 'solid',
                    width: 1,
                    color: "rgb(220, 65, 73)"
                  }
                },
                {
                  xAxis: 100,
                  lineStyle: {
                    // type: 'solid',
                    width: 1,
                    color: "rgb(220, 65, 73)"
                  }
                },
                {
                  xAxis: 70,
                  lineStyle: {
                    // type: 'solid',
                    width: 1,
                    color: "black"
                  }
                },
                {
                  xAxis: 90,
                  lineStyle: {
                    // type: 'solid',
                    width: 1,
                    color: "black"
                  }
                },
                {
                  xAxis: 50,
                  lineStyle: {
                    // type: 'solid',
                    width: 1,
                    color: "blue"
                  }
                },
                {
                  xAxis: 110,
                  lineStyle: {
                    // type: 'solid',
                    width: 1,
                    color: "blue"
                  }
                }
              ]
            }
          }
        ]
      };
      const seriesData = [];
      seriesData.push(this.detailData.sub_factory_result[0].score + 30);
      seriesData.push(this.detailData.sub_factory_result[0].score);
      option.series[0].data.push(seriesData);
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.echarts();
  },
  directives: {
    aotoClose() {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          window.opener = null;
          window.open("", "_self");
          window.close();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.shaow {
  position: fixed;
  padding: 120px 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(7, 17, 27, 0.6);
  z-index: 2000 !important;
  overflow: auto !important;
}
.list {
  width: 593px;
  margin: 0 auto;
  font-size: 14px;
  .page {
    page-break-after: always;
    padding: 20px 24px;
    // height: 842px;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    .hospital {
      color: rgb(255, 153, 0);
      text-align: center;
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    .patient {
      .patientinfo {
        margin-left: 20px;
        height: 40px;
        position: relative;
        color: rgb(3, 103, 190);
        .name {
          position: absolute;
          top: 0;
          left: 0;
        }
        .sex {
          position: absolute;
          top: 0;
          left: 170px;
        }
        .age {
          position: absolute;
          top: 0;
          left: 390px;
        }
        .patientcard {
          position: absolute;
          top: 20px;
          left: 0;
        }
        .idcard {
          position: absolute;
          top: 20px;
          left: 170px;
        }
        .time {
          position: absolute;
          top: 20px;
          left: 390px;
        }
      }
    }
    .echarts {
      margin: 0 auto;
      margin-left: -24px;
      width: 587px;
      height: 420px;
      border: 3px solid rgb(53, 124, 57);
      canvas {
        margin: -10px 0 0 -10px;
      }
      #main {
        width: 100%;
        height: 100%;
      }
    }
    .results_title {
      color: rgb(104, 181, 104);
      margin-top: 30px;
      margin-bottom: 10px;
    }
    .result,
    .results1 {
      // display: flex;
      .factor {
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        .sub_factoryList {
          display: flex;
          flex-wrap: wrap;
          .sub_factory {
            width: 50%;
            position: relative;
            .factory {
              display: inline-block;
              margin-left: 10px;
              color: rgb(104, 181, 104);
            }
            .originalScore {
              position: absolute;
              left: 125px;
              color: rgb(45, 45, 254);
            }
            .standardScore {
              position: absolute;
              left: 205px;
              color: rgb(45, 45, 254);
            }
          }
        }
        .indicators {
          display: inline-block;
          width: 60px;
          text-align: center;
        }
        .name {
          color: rgb(104, 181, 104);
        }
        .name1 {
          position: absolute;
        }
        .original {
          position: absolute;
          left: 120px;
          color: rgb(45, 45, 254);
        }
        .standard {
          position: absolute;
          left: 200px;
          color: rgb(45, 45, 254);
        }
      }
      .factor1 {
        width: 52%;
        position: relative;
        .name {
          color: rgb(104, 181, 104);
        }
        .original {
          position: absolute;
          left: 150px;
          color: rgb(45, 45, 254);
        }
        .standard {
          position: absolute;
          left: 250px;
          color: rgb(45, 45, 254);
        }
      }
    }
    .results1 {
      .factor {
        .original {
          left: 145px;
        }
      }
      .factor1 {
        vertical-align: bottom;
        > div {
          vertical-align: bottom;
        }
        .name {
          color: rgb(104, 181, 104);
          margin-left: -40px;
        }
        .original {
          left: 180px;
          vertical-align: bottom;
        }
      }
    }
    .opinion {
      margin-top: 20px;
      .name {
        color: rgb(104, 181, 104);
        color: rgb(104, 181, 104);
         color: rgb(104, 181, 104);
        margin-bottom: 10px;
      }
      .content {
        margin-left: 20px;
        color: rgb(45, 45, 254);
      }
      .factors{
        color: #dd7851;
      }
      .schemedesc{
        color:rgb(3, 103, 190);
      }

    }
    .footer_report {
      margin-top: 20px;
      height: 30px;
      position: relative;
      .autograph {
        position: absolute;
        left: 280px;
        color: rgb(104, 181, 104);
        img {
          height: 20px;
        }
      }
      .time {
        position: absolute;
        left: 420px;
        color: rgb(104, 181, 104);
      }
    }
  }
}

@media print {
  .list {
    width: 90%;
  }
  .page {
    padding: 0;
    float: none;
    font-size: 10pt !important;
  }
  @page {
    margin: 1.5cm;
    size: A4;
  }
  html {
    height: auto !important;
  }
  html,
  body {
    background-color: white;
  }
  body {
    font: 10pt "宋体", Georgia, "Times New Roman", Times, serif;
    line-height: 1;
    background: #fff !important;
    color: #000;
  }
}
</style>
