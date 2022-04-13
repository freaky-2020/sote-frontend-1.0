<template>
  <div style="padding:30px;">
    <div style="position:relative;width: 1200px;height: 900px;">
      <div style="position:absolute;float: left;top: 0;">
        <h3>以下任意一种方式通知考生参加考试</h3>
      </div>
      <div ref="qrCodeUrl" class="qrcode" style="position:absolute;float: left;top: 80px;">
        <p>1、将二维码发给考生，扫描参加考试</p>
      </div>
      <div style="position:absolute;float: left;top: 240px;">
        <p>2、复制考试链接发给考生，打开链接参加考试</p>
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" @click="handleCopy(inputData,$event)">
          复制考试链接
        </el-button>
      </div>
      <div style="position:absolute;float: left;top: 350px;">
        3、发送考试邮件，通知考生参加考试
        <el-button type="primary" class="add_btn" icon="el-icon-message" @click="dialogTableVisible = true">
          发送考试通知
        </el-button>
        <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="发送考试通知" @dragDialog="handleDrag">
          <el-select ref="select" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-table :data="gridData">
            <el-table-column property="date" label="Date" width="150" />
            <el-table-column property="name" label="Name" width="200" />
            <el-table-column property="address" label="Address" />
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'
import elDragDialog from '@/utils/el-drag-dialog'
import QRCode from 'qrcodejs2'
export default {
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  mounted() {
    this.creatQrCode()
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    },
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: 'https://www.baidu.com/', // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  }
}
</script>
