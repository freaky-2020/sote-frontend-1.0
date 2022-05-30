<template>
  <div class="dashboard-container">
    <div class="background-container">
<!--      <el-row >-->
<!--        <el-col :span="18">-->
<!--        <div class="box bg-primary-light pull-up">-->
<!--          <el-row>-->
<!--          <el-col :span="6" class="col-12 col-lg-3" >-->
<!--            <img src="@/assets/picture/custom-14.svg" alt="">-->
<!--          </el-col>-->
<!--          <el-col :span="18" class="col-12 col-lg-9">-->
<!--            <h2>Hello Johen, Welcome Back!</h2>-->
<!--            <p class="text-dark mb-0 font-size-16">-->
<!--              本周完成了 2 场考试，还有 3 场正在进行中-->
<!--            </p>-->
<!--          </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--        </el-col>-->
<!--        <el-col :span="6"></el-col>-->
<!--      </el-row>-->


      <panel-group></panel-group>
<!--          <div class="chart-div" style="width:60% ;height: 450px">-->
<!--            <mix-chart></mix-chart>-->
<!--          </div>-->
<!--          <div id="donut-chart" style="width:30% ;height: 450px">-->
<!--            <donut-chart></donut-chart>-->
<!--          </div>-->
<!--      <el-row class="row">-->
<!--        <el-col class="col-12">-->
<!--          <div class="box no-shadow mb-0 bg-transparent">-->
<!--            <div class="box-header no-border px-0">-->
<!--              <h4 class="box-title">Your Courses</h4>-->
<!--              <ul class="box-controls pull-right d-md-flex d-none">-->
<!--                <li>-->
<!--                  <button class="btn btn-primary-light px-10">View All</button>-->
<!--                </li>-->
<!--                <li class="dropdown">-->
<!--                  <button class="dropdown-toggle btn btn-primary-light px-10" data-toggle="dropdown" href="#" aria-expanded="false">Most Popular</button>-->
<!--                  <div class="dropdown-menu dropdown-menu-right" style="">-->
<!--                    <a class="dropdown-item active" href="#">Today</a>-->
<!--                    <a class="dropdown-item" href="#">Yesterday</a>-->
<!--                    <a class="dropdown-item" href="#">Last week</a>-->
<!--                    <a class="dropdown-item" href="#">Last month</a>-->
<!--                  </div>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="24" :lg="6" :md="12" class="col-lg-3 col-md-6 col-12">-->
<!--          <div class="box bg-secondary-light pull-up" style="background-image: url('../../assets/picture/image/st-1.svg'); background-position: right bottom; background-repeat: no-repeat;">-->
<!--            <div class="box-body">-->
<!--              <div class="flex-grow-1">-->
<!--                <div class="d-flex align-items-center pr-2 justify-content-between">-->
<!--                  <div class="d-flex">-->
<!--                    <span class="badge badge-primary mr-15">Active</span>-->
<!--                    <span class="badge badge-primary mr-5"><i class="fa fa-lock"></i></span>-->
<!--                    <span class="badge badge-primary"><i class="fa fa-clock-o"></i></span>-->
<!--                  </div>-->
<!--                  <div class="dropdown">-->
<!--                    <a data-toggle="dropdown" href="#" class="px-10 pt-5"><i class="ti-more-alt"></i></a>-->
<!--                    <div class="dropdown-menu dropdown-menu-right">-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-import"></i> Import</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-export"></i> Export</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-printer"></i> Print</a>-->
<!--                      <div class="dropdown-divider"></div>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <h4 class="mt-25 mb-5">It & software</h4>-->
<!--                <p class="text-fade mb-0 font-size-12">45 Days Left</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="24" :lg="6" :md="12" class="col-lg-3 col-md-6 col-12">-->
<!--          <div class="box bg-secondary-light pull-up" style="background-image: url(static/image/st-2.svg); background-position: right bottom; background-repeat: no-repeat;">-->
<!--            <div class="box-body">-->
<!--              <div class="flex-grow-1">-->
<!--                <div class="d-flex align-items-center pr-2 justify-content-between">-->
<!--                  <div class="d-flex">-->
<!--                    <span class="badge badge-dark mr-15">Finished</span>-->
<!--                  </div>-->
<!--                  <div class="dropdown">-->
<!--                    <a data-toggle="dropdown" href="#" class="px-10 pt-5"><i class="ti-more-alt"></i></a>-->
<!--                    <div class="dropdown-menu dropdown-menu-right">-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-import"></i> Import</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-export"></i> Export</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-printer"></i> Print</a>-->
<!--                      <div class="dropdown-divider"></div>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <h4 class="mt-25 mb-5">Programming</h4>-->
<!--                <p class="text-fade mb-0 font-size-12">1 Days Left</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="24" :lg="6" :md="12" class="col-lg-3 col-md-6 col-12">-->
<!--          <div class="box bg-secondary-light pull-up" style="background-image: url(static/image/st-3.svg); background-position: right bottom; background-repeat: no-repeat;">-->
<!--            <div class="box-body">-->
<!--              <div class="flex-grow-1">-->
<!--                <div class="d-flex align-items-center pr-2 justify-content-between">-->
<!--                  <div class="d-flex">-->
<!--                    <span class="badge badge-primary mr-15">Active</span>-->
<!--                    <span class="badge badge-primary mr-5"><i class="fa fa-lock"></i></span>-->
<!--                  </div>-->
<!--                  <div class="dropdown">-->
<!--                    <a data-toggle="dropdown" href="#" class="px-10 pt-5"><i class="ti-more-alt"></i></a>-->
<!--                    <div class="dropdown-menu dropdown-menu-right">-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-import"></i> Import</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-export"></i> Export</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-printer"></i> Print</a>-->
<!--                      <div class="dropdown-divider"></div>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <h4 class="mt-25 mb-5">Networking</h4>-->
<!--                <p class="text-fade mb-0 font-size-12">15 days Left</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="24" :lg="6" :md="12" class="col-lg-3 col-md-6 col-12">-->
<!--          <div class="box bg-secondary-light pull-up" style="background-image: url(static/image/st-4.svg); background-position: right bottom; background-repeat: no-repeat;">-->
<!--            <div class="box-body">-->
<!--              <div class="flex-grow-1">-->
<!--                <div class="d-flex align-items-center pr-2 justify-content-between">-->
<!--                  <div class="d-flex">-->
<!--                    <span class="badge badge-warning-light mr-15">Paused</span>-->
<!--                    <span class="badge badge-warning-light mr-5"><i class="fa fa-lock"></i></span>-->
<!--                  </div>-->
<!--                  <div class="dropdown">-->
<!--                    <a data-toggle="dropdown" href="#" class="px-10 pt-5"><i class="ti-more-alt"></i></a>-->
<!--                    <div class="dropdown-menu dropdown-menu-right">-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-import"></i> Import</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-export"></i> Export</a>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-printer"></i> Print</a>-->
<!--                      <div class="dropdown-divider"></div>-->
<!--                      <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <h4 class="mt-25 mb-5">Network Security</h4>-->
<!--                <p class="text-fade mb-0 font-size-12">21 Days Left</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row :gutter="32" >
        <el-col :span="17" >
          <div class="chart-div" style="height: 450px">
<!--            <span></span>-->
            <mix-chart></mix-chart>
          </div>
        </el-col>
        <el-col :span="7" >

                <div class="chart-div" style="height: 350px">
<!--                  <el-collapse v-model="activeName" accordion>-->
<!--                    <el-collapse-item title="近期考试" name="1">-->
                      <donut-chart ></donut-chart>
<!--                    </el-collapse-item>-->
<!--                  </el-collapse>-->
                </div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PanelGroup from '@/views/dashboard/components/PanelGroup'
import MixChart from '@/components/Charts/MixChart'
import DonutChart from '@/components/Charts/DonutChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Dashboard',
  components:{
    PanelGroup,
    MixChart,
    DonutChart,
  },
  methods:{
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    //margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.chart-div{
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
}
</style>
