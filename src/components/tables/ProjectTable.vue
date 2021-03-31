<template>
  <div class="table">
  <el-table
    :data='currentPageItems'
    style='width:100%'
    border
    stripe
    height="630px"
  >
    <el-table-column
      label='ID'
      prop='id'
      width="100px"
      :resizable="false"
    ></el-table-column>
    <el-table-column
      label='名称'
      prop='pname'
      width="200px"
      :resizable="false"
    >
      <template slot-scope="scope">
        <a @click.prevent="enterNext(scope.row)" style="color:#409EFF;cursor:pointer">{{scope.row.pname}}</a>
      </template>
    </el-table-column>
    <el-table-column
      label='创建人'
      prop='creator'
      width="200px"
       :resizable="false"
    ></el-table-column>
    <el-table-column
      label='创建日期'
      prop='date'
      width="250px"
       :resizable="false"
    ></el-table-column>
    <el-table-column
      label='描述'
      prop='info'
      :resizable="false"
    ></el-table-column>

    <el-table-column
      fixed="right"
      label='操作'
      width="200px"
      min-width="80px"
       :resizable="false"
      >
      <template slot-scope="scope">
        <div style="text-align:center">
          <!-- 编辑按钮 -->
          <el-button
            size='mini'
            >编辑</el-button>
          <!-- 分隔线 -->
          <el-divider direction="vertical"></el-divider>
          <!-- 删除按钮 -->
          <el-button
            size='mini'
            type='danger'
            @click='deleteItem(scope.row)'
          >删除</el-button>
        </div>

        <!-- <el-dialog 
        title="编辑项目"
        :visible.sync='editProjectDialogVisible'>
        <el-form :model="form">
          <el-form-item label="项目名称" >
            <el-input v-model="form.pname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" >
            <el-input type='textarea' :autosize='{minRows:5}' v-model='form.info'></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="editProjectDialogVisible=false">取消</el-button>
        <el-button @click="editItem" type="primary">确定</el-button>
        </el-dialog> -->

      </template>
    </el-table-column>
  </el-table>

  <!-- 分页器 -->
  <div class="Pageno-box">
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="currentItems.length">
  </el-pagination>
  </div>

  </div>
</template>

<script>
import { getProjectList, addNewProject, editProjectInfos, deleteProject } 
  from '../../api/api.project';

export default {
  props:['search','id'],
  data:function(){
    return{
      items:[],
      currentPage:1,//当前页码
      total:null,//总条数
      pageSizes:[5,10,15,20],
      pageSize:10,//每一页的数据条数，
      form:{//编辑框数据存储
      }
    }
  },
  computed:{
    currentItems(){
      return this.items.filter(item=>!this.search||item.pname.toLowerCase().includes(this.search.toLowerCase()))
    },
    currentPageItems(){
      return this.currentItems.filter((item,index)=>index< this.pageSize*this.currentPage  && index >= this.pageSize *(this.currentPage-1))
    },
  },
  created(){
    getProjectList({"id":this.id}).then( data => {
      // console.log(data);
      if(data.data.code=="1"){
        data.data.data.forEach( item => {
          this.items.push(item);
        })
      }
    })
  },
  methods:{
    editItem(form){// 编辑项目，form为表单信息，包含id, pname, info
      editProjectInfos({ "id":form.id, 
                      "pname":form.pname, 
                      "info":form.info}).then( data => {
        if(data?.status==200){//请求成功
          let tmp=data.data?.data;
          this.items.forEach( item => {
            if(item.id==tmp.id){
              item.pname=tmp.pname;
              item.info=tmp.info;
              // item.latest=tmp.latest;
            }
          });
          this.$message({
            type:'success',
            message:'编辑成功！'
          })
        }else{
          this.$message({
            type:'info',
            message:'编辑失败。'
          })
        }
      }).catch(()=>{
        this.message({
          type:'info',
          message:'请求失败。'
        })
      });
    },

    deleteItem(item){
      // 删除项目
      this.$confirm('此操作将永久删除该项目文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定按钮的操作，
          // 点击则移除该表项，并删除
          // 发送删除请求
          deleteProject({"id":item.id}).then( data => {
            if( data.status==200 ){
              // 请求成功，移除本地表项
              this.items=this.items.filter(el=>{
                return !(el.id==item.id);
              });
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(()=>{
            this.$message({
              type:'info',
              message:'请求失败'
            })
          });
          
        }).catch(() => {
          // 点击取消按钮的操作
          // 取消操作
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    enterNext(item){
      this.$router.push({name:'units',params:{'id':item.id}});
      // this.$router.push({name:'works',params:{'p-id':'exp','u-id':item.name}});
    },

    onChangeSearch(value){
      // 输入框失去焦点或用户按下回车时触发
      console.log(value)
    },
    handleSizeChange(val){
      console.log('每页数据为${val}条');
      //每次修改当前页面数据条数时刷新页面
      this.currentPage=1;
      //完成修改
      this.pageSize=val;
    },
    handleCurrentPageChange(val){
      console.log('当前页码为:${val}');
      this.currentPage=val;
    }
  }
}
</script>

<style>
 @import '../../common/style/table.css';
</style>