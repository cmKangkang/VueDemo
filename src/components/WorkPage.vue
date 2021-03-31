<template>
  <div class="main">
    <!-- 项目头 -->
    <section class="main-header">
      <!-- 返回上一页图标 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <div class='main-header-title'>
            <i @click="goBack" class="el-icon-back"></i><el-divider direction='vertical'></el-divider><span class='page-head'>工程管理</span>
          </div>
        </el-col>
        <el-col :span="8" :push="12">
          <el-input placeholder="输入关键字搜索" v-model="searchInput" @keyup.enter="search=searchInput">
            <el-button slot="append" icon="el-icon-search" @click="search=searchInput"></el-button>
          </el-input>
        </el-col>
      </el-row>
      
    </section>  

    <section class='table'>
      <Table :search="search" :id="id"></Table>
    </section>
  </div>
</template>

<script>

import Table from './tables/WorkTable'
export default {
  data:function(){
    return {
      id:this.$route.params.id,
      search:'',
      searchInput:'',
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  components:{
    Table
  },
  watch:{
    '$route'(to,from){
      // console.log('from',from,'to',to);
      // 监听to，若为name==uints，则根据id请求数据
      if(to.name=="works"){
        let id=to.params.id;
        // 更新数据
        this.id=id;
      }
    }
  },
}
</script>
<style>
  @import '../common/style/project.css'
</style>