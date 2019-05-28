<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link class="nav-tab" to="/">sss</router-link> -->
      <!-- <router-link class="nav-tab" to="/about">About</router-link> -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">产品管理</el-menu-item>
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
        </el-submenu>-->
        <el-menu-item index="2">用户管理</el-menu-item>
        <!-- <el-menu-item index="3">订单管理</a></el-menu-item> -->
      </el-menu>
      <div class="breadcrumb-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, index) in crumbs"
            :key="index"
            :to="{ path: item.path }"
          >{{item.name}}</el-breadcrumb-item>
          <!--       <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>
    </div>
    <div id="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {

  data() {
    return {
      activeIndex: '1'
    }
  },
  created() {
    let activeIndex = localStorage.getItem("activeIndex");

    if (!activeIndex) {
      activeIndex = "1";
    }

    this.handleSelect(activeIndex);
  },
  mounted() {


  },
  computed: {
    ...mapState('tmall/breadcrumb', ['crumbs'])
  },
  methods: {
    handleSelect(key, keyPath) {

      window.localStorage.setItem("activeIndex", key);
      this.activeIndex = key;
      switch (key) {
        case '1':
          this.$router.push("/");
          break;
        case '2':

          this.$router.push("/user");
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
  padding: 0 40px 100px;
}
.breadcrumb-container {
  padding: 0 40px 10px 40px;
}
</style>