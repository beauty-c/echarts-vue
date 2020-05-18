<template>
  <div class="shaow">
    <div class="no-print" style="textAlign:center;marginTop:10px">
      <button type="primary" size="mini" @click="print">打印</button>
      <button size="mini" @click="close_print">关闭</button>
    </div>
    <div ref="print" v-aotoClose>
      <div class="list" ref="pdfs">
        <div class="page">
          <div class="hospital">xx人民医院</div>
          <div class="title">卡特尔16种个性因素测验</div>
          <div class="patient">
            <div class="patienttitle">【患者信息】</div>
            <hr style="border:1px dashed #000; height:1px" />
            <div class="patientinfo">
              <div class="top">
                <span class="name">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: 程</span>
                <span
                  class="sex"
                >性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别: 女</span>
                <span class="age">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄: 16</span>
              </div>
              <div class="bottom">
                <div class="patientcard">就诊卡号: 15297919437</div>
                <div class="idcard">身份证号: 362330166958020598</div>
                <div class="time">就诊日期:2018-11-15</div>
              </div>
            </div>
            <hr style="border:1px dashed #000; height:1px" />
          </div>
          <div
            style="text-align: center;font-size: 20px;margin-bottom:20px;margin-top:10px;"
          >卡特尔16种个性测验</div>
          <div class="echarts">
            <div id="main" class="no-print" v-if="!flag"></div>
            <img :src="img_echarts" alt v-show="flag" />
          </div>
          <div class="results_title">
            <span>测试结果:</span>
          </div>
          <div class="result">
            <div class="factor">
              <div>
                <span class="name indicators">指标</span>
                <span class="original" style="left: 120px; color: rgb(104, 181, 104);">原始分</span>
                <span class="standard" style="left: 203px; color: rgb(104, 181, 104);">标准分</span>
                <span class="name name1" style="left: 295px;">指标</span>
                <span class="original" style="left: 395px; color: rgb(104, 181, 104);">原始分</span>
                <span class="standard" style="left: 475px; color: rgb(104, 181, 104);">标准分</span>
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
            <!-- <div v-for="(item) in detailData.sub_factory_result" :key="item.scheme_desc">
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
            <div class="time">日期: 2018-11-15</div>
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
        id: "5ec1e74a26aa2e2b9cc03c9e",
        topic_id: "5def58fd212dd4d3f8a71a0a",
        topic_name: "卡特尔16种人格因素测验",
        total_result: {
          level_type: 1,
          level_name: "默认",
          scheme_name: "测评总分",
          origin_score: 0,
          score: 167,
          scheme_desc: "<p>请参考因子分</p>"
        },
        filter_result: [],
        sub_factory_result: [
          {
            level_type: 0,
            level_name: "",
            scheme_name: "A乐群性",
            origin_score: 9,
            score: 6,
            scheme_desc:
              "低分特征：建模，孤独，冷漠。标准分低于3者通常固执，对人冷漠，落落寡合，喜欢吹毛求疵，宁愿独自工作，对事而不对人，不轻易放弃自己的主见，为人做事的标准常常很高。严谨而不苟且。高分数的特征：外向，热情，乐群。标准分高过8者，通常和蔼可亲，与人相处，合作与适应的能力特强。喜欢和别人共同工作，参加或组织各种社团活动，不斤斤计较，容易接受别人的批评。萍水相逢也可以一见如故。教师和推销员多系高A，而物理学家和电机工程师则多系低A。前者需要时时应付人与人之间的复杂情绪或行为问题，而仍然能够保证其乐观的态度。后者则必须极端的冷静严肃与正确才能圆满地完成任务。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "B智慧性",
            origin_score: 8,
            score: 6,
            scheme_desc:
              "低分特征:思想迟钝，学识浅薄，抽象思考能力弱。低者通常对学习与了解能力不强，不能“举一隅而以三隅反”。迟钝的原因可能由于情绪不稳定，心理病态或失常所致。高分特征:聪明，富有才识，善于抽象思考。高者通常学习能力强，思考敏捷正确，教育，文化水准高，个人心身状态健康。机警者多有高B，高B反映心理机能的正常。专业训练需要高B，但从事例行职务的人如大资源，电话生，家庭主妇等，则因高B而对例行琐务发生厌恶，不能久安其职。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "C稳定性",
            origin_score: 13,
            score: 5,
            scheme_desc:
              "低分特征：情绪激动，易生烦恼。低者通常不能以“逆来顺受”的态度，应付生活上所遭遇的阻扰和挫折，容易受环境的支配，而心神动摇不定。不能面对现实，时时会暴躁不安，心身疲乏，甚至于失眠，噩梦，恐怖等症象。所有神经病人和精神病人都属低C。高分特征：情绪稳定而成熟，能面对现实。高者通常以沉着的态度应付现实各项问题。行动充满魄力。能振奋勇气，维持团队的精神。有时高C也可能由于不能彻底解决许多生活难题，而不得不自我宽解。教师，机器工程师，推销员，救火队队员等，凡需要应付日常生活各种难题者应有高C。但是凡能随心所欲，安排自己工作进度的人，如作家，邮差或清道工等，则虽系低C，尚无大碍。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "E影响性",
            origin_score: 13,
            score: 7,
            scheme_desc:
              "低分特征：谦逊，顺从，通融，恭顺。低者通常行为温顺，迎合别人的意旨，也可能因为希望可遇而不可求，即使处在十全十美的境地，而有“事事不如人”之感，许多精神病人都有这样消极的心情。高分特征：好强固执，独立积极。高者通常自视甚高，自以为是。可能非常地武断，而时常驾驭不及他的人和反抗权势者。一般的，领袖以及有地位有成就的人多属高E。救火队员和航空飞行员的因素E高。男人较女人高。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "F活泼性",
            origin_score: 14,
            score: 7,
            scheme_desc:
              "低分特征：严肃，谨慎，冷静，寡言。低者通常行动拘禁，内省而不轻易发言，较消极，忧郁。有时候可能过分深思熟虑，又近乎骄傲自满。在职责上，他常是认真而可靠的工作人员。高分特征：轻松兴奋，随遇而安。高者通常活泼，愉快，健谈，对人对事热心而富有感情。但是有时也可能会冲动，以致行为变化莫测。行政主管人员多有高F。竞选人必有高F,才能够获得选民的爱戴，实验技术人员则不必有高F。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "G有恒性",
            origin_score: 12,
            score: 5,
            scheme_desc:
              "低分特征：苟且敷衍，缺乏奉公守法的精神。低者通常缺乏较高的目标和理想，对于人群及社会没有绝对的责任感，甚至于有时不惜执法犯法，不择手段已达到某一目的。但他常能有效的解决实际问题，而无须浪费时间和精力。高分特征：持恒负责，做事尽职。高者通常细心周到，有始有终。是非善恶是他的行为指针。所结交的朋友多是努力苦干的人，而不十分欣赏诙谐有趣的人。各种社团组织的领袖需要高G。业务管理和警察具有极高的因素G。任性纵欲，放火杀人的罪犯，因素G 极低。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "H交际性",
            origin_score: 11,
            score: 6,
            scheme_desc:
              "低分特征：畏怯退缩，缺乏自信心。低者通常在人群中羞怯。有不自然的姿态，有强烈的自卑感。拙于发言，更不愿和陌生人交谈。凡是采取观望的态度，有时由于过分的自我意识而忽视了社会环境中的重要事物与活动。高分特征：冒险敢为，少有顾忌。高者通常不掩饰，不畏缩，有敢做敢为的精神，使他能经历艰辛而保持刚毅的一例。有时可能太粗心大意，忽视细节，遭受无谓的打击与挫折。可能无聊多事，喜欢向异性殷勤卖力。因素H常随年龄而增强。救火队队员和飞行员有高H，事物员多是低H。团队领导人必具有高H。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "I情感性",
            origin_score: 9,
            score: 4,
            scheme_desc:
              "低分特征：理智的，着重现实，自恃其力。低者唱常以客观，坚强，独立的态度处理当前的问题。重视文化修养，可能过分冷酷无情。高分特征：敏感，感情用事。高者通常心肠软，易受感动，较女性化，爱好艺术，富于幻想。有时过分不切实际，缺乏耐心和恒心，不喜欢接近粗俗的人和做笨重的工作。在团体活动中，不着实际的看法与行为常常减低了团队的工作效率。室内设计师，音乐家，艺人，女人属高I，而工程师，外科医生，统计师等则多"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "L怀疑性",
            origin_score: 10,
            score: 5,
            scheme_desc:
              "低分特征：信赖随和，易与人相处。低者通常无猜忌，不与人角逐竞争，顺应合作，善于体贴人。高分特征：怀疑，刚愎，固执己见。高者通常怀疑，不信任别人，与人相处，常常斤斤计较，不顾及到别人的利益。在团体活动中，低L是以团体福利为前提的忠实分子，因素L过分高者常常成事不足，败事有余。工程师，机工，精神病护理员多是低L，而行政人员和警察常是高L. "
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "M想象性",
            origin_score: 11,
            score: 4,
            scheme_desc:
              "低分特征：现实，合乎成规，力求妥善合力。低者通常先要斟酌现实条件，而后决定取舍，不鲁莽从事。在紧要关头时，也能保持镇静，有时可能过分重视现实，为人索然寡趣。高分特征：幻想的，狂放不羁。高者通常忽视生活的细节，只以本身的动机，当时兴趣等主观因素为行为的出发点。可能富有创造力，有时也过分不务实际，近乎冲动。因而容易被人误解及奚落。艺术家，作者及从事研究者多有高M。低M多选择需要实际，机警，脚踏实地的工作。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "N世故性",
            origin_score: 10,
            score: 6,
            scheme_desc:
              "低分特征：坦白，直率，天真。低者通常思想简单，感情用事。与人无争，与世无杵，自许，心满意足。但有时显得幼稚，粗鲁，笨拙，似乎缺乏教养。高分特征：精明能干，世故。高者通常处事老练，行为得体。能冷静地分析一切，近乎狡猾。对于一切事物的看法是理智的，客观的。科学家，工程师，飞行员多是高N，牧师神父，护士等多是低N，牧师的因素N不应太高，低N使他不苛求责难，能容忍同情信徒的缺点。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "O忧虑性",
            origin_score: 12,
            score: 6,
            scheme_desc:
              "低分特征：乐群，沉着，有自信心。低者通常有信心，不轻易动摇，信任自己有应付问题的能力，有安全感，能适应世俗。有时因为缺乏同情，而引发别人的反感与恶意。高分特征：忧虑抑郁，烦恼自扰。高者通常觉得世道艰辛，人生不如意事常八九，甚至沮丧悲观，时时有患得患失之感。自觉不容于人，也缺乏和人接近的勇气。各种神经病和精神病人都有高O。年老的女招待，低级办事员，以及终生碌碌未尽如意的作家，编辑人等有高O。职业运动员，电机工，救火队员，护士等多是低O。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "Q1变革性",
            origin_score: 10,
            score: 5,
            scheme_desc:
              "低分特征：保守的，尊重传统观念与行为标准。低者通常无条件地接受社会中许多相沿已久而有权威性的见解，不愿常是探求新的境界。常常激烈的反对新思想以及一切新的变动。在政治与宗教信仰上，墨守成规，可能被称为老顽固或时代的落伍者。高分特征：自由的，批评激进，不拘泥现实。高者通常喜欢考验一切现有的理论与实施，而予以新的评价，不轻易判断是非，企图了解较前卫的思想与行为。可能广见多闻。愿意充实自己的生活经验。行政主管人，前卫的政治家，科学家都必须具有高Q1，护士，牧师神父与许多为首高深教育的技工等则多有低Q1，神经病人的因素Q1也比较低。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "Q2独立性",
            origin_score: 8,
            score: 3,
            scheme_desc:
              "低分特征：依赖，随群附和。低者通常宁欲与人共同工作，而不愿独立孤行。常常放弃个人的主见而附和取得别人的好感，需要团体的支持以维持其自信心，却并非真正的乐群者。高分特征：自立自强，当机立断。高者通常能够自作主张，独自完成自己的工作计划，不依赖别人，也不受社会舆论的约束，同样也无意控制或支配别人，不嫌恶人，但是也不需要别人的好感。科学家，行政主管人等多有高Q2，低Q2者不能胜任需要随机应变能力的职务。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "Q3自律性",
            origin_score: 6,
            score: 2,
            scheme_desc:
              "低分特征：矛盾冲突，不顾答题。低者通常既不能克制自己，又不能尊重礼俗，更不愿考虑别人的需要，充满矛盾却无法解决。生活适应有问题者多低Q3. 高分特征：知己知彼，自律谨严。高者通常言行一致，能够合理的支配自己的感情行动。为人处世，总能保持其自尊心，赢得别人的尊重，有时却不免太固执己见。高Q3者多具有领袖能力的才干，主管人，电机工和生产部门的成功也需要高Q3。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "Q4紧张性",
            origin_score: 12,
            score: 6,
            scheme_desc:
              "低分物征：心平气和，闲散宁静，低者通常知足常乐，保持内心的平衡。也可能过分疏懒，缺乏进取心。高分特征：紧张闲扰，激动挣扎。高者通常缺乏耐心，心神不安，态度兴奋。时常感觉疲乏，又无法彻底摆脱以求宁静。在社群中，他对人与事都缺乏信心。每日生活战战兢兢，而不能自给。未能在生活或职业中发挥本身才智潜能的人多具有高Q4，如餐店招待，家庭主妇，缺乏生活保障的作业等。"
          }
        ],
        third_factory_result: [
          {
            level_type: 0,
            level_name: "",
            scheme_name: "适应与焦虑型X1",
            origin_score: 0,
            score: 6.2,
            scheme_desc:
              "得分在8分以上者为高分，3分以下者为低分。低分特征：生活适应顺利，通常感到心满意足，能做到所期望的及自认为重要的事情。如分数极低，则可能对困难的工作缺乏毅力，有事事知难而退，不肯奋斗努力的倾向。高分特征：不一定有神经症，因为它可能是情境性的，但也可能有一些调节不良的情况，即对生活上所要求的和自己意欲达成的事情常感到不满意。高度的焦虑可能会使工作受到破坏和影响身体健康。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "内向与外向型X2",
            origin_score: 0,
            score: 7.4,
            scheme_desc:
              "得分在8分以上者为高分，3分以下者为低分。低分特征：内倾，趋于胆小，自足，在与别人接触中采取克制态度，有利于从事精细工作。这种类型无所谓利弊，主要取决于在哪种情况下采取这种态度。高分特征：外倾，开朗，善于交际，不受拘束，有利于从事贸易工作。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "感情用事与安详机警型",
            origin_score: 0,
            score: 7.1,
            scheme_desc:
              "得分在8分以上者为高分，3分以下者为低分。低分特征：情感丰富而感到困扰不安，它可能是缺乏信心、颓丧的类型，对生活中的细节较为含蓄敏感，性格温和，讲究生活艺术，采取行动前再三思考，顾虑太多。高分特征：富有事业心，果断，刚毅，有进取精神，精力充沛，行动迅速，但常忽视生活上的细节，只对明显的事物注意，有时会考虑不周，不计后果，冒然行事。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "怯懦与果断型X4",
            origin_score: 0,
            score: 4.4,
            scheme_desc:
              "得分在8分以上者为高分，3分以下者为低分。低分特征：依赖别人，纯洁，个性被动，受人驱使而不能独立，对支持他的人在行动上常适应其需求，为获取别人的欢心会事事迁就。高分特征：果断，独立，露锋芒，有气魄，有攻击性的倾向，通常会主动地寻找可以施展这种行为的环境或机会，以充分表现自己的独创能力，并从中取得利益。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "心理健康因素Y1",
            origin_score: 0,
            score: 22,
            scheme_desc:
              "心理健康状况几乎是一切职业及事业成功的基础。心理不健康者，其学习和工作效率都会因之减低。心理健康标准可介于4-40之间，均值为22分。低于12分者仅占人数分配的10%，情绪不稳定的程度颇为显著。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "专业有成就者的人格因素Y2",
            origin_score: 0,
            score: 45,
            scheme_desc:
              "本次级因素意指人格中的某些因素可能对将来的专业成就所具有的影响，它并不代表将来专业成就所达到的水平。其总分可介于10-100之间，平均分为55，67以上者其成功的机会更大。"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "创造力强者的人格因素Y3",
            origin_score: 71,
            score: 3,
            scheme_desc:
              "标准分高于7者属于创造力强者的范围，应有其成就。在新环境中有成长能力的人格因素"
          },
          {
            level_type: 0,
            level_name: "",
            scheme_name: "Y4在新环境中有成长能力的人格因素",
            origin_score: 0,
            score: 17,
            scheme_desc:
              "本次级 因素总分可介于4-40之间，平均值为22分，不足17分者仅占人数的10%左右，从事专业或训练成功的可能性较小。25分以上者，则有成功的希望。"
          }
        ],
        create_time: "2020-05-18T01:39:22.067Z"
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
          data: []
        },
        yAxis: {
          type: "category",
          data: [],
          boundaryGap: false,
          splitLine: { show: true }
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            data: [],
            markPoint: {
              data: []
            },
            markLine: {
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  lineStyle: {
                    // type: 'dash',
                    width: 2,
                    color: "green"
                  }
                }
              },
              data: [{ yAxis: 3 }, { yAxis: 8 }]
            }
          },
          {
            name: "",
            type: "bar"
          }
        ]
      };
      const seriesData = [];
      const xAxisData = [
        "A",
        "B",
        "C",
        "E",
        "F",
        "G",
        "H",
        "I",
        "L",
        "M",
        "N",
        "O",
        "Q1",
        "Q2",
        "Q3",
        "Q4"
      ];
      // y轴数据
      const yAxisData = [];
      const arr = [];
      this.detailData.sub_factory_result.forEach((v, i) => {
        seriesData.push(v.score);
        xAxisData[i] += " " + v.score;
        arr.push(v.score);
      });
      // y轴最大值
      const max = Math.max.apply(null, arr);
      for (var i = 0; i <= max + 5; i++) {
        yAxisData.push(i);
      }
      option.yAxis.data = yAxisData;
      // 因子分数曲线
      option.series[0].data = seriesData;
      // x轴因子的值
      option.xAxis.data = xAxisData.map(str => {
        return str.replace(" ", "\n\n");
      });
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
              left: 135px;
              color: rgb(45, 45, 254);
            }
            .standardScore {
              position: absolute;
              left: 220px;
              color: rgb(45, 45, 254);
            }
          }
        }
        .indicators {
          display: inline-block;
          width: 70px;
          text-align: center;
        }
        .name {
          color: rgb(104, 181, 104);

          // width: 80px;
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
