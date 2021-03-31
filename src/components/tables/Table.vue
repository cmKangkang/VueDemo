<template>

  <el-table
    :data='currentItems'
    style='width:100%'
    
  >
    <el-table-column
      label='ID'
      prop='id'
      resizable='false'
    ></el-table-column>
    <el-table-column
      label='名称'
      prop='pname'
      resizable='false'
    >
      <template slot-scope="scope">
        <a @click.prevent="enterNext(scope.row)" style="color:#409EFF;cursor:pointer">{{scope.row.pname}}</a>
      </template>
    </el-table-column>
    <el-table-column
      label='创建人'
      prop='maker'
    ></el-table-column>
    <el-table-column
      label='创建日期'
      prop='date'
    ></el-table-column>
    <el-table-column
      label='描述'
      prop='desp'
    ></el-table-column>
    <el-table-column
      fixed="right"
      label='操作'
    >
      <!-- 搜索按钮 -->
      <!-- <template slot="header">
        <input
          value="search"
          v-model='search'
          placeholder="输入关键字搜索"
        > 
      </template>-->

      <template slot-scope="scope">
        <!-- 编辑按钮 -->
        <el-button
          size='mini'
          @click='editItem'
          >编辑</el-button>

          <!-- 删除按钮 -->
          <el-button
            size='mini'
            type='danger'
            @click='deleteItem(scope.row)'
          >删除</el-button>
      </template>
    </el-table-column>
    
  </el-table>

</template>

<script>
export default {
  data:function(){
    return{
      items:[
        {id:1,pname:'app1',date:'aaaa',desp:'sederfr',maker:'rkk'},
        {id:2,pname:'app2',date:'aaaa',desp:'sederfr',maker:'rkk'},
        {id:3,pname:'xyz',date:'aaaa',desp:'sederfr',maker:'hll'},
        {id:4,pname:'appn',date:'aaaa',desp:'sederfr',maker:'hll'},
      ],
      search:'',
    }
  },
  computed:{
    currentItems(){
      return this.items.filter(item=>!this.search||item.pname.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods:{
    editItem(){
      console.log("editing!");
    },
    deleteItem(item){
      console.log(this.$route.params['p-id']);
      console.log('deleting ${item.name}');
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 点击确定按钮的操作，
          // 点击则移除该表项，并删除
          this.items=this.items.filter(el=>{
            return !(el.id==item.id);
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
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
      

      this.$router.push({name:'units',params:{'pid':item.name}});
      // this.$router.push({name:'works',params:{'p-id':'exp','u-id':item.name}});
    }
  }
}
</script>

<style>

</style>