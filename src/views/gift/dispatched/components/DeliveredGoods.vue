<template>
	<!--已发货列表-->
	<div>
		<div>
			<el-select v-model="giftValue" placeholder="请选择礼品分类" size="small">
			    <el-option v-for="item in $bus.typeOptions" :key="item.value" 
			    	:label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		<div class="table">
		    <el-table :data="tableData.Details" :height="$bus.clientHeight - 233" style="width: 100%;" v-loading="isLoading">
		      <el-table-column label="礼品" min-width="180" class-name="tdImgWrap">
			    <template slot-scope="scope" >
			    	<img :src="scope.row.Image" />
			        <span style="margin-left: 10px" type="text" 
					        	@click="previewGift(scope.row.Id)">{{ scope.row.Name }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="订单编号" min-width="180" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.SourceNumber}}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="时间" min-width="180" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.Date}}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="用户" min-width="150" header-align="center" class-name="tdImgWrap2">
		      	<template slot-scope="scope">
			        <img :src="scope.row.UserHeadPortrait || require('../../../../assets/avatar.png')"   
			        	style="border-radius: 50%;" alt="" width="40"/>
			        <span>{{scope.row.UserName }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="下单地址" min-width="220" align="center" header-align="center" class-name="Address">
		      	<template slot-scope="scope">
			        <div>{{scope.row.AddressName}}&nbsp;&nbsp;{{scope.row.AddressMobil}}</div>
			        <div>{{scope.row.AddressRegion}}&nbsp;&nbsp;{{scope.row.AddressDetail}}</div>
			    </template>
		      </el-table-column>
		      <el-table-column  label="物流信息" width="180" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{scope.row.ExpressCompany}}</div>
			        <div>{{scope.row.ExpressNumber}}</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="礼品来源" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{ scope.row.SourceChannel }}</div>
			        <a class="mainColor" :href="scope.row.SourceUrl" target="_blank">点击跳转至{{ scope.row.SourceChannel }}</a>
			    </template>
		      </el-table-column>
		      <el-table-column label="操作" min-width="160" align="center" header-align="center" fixed="right">
		      	<template slot-scope="scope">
			        <el-button  type="primary" size="small"
			        	@click="operateGoods(scope.row)">修改物流信息</el-button>
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
	import {completedOrders,completedOrderDetail} from '@/api/gift'
	export default {
		name: "DeliveredGoods",
		data () {
		 	return {
		 		tableData: {},
		 		currentPage: 1,
		 		pageSize: 10,
		 		isLoading: false,
		 		giftValue: '',
		 	}
		 	
		 },
		 created(){
		 	this.queryDelivered();
		 },
		 methods: {
		 	handleSizeChange(val) {
				this.pageSize = val;
				this.queryDelivered();
		        //console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.queryDelivered();
		       // console.log(`当前页: ${val}`);
		    },
		 	
		 	/*已发货列表*/
		 	queryDelivered(){
		 		this.isLoading = true;
				let params = {
				        "PageSize": this.pageSize,
				        "Page": this.currentPage,
				    }
		       	const that = this;
		       	completedOrders(params).then(res => {
	       			that.isLoading = false;
	       			that.tableData = res.Data;
			    }).catch(error => {
			    	that.isLoading = false;
		          //console.log(error)
		        })
		 	},
		 	
		 	/*预览*/
		 	previewGift (id) {
		 		completedOrderDetail(id).then(res => {
		 			this.$emit('giftDetail',res.Data);
		 		}).then(error => {
		 			
		 		})
		 		
		 	},
		 	operateGoods(val){
		 		this.$emit('isModifyLogistics',val);
		 	}
		 	
		 	
		 }
	}
</script>

<style scoped lang="scss">
	
</style>