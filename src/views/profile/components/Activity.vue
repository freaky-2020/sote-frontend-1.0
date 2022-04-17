<template>
  <div class="user-activity" @click="toDetail">
    <div class="post">
      <div v-if="activity!==null" class="user-block">
        <img class="img-circle" :src="'https://img-qn.51miz.com/Element/00/92/43/35/a6a3a67f_E924335_853a9640.png'+avatarPrefix">
        <svg-icon v-if="activity.infoNum !== 0" icon-class="message" />
        <span class="username text-muted" >题目变更申请</span>
        <span class="description">{{ activity.date }}</span>
      </div>
      <h4 v-if="activity.infoNum !== 0" style="margin-left: 50px">
        您有{{ activity.infoNum }}条题目申请待处理！
      </h4>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
import request from '@/utils/request'
export default {
  props:['account'],
  data() {
    return {
      activity: null,
      avatarPrefix,
    }
  },
  created() {
    this.fetchActivityData()
  },
  methods: {
    fetchActivityData() {
      request({
        url: 'bank/required/info',
        method: 'get',
      }).then(response => {
        console.log(response)
        this.activity = response
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail () {
      if(this.account.roleId === 1)
      this.$router.push({ name: 'Judge' })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    //margin-bottom: 15px;
    //padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}
</style>
