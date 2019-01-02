<template>
	<div>
		<el-dialog title="" :visible.sync="isDialogVisible" width="620px" 
        	@close="close">
		  <el-form :model="formData" label-width="95px" size="small" class="placeOrder" ref="placeOrder">
		    <el-form-item label="礼品名称：" class="giftName">
		      <span>{{formData.Name}}</span>
		      <img :src="formData.Image"/>
		    </el-form-item>
		    <el-form-item label="礼品来源：">
		      <div class="inlineCont">
		    	<div>{{formData.SourceChannel}}</div>
		    	<div><a :href="formData.SourceUrl">{{formData.SourceUrl}}</a></div>
		      </div>
		    </el-form-item>
		    <el-form-item label="发货地址：" >
		    	<div class="address">
		    		<div class="addressDetail">
				    	<div>{{formData.AddressName}}&nbsp;&nbsp;{{formData.AddressMobil}}</div>
				    	<div>{{formData.AddressRegion}}&nbsp;&nbsp;{{formData.AddressDetail}}</div>
				    </div>
				    <div>
				    	<el-button size="small" type="primary" style="width: 80px;"
				    		v-clipboard:copy="message"
						　　v-clipboard:success="onCopy"
						　　v-clipboard:error="onError">复制</el-button>
				    </div>
		    	</div>
		    </el-form-item>
		    <el-form-item label="订单编号："  v-if="type == '1'" prop="orderNumber" :rules="[ { required: true, message: '订单编号不能为空'},
      								{ type: 'number', message: '订单编号必须为数字值',trigger: ['change','blur']} ]">
		       <el-input v-model.number="formData.orderNumber"></el-input>
		    </el-form-item>
		    <el-form-item label="订单编号：" v-if="type != '1'">
		       <span>{{formData.SourceNumber}}</span>
		    </el-form-item>
		    <el-form-item label="快递公司："  v-if="type != '1'" prop="ExpressCompany" :rules="[ { required: true, message: '请选择快递公司'}]">
		       <el-select v-model="formData.ExpressCompany" placeholder="请选择快递公司" size="small">
				    <el-option v-for="item in $bus.LogisticsCompanys" :key="item.value" 
				    	:label="item.label" :value="item.value"></el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="快递单号："  v-if="type != '1'" prop="ExpressNumber" :rules="[ { required: true, message: '快递单号不能为空'},
      								{ type: 'number', message: '快递单号必须为数字值',trigger: ['change','blur']} ]">
		       <el-input v-model.number="formData.ExpressNumber"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" style="text-align: center;">
		    <el-button type="primary" @click="operate(formData.Id)" size="medium" style="width: 120px;"
		    	:loading="isLoading">确定下单</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		props: {
			type: {
				type: 	String,
		      	default: ""
			},
		    formData: {
		    	type: Object,
				default: null
		    },
		    isLoading: {
		    	type: Boolean,
		    	default: false
		    },
		    isDialogVisible: {
		    	type: Boolean,
		    	default: false
		    }
		 },
		 data(){
		 	return {
		 		formInfo: Object.assign({}, this.formData)
		 	}
		 },
		 computed: {
			message(){
				if(this.formInfo){
					return this.formInfo.AddressName + " " + this.formInfo.AddressMobil 
					+ "  "+this.formInfo.AddressRegion + this.formInfo.AddressDetail;
				}
			}
		},
		methods: {
			operate(id){
				this.$emit('operateGoods',id);
			},
			close(){
				this.$emit('closeDialog');
				this.$refs['placeOrder'].resetFields();
			},
			onCopy(e) {
	        	//console.log(e.text)
	        	this.$message({
	        		showClose: true
		          message: '复制成功' + e.text,
		          type: 'success'
		        });
		    },
		    onError(e) {
		      this.$message.error('复制失败');
		    }
		}
	}
</script>

<style>
</style>