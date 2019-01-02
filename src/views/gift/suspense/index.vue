<template>
	<div>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待下单列表" name="first">
            	<pending-order ref="pendingOrder" @isPlaceOrder="isPlaceOrder" @giftDetail="showDetail"></pending-order>
            </el-tab-pane>
            <el-tab-pane label="待发货列表" name="second">
            	<keep-alive>
            		<pending-delivery ref="pendingDelivery" v-if="activeName=='second'"  @isDeliverGoods="isDeliverGoods" 
            			@giftDetail="showDetail"></pending-delivery>
            	</keep-alive>
            	
            </el-tab-pane>
				
          </el-tabs>
        </template>
        <!--预览礼品-->
        <preview-gift :isPreview="dialogPreviewVisible" :formData="formData" @closeDetail="closeGiftDedail"></preview-gift>
        
        	
        <!--发货弹窗--> <!--下单弹窗-->
        <el-dialog title="" :visible.sync="isDialogVisible" width="620px" 
        	@close="$refs['placeOrder'].resetFields()">
		  <el-form :model="formInfo" label-width="95px" :rules="rules" size="small" class="placeOrder" ref="placeOrder">
		    <el-form-item label="礼品名称：" class="giftName">
		      <span>{{formInfo.Name}}</span>
		      <img :src="formInfo.Image"/>
		    </el-form-item>
		    <el-form-item label="礼品来源：">
		      <div class="inlineCont">
		    	<div>{{formInfo.SourceChannel}}</div>
		    	<div><a :href="formInfo.SourceUrl">{{formInfo.SourceUrl}}</a></div>
		      </div>
		    </el-form-item>
		    <el-form-item label="发货地址：" >
		    	<div class="address">
		    		<div class="addressDetail">
				    	<div>{{formInfo.AddressName}}&nbsp;&nbsp;{{formInfo.AddressMobil}}</div>
				    	<div>{{formInfo.AddressRegion}}&nbsp;&nbsp;{{formInfo.AddressDetail}}</div>
				    </div>
				    <div>
				    	<el-button size="small" type="primary" style="width: 80px;"
				    		v-clipboard:copy="message"
						　　v-clipboard:success="onCopy"
						　　v-clipboard:error="onError">复制</el-button>
				    </div>
		    	</div>
		    </el-form-item>
		    <el-form-item v-if="oderType=='1'" label="订单编号：" prop="SourceNumber" >
		       <el-input v-model="formInfo.SourceNumber"  ></el-input>
		    </el-form-item>
		    <el-form-item label="订单编号：" v-if="oderType=='2'">
		       <span>{{formInfo.SourceNumber}}</span>
		    </el-form-item>
		    <el-form-item label="快递公司：" v-if="oderType=='2'" prop="ExpressCompanyId" >
		    	<!--<el-input v-model="formInfo.ExpressCompanyId"  ></el-input>-->
		       <el-select v-model="formInfo.ExpressCompanyId" placeholder="请选择快递公司" size="small">
				    <el-option v-for="item in $bus.LogisticsCompanys" :key="item.Id" 
				    	:label="item.Name" :value="item.Id"></el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="快递单号：" v-if="oderType=='2'" prop="ExpressNumber" >
		       <el-input v-model="formInfo.ExpressNumber"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" style="text-align: center;">
		    <el-button type="primary" v-if="oderType=='1'"   @click="preOrder(formInfo.Id)" size="medium" style="width: 120px;"
		    	:loading="loading">确定下单</el-button>
		    <el-button type="primary" v-if="oderType=='2'"  @click="toDeliveryOrder(formInfo.Id)" size="medium" style="width: 120px;"
		    	:loading="loading">确定发货</el-button>
		  </div>
		</el-dialog>
        
    </div>
</template>

