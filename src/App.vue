<template>
    <div id="app">
        <div id="nav">
            <router-link class="nav-tab" to="/">产品分类</router-link>
            <router-link class="nav-tab" to="/about">About</router-link>
        </div>
        <div id="container">
          <router-view/>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#app {
    // padding: 0 40px;
}

#nav {
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
#container {
  padding: 0 40px;
}
</style>