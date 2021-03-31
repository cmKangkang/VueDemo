<template>
  <div class="table">
  <el-table
    :data='currentPageItems'
    style='width:100%'
    border
    stripe 
    max-height="630px"
  >
    <el-table-column
      label='ID'
      prop='id'
      width="150px"
      :resizable="false"

    ></el-table-column>
    <el-table-column
      label='名称'
      prop='pname'
      :resizable="false"
      width="150px"
    >
      <template slot-scope="scope">
        <a @click.prevent style="color:#409EFF;cursor:pointer">{{scope.row.pname}}</a>
      </template>
    </el-table-column>
    <el-table-column
      label='创建人'
      prop='creator'
      :resizable="false"
      width="100px"
    ></el-table-column>
    <el-table-column
      label='创建日期'
      prop='date'
      :resizable="false"
      width="200px"
    ></el-table-column>
    <el-table-column
      label='最近修改时间'
      :resizable="false"
      prop='latest'
      width="200px"
    ></el-table-column>
    <el-table-column
      label='描述'
      :resizable="false"
      prop='info'
    ></el-table-column>
    <el-table-column
      fixed="right"
      :resizable="false"
      label='操作'
      width="200px"
      min-width="80px">
      <!-- 搜索按钮 -->
      <!-- <template slot="header">
        <input
          class="search-input"
          value="search"
          v-model='search'
          placeholder="输入关键字搜索"
        >
      </template> -->
      <template slot-scope="scope">
        <div style="text-align:center">
        <!-- 编辑按钮 -->
        <el-button
          size='mini'
          @click='editItem'
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
      </template>
    </el-table-column>
  </el-table>
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
import { getWorkList, editWorkInfos, deleteWork } 
  from '../../api/api.work';

export default {
  props:['search','id'],
  data:function(){
    return{
      items:[],
      currentPage:1,//当前页码
      total:null,//总条数
      pageSizes:[5,10,15,20],
      pageSize:10//每一页的数据条数
    }
  },
  computed:{
    currentItems(){
      return this.items.filter(item=>!this.search||item.pname.toLowerCase().includes(this.search.toLowerCase()))
    },
    currentPageItems(){
      return this.currentItems.filter((item,index)=>index< this.pageSize*this.currentPage +1  && index >= this.pageSize *(this.currentPage-1))
    },
  },
  methods:{
    editItem(form){// 编辑项目，form为表单信息，包含id, pname, info
      editWorkInfos({ "id":form.id, 
                      "pname":form.pname, 
                      "info":form.info}).then( data => {
        if(data?.status==200){//请求成功
          let tmp=data.data?.data;
          this.items.forEach( item => {
            if(item.id==tmp.id){
              item.pname=tmp.pname;
              item.info=tmp.info;
              item.latest=tmp.latest;
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
      console.log(this.$route.params['p-id']);
      console.log('deleting ${item.name}');
      this.$confirm('此操作将永久删除该工程文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定按钮的操作，
          // 点击则移除该表项，并删除
          // 发送删除请求
          deleteWork({"id":item.id}).then( data => {
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
    enterNext(){
      return ;
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
  },
  created(){
    // 初始化items
    this.items.length=0;
    getWorkList({"id":this.id}).then( data => {
      console.log(data);
      let tmp=data.data;
      if( tmp.code=="1" ){
        tmp.data.forEach( item => {
          this.items.push(item);
        });
      }
    })
  },
  watch:{
    // id变化则根据id请求数据
    'id'(){
      this.items.length=0;
      getWorkList({"id":this.id}).then( data => {
        console.log(data);
        let tmp=data.data;
        if( tmp.code=="1" ){
          tmp.data.forEach( item => {
            this.items.push(item);
          });
        }
      })
    }
  }
}
</script>

<style>
   @import '../../common/style/table.css';
</style>