<template>
	<el-dialog title="小票详情" :visible.sync="orEdit" @close="closeEdit" center width="800px">
	  <el-row :gutter="50">
	  	<el-form ref="form" :model="formObj" label-width="95px" size="small">
	  		<!--左侧-->
	  		<el-col :span="12" style="border-right: 1px solid #E5E5E5;border-top: 1px solid #E5E5E5; padding-top: 20px;padding-left: 20px !important;">
  				<el-form-item label="店铺名称：">
				    <el-input v-model="formObj.name"></el-input>
				</el-form-item>
				<el-form-item label="消费金额：">
				    <el-input type="number" v-model.number="formObj.money"></el-input>
				</el-form-item>
  				<el-form-item label="消费时间：">
				    <el-date-picker style="width: 100%;"
				      v-model="formObj.time"
				      type="datetime"
				      value-format="yyyy-MM-dd HH:mm:ss"
				      placeholder="请选择消费时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="店铺地址：">
				    <el-input type="textarea" :rows="3" v-model="formObj.address"></el-input>
				</el-form-item>
				<el-form-item label="小票原图：" class="giftImgs">
					<span>
						<p @click="previewImg(formObj.Image)">预览</p>
						<img :src="formObj.Image" />
					</span>
				</el-form-item>
	  		</el-col>
	  		<!--右侧-->
	  		<el-col :span="12" style="border-top: 1px solid #E5E5E5;padding-top: 20px;padding-left: 20px!important;">
  				<el-form-item label="权重：" >
  					<span class="w100">{{formObj.weight}}</span>
  					<el-input type="number" v-model.number="addWeightValue" style="width: 110px;"></el-input>
  					<el-button type="primary" @click="addWeight" 
				    	size="small">增加</el-button>
				</el-form-item>
				<el-form-item label="点赞：">
				    <span class="w100">7999</span>
  					<el-input type="number" v-model.number="formObj.weight" style="width: 110px;"></el-input>
  					<el-button type="primary" @click="" 
				    	size="small" >增加</el-button>
				</el-form-item>
	  			<el-form-item label="评论：">
				    <span class="w100">7999</span>
				    <router-link to="/ModifyReview/1" style="padding-right: 10px;">修改</router-link>
				</el-form-item>
				<el-form-item label="转发：" :rules="[{ type: 'number', message: '请填数字值'}]">
				    <span class="w100">7999</span>
  					<el-input type="number" v-model.number="formObj.weight" style="width: 110px;"></el-input>
  					<el-button type="primary" @click="" 
				    	size="small">增加</el-button>
				</el-form-item>
				<el-form-item label="上传时间：">
				    <el-date-picker style="width: 100%;"
				      v-model="formObj.time"
				      type="datetime"
				      value-format="yyyy-MM-dd HH:mm:ss"
				      placeholder="请选择消费时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="关键词组：">
				    <el-input v-model="formObj.weight"></el-input>
				</el-form-item>
	  		</el-col>
	  		<el-col :span="24" style="margin-top: 30px;text-align: center;margin-left: -45px;">
	  			<el-form-item>
				    <el-button type="primary" @click="onSumit" 
				    	size="medium" style="width: 120px;" :loading="editLoading">确定修改</el-button>
				</el-form-item>
	  		</el-col>
	  	</el-form>
	  	<el-dialog :visible.sync="isPreviewImg" size="tiny"  append-to-body>
		  <img width="100%" :src="previewImageUrl" alt="">
		</el-dialog>
		
	  </el-row>
	</el-dialog>
	
</template>

<script>
	export default{
		props: {
			isEdit: {
				type: Boolean,
				default: false
			},
			formData: {
				type: Object,
				default: null
			},
		},
		data () {
			return {
				orEdit: this.isEdit,
				formObj: this.formData,
				editLoading: false,
				isPreviewImg: false,
				previewImageUrl: "",
				addWeightValue: null,
			}
		},
		watch: {
		    isEdit (val) {
		        this.orEdit = val;
		    },
		    formData :{
		    	handler(newValue, oldValue){
		    		this.formObj = newValue;
		    	},
		    	deep: true
		    }
		    
		},
		methods: {
			closeEdit () {
				this.$emit('closeEdit');
				this.addWeightValue = null;
			},
			previewImg (url) {
				this.isPreviewImg = true;
				this.previewImageUrl = url;
			},
			onSumit(){
				console.log(this.formObj)
			},
			addWeight(){
				const value = parseInt(this.addWeightValue) + parseInt(this.formObj.weight);
				this.$set(this.formObj,"weight",value)
			}
		}
	}
</script>

<style scoped lang="scss">
	.giftImgs span{
		width: 70px;
		height: 70px;
		display: inline-block;
		vertical-align: top;
		position: relative;
		margin-right: 6px;
	}
	.giftImgs span p{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		line-height: 70px;
		margin: 0;
		text-align: center;
		color: #F2F2F2;
		background: rgba(0,0,0,0.5);
		transition: opacity .3s;
		opacity: 0;
		border-radius: 10px;
		cursor: pointer;
	}
	.giftImgs span:hover p{
		
		opacity: 1;
	}
	.giftImgs img{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.giftImgs .tip{
		width: 100%;
		text-align: center;
		position: relative;
		top: -12px;
		font-weight: normal;
	}
	.w100{
		min-width: 80px;
		display: inline-block;
	}
	
</style>