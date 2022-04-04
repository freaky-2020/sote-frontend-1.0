<template>
  <div>
      <vue-esign ref="esign" :width="500" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
      <el-button @click="handleReset">清空画板</el-button>
      <el-button @click="handleGenerate">生成图片</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  methods: {
    handleReset () {
      this.$refs['esign'].reset() //清空画布
    },
    handleGenerate () {
      this.$refs['esign'].generate().then(res => {
        this.resultImg = res // 得到了签字生成的base64图片
      }).catch(err => { //  没有签名，点击生成图片时调用
        this.$message({
          message: ' 请签名后再生成签字图片',
          type: 'warning'
        })
        // alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })


      // 在这里向后端发请求把转换后的base64文件传给后端，后端接收以后再转换成图片做静态图片存储
      // 当然也可以把base64转成流文件blob格式的，类似上传给后端这样，具体哪种方式看后端要求
      setTimeout(() => {
        // 这里要使用定时器稍微延后以后就能取到base64数据了，当然也可以再加一个确认按钮，如：确认使用这张base64签名图片
        // 点击确认以后，在其回调函数中，再把base64的签名图片传给后端用于存储
        console.log('我是签字后的base64图片',this.resultImg);
      }, 200);
      this.dialogVisible = false;
    },

    // 将base64，转换成图片

    base64ImgtoFile(dataurl, filename = 'file') {

      const arr = dataurl.split(',')

      const mime = arr[0].match(/:(.*?);/)[1]

      const suffix = mime.split('/')[1]

      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })

    },

  }
}


</script>
<style>
vue-esign{
  border: 1px solid #5a5e66 ;
  border-radius: 5px;
}
</style>
