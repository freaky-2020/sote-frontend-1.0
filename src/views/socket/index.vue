<template>
<div>
  <p>【userId】：<div><el-input v-model="userId"></el-input></div>
  <p>【toUserId】：<div><el-input v-model="toUserId"></el-input></div>
  <p>【toUserId】：<div><el-input v-model="contentText"></el-input></div>
  <p>【操作】：<div><a @click="openSocket">开启socket</a></div>
</div>
</template>

<script>
export default {
name: "index",
  data(){
    return{
      socket:null,
      userId:1,
      toUserId:2,
      contentText:"hello",
    }
  },
  methods:{
    openSocket(){
      if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      }else{
        console.log("您的浏览器支持WebSocket");
        //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
        var socketUrl="124.222.238.194:10010/auth/openSocket/"+this.userId;
        socketUrl=socketUrl.replace("https","ws").replace("http","ws");
        console.log(socketUrl);
        if(this.socket!=null){
          this.socket.close();
          this.socket=null;
        }
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket.onopen = function() {
          console.log("websocket已打开");
          //this.socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        this.socket.onmessage = function(msg) {
          console.log(msg.data);
          //发现消息进入    开始处理前端触发逻辑
        };
        //关闭事件
        this.socket.onclose = function() {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function() {
          console.log("websocket发生了错误");
        }
      }
    },

    sendMessage(){
      if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      }else {
        console.log("您的浏览器支持WebSocket");
        console.log('{"toUserId":"'+this.toUserId+'","contentText":"'+this.contentText+'"}');
        this.socket.send('{"toUserId":"'+this.toUserId+'","contentText":"'+this.contentText+'"}');
      }
    }
  }
}
</script>

<style scoped>

</style>
