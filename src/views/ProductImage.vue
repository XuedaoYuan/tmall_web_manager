<template>
    <div>
        <div class="header">
            <el-button type="info" @click="goBack">返回</el-button>
        </div>
        <div class="upload-container">
            <el-row :gutter="20">
                <el-col :span="12">
                    <h3>新增产品单个图片</h3>
                    <input type="file" ref="single_image" id="single_image" style="margin-bottom: 10px;">
                    <br>
                    <el-button size="mini" type="success" @click="handleAddImage('single')">新增</el-button>
                </el-col>
                <el-col :span="12">
                    <h3>新增产品详情图片</h3>
                    <input type="file" ref="detail_image" multiple id="detail_image" style="margin-bottom: 10px;">
                    <br>
                    <el-button size="mini" type="success" @click="handleAddImage('detail')">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" align="center" label="ID" width="80"></el-table-column>
            <el-table-column prop="type" align="center" label="类型"></el-table-column>
            <el-table-column prop="image" align="center" label="预览">
            	<template slot-scope="scope">
            		<!-- <img :src=""> -->
            		<span>{{imgPath + scope.row.image}}</span>
            	</template>
            </el-table-column>
        </el-table>
        <div class="xdyuan-footer">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {

    name: 'ProductImage',

    data() {
        return {
            list: [],

            currentPage: 1,
            pageSize: 10,
            total: 0,

            form: {
                pid: ""
            },

            imgPath: "/Users/cloud/Desktop/frontEndTestCode/java_upload/"

        }
    },
    created() {
        this.form.pid = this.$route.query.id;
        this.queryProductImages();
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryProductImages();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.queryProductImages();
        },
        async queryProductImages() {
            let vm = this;
            let res = await vm.$axios({
                url: "/productimage",
                method: "GET",
                params: {
                    start: vm.currentPage,
                    limit: vm.pageSize,
                    pid: vm.form.pid
                }
            });

            vm.list = res.data.list;
            vm.total = res.data.total;
        },
        goBack() {
            this.$router.go(-1);
        },
        handleShowAddDialog() {

        },
        async handleAddImage(type) {
            let vm = this;
            if (type == "single") {
                let single_image = this.$refs["single_image"];
                console.log(single_image.files);
                let formData = new FormData();
                formData.append("file", single_image.files[0]);
                let res = await vm.$axios({
                    url: "/upload",
                    method: "POST",
                    data: formData
                });
                let fileName = res.data;
                res = await vm.$axios({
                    url: '/productimage',
                    method: "POST",
                    data: {
                        pid: vm.form.pid,
                        type: "type_single",
                        image: fileName
                    }
                });
                console.log(res);
                //详细页面
            } else if (type == "detail") {
                let detail_image = this.$refs["detail_image"];
                let files = detail_image.files;
                console.log(files);

                let formData = new FormData();
                for (var i = 0; i < files.length; i++) {
                    let file = files[i];
                    formData.append("files", file);
                }

                let res = await vm.$axios({
                    url: "/uploads",
                    method: "POST",
                    data: formData
                });
                console.log(res);
                let postData = [];
                if (res.data && res.data.length > 0) {
                    res.data.forEach(fileName => {
                        postData.push({
                            pid: vm.form.pid,
                            type: "type_detail",
                            image: fileName
                        })
                    });
                }

                res = await vm.$axios({
                    url: "/productimagees",
                    method: 'POST',
                    data: postData
                });

                console.log(res);

            }

        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    margin-bottom: 30px;
}

.upload-container {
    margin-bottom: 30px;
}
</style>