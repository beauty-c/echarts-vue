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
          <div class="title">SCL-90症状</div>
          <div class="patient">
            <div class="patienttitle">【患者信息】</div>
            <hr style="border:1px dashed #000; height:1px" />
            <div class="patientinfo">
              <div class="top">
                <span class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: 程</span>
                <span class="sex">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别: 女</span>
                <span class="age">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄: 16</span>
              </div>
              <div class="bottom">
                <div class="patientcard">就诊卡号: 15297919437</div>
                <div class="idcard">身份证号: 362330199605060254</div>
                <div class="time">就诊日期: 2018-12-15</div>
              </div>
            </div>
            <hr style="border:1px dashed #000; height:1px" />
          </div>
          <div class="echarts">
            <div id="main" class="no-print" v-if="!flag"></div>
            <img :src="img_echarts" alt v-if="flag" />
          </div>
          <div class="factor">
            <div style="margin-bottom: 10px">
              <span class="name">测试结果:</span>
              <span class="result" style="left: 90px; color: rgb(104, 181, 104);">原始分</span>
              <span class="avage" style="left: 190px; color: rgb(104, 181, 104);">平均分</span>
              <span class="resources" style="left: 280px; color: rgb(104, 181, 104);">参考诊断</span>
              <span class="deviation" style="left: 400px; color: rgb(104, 181, 104);">均分±标准差</span>
              <span></span>
            </div>
            <div>
              <span class="name">总&nbsp;&nbsp;&nbsp;&nbsp;分</span>
              <span class="result">{{detailData.total_result.score}}</span>
              <span class="avage none">--</span>
              <span class="resources none1">--</span>
              <span class="deviation">129.96±38.76</span>
            </div>
            <div>
              <span class="name">总均分</span>
              <span class="result">{{detailData.third_factory_result[0].score}}</span>
              <span class="avage none">--</span>
              <span class="resources none1">--</span>
              <span class="deviation">1.44±0.43</span>
            </div>
            <div>
              <span class="name">阳性项目数</span>
              <span class="result">{{detailData.third_factory_result[1].score}}</span>
              <span class="avage none">--</span>
              <span class="resources none1">--</span>
              <span class="deviation">24.92±18.41</span>
            </div>
            <div>
              <span class="name">阴性项目数</span>
              <span class="result">{{detailData.third_factory_result[2].score}}</span>
              <span class="avage none">--</span>
              <span class="resources none1">--</span>
              <span class="deviation">65.08±18.33</span>
            </div>
            <div>
              <span class="name">阳性项目平均分</span>
              <span class="result">{{detailData.third_factory_result[3].score}}</span>
              <span class="avage none">--</span>
              <span class="resources none1">--</span>
              <span class="deviation">2.60±0.59</span>
            </div>
            <div v-for="(item, i) in detailData.sub_factory_result" :key="i">
              <span class="name">{{item.scheme_name}}</span>
              <span class="result">{{item.score}}</span>
              <span class="avage">{{detailData.third_factory_result[i+4].score}}</span>
              <span
                v-if="!(item.scheme_name=='其它')"
                class="resources none1"
              >{{detailData.third_factory_result[i+4].scheme_desc}}</span>
              <span v-else-if="item.scheme_name=='其它'" class="resources none1">--</span>
              <span v-if="item.scheme_name=='躯体化'" class="deviation">1.37±0.48</span>
              <span v-else-if="item.scheme_name=='强迫症状'" class="deviation">1.62±0.58</span>
              <span v-else-if="item.scheme_name=='人际关系敏感'" class="deviation">1.65±0.51</span>
              <span v-else-if="item.scheme_name=='抑郁'" class="deviation">1.50±0.59</span>
              <span v-else-if="item.scheme_name=='焦虑'" class="deviation">1.39±0.43</span>
              <span v-else-if="item.scheme_name=='敌对'" class="deviation">1.48±0.56</span>
              <span v-else-if="item.scheme_name=='恐怖'" class="deviation">1.23±0.41</span>
              <span v-else-if="item.scheme_name=='偏执'" class="deviation">1.43±0.57</span>
              <span v-else-if="item.scheme_name=='精神病性'" class="deviation">1.29±0.42</span>
              <span v-else-if="item.scheme_name=='其它'" class="deviation none2">--</span>
            </div>
            <!-- <div>
            <span class="name">诊断结果</span>
            <span class="result">可能有中度的抑郁症状</span>
            </div>-->
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
              <!-- <div
                style="padding:0 10px"
                v-for="(item, i,key) in detailData.third_factory_result"
                :key="key"
              >
                <p class="factors">{{item.scheme_name}}</p>
                <p class>
                  得分: {{item.score}}
                  <span class="schemedesc">[{{item.scheme_desc}}]</span>
                </p>
              </div> -->
            </div>
          <div class="opinion">
            <div class="name">结果及意见:</div>
            <!-- <div v-for="(item, i) in detailData.sub_factory_result" :key="i">
              <span style="color: rgb(104, 181, 104);">{{item.scheme_name}}:</span>
              <span style="color: rgb(3, 103, 190)">{{item.scheme_desc}}</span>
            </div>
            <div v-for="(item, i) in detailData.third_factory_result" :key="i">
              <span style="color: rgb(104, 181, 104);">{{item.scheme_name}}:</span>
              <span style="color: rgb(3, 103, 190)">{{item.scheme_desc}}</span>
            </div> -->
            <div class="content" v-html="detailData.total_result.scheme_desc"></div>
          </div>
          <hr style="border:1px dashed #000; height:1px" />
          <div class="footer_report">
            <div class="autograph">签名:</div>
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
      // detailData: {},
      img_echarts: "",
      myChart: {},
      flag: false,
      detailData: {
        id: "5ebfb3f026aa2e1e1fa16dd6",
        topic_id: "5def58fd212dd4d3f8a719f4",
        topic_name: "SCL-90症状自评量表",
        total_result: {
          level_type: 1,
          level_name: "默认",
          scheme_name: "测评总分",
          origin_score: 0,
          score: 183,
          scheme_desc: "<p>请参考因子分</p>"
        },
        filter_result: [],
        sub_factory_result: [
          {
            level_type: 0,
            level_name: "",
            scheme_name: "躯体化",
            origin_score: 0,
            score: 25,
            scheme_desc: "中间状态"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "强迫症状",
            origin_score: 0,
            score: 20,
            scheme_desc: "强迫症状不明显"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "人际关系敏感",
            origin_score: 0,
            score: 18,
            scheme_desc: "中间状态 "
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "抑郁",
            origin_score: 0,
            score: 26,
            scheme_desc: "中间状状"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "焦虑",
            origin_score: 0,
            score: 21,
            scheme_desc: "中间状态"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "敌对",
            origin_score: 0,
            score: 12,
            scheme_desc: "中间状态"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "恐怖",
            origin_score: 0,
            score: 15,
            scheme_desc: "中间状态"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "偏执",
            origin_score: 0,
            score: 12,
            scheme_desc: "中间状态"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "精神病性",
            origin_score: 0,
            score: 20,
            scheme_desc: "中间状态"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "其它",
            origin_score: 0,
            score: 14,
            scheme_desc: "睡眠、饮食等"
          }
        ],
        third_factory_result: [
          {
            level_type: 0,
            level_name: "",
            scheme_name: "总均分",
            origin_score: 0,
            score: 2.033333333333333,
            scheme_desc: "轻"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "阳性项目数",
            origin_score: 0,
            score: 90,
            scheme_desc: "若大于43项，需检查"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "阴性项目数",
            origin_score: 0,
            score: 0,
            scheme_desc: ""
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "阳性项目平均分",
            origin_score: 0,
            score: 2.033333333333333,
            scheme_desc: ""
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "躯体化平均分",
            origin_score: 0,
            score: 2.0833333333333335,
            scheme_desc: "轻"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "强迫状态平均分",
            origin_score: 0,
            score: 2,
            scheme_desc: "无"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "人际关系敏感平均分",
            origin_score: 0,
            score: 2,
            scheme_desc: "无"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "抑郁平均分",
            origin_score: 0,
            score: 2,
            scheme_desc: "无"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "焦虑平均分",
            origin_score: 0,
            score: 2.1,
            scheme_desc: "轻"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "敌意平均分",
            origin_score: 0,
            score: 1.2,
            scheme_desc: "无"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "恐怖平均分",
            origin_score: 0,
            score: 2.142857142857143,
            scheme_desc: "中"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "偏执平均分",
            origin_score: 0,
            score: 2,
            scheme_desc: "无"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "精神病性平均分",
            origin_score: 0,
            score: 2,
            scheme_desc: "轻"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "其他项目平均分",
            origin_score: 0,
            score: 1.4,
            scheme_desc: ""
          }
        ],
        create_time: "2020-05-16T09:35:44.671Z"
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
      // 绘制图表
      let option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLabel: {
            interval: 0 // 代表显示所有x轴标签
          },
          data: []
        },
        yAxis: {
          type: "value",
          // data: [
          //   "0",
          //   "0.5",
          //   "1",
          //   "1.5",
          //   "2",
          //   "2.5",
          //   "3"
          // ],
          boundaryGap: false,
          splitLine: { show: true }
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            // data的格式 [[1,2.1][2,1.5]]
            data: [],
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            name: "",
            type: "bar"
          }
        ]
      };
      // 数据处理
      const xAxisData = [];
      const seriesData = [];
      xAxisData.push("");
      this.detailData.sub_factory_result.forEach((v, i) => {
        const arr = [];
        arr.push(i + 1);
        arr.push(v.score);
        seriesData.push(arr);
        if (i % 2 !== 0) {
          xAxisData.push(" " + v.scheme_name);
          return;
        }
        xAxisData.push(v.scheme_name);
      });
      xAxisData.push("");
      option.xAxis.data = xAxisData.map(str => str.replace(" ", "\n\n"));
      option.series[0].data = seriesData;
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.echarts();
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
    padding: 15px 24px;
    // height: 842px;
    box-sizing: border-box;
    background: #fff;
    .hospital {
      color: rgb(255, 153, 0);
      text-align: center;
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 5px;
      margin-top: 10px;
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .patient {
      .patientinfo {
        margin-left: 15px;
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
      width: 540px;
      height: 220px;
      box-sizing: border-box;
      border: 3px solid rgb(53, 124, 57);
      canvas {
        margin: -10px 0 0 -10px;
      }
      #main {
        width: 100%;
        height: 100%;
      }
    }
    .factor {
      position: relative;
      margin: 20px 0 0 20px;
      .name {
        color: rgb(104, 181, 104);
      }
      .result {
        position: absolute;
        left: 100px;
        color: rgb(45, 45, 254);
      }
      .avage {
        position: absolute;
        left: 200px;
        color: rgb(45, 45, 254);
      }
      .resources {
        position: absolute;
        left: 275px;
        text-align: center;
        color: rgb(45, 45, 254);
        // width: 200px;
      }
      .deviation {
        position: absolute;
        left: 400px;
        color: rgb(45, 45, 254);
      }
    }
    .opinion {
      margin-left: 20px;
      margin-top: 20px;
      .name {
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
      margin-top: 10px;
      position: relative;
      height: 30px;
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
  .none {
    left: 205px !important;
  }
  .none1 {
    left: 300px !important;
  }
  .none2 {
    left: 430px !important;
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
  .echarts {
    margin: 0 auto;
  }
}
</style>
