<template>
	<div>
		<template>
		    <el-table :data="tableData" style="width: 100%;min-height: 300px;" v-loading="isLoading">
		      <el-table-column label="礼品" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <el-popover trigger="hover" placement="top">
			          <p>{{ scope.row.gift }}</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag size="medium">
			            	<i class="el-icon-time"></i>
					        <el-button style="margin-left: 10px" type="text" 
					        	@click="previewGift(scope.row)">{{ scope.row.gift }}</el-button>
			            </el-tag>
			          </div>
			        </el-popover>
			    </template>
		      </el-table-column>
		      <el-table-column label="时间" min-width="140" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.time.start }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="用户" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <img src="../../assets/avatar.png" alt="" width="40"/>
			        <span>{{scope.row.user}}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="下单地址" min-width="260" align="center" header-align="center" class-name="Address">
		      	<template slot-scope="scope">
			        <el-popover trigger="hover" placement="top">
			           <p>{{scope.row.consignee}}</p>
			           <p>{{scope.row.address}}</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag size="medium">
			            	<div>{{scope.row.consignee}}</div>
			        		<div>{{scope.row.address}}</div>
			            </el-tag>
			          </div>
			        </el-popover>
			    </template>
		      </el-table-column>
		      <el-table-column v-if="type=='3'" label="物流信息" width="180" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{scope.row.expressCcompany}}</div>
			        <div>{{scope.row.courierNumber}}</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="礼品来源" min-width="120" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <div>{{ scope.row.source.name }}</div>
			        <a class="mainColor" :href="scope.row.source.url" target="_blank">点击跳转至{{ scope.row.source.name }}</a>
			    </template>
		      </el-table-column>
		      <el-table-column label="操作" min-width="160" align="center" header-align="center">
		      	<template slot-scope="scope">
			        <el-button v-if="type=='1'" type="primary" size="small"
			        	@click="operateGoods(scope.row)">去下单</el-button>
			        <el-button v-if="type=='2'" type="primary" size="small"
			        	@click="operateGoods(scope.row)">去发货</el-button>
			        <el-button v-if="type=='3'" type="primary" size="small"
			        	@click="operateGoods(scope.row)">修改物流信息</el-button>
			    </template>
		      </el-table-column>
		    </el-table>
		 </template>
		
		
  	</div>
</template>

<script>
	export default {
		name: "GoodsList",
		props: {
			type: {
				type: 	String,
		      	default: ""
			},
		    tableData: {
		    	type: 	Array,
		      	default: []
		    },
		    isLoading: {
		    	type: Boolean,
		    	default: false
		    }
		 },
		watch: {
		    
		},
		data () {
		 	return {
		 		
		 	}
		 	
		 },
		 methods: {
		 	/*预览*/
		 	previewGift (val) {
		 		this.$emit('giftDetail',val);
		 	},
		 	/*操作*/
		 	operateGoods(val){
		 		if(this.type == "1"){
		 			this.$emit('isPlaceOrder',val);
		 		}else if(this.type == "2"){
		 			this.$emit('isDeliverGoods',val);
		 		}else if(this.type == "3"){
		 			this.$emit('isModifyLogistics',val);
		 		}
		 	}
		 	
		 	
		 }
	}
</script>

<style scoped lang="scss">
	
</style>