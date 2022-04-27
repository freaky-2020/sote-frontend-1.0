<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card v-if="flag" :account="account" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account v-if="flag" :account="account"/>
              </el-tab-pane>
              <el-tab-pane label="消息通知" name="activity">
                <activity :account="account" />
              </el-tab-pane>
              <el-tab-pane label="时间线" name="timeline">
                <timeline />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import request from '@/utils/request'

export default {
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      account: null,
      flag: false,
      activeTab: 'account'
    }
  },
  created() {
    this.fetchAccountData()
  },
  methods: {
    fetchAccountData() {
      request({
        url: 'auth/client/get',
        method: 'get',
        params: {
          userName: this.$store.getters.name
        }
      }).then(response => {
        console.log(response)
        this.flag = true
        this.account = response
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
