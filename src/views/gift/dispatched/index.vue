<template>
	<div :style="{'min-height': ($bus.clientHeight - 80)+'px'}">
		<!--已发货列表-->
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="已发货列表" name="first">
            	<delivered-goods ref="deliveredGoods"   @isModifyLogistics="isModifyLogistics" @giftDetail="showDetail"></delivered-goods>
            </el-tab-pane>
          </el-tabs>
        </template>
        <!--预览礼品-->
        <preview-gift :isPreview="dialogPreviewVisible" :formData="formData" @closeDetail="closeGiftDedail"></preview-gift>
        
        <!--修改物流弹窗-->
        <el-dialog title="" :visible.sync="isEditVisible" width="620px">
		  <el-form :model="LogisticsInfo" label-width="95px" :rules="rules" size="small"  ref="Logistics" 
		  	class="logistics"  @close="$refs['Logistics'].resetFields()">
		    <el-form-item label="礼品名称：" class="giftName">
		      <span>{{LogisticsInfo.Name}}</span>
		      <img :src="LogisticsInfo.Image"/>
		    </el-form-item>
		    <el-form-item label="礼品来源：">
		       <div class="inlineCont">
		      	<div>{{LogisticsInfo.SourceChannel}}</div>
		    	<div><a :href="LogisticsInfo.SourceUrl">{{LogisticsInfo.SourceUrl}}</a></div>
		      </div>
		    </el-form-item>
		    <el-form-item label="发货地址：" >
		    	<div class="address">
		    		<div class="addressDetail">
		    			<div>{{LogisticsInfo.AddressName}}&nbsp;&nbsp;{{LogisticsInfo.AddressMobil}}</div>
				    	<div>{{LogisticsInfo.AddressRegion}}&nbsp;&nbsp;{{LogisticsInfo.AddressDetail}}</div>
				    </div>
				    <div>
				    	<el-button size="small" type="primary" style="width: 80px;"
				    		v-clipboard:copy="message"
						　　v-clipboard:success="onCopy"
						　　v-clipboard:error="onError">复制</el-button>
				    </div>
		    	</div>
		    </el-form-item>
		    <el-form-item label="订单编号：">
		       <span>{{LogisticsInfo.SourceNumber}}</span>
		    </el-form-item>
		    <el-form-item label="快递公司：" prop="ExpressCompanyId" >
		    	<!--<el-input v-model="LogisticsInfo.ExpressCompany"  ></el-input>-->
		       <el-select v-model="LogisticsInfo.ExpressCompanyId" placeholder="请选择快递公司" size="small">
				    <el-option v-for="item in $bus.LogisticsCompanys" :key="item.Id" 
				    	:label="item.Name" :value="item.Id"></el-option>
				</el-select>
		    </el-form-item>
		    <el-form-item label="快递单号：" prop="ExpressNumber">
		       <el-input v-model="LogisticsInfo.ExpressNumber"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" style="text-align: center;">
		    <el-button type="primary" @click="modifyLogistics(LogisticsInfo.Id)" size="medium" style="width: 120px;"
		    	:loading="loading">修改物流</el-button>
		  </div>
		</el-dialog>
		
    </div>
</template>

<script>
	import DeliveredGoods from "./components/DeliveredGoods"     //已发货列表
	import PreviewGift from "../../../components/gift/PreviewGift" //预览礼品
	import {completedOrderModify} from '@/api/gift'
	import { validateNumber1,validateNumber2 } from '@/utils/validate'
	export default {
		components: {
			//GoodsList,
			DeliveredGoods,
			PreviewGift,
		},
		data () {
			return {
				loading: false,
				activeName: 'first',
				dialogPreviewVisible: false, //预览弹窗
				isEditVisible: false, //修改物流
				formData: {},
				LogisticsInfo: {},  //物流信息
				rules: {
					SourceNumber: [
			            { validator: validateNumber2, trigger: 'change' },
			        ],
			        ExpressCompanyId: [
			            { validator: validateNumber1, trigger: 'change' },
			        ],
			        ExpressCompany: [
			            { required: true, message: '请选择快递公司', trigger: 'change' }
			        ]
				}
			}
			
		},
		computed: {
			message(){
				if(this.LogisticsInfo){
					return this.LogisticsInfo.AddressName + " " + this.LogisticsInfo.AddressMobil 
					+ "  "+this.LogisticsInfo.AddressRegion + this.LogisticsInfo.AddressDetail;
				}
			}
		},
		methods: {
			handleClick(tab, event) {
	            //console.log(tab, event);
	        },
	        
	        /* 预览*/
	        showDetail(val) {
	        	this.dialogPreviewVisible = true;
	        	this.formData = val;
	        	console.log("预览",val)
	        },
	        
	         /*关闭预览*/
	        closeGiftDedail() {
	        	this.dialogPreviewVisible = false;
	        },
	        
	        /*修改物流*/
	        isModifyLogistics(val){
	        	//console.log(val)
	        	val.ExpressNumber = Number(val.ExpressNumber);
	        	this.LogisticsInfo = Object.assign({}, val) ;
	        	this.isEditVisible = true;
	        },
	        modifyLogistics(id) {
	        	//console.log("修改物流")
	        	this.$refs["Logistics"].validate((valid) => {  
	        		if (valid) {
			            const that = this;
			        	const params = {
			        		"Id": id,
			        		"ExpressNumber":  that.LogisticsInfo.ExpressNumber,
        					"ExpressCompanyId": that.LogisticsInfo.ExpressCompanyId,
			        	}
			        	that.loading = true;
			        	completedOrderModify(params).then(res => {
			        		that.isEditVisible = false;
			        		that.loading = false;
			        		that.$message({
			            	  showClose: true,
			                  message: "修改物流成功",
			                  type: 'success',
			                  duration: 3*1000
				            });
				            that.$refs.deliveredGoods.queryDelivered();//重新加载表格
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
	.logistics .el-input{
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