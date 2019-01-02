<template>
	<!--待下单列表-->
	<div>
		<div>
			<el-select v-model="giftValue" placeholder="请选择礼品分类" size="small">
			    <el-option v-for="item in $bus.typeOptions" :key="item.value" 
			    	:label="item.label" :value="item.value"></el-option>
			</el-select>
		</div>
		<div class="table">
		    <el-table :data="tableData.Details" :height="$bus.clientHeight - 233" style="width: 100%;" v-loading="isLoading">
		      <el-table-column label="礼品" min-width="200" class-name="tdImgWrap">
			    <!--<template slot-scope="scope">
			        <el-popover trigger="hover" placement="top">
			          <p>{{ scope.row.Name }}</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag size="medium">
			            	<i class="el-icon-time"></i>
					        <el-button style="margin-left: 10px" type="text" 
					        	@click="previewGift(scope.row)">{{ scope.row.Name }}</el-button>
			            </el-tag>
			          </div>
			        </el-popover>
			    </template>-->
			    <template slot-scope="scope" >
			    	<img :src="scope.row.Image" />
			        <span style="margin-left: 10px" type="text" 
					        	@click="previewGift(scope.row.Id)">{{ scope.row.Name }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="抢购时间" min-width="190" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.Date }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="用户" min-width="120" header-align="center" class-name="tdImgWrap2">
		      	<template slot-scope="scope">
			        <img :src="scope.row.UserHeadPortrait || require('../../../../assets/avatar.png')"   
			        	style="border-radius: 50%;" alt="" width="40"/>
			        <span>{{scope.row.UserName }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="下单地址" min-width="200" align="center" header-align="center" class-name="Address">
		      	<!--<template slot-scope="scope">
			        <el-popover trigger="hover" placement="top">
			           <p>{{scope.row.AddressName}}&nbsp;{{scope.row.AddressMobil}}</p>
			           <p>{{scope.row.AddressRegion}}</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag size="medium">
			            	<div>{{scope.row.AddressName}}&nbsp;{{scope.row.AddressMobil}}</div>
			        		<div>{{scope.row.AddressRegion}}</div>
			            </el-tag>
			          </div>
			        </el-popover>
			    </template>-->
			    <template slot-scope="scope">
			        <div>{{scope.row.AddressName}}&nbsp;&nbsp;{{scope.row.AddressMobil}}</div>
			        <div>{{scope.row.AddressRegion}}&nbsp;&nbsp;{{scope.row.AddressDetail}}</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="礼品来源" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{ scope.row.SourceChannel }}</div>
			        <a class="mainColor" :href="scope.row.SourceUrl" target="_blank">点击跳转至{{ scope.row.SourceChannel }}</a>
			    </template>
		      </el-table-column>
		      <el-table-column label="操作" min-width="100" align="center" header-align="center" fixed="right">
		      	<template slot-scope="scope">
			        <el-button type="primary" size="small"
			        	@click="operateGoods(scope.row)">去下单</el-button>
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
	import {preOrders} from '@/api/gift'
	export default {
		name: "PendingOrder",
		props: {
			
		 },
		
		data () {
		 	return {
		 		tableData: {},
		 		currentPage: 1,
		 		pageSize: 10,
		 		isLoading: false,
		 		levelValue: '',
		 		giftValue: '',
		 	}
		 	
		 },
		 created(){
		 	this.queryPendingOrder();
		 },
		 methods: {
		 	handleSizeChange(val) {
				this.pageSize = val;
				this.queryPendingOrder();
		        //console.log(`每页 ${val} 条`);
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.queryPendingOrder();
		       // console.log(`当前页: ${val}`);
		    },
		 	
		 	/*待下单列表*/
		 	queryPendingOrder(){
		 		this.isLoading = true;
				let params = {
				        "PageSize": this.pageSize,
				        "Page": this.currentPage,
				    }
		       	const that = this;
		       	preOrders(params).then(res => {
		       		//console.log(res)
	       			that.isLoading = false;
	       			that.tableData = res.Data;
			    }).catch(error => {
			    	that.isLoading = false;
		          //console.log(error)
		        })
		 	},
		 	
		 	/*预览*/
		 	previewGift (id) {
		 		this.$emit('giftDetail',id);
		 	},
		 	operateGoods(val){
		 		this.$emit('isPlaceOrder',val);
		 	}
		 	
		 	
		 }
	}
</script>

<style scoped lang="scss">
	
</style>