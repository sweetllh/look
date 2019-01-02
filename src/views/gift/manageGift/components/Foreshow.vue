<template>
	<div>
  		<div>
  			<el-select v-model="type" placeholder="请选择礼品类别" size="small" 
  				@change="PresentsToSell"  style="margin-right: 15px;">
			    <el-option v-for="item in $bus.presentTypes" :key="item.value" 
			    	:label="item.label" :value="item.value"></el-option>
			</el-select>
  			<el-input size="small" placeholder="请搜索输入礼品名称" prefix-icon="el-icon-search" 
				v-model="searchValue" style="width: 260px;" @keyup.enter.native="PresentsToSell"></el-input>
			<el-button type="primary" icon="el-icon-search" size="small" @click="PresentsToSell">搜索</el-button>
  			<el-button type="primary" size="small"  
  				@click.native.prevent="editGift('2','')"><i class="el-icon-plus"></i>
		 		<span style="padding-right: 5px;">添加预告</span>
		 	</el-button>
		</div>
		<div class="table">
		    <el-table :data="tableData.Details" :height="$bus.clientHeight - 233" 
		    	style="width: 100%;" v-loading="isLoading" >
		      <el-table-column label="礼品" min-width="210" align="left" header-align="center" class-name="tdImgWrap">
			    <template slot-scope="scope" >
			    	<img :src="scope.row.DefaultImage" />
			        <span style="margin-left: 10px" type="text" 
					        	@click="previewGift(scope.row)">{{ scope.row.Name }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="礼品类型" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.IsFree | formatIsFree }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="已领取/数量" min-width="100" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span v-if="scope.row.IsAxpToken">{{ scope.row.UsedAmount }}/{{ scope.row.AxpTokenGrossAmount }}</span>
			        <span v-if="scope.row.IsExpress">{{ scope.row.UsedAmount }}/{{ scope.row.ExpressGrossAmount }}</span>
			        <span v-if="scope.row.IsXcx">{{ scope.row.UsedAmount }}/{{ scope.row.XcxGrossAmount }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="抢购条件" min-width="100" align="center" header-align="center">
		      	<template slot-scope="scope">
		        	 <div v-if="scope.row.IsAxpToken">{{ scope.row.TokenRequired }}AXP</div>
		        	 <div v-if="scope.row.IsExpress">{{ scope.row.ExpressRequired }}元邮费</div>
		        	 <div v-if="scope.row.IsXcx">小程序兑换</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="抢购时间" min-width="200" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>开始：{{ scope.row.StartDate }}</div>
			        <div>结束：{{ scope.row.EndDate }}</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="价格" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>单价：{{ scope.row.CurrentPrice }}元</div>
			        <div>合计：{{ scope.row.TotalPrice }}元</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="礼品来源" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{ scope.row.SourceChannel }}</div>
			        <a class="mainColor" :href="scope.row.SourceUrl" target="_blank">点击跳转至{{ scope.row.SourceChannel }}</a>
			    </template>
		      </el-table-column>
		      <el-table-column label="状态" min-width="80" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div :style="{'color': scope.row.IsChecked=='0' ? '#f00' : '#2cb00b'}">{{ scope.row.IsChecked | formatStatus}}</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="操作" min-width="180" align="center" header-align="center" fixed="right">
		      	<template slot-scope="scope">
		      		<el-button v-if="scope.row.IsChecked == '0'" @click.native.prevent="confirm(scope.row)" type="text">确认发布</el-button>
		      		<el-button v-if="scope.row.IsChecked == '1'" @click.native.prevent="cancel(scope.row)" type="text">取消发布</el-button>
			        <el-button @click.native.prevent="editGift('1',scope.row)" type="text" >修改</el-button>
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
	import { presentList,checkPresent ,unCheckPresent,deletePresent } from '@/api/gift'
	export default {
		props: {
		    
		},
		
		data () {
		 	return {
		 		searchValue: '',
		 		isLoading: false,
		 		tableData: {},
		 		currentPage: 1,
		 		pageSize: 10,
		 		type: "0",   //礼品类型
		 		//query: "2018-11-22",   //礼品日期
		 	}
		 	
		 },
		 computed: {
			query(){
				let newDate = new Date();
				newDate.setTime(newDate.getTime()+24*60*60*1000);
				return newDate.getFullYear()+"-" + this.formatNum(newDate.getMonth()+1) + "-" + this.formatNum(newDate.getDate());
			}
		},
		filters: {
			formatStatus(val){
				if(val == "0"){
					return "未审核"
				}else if(val == "1"){
					return "已审核"
				}
				
			},
			formatIsFree(val){
				if(val){
					return "免费礼物"
				}else{
					return "限时抢购礼物"
				}
			}
		},
		 
		 created(){
		 	this.PresentsToSell();
		 },
		 
		 methods: {
		 	//月份和date补0
		    formatNum(s) {
		        return s < 10 ? '0' + s: s;
		    },
		 	handleSizeChange(val) {
				this.pageSize = val;
				this.PresentsToSell();
		        //console.log(`每页 ${val} 条`);
		    },
		    
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.PresentsToSell();
		       // console.log(`当前页: ${val}`);
		    },
			
		 	/*明日礼品列表*/
			PresentsToSell(){
				this.isLoading = true;
				let params = {
				        "PageSize": this.pageSize,
				        "Page": this.currentPage,
				        "Type": this.type,
        				"Query": this.query,
        				"KeyWord": this.searchValue
				    }
		       	const that = this;
		       	presentList(params).then(res => {
	       			that.isLoading = false;
	       			that.tableData = res.Data;
			    }).catch(error => {
			    	that.isLoading = false;
		          //console.log(error)
		        })
		       	
			},
		 	
		 	
		 	/*确定明日礼品*/
		 	confirm (row) {
		 		let that = this;
		 		const loading = this.$loading({
		          lock: true,
		          text: 'Loading',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		 		checkPresent(row.Id).then(res => {
		 			row.IsChecked = "1";
		 			loading.close();
	       			//that.PresentsToSell(); //重新加载表格
	            	that.$message({
	            	 showClose: true,
	                  message: "发布成功",
	                  type: 'success'
	                });
			    }).catch(error => {
		          //console.log(error)
		        })
		 		
		 	},
		 	
		 	/*确定取消明日礼品*/
		 	cancel (row) {
		 		let that = this;
		 		const loading = this.$loading({
		          lock: true,
		          text: 'Loading',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
		        });
		 		unCheckPresent(row.Id).then(res => {
		 			loading.close();
		 			row.IsChecked = "0";
	       			//that.PresentsToSell(); //重新加载表格
	            	that.$message({
	            	   showClose: true,
	                   message: "取消发布成功",
	                   type: 'success'
	                });
			    })
		 		
		 	},
		 	
		 	/*预览*/
		 	previewGift (val) {
		 		this.$emit('giftDetail',val);
		 	},
		 	
		 	/*修改、添加*/
		 	editGift (type,val) {
		 		this.$emit('editDetail',type,val);
		 	},
		 	
		 	
		 	/*确定删除礼品？*/
		 	deleteRow (val) {
		 		this.$confirm('此操作将删除礼品, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	
		        	this.deleteGift(val);
		        	
		        }).catch(() => {
		          /*this.$message({
		          	showClose: true,
		            type: 'info',
		            message: '已取消删除'
		          }); */         
		        });
		 	},
		 	
		 	/*删除礼品*/
		 	deleteGift(id){
		 		let that = this;
		 		deletePresent(id).then(res => {
	       			that.PresentsToSell(); //重新加载表格
	            	that.$message({
	            	  showClose: true,
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