<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人主页</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="'https://tse1-mm.cn.bing.net/th/id/R-C.29a84eb867bf75b5327e7df3b1a7e32c?rik=iW9zjAJwqTB%2fdA&riu=http%3a%2f%2ftupian.qqw21.com%2farticle%2fUploadPic%2f2019-7%2f201971622263482217.jpeg&ehk=W4G6YV7SJ1LFEFGJ3r%2bsC66stsnts%2bGu%2b7tsCcMPWGA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1'" :height="'100px'" :width="'100px'">
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name box-center">{{ account.realName }}</div>
        <div class="user-role box-center text-muted" v-text="getRole(account.roleId)"></div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header box-center"><svg-icon icon-class="education" /><span>{{ this.account.userUniv }}</span></div>
        <div class="user-bio-section-header box-center"><svg-icon icon-class="international" /><span>{{ this.account.userUnit }}</span></div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  props:['account'],
  components: { PanThumb },
  data(){
    return{

    }
  },
  methods:{
    getRole(role){
      if(role === 1){
        return '管理员'
      }
      else if(role === 2){
        return '教师'
      }
      else{
        return '学生'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
