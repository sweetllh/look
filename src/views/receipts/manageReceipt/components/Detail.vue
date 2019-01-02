<template>
	<el-dialog title="小票详情" :visible.sync="orPreview" @close="closePreview" center width="800px">
	  <el-row :gutter="50">
	  	<el-form ref="form2" :model="formData" label-width="95px" size="small">
	  		<el-col :span="12" style="border-right: 1px solid #E5E5E5;border-top: 1px solid #E5E5E5; padding-top: 10px;padding-left: 20px !important;">
  				<el-form-item label="店铺名称：">
				    <span>{{formData.name}}</span>
				</el-form-item>
				<el-form-item label="消费金额：">
					<span></span>
				</el-form-item>
  				<el-form-item label="消费时间：">
				    <span></span>
				</el-form-item>
				<el-form-item label="店铺地址：">
				    <span></span>
				</el-form-item>
				<el-form-item label="小票原图：" class="giftImgs">
					<span>
						<p @click="previewImg(formData.Image)">预览</p>
						<img :src="formData.Image" />
					</span>
				</el-form-item>
	  		</el-col>
	  		<el-col :span="12" style="border-top: 1px solid #E5E5E5;padding-top: 10px;padding-left: 20px!important;">
  				<el-form-item label="权重：">
				    <span></span>
				</el-form-item>
				<el-form-item label="点赞：">
				    <span></span>
				</el-form-item>
				<el-form-item label="评论：">
				    <span></span>
				</el-form-item>
				<el-form-item label="转发：">
				    <span></span>	
				</el-form-item>
				<el-form-item label="上传时间：">
				    <span></span>	
				</el-form-item>
				<el-form-item label="关键词组：">
				    <span></span>	
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
			isPreview: {
				type: Boolean,
				default: false
			},
			formData: {
				type: Object,
				default: null
			}
			
		},
		data () {
			return {
				orPreview: this.isPreview,
				isPreviewImg: false,
				previewImageUrl: "",
			}
		},
		watch: {
		    isPreview (val) {
		        this.orPreview = val;
		    }
		},
		methods: {
			closePreview () {
				this.$emit('closeDetail');
			},
			previewImg (url) {
				this.isPreviewImg = true;
				this.previewImageUrl = url;
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
	.el-form-item__content{
		font-weight: 700 !important;
	}
</style>