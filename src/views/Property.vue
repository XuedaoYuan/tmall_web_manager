<template>
  <div class="property">
    <div class="header">
      <el-button type="info" @click="goback">返回</el-button>
      <el-button type="primary" @click="handleShowDialog">新增</el-button>
      <!--  <el-form :model="searchForm">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="产品ID" label-width="100px">
                            <el-input v-model.number="searchForm.cid" autocomplete="off"></el-input>
                        </el-form-item>
                       
                    </el-col>
                    <el-col :span="2">
                        
                    </el-col>
                </el-row>
      </el-form>-->
    </div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" align="center" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" align="center" label="属性名称"></el-table-column>
      <!-- <el-table-column prop="cid" align="center" label="CID"></el-table-column> -->
      <el-table-column align="center" label="编辑操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="删除操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
          >删除</el-button>
        </template>
      </el-table-column>
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
    <!-- dislogs-start -->
    <el-dialog center title="添加属性" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="CID" label-width="100px">
          <el-input disabled v-model="form.cid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog center title="编辑属性" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="CID" label-width="100px">
          <el-input disabled v-model="form.cid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ID" label-width="100px">
          <el-input disabled v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dislogs-end -->
  </div>
</template>
<script>
export default {
  name: 'Property',

  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogEditVisible: false,
      form: {
        cid: '',
        name: ''
      }
    }
  },
  created() {
    let cid = this.$route.query.id
    this.form.cid = cid
    this.queryProperties(cid)
  },
  methods: {
    queryProperties(cid) {
      let vm = this
      this.$axios({
        url: '/properties',
        method: 'GET',
        params: {
          start: vm.currentPage,
          limit: vm.pageSize,
          cid: this.form.cid
        }
      }).then(res => {
        vm.list = res.data.list
        vm.total = res.data.total
      })
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.queryProperties()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.queryProperties()
    },
    goback() {
      this.$router.go(-1)
    },
    handleShowDialog() {
      this.form.name = ''
      this.dialogFormVisible = true
    },
    async handleEditConfirm() {
      const res = await this.$axios({
        url: '/properties',
        method: 'PUT',
        data: this.form
      })
      console.log(res)
      if (res.success) {
        this.dialogEditVisible = false
      }
    },
    handleAdd() {
      let vm = this
      if (!vm.form.name) {
        return
      }
      vm.$axios({
        url: '/properties',
        method: 'POST',
        data: vm.form
      })
        .then(res => {
          if (res.success) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
          }
          vm.dialogFormVisible = false
          vm.queryProperties(vm.form.cid)
        })
        .catch(e => {
          console.log(e)
          vm.dialogFormVisible = false
        })
    },
    async handleEdit(index, row) {
      /*  this.$message({
           message: '暂时不做了， 后续。。',
           type: 'warning'
       }) */
      const res = await this.$axios({
        url: '/properties/id',
        method: 'GET',
        params: {
          id: row.id
        }
      })
      this.form = row
      this.dialogEditVisible = true
    },
    handleDelete(i, r) {
      let vm = this
      vm.$axios({
        url: '/properties',
        method: 'DELETE',
        params: {
          id: r.id
        }
      })
        .then(res => {
          if (res.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.list.splice(i, 1)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  margin-bottom: 30px;
}
</style>