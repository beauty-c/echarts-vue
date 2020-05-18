<!--
 * @Author: your name
 * @Date: 2020-05-18 09:59:26
 * @LastEditTime: 2020-05-18 14:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel_cc:\Users\Administrator\Desktop\learn\echarts-vue\src\components\reports1.vue
--> 
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
          <div class="title">量表名</div>
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
                <div class="idcard">身份证号: 362330199603020721</div>
                <div class="time">就诊日期: 2019-12-15</div>
              </div>
            </div>
            <hr style="border:1px dashed #000; height:1px" />
          </div>
          <div class="factor">
            <div style="margin-bottom: 10px">
              <span class="name">测试结果:</span>
              <span></span>
            </div>
            <div>
              <span class="name">总&nbsp;&nbsp;&nbsp;&nbsp;分</span>
              <span class="result">16分</span>
            </div>
            <div v-if="detailData.sub_factory_result.length">
              <div class="name">因子分:</div>
              <div
                style="padding:0 10px "
                v-for="(item, i, key) in detailData
                .sub_factory_result"
                :key="key"
              >
                <p class="factors" style="color:#dd7851;line-height: 1.8">因子{{ i + 1 }}.{{ item.scheme_name }}</p>
                <p class="score">得分: {{ item.score.toFixed(0) }} [{{ item.scheme_desc }}]</p>
              </div>
            </div>

            <!-- <div v-for="(item, i) in detailData.sub_factory_result" :key="i">
              <span class="name">{{item.scheme_name}}</span>
              <span class="result">{{item.score}}</span>
            </div> -->
            <!-- <div>
            <span class="name">诊断结果</span>
            <span class="result">可能有中度的抑郁症状</span>
            </div>-->
          </div>
          <hr style="border:1px dashed #000; height:1px" />
          <div class="opinion">
            <div class="name">结果及意见:</div>
            <div class="content" v-html="detailData.total_result.scheme_desc"></div>
          </div>
          <hr style="border:1px dashed #000; height:1px" />
          <div class="footer_report">
            <div class="autograph">签名:</div>
            <div class="time">日期: 2019-12-15</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Print from "vue-printjs";
// import { detail } from '@/api/api'
Vue.use(Print);

export default {
  data() {
    return {
      detailData:{
            id:"5ebe3934dc325880c1a86e2b",
            topic_id:"5df0541b0675b2fae0143b48",
            topic_name:"康奈尔医学指数（CMI-男）",
            total_result:{
                level_type:1,
                level_name:"",
                scheme_name:"测评总分",
                origin_score:0,
                score:14,
                scheme_desc:"<p>请参考因子分</p>"
            },
            filter_result:[

            ],
            sub_factory_result:[
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"A-眼和耳",
                    origin_score:0,
                    score:1,
                    scheme_desc:"反映眼和耳问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"B-呼吸系统",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映呼吸系统问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"C-心血管系统",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映心血管系统问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"D-消化系统",
                    origin_score:0,
                    score:3,
                    scheme_desc:"反映消化系统问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"E-肌肉骨胳系统",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映肌肉骨胳系统"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"F-皮肤",
                    origin_score:0,
                    score:1,
                    scheme_desc:"反映皮肤问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"G-神经系统",
                    origin_score:0,
                    score:2,
                    scheme_desc:"反应神经系统问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"H-生殖泌尿系统",
                    origin_score:0,
                    score:3,
                    scheme_desc:"反应生殖系统问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"I-疲劳感",
                    origin_score:0,
                    score:1,
                    scheme_desc:"反应疲劳感问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"J-既往健康问题",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映既往健康问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"K-既往病史",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映既往病史问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"L-习惯",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映习惯问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"M-不适应",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映不适应问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"N-抑郁",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映抑郁问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"O-焦虑",
                    origin_score:0,
                    score:2,
                    scheme_desc:"反映焦虑问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"P-敏感",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映敏感问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"Q-愤怒",
                    origin_score:0,
                    score:0,
                    scheme_desc:"反映愤怒问题"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"R-紧张",
                    origin_score:0,
                    score:1,
                    scheme_desc:"反映紧张问题"
                }
            ],
            third_factory_result:[
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"M-R总分",
                    origin_score:0,
                    score:3,
                    scheme_desc:"正常"
                },
                {
                    level_type:0,
                    level_name:"",
                    scheme_name:"CMI总分",
                    origin_score:0,
                    score:14,
                    scheme_desc:"正常"
                }
            ],
            create_time:"2020-05-15T06:39:48.031Z"
        }
    };
  },
  methods: {
    print() {
      this.$print(this.$refs.print);
    },
    close_print() {
      this.$router.go(-1);
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
  margin-top: 20px;
  .page {
    page-break-after: always;
    padding: 20px 24px;
    // height: 842px;
    box-sizing: border-box;
    background: #fff;
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
    .factor {
      position: relative;
      margin: 10px 0 0 20px;
      .name {
        color: rgb(104, 181, 104);
      }
      .result {
        position: absolute;
        left: 150px;
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
