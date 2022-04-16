<template>
  <div id="index">
    <div class="bg"
                              :style="{'background-image': `url(${require('@/views/visualization/assets/pageBg.png')})`}">
      <el-scrollbar
        :style="{ height: clientHeight + 'px' }"
    　   :native="false"
    　   wrapStyle=""
        wrapClass=""
        viewClass=""
    　　 viewStyle=""
        :noresize="false"
        tag="section"
      >
        <div class="el-scrollbar__wrap_scrollBodyHidden">
          <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width:33.3%;height:5px;" />
          <div class="d-flex jc-center">
            <dv-decoration-8 :color="['#568aea', '#000000']" style="width:200px;height:50px;" />
            <div class="title">
              <span class="title-text">sote系统数据可视化</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width:250px;height:8px;"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width:200px;height:50px;"
            />
          </div>
          <dv-decoration-10 style="width:33.3%;height:5px;" />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="width: 500px; text-align: left;background-color: #0f1325;"
            >
              <span class="react-before bg-color-blue mr-3"></span>
              <span class="text fw-b">数据概览</span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325;">
              <span class="text colorBlue fw-b">数据分析2</span>
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">近期数据分析</span>
            </div>
            <div
              class="react-left mr-4"
              style="width: 500px; background-color: #0f1325; text-align: right;"
            >
              <span class="react-after"></span>
              <span class="text" style="font-size: 20px">{{ nowData.toString().slice(0,21) }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <div style="width:20%">
              <dv-border-box-12>
                <centreLeft1 />
              </dv-border-box-12>
            </div>
            <div>
              <dv-border-box-12>
                <centreLeft2 />
              </dv-border-box-12>
            </div>
            <!-- 中间 -->
            <div style="width:25%">
              <center />
            </div>
            <!-- 中间 -->
            <div>
              <centreRight2 />
            </div>
            <div>
              <dv-border-box-13>
                <centreRight1 />
              </dv-border-box-13>
            </div>
          </div>

          <!-- 第四行数据 -->
          <div class="bototm-box">
            <div style="width: 60%">
            <dv-border-box-13>
              <bottomLeft />
            </dv-border-box-13></div>
            <div style="width: 40%">
            <dv-border-box-12>
              <bottomRight />
            </dv-border-box-12></div>
          </div>
        </div>
      </div>


        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import centreLeft1 from "./centreLeft1";
import centreLeft2 from "./centreLeft2";
import centreRight1 from "./centreRight1";
import centreRight2 from "./centreRight2";
import center from "./center";
import bottomLeft from "./bottomLeft";
import bottomRight from "./bottomRight";



export default {
  data() {
    return {
      nowData: this.getLatestDate(),
      loading: true,
      clientHeight: 1080,
    };
  },
  components: {
    centreLeft1,
    centreLeft2,
    centreRight1,
    centreRight2,
    center,
    bottomLeft,
    bottomRight
  },
  mounted() {
    this.cancelLoading();
    this.Nowtimer = setInterval(() => {
      this.nowData = this.getLatestDate() // 2.生命周期挂载完成时，使用定时器实时修改数据nowData
    }, 1000)
  },
  beforeDestroy() {
    if (this.Nowtimer) {
      clearInterval(this.Nowtimer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  destroyed() {
    clearInterval(this.clientHeightTime)
  },
  created () {
    this.clientHeightTime = setInterval(() => {
      if (this.clientHeight = (document.documentElement.clientHeight < 600 ? 1000 : (document.documentElement.clientHeight < 927 ? 1080 : document.documentElement.clientHeight))) {
        this.clientHeight = (document.documentElement.clientHeight < 600 ? 1000 : (document.documentElement.clientHeight < 927 ? 1080 : document.documentElement.clientHeight))
      }
    }, 500)
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    getLatestDate() {
      var aData = new Date()
      return aData //时间格式化
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/scss/index.scss";
@import "./assets/scss/style.scss";
.el-scrollbar__wrap {

  overflow-x: hidden !important;

}

.el-scrollbar__wrap_scrollBodyHidden {

  width: 100%;

  overflow: hidden;

}

</style>
