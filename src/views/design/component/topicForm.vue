<template>
  <div class="filter-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      fit
      highlight-current-row>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'topicForm',
  data(){
    return{
      tableData:[],
    }
  }
}
</script>

<style scoped>

</style>
