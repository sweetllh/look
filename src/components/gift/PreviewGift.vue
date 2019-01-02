<template>
	<el-dialog title="礼品预览" :visible.sync="orPreview" @close="closePreview" center width="900px">
	  <el-row :gutter="50">
	  	<el-form ref="form2" :model="formData" label-width="95px" size="small">
	  		<el-col :span="12" style="border-right: 1px solid #E5E5E5;border-top: 1px solid #E5E5E5; padding-top: 10px;padding-left: 20px !important;">
  				<el-form-item label="礼品名称：">
				    <span>{{formData.Name}}</span>
				</el-form-item>
				<el-form-item label="礼品图片：" class="giftImgs">
					<span v-for="(item,index) in formData.BannerImages">
						<p @click="previewImg(item)">预览</p>
						<img :src="item" :key="index"/>
						<div v-if="index==0" class="tip">首图</div>
					</span>
				</el-form-item>
				<el-form-item label="礼品分类：">
				    <span>{{formData.Type | formatType}}</span>
				</el-form-item>
  				<!--<el-form-item label="礼品数量：">
				    <span>{{formData.GrossAmount}}件</span>
				</el-form-item>-->
				<el-form-item label="礼品价格：">
				    <div class="inlineCont">
				    	<span>原价： {{formData.OriginalPrice}}元</span><span>售价： {{formData.CurrentPrice}}元</span>
				    </div>
				</el-form-item>
				<el-form-item label="礼品描述：" class="giftImgs">
					<span v-for="(item,index) in formData.DetailImages" :key="index">
						<p @click="previewImg(item)">预览</p>
						<img  :src="item" />
					</span>
				</el-form-item>
				
	  		</el-col>
	  		<el-col :span="12" style="border-top: 1px solid #E5E5E5;padding-top: 10px;padding-left: 20px!important;">
  				<el-form-item label="抢购条件：">
				    <div class="inlineCont">
				    	<span v-if="formData.IsAxpToken">{{formData.TokenRequired}}AXP</span>
				    	<span v-if="formData.IsExpress">{{formData.ExpressRequired}}元邮费</span>
				    	<span v-if="formData.ExtraFeeRequired">售价：{{formData.ExtraFeeRequired}}元</span>
				    	<span v-if="formData.IsXcx">小程序兑换</span>
				    </div>
				</el-form-item>
				<el-form-item label="抢购时间：">
				    <div class="inlineCont">
				    	<div>开始时间：{{formData.StartDate}}</div>
				    	<div>结束时间：{{formData.EndDate}}</div>
				    </div>
				</el-form-item>
				<el-form-item label="礼品来源：">
				    <div class="inlineCont">
				    	<div>平台名称：{{formData.SourceChannel}}</div>
				    	<div>礼品链接：<a :href="formData.SourceUrl" target="_blank" 
				    		:title="formData.SourceUrl">{{formData.SourceUrl}}</a></div>
				    </div>
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
	.inlineCont{
		width: 100%;
		line-height: 30px;
		background: #F2F2F2;
		padding: 10px;
		box-sizing: border-box;
	}
	.inlineCont div{
		width: 100%;
		word-break: break-all;
	    /*overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;*/
	}
	.inlineCont span{
		display: inline-block;
		width: 48%;
		
		
	}
	/*.condition span{
		width: 33.333%;
	}*/
	.giftImgs{
		margin-bottom: 35px;
	}
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