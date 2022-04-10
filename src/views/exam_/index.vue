<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
          <Card />
        </el-col>
        <el-col :span="15" :xs="24">
          <Display />
        </el-col>
        <el-col :span="3" :xs="24">
          <Submit />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Card from './components/Card'
import Display from './components/Display'
import Submit from './components/Countdown'

export default {
  name: 'Profile',
  components: { Card, Display, Submit},
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  }
}
</script>