<script>
	import PendingOrder from "./components/PendingOrder" //待下单列表
	import PendingDelivery from "./components/PendingDelivery" //待发货列表
	import PreviewGift from "../../../components/gift/PreviewGift" //预览礼品
	import {preOrderCheck,preOrderDetail,toDeliveryOrderCheck} from '@/api/gift'  //去下单，去发货，详情
	import { validateNumber1,validateNumber2 } from '@/utils/validate'
	export default {
		components: {
			PendingOrder,
			PendingDelivery,
			//GoodsList,
			PreviewGift,
		},
		data () {
			return {
				loading: false,
				activeName: 'first',
				dialogPreviewVisible: false, //预览弹窗
				formData: {},
				formInfo: {},    //下单信息 发货信息
				isDialogVisible: false,
				oderType: null,
				rules: {
					SourceNumber: [
			            { validator: validateNumber2, trigger: 'change' },
			        ],
			        ExpressNumber: [
			            { validator: validateNumber1, trigger: 'change' },
			        ],
			        ExpressCompanyId: [
			            { required: true, message: '请选择快递公司', trigger: 'change' }
			        ]
				}
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
			handleClick(tab, event) {
	            //console.log(tab, event);
	        },
	        /* 预览*/
	        showDetail(id) {
	        	this.dialogPreviewVisible = true;
	        	preOrderDetail(id).then(res => {
	        		this.formData = res.Data;
		 			this.$emit('giftDetail',res.Data);
		 		}).catch(error => {
		 			
		 		})
	        },
	        
	         /*关闭预览*/
	        closeGiftDedail() {
	        	this.dialogPreviewVisible = false;
	        },
	        
	        /*去下单*/
	        isPlaceOrder(val) {
	        	this.isDialogVisible = true;
	        	this.oderType = "1";
	        	this.formInfo = Object.assign({}, val) ;
	        	//console.log("去下单",val)
	        },
	        //确定下单
	        preOrder(id){
	        	this.$refs["placeOrder"].validate((valid) => {
	        		if (valid) {
			            const that = this;
			        	const params = {
			        		"Id": id,
			        		"Number": that.formInfo.SourceNumber
			        	}
			        	that.loading = true;
			        	preOrderCheck(params).then(res => {
			        		that.isDialogVisible = false;
			        		that.loading = false;
			        		that.$message({
			            	  showClose: true,
			                  message: "下单成功，请发货",
			                  type: 'success',
			                  duration: 3*1000
				            });
				            that.$refs.pendingOrder.queryPendingOrder();//重新加载表格
			        	}).catch(error => {
			        		that.loading = false;
			        	})
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
	        	})
	        	
	        	
	        	
	        },
	        /*去发货*/
	        isDeliverGoods(val) {
	        	this.isDialogVisible = true;
	        	this.oderType = "2";
	        	this.formInfo = Object.assign({}, val);
	        	//console.log("去发货")
	        },
	        /*确定发货*/
	        toDeliveryOrder(id){
	        	this.$refs["placeOrder"].validate((valid) => {
	        		if (valid) {
			            const that = this;
			        	const params = {
			        		"Id": id,
			        		"ExpressNumber": that.formInfo.ExpressNumber,
			        		"ExpressCompanyId": that.formInfo.ExpressCompanyId
			        	};
			        	that.loading = true;
			        	toDeliveryOrderCheck(params).then(res => {
			        		that.isDialogVisible = false;
			        		that.loading = false;
			        		that.$message({
			            	  showClose: true,
			                  message: "发货成功",
			                  type: 'success',
			                  duration: 5*1000
				            });
				            that.$refs.pendingDelivery.queryPendingDelivery();//重新加载表格
			        	}).catch(error => {
			        		that.loading = false;
			        	})
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
	        	})
	        	
	        },
	       
	        onCopy(e) {
	        	//console.log(e.text)
	        	this.$message({
	        	  showClose: true,
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

<style scoped lang="scss">
	.el-tabs__item{
		padding: 0 40px;
	}
	/*弹窗*/
	.placeOrder .el-input{
		width: 60%;
	}
	.giftName {
		position: relative;
		height: 60px;
		margin-top: 20px;
	}
	.giftName img{
		position: absolute;
		top: -100%;
		height: 100px;
	}
	.giftName span{
		margin-right: 50px;
	}
	.inlineCont{
		width: 100%;
		line-height: 32px;
		background: #F2F2F2;
		padding: 10px;
		box-sizing: border-box;
		word-break: break-all;
	}
	.address{
		display: flex;
		justify-content: space-between;
	}
	.addressDetail > div:nth-child(2){
		line-height: 16px;
	}
</style>