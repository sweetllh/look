<template>
	<div>
  		<div>
  			<el-select v-model="type" placeholder="请选择礼品类别" size="small" 
  				@change="bygonePrents" style="margin-right: 15px;">
			    <el-option v-for="item in $bus.presentTypes" :key="item.value" 
			    	:label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input size="small" placeholder="请搜索输入礼品名称" prefix-icon="el-icon-search" 
				v-model="searchValue" style="width: 260px; " @keyup.enter.native="bygonePrents"></el-input>
			<el-button type="primary" icon="el-icon-search" size="small" @click="bygonePrents">搜索</el-button>
		</div>
		<div class="table">
		    <el-table ref="multipleTable"  :data="tableData.Details" :height="$bus.clientHeight - 233" style="width: 100%;" 
		    	v-loading="isLoading" tooltip-effect="dark" @selection-change="handleSelectionChange" 
		    	:summary-method="getSummaries"  show-summary>
		      <el-table-column type="selection" width="60"></el-table-column>
		      <el-table-column label="礼品" min-width="180" align="left" header-align="center" class-name="tdImgWrap">
			    <template slot-scope="scope" >
			    	<img :src="scope.row.DefaultImage" />
			        <span style="margin-left: 10px" type="text" 
					        	@click="previewGift(scope.row)">{{ scope.row.Name }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="礼品类型" min-width="100" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.IsFree | formatIsFree }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="已领取/数量" min-width="120" align="center" header-align="center">
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
		      <el-table-column label="礼品来源" min-width="160" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{ scope.row.SourceChannel }}</div>
			        <a class="mainColor" :href="scope.row.SourceUrl" target="_blank">点击跳转至{{ scope.row.SourceChannel }}</a>
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
	import { presentsHistory } from '@/api/gift'
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
		 		query: "2018-11-22",   //礼品日期
		 		multipleSelection: [],
		 	}
		 	
		 },
		 filters: {
			formatIsFree(val){
				if(val){
					return "免费礼物"
				}else{
					return "限时抢购礼物"
				}
			}
		},
		 created(){
			this.bygonePrents();
			
		 },
		 methods: {
		 	/*全选*/
		 	handleSelectionChange(val) {
		 		//console.log(val)
		        this.multipleSelection = val;
		   },
		   
		 	handleSizeChange(val) {
				this.pageSize = val;
				this.bygonePrents();
		        //console.log(`每页 ${val} 条`);
		    },
		    
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.bygonePrents();
		       // console.log(`当前页: ${val}`);
		    },
			
		 	/*往日礼品列表*/
			bygonePrents(){
				this.isLoading = true;
				let params = {
				        "PageSize": this.pageSize,
				        "Page": this.currentPage,
				        "Type": this.type,
				        "KeyWord": this.searchValue
				    }
		       	const that = this;
		       	presentsHistory(params).then(res => {
	       			that.isLoading = false;
	       			that.tableData = res.Data;
			    }).catch(error => {
			    	that.isLoading = false;
		          //console.log(error)
		        })
		       	
			},
		 	/*预览*/
		 	previewGift (val) {
		 		this.$emit('giftDetail',val);
		 	},
		 	
		 	sum(values){
		 		if (!values.every(value => isNaN(value))){
		 			const sums = values.reduce((prev, curr) => {
		              const value = Number(curr);
		              if (!isNaN(value)) {
		                return prev + curr;
		              } else {
		                return prev;
		              }
		            }, 0);
		            //console.log(sums)
		            return sums;
		 		}
		 	},
		 	
		 	/*合计*/
		 	getSummaries(param) {
		        const { columns, data } = param;
		        const sums = [];
		        const that = this;
		        columns.forEach((column, index) => {
		          if (index === 0) {
		            sums[index] = '合计';
		            return;
		          }else if(index === 2){
		          		if(this.multipleSelection.length > 0){
		          			const UsedAmounts = this.multipleSelection.map(item => Number(item.UsedAmount));   //已领取数量集合
		          			const GrossAmounts = this.multipleSelection.map(item => Number(item.GrossAmount)); //总数量集合
		          			const UsedAmountSum = that.sum(UsedAmounts);
		          			const GrossAmountSum = that.sum(GrossAmounts);
		          			sums[index] =  UsedAmountSum + '/' + GrossAmountSum;
		          		}
		          }else if(index === 5){
		          		if(this.multipleSelection.length > 0){
		          			const CurrentPrices = this.multipleSelection.map(item => Number(item.CurrentPrice));   //已领取数量集合
		          			const TotalPrices = this.multipleSelection.map(item => Number(item.TotalPrice)); //总数量集合
		          			const CurrentPriceSum = that.sum(CurrentPrices);
		          			const TotalPriceSum = that.sum(TotalPrices);
		          			sums[index] =  CurrentPriceSum + '/' + TotalPriceSum + " 元";
		          		}
		          }else {
		            sums[index] = '';
		          }
		          
		        });
		
		        return sums;
		      },
		      
		      
		 	
		 }
	}
</script>

<style scoped lang="scss">
	
</style>