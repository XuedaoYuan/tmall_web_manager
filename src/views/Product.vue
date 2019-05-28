<template>
  <div>
    <div class="header">
      <el-button type="info" @click="goBack">返回</el-button>
      <el-button type="primary" @click="handleShowAddDialog">新增</el-button>
    </div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" align="center" label="ID" width="80"></el-table-column>
      <el-table-column prop="image" align="center" label="图片" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.firstProductImage ? scope.row.firstProductImage.image : ""}}</span>
          <el-button
            @click="handleAddImage(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
          >管理</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="产品名称"></el-table-column>
      <el-table-column prop="subTitle" align="center" label="产品小标题"></el-table-column>
      <el-table-column prop="originalPrice" align="center" width="100px" label="原价格"></el-table-column>
      <el-table-column prop="promotePrice" align="center" width="100px" label="优惠价格"></el-table-column>
      <el-table-column prop="stock" align="center" width="100px" label="库存数量"></el-table-column>
      <el-table-column align="center" label="设置属性" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleEditProperty(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
          >设置</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
          >编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="删除" width="100">
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
    <el-dialog center title="新增产品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="CID" label-width="100px">
          <el-input disabled v-model="form.cid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品小标题" label-width="100px">
          <el-input v-model="form.subTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价格" label-width="100px">
          <el-input v-model.number="form.originalPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠价格" label-width="100px">
          <el-input v-model.number="form.promotePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" label-width="100px">
          <el-input v-model.number="form.stock" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog center title="编辑属性" :visible.sync="dialogFormEditPropVisible">
      <el-form>
        <el-form-item
          v-for="(item, index) in properties"
          :key="index"
          :label="item.property.name"
          label-width="100px"
        >
          <el-input @blur="handdleBlur" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditPropVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditProperty">确 定</el-button>
      </div>
    </el-dialog>
    <!-- dislogs-end -->
  </div>
</template>
<script>
export default {
  name: 'Product',

  data() {
    return {
      list: [],

      currentPage: 1,
      pageSize: 10,
      total: 0,

      form: {
        cid: '',
        name: '',
        subTitle: '',
        originalPrice: '',
        promotePrice: '',
        stock: ''
      },
      form2: {},

      properties: [],

      dialogFormVisible: false,
      dialogFormEditPropVisible: false
    }
  },
  created() {
    let query = this.$route.query
    this.form.cid = query.id
    this.queryProducts(query.id)
  },
  methods: {
    handdleBlur(val) {
      console.log(val)
    },
    handleEditProperty() {
      this.dialogFormEditPropVisible = false
    },
    queryProducts() {
      this.$axios({
        url: '/product',
        method: 'GET',
        params: {
          start: this.currentPage,
          limit: this.pageSize,
          cid: this.form.cid
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.list
        this.total = res.data.total
      })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.queryProducts()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryProducts()
    },
    handleShowAddDialog() {
      let vm = this
      for (let key in vm.form) {
        if (key != 'cid') {
          vm.form[key] = ''
        }
      }
      this.dialogFormVisible = true
    },
    handleDislog(status) {
      this.dialogFormVisible = status
    },
    handleAdd() {
      let vm = this
      vm.$axios({
        url: '/product',
        method: 'POST',
        data: vm.form
      }).then(res => {
        console.log(res)
        vm.queryProducts()
        vm.handleDislog(false)
        vm.$message({
          message: '新增成功',
          type: 'success'
        })
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    handleEdit(index, row) {
      let vm = this
      vm.form = row
      vm.handleDislog(true)
    },
    async handleEditProperty(index, row) {
      await this.$axios({
        url: '/propertyvalue/init',
        method: 'POST',
        data: row
      })

      const res = await this.$axios({
        url: '/propertyvalue/list',
        method: 'GET',
        params: {
          pid: row.id
        }
      })
      this.properties = res.data
      this.dialogFormEditPropVisible = true
    },
    handleDelete(index, row) {
      let vm = this
      vm.$axios({
        url: '/product',
        method: 'DELETE',
        params: {
          id: row.id
        }
      })
        .then(res => {
          console.log(res)
          if (res.success) {
            vm.list.splice(index, 1)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleAddImage(index, row) {
      this.$router.push({
        path: '/productimage',
        query: {
          id: row.id
        }
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