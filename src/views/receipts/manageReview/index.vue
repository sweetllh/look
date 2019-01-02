<template>
	<div class="manageReceipt">
  		<div>
  			<el-input size="small" placeholder="请搜索输入内容" prefix-icon="el-icon-search" 
				v-model="searchValue" style="width: 260px;"></el-input>
			<el-select v-model="reviewValue" placeholder="请选择分类" size="small" style="width: 120px;">
			    <el-option v-for="item in reviewOptions" :key="item.value" 
			    	:label="item.label" :value="item.value"></el-option>
			</el-select>
  			<el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
		 	</el-button>
		</div>
		<div class="table">
		    <el-table :data="tableData.Details" :height="$bus.clientHeight - 180"
		    	style="width: 100%;" v-loading="isLoading" >
		      <el-table-column label="图片" min-width="80" align="left" header-align="center">
		      	<template slot-scope="scope">
		      		<el-button type="text" @click.native.prevent="previewGift(scope.row)">
			        	<img :src="scope.row.Image" width="60"/></el-button>
			    </template>
		      </el-table-column>
		      <el-table-column label="店名" min-width="160" align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.name }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="评论内容" min-width="260" align="center" >
		      	<template slot-scope="scope">
		      		<span>{{scope.row.comments}}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="点赞" min-width="100" align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.praise }}</span>
			    </template>
		      </el-table-column>
		      
		      <el-table-column label="评论时间" min-width="200" align="center" >
		      	<template slot-scope="scope">
			        <span>{{ scope.row.time}}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="操作" min-width="110" align="center">
		      	<template slot-scope="scope">
			        <router-link to="/ModifyReview/1" style="padding-right: 10px;">管理</router-link>
			        <el-button  @click.native.prevent="deleteRow(scope.row.Id)" type="text">删除</el-button>
			    </template>
		      </el-table-column>
		    </el-table>
		 </div>
		 <el-pagination class="pageWrap"
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage "
		      :page-sizes="[10, 20, 30, 40, 50, 100, 200, 300]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="tableData.TotalCount">
		 </el-pagination>
  	</div>
</template>

<script>
	import { tomorrowGift,deletePresentToSell } from '@/api/gift'
	export default {
		data () {
		 	return {
		 		searchValue: '',
		 		isLoading: false,
		 		tableData: {
		 			CurrentPage: 1,
		 			PageSize: 10,
		 			TotalCount: 1,
		 			TotalPage: 1,
		 			Details: [{
			 					Image: "https://www.linkedsign.cn/AXP/Api/Files/Present?id=b2e62e5c09b0436aae3d71e8228e6e6a",
			 					name: "同仁四季（南山店）",
								praise: "200 +9",
								comments: "外卖小哥辛苦了，大半夜还在送外卖啊",
								time: "2018-10-21 15:47",
								Id: 1
		 					}
		 					
		 			]
		 		},
		 		currentPage: 1,
		 		pageSize: 10,
		 		reviewOptions: [{
		 			value: ' ',
			        label: '全部'
		 		},{
		 			value: '1',
			        label: '精选'
		 		}],
		 		reviewValue: "",
		 		detailJson: {},
		 	}
		 	
		 },
		 
		 created(){
		 	//this.PresentsToSell();
		 },
		 
		 methods: {
		 	handleSizeChange(val) {
				this.pageSize = val;
				this.presentsInSell();
		        //console.log(`每页 ${val} 条`);
		    },
		    
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.presentsInSell();
		       // console.log(`当前页: ${val}`);
		    },
			
		 	/*小票列表*/
			PresentsToSell(){
				this.isLoading = true;
				let params = {
				        "PageSize": this.pageSize,
				        "Page": this.currentPage
				    }
		       	const that = this;
		       	tomorrowGift(params).then(res => {
	       			that.isLoading = false;
	       			that.tableData = res.Data;
			    }).catch(error => {
		          //console.log(error)
		        })
		       	
			},
		 	
		 	
		 	
		 	
		 	/*预览*/
		 	previewGift (val) {
		 		this.$emit('giftDetail',val);
		 	},
		 	
		 	/*确定删除？*/
		 	deleteRow (val) {
		 		this.$confirm('此操作将删除评论, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	
		        	this.deleteGift(val);
		        	
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		 	},
		 	
		 	/*删除礼品*/
		 	deleteGift(id){
		 		let that = this;
		 		deletePresentToSell(id).then(res => {
	       			that.PresentsToSell(); //重新加载表格
	            	that.$message({
	                   message: "删除成功",
	                   type: 'success'
	                });
			    }).catch(error => {
		          //console.log(error)
		        })
		 		
		 	},
		 	
		 	
		 	
		 }
	}
</script>

<style scoped lang="scss">
	
</style>