<template>
    <div class="home">
        <div class="header">
            <el-button type="primary" @click="handleShowAddDialog">新增</el-button>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" align="center" label="ID" width="80"></el-table-column>
            <!-- <el-table-column prop="id" align="center" label="图片"></el-table-column> -->
            <el-table-column prop="name" align="center" label="分类名称"></el-table-column>
            <el-table-column prop="imageUrl" align="center" label="图片"></el-table-column>
            <el-table-column align="center" label="属性管理">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleManageProperty(scope.$index, scope.row)">去管理</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="产品管理">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleManageProduct(scope.$index, scope.row)">去管理</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="编辑">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="删除">
                <template slot-scope="scope">
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="xdyuan-footer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- dislogs-start -->
        <el-dialog center title="添加分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="ID" label-width="100px">
                    <el-input disabled v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" label-width="100px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">确 定</el-button>
            </div>
        </el-dialog>
        <!-- dislogs-end -->
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'home',
    data() {
        return {
            list: [],

            currentPage: 1,
            pageSize: 10,
            total: 0,

            dialogFormVisible: false,

            form: {
                id: '',
                name: ""
            }
        }
    },
    components: {

    },
    created() {
        this.queryCategories();
    },
    methods: {
        queryCategories() {
            this.$axios({
                url: "/categories",
                method: "GET",
                params: {
                    start: this.currentPage,
                    limit: this.pageSize
                }
            }).then(res => {
                console.log(res);
                this.list = res.list;
                this.total = res.total;
            })
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.queryCategories();
        },
        handleCurrentChange(val) {
            console.log(val);
            this.currentPage = val;
            this.queryCategories();
        },
        //确认新增
        handleAdd() {
            let vm = this;
            this.$axios({
                url: "/categories",
                method: "POST",
                data: {
                    id: vm.form.id,
                    name: vm.form.name
                }
            }).then(res => {
                console.log(res);
                vm.queryCategories();

            }).catch(e => {
                console.log(e);
            })

            this.dialogFormVisible = false;
        },
        //删除
        handleDelete(index, row) {
            let vm = this;
            vm.$axios({
                url: "/categories",
                method: "DELETE",
                params: {
                    id: row.id
                }
            }).then(res => {
                console.log(res);
                if (res.success) {
                    vm.list.splice(index, 1);
                }
            }).catch(e => {
                console.log(e);
            })
        },
        //显示新增的对话框
        handleShowAddDialog() {
            this.dialogFormVisible = true;
            this.form.name = "";
            this.form.id = "";
        },
        //编辑
        handleEdit(index, row) {
            this.form.name = row.name;
            this.form.id = row.id;
            this.dialogFormVisible = true;
        },
        handleManageProperty(index, row) {
            this.$router.push({
                path: "/property",
                query: {
                    id: row.id
                }
            })
        },
        handleManageProduct(index, row) {
            this.$router.push({
                path: "/product",
                query: {
                    id: row.id
                }
            })
        }
    }
}
</script>
<style type="scss" scoped>
    .header { margin-bottom: 30px; }
</style>