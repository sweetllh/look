<template>
	<el-dialog title="礼品预览" :visible.sync="orEdit" @close="closeEdit" center width="900px">
	  <el-row :gutter="50">
	  	<el-form ref="form" :model="formObj" label-width="95px" size="small">
	  		<!--左侧-->
	  		<el-col :span="12" style="border-right: 1px solid #E5E5E5;border-top: 1px solid #E5E5E5; padding-top: 20px;padding-left: 20px !important;">
  				<el-form-item label="礼品名称：">
				    <el-input v-model="formObj.name"></el-input>
				</el-form-item>
				<el-form-item label="礼品描述：">
				    <el-input type="textarea" :rows="6"  v-model="formObj.detail"></el-input>
				</el-form-item>
  				<el-form-item label="礼品数量：">
				    <el-input v-model="formObj.name" style="width: 70px;"></el-input>
				       件
				</el-form-item>
				<el-form-item label="礼品价格：">
				    <div class="inlineCont">
				    	<span>原价： <el-input v-model="formObj.originalPrice" style="width: 70px;"></el-input>
				    		元</span><span>售价： <el-input v-model="formObj.sellingPrice" style="width: 70px;"></el-input>
				    		元</span>
				    </div>
				</el-form-item>
				<el-form-item label="礼品图片：" class="giftImgs">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :file-list="fileList"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
	  		</el-col>
	  		<!--右侧-->
	  		<el-col :span="12" style="border-top: 1px solid #E5E5E5;padding-top: 20px;padding-left: 20px!important;">
  				<el-form-item label="抢购条件：">
				    <div class="inlineCont condition">
				    	<div><el-input v-model="formObj.axp" style="width: 70px;"></el-input>&nbsp;AXP</div>
				    	<div><el-input v-model="formObj.carNum" style="width: 70px;"></el-input>&nbsp;套卡片</div>
				    	<div>连续签&nbsp;<el-input v-model="formObj.days" style="width: 70px;"></el-input>&nbsp;天</div>
				    </div>
				</el-form-item>
				<el-form-item label="抢购时间：">
				    <div class="inlineCont">
				    	<div>开始时间：<span class="block">
							    <el-date-picker
							      v-model="formObj.startTime"
							      type="datetime"
							      default-time="21:00:00"
							      placeholder="请选择开始时间">
							    </el-date-picker>
							  </span>
				    	</div>
				    	<div>结束时间：<span class="block">
							    <el-date-picker
							      v-model="formObj.endTime"
							      type="datetime"
							      default-time="21:30:00"
							      placeholder="请选择结束时间">
							    </el-date-picker>
							  </span>
				    	</div>
				    </div>
				</el-form-item>
	  			<el-form-item label="礼品级别：">
				    <el-select v-model="formObj.level" placeholder="请选择礼品级别" size="small">
					    <el-option
					      v-for="item in $bus.levelOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="礼品分类：">
				    <el-select v-model="formObj.level" placeholder="请选择" size="small">
					    <el-option
					      v-for="item in $bus.typeOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="礼品来源：">
				    <div class="inlineCont">
				    	<div>平台名称：<el-input v-model="formObj.platform" style="width: 220px;"></el-input></div>
				    	<div>礼品链接：<el-input v-model="formObj.link" style="width: 220px;"></el-input></div>
				    </div>
				</el-form-item>
	  		</el-col>
	  		<el-col :span="24" style="margin-top: 30px;text-align: center;margin-left: -45px;">
	  			<el-form-item>
				    <el-button type="primary" @click="onSubmit(formData)" 
				    	size="medium" style="width: 120px;" :loading="editLoading">保存</el-button>
				</el-form-item>
	  		</el-col>
	  	</el-form>
	  	
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
			editLoading: {
				type: Boolean,
				default: false
			},
			levelOptions: {
				type: Array,
				default: false
			}
		},
		data () {
			return {
				orEdit: this.isEdit,
				formObj: this.formData,
				fileList: [{
						name: 'food.jpeg',
						url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
					 }],
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
				this.$emit('closeEditView');
			},
			onSubmit (val) {
				this.$emit('saveEdit',val);
			},
			//删除上传的图片
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
		}
	}
</script>

<style scoped lang="scss">
	.inlineCont{
		width: 100%;
		line-height: 40px;
		background: #F2F2F2;
		padding: 10px;
		box-sizing: border-box;
		white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
	}
	.inlineCont span{
		display: inline-block;
		width: 50%;
	}
	.condition span{
		width: 33.333%;
	}
	.giftImgs .imgWrap{
		width: 60px;
		display: inline-block;
		vertical-align: top;
	}
	.giftImgs img{
		width: 60px;
	}
	.giftImgs .tip{
		width: 60px;
		text-align: center;
		position: relative;
		top: -12px;
		font-weight: normal;
	}
	
</style>