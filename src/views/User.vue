<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" align="center" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" align="left" label="用户名"></el-table-column>
    </el-table>
    <div class="xdyuan-footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',

  data() {
    return {
      list: [],

      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.queryUser()
  },
  methods: {
    queryUser() {
      this.$axios({
        url: '/user',
        method: 'GET',
        params: {
          start: this.currentPage,
          limit: this.pageSize
        }
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.queryUser()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.queryUser()
    }
  }
}
</script>
<style lang="css" scoped>
</style>