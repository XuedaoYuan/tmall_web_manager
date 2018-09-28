<template>
    <div id="app">
        <div id="nav">
            <!-- <router-link class="nav-tab" to="/">sss</router-link> -->
            <!-- <router-link class="nav-tab" to="/about">About</router-link> -->
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="1">产品分类</el-menu-item>
                <!--  <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu> -->
                <el-menu-item index="2">about</el-menu-item>
                <!-- <el-menu-item index="3">订单管理</a></el-menu-item> -->
            </el-menu>
        </div>
        <div id="container">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {

    data() {
        return {
            activeIndex: '1'
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            switch (key) {
                case '1':
                    this.$router.push("/");
                    break;
                case '2':
                    this.$router.push("/about");
                    break;
                default:
                    // statements_def
                    break;
            }

        }
    }

}
</script>
<style lang="scss" scoped>
#app {
    // padding: 0 40px;
}

.el-menu-demo {
    padding: 0 40px;
    margin-bottom: 20px;
}











/* #nav {
    height: 80px;
    background-color: black;
    line-height: 80px;
    padding: 0 40px;
    .nav-tab {
        font-size: 20px;
        color: #ccc;
        margin-right: 20px;
    }
}
 */

#container {
    padding: 0  40px 100px;
}
</style>