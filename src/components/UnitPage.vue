<template>
  <div class="main">
    <!-- 项目头 -->
    <section class="main-header">
      <!-- 返回上一页图标 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <div class='main-header-title'>
            <i @click="goBack" class="el-icon-back"></i><el-divider direction='vertical'></el-divider><span class='page-head'>单元管理</span>
          </div>
        </el-col>
        <el-col :span="2"><el-button class='primary-button' type="primary" size="small" @click="UploadDialogVisble=true">上传</el-button></el-col>
        <el-col :span="8" :push="10">
          <el-input placeholder="输入关键字搜索" v-model="searchInput" @keyup.enter="search=searchInput">
            <el-button slot="append" icon="el-icon-search" @click="search=searchInput"></el-button>
          </el-input>
        </el-col>
      </el-row>

    <!-- 上传文件对话框 -->
    <el-dialog
      title="上传"
      :visible.sync="UploadDialogVisble"
       min-width="260px"
      :before-close="handleClose"
      
    >
    <div class="upload-input">
    <div style="margin-bottom:10px"><span>单元名称</span></div>
      <el-input 
      v-model="input" 
      placeholder="请输入内容"
      style="margin-bottom:30px"
      ></el-input>
    <div style="margin-bottom:10px"><span>单元描述</span></div>
     <el-input
      type="textarea"
      rows="2"
      placeholder="请输入内容"
      v-model="textarea"
      style="margin-bottom:30px">
     </el-input>
     </div>
    <!-- 选择本地文件上传 -->
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      style="text-align:center"
      >
     <i class="el-icon-upload" ></i>
     <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
     <div class="el-upload__tip" slot="tip">只能上传rar/zip文件，且不超过10GB</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="UploadDialogVisble = false">取消</el-button>
      <el-button type="primary" @click="uploadDocument">确定</el-button>
    </span>
    </el-dialog>
    </section>

    <section class='table'>
      <Table :search="search" :id="id"></Table>
    </section>
  </div>
</template>

<script>
import { addNewUnit } from '../api/api.unit';
import Table from './tables/UnitTable';
// 需要接受列表数据用于渲染与搜索
export default {
  data:function(){
      return {
        id:this.$route.params.id,
        UploadDialogVisble:false,
        search:'',
        searchInput:'',
      }
    },
  computed:{
    cid(){
      console.log(this.id);
      return this.id;
    }
  },
  components:{
    Table
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    handleClose(done){
      this.$confirm('确定取消上传操作吗？')
       .then(_=>{
         done();
       })
       .catch(_=>{})
    },

    uploadDocument(){
      addNewUnit({}).then( data => {
        if(data?.status==200){//请求成功
          let tmp=data.data?.data;

          this.$message({
            type:'success',
            message:'单元上传成功！'
          });
        }else{
          this.$message({
            type:'danger',
            message:'上传失败。'
          })
        }
        // 使框隐藏
      this.UploadDialogVisble = false;
      }).catch(()=>{
        this.$message({
            type:'info',
            message:'请求失败，请检查网络是否畅通。'
          })
      })
    }
  },
  watch:{
    '$route'(to,from){
      // console.log('from',from,'to',to);
      // 监听to，若为name==uints，则根据id请求数据
      if(to.name=="units"){
        let id=to.params.id;
        // 更新数据
        this.id=id;
      }
    }
  },
}
</script>

<style>
  @import '../common/style/project.css';

  .upload-input{
    margin:15px 8px 0 8px;

  }

  
</style>