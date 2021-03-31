<template>
  <div class='header'>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <span>
        <img class="header-logo" src="../assets/logo.png">
      </span>
      <el-submenu index="1" style="float:right">
      <template slot="title" >你好！{{name}}</template>
       <el-menu-item index="1-1" style="text-align:center">个人信息</el-menu-item>
       <el-menu-item index="1-2" style="text-align:center">系统设置</el-menu-item>
       <el-menu-item index="1-3" style="text-align:center">退出登录</el-menu-item>
      </el-submenu>
      
    </el-menu>
    <!-- <div class="icon-logo"></div>
    <span class="menu">
      <el-dropdown>
        <span>
          <img class="user-head-icon" src="../common/img/person-circle-outline.svg" width="32px" height="32px" align="center" style="{margin:0;}">
          <el-divider direction='vertical'></el-divider>
          {{name}}
          <i class="el-icon-arrow-down"></i>
        </span>
        
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item icon='el-icon-user' @click='handleClick'>用户信息</el-dropdown-item>
          <el-dropdown-item icon='el-icon-setting' @click='handleClick'>系统设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>-->
  </div> 
</template>

<script>
export default {
  data:function(){
      return {
        // 用户数据
        name:'admin',
        activeIndex:'1'
      }
    }
  ,
  methods:{
    // 
    handleClick(){},
    handleSelect(){}
    
  }
}
</script>

<style>

.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 120px!important;
}

.el-menu{
  padding-bottom: 10px;
}
.header-logo{
  height:60px;
  float: left;
  margin-left: 15px;
}
</style>