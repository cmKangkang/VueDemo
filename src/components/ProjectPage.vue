<template>
  <div class="main">
    <!-- 项目头 -->
    <section class="main-header">
      <!-- 返回上一页图标 -->
      <el-row :gutter="20">
        <el-col :span="4" >
          <div class='main-header-title'>
            <i class="el-icon-folder"></i><el-divider direction='vertical'></el-divider><span class='page-head'>项目管理</span>
          </div>
        </el-col>
        <el-col :span="2">
          <!-- 新建按钮 -->
          <el-button 
          class="primary-button" 
          type="primary" 
          size="small" 
          @click="newProjectDialogVisible=true"
          >新建</el-button>
        </el-col>
        <el-col :span="8" :push="10">
        <el-input placeholder="输入关键字搜索" v-model="searchInput" @keyup.enter="search=searchInput">
        <el-button slot="append" icon="el-icon-search" @click="search=searchInput"></el-button>
        </el-input>
        </el-col>
      </el-row>

      <el-dialog 
        title="新建项目"
        :visible.sync='newProjectDialogVisible'>
        <el-form :model="form">
          <el-form-item label="项目名称" >
            <el-input v-model="form.pname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" >
            <el-input type='textarea' :autosize='{minRows:5}' v-model='form.info'></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="newProjectDialogVisible=false">取消</el-button>
        <el-button @click="newProject" type="primary">确定</el-button>
        </el-dialog>
        
    </section>
    <Table :search="search"></Table>
  </div>
</template>

<script>
import Table from './tables/ProjectTable'
import { addNewProject } from '../api/api.project';
export default {
  data:function(){
    return {
      newProjectDialogVisible:false,
      form:{
        pname:'',
        info:'',
        creator:'admin',
      },
      search:'',
      searchInput:'',
    }
  },
  components:{
    Table
  },
  methods:{
    goBack(){
      console.log('返回上一级')
    },
    newProject(){
      // 新建项目
      // 把项目加进列表
      addNewProject({"pname":this.form.pname,
                      "info":this.form.info,
                      "creator":this.form.creator }).then( data => {
        if(data.status==200){//请求成功
          let tmp=data.data?.data;
          // 传递到table
          this.$message({
            type:'success',
            message:'创建成功'
          });
        }else{
          this.$message({
            type:'info',
            message:'创建失败'
          })
        }
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'请求失败，请检查网络连接是否通畅。'
        })
      })
      // 隐藏对话框
      // this.newProjectDialogVisible=false;

      // 调用接口示例
      let params = {
        test : "123"
      }
      this.api.postInfo(params).then(res => {
        // 接口请求成功
        // 隐藏对话框
        this.newProjectDialogVisible=false;
      }).catch(err => {
        // 接口异常

      })
    }
  },
  // watch:{
  //   '$route'(to,from){
  //     console.log(from,to);
  //   }
  // }
}
</script>

<style>
  @import '../common/style/project.css'
</style>