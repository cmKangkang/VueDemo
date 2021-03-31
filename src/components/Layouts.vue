<template>
  <div class='page '>
    <!-- 顶栏 -->
    <Header></Header>
    <!-- <el-divider></el-divider> -->
    <!-- 主要显示区域 -->
    <transition name='fade' mode="out-in">
      <keep-alive>
        <!-- 路由出口 -->
        <router-view></router-view>
      </keep-alive>
    </transition>  
  </div>
</template>

<script>
import Header from './Header';
import ProjectPage from './ProjectPage';
import UnitPage from './UnitPage';
import WorkPage from './WorkPage';

export default {
  components:{
    Header,
    ProjectPage,
    WorkPage,
    UnitPage
  },
}

</script>

<style lang="css">
  @import "../common/style/layout.css";
  @import '../common/style/header.css';
</style>