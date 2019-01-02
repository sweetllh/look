<template>
	<div>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="今日礼品" name="first">
            	<today-gift ref="today"  @giftDetail="showDetail" @editDetail="editGift"></today-gift>
            </el-tab-pane>
            <el-tab-pane label="往日礼品" name="second">
            	<keep-alive>
            		<bygone-gift v-if="activeName=='second'"    @giftDetail="showDetail"></bygone-gift>
            	</keep-alive>	
            </el-tab-pane>
            <el-tab-pane label="明日预告" name="third" >
            	<keep-alive>
            		<foreshow v-if="activeName=='third'" ref="tomorrow"  @giftDetail="showDetail" @editDetail="editGift" ></foreshow>
            	</keep-alive>
            </el-tab-pane>
				
          </el-tabs>
        </template>
        <!--预览礼品-->
        <preview-gift :isPreview="dialogPreviewVisible" :formData="detailInfo" @closeDetail="closeGiftDedail"></preview-gift>
		
		<!--添加/修改礼品弹窗-->
		<el-dialog  :title="isAddFlag ? '添加礼品' : '修改礼品'" :visible.sync="dialogEditVisible" center width="915px">
		  <el-row :gutter="50">
		  	<el-form ref="form" :model="formData" label-width="95px" size="small">
		  		<!--左侧-->
		  		<el-col :span="12" style="border-right: 1px solid #E5E5E5;border-top: 1px solid #E5E5E5; padding-top: 20px;padding-left: 20px !important;">
	  				<el-form-item label="礼品名称：">
					    <el-input v-model="formData.Name"></el-input>
					</el-form-item>
					<el-form-item label="礼品图片：" class="giftImgs">
						<el-upload
						  class="upload-demo"
						  action=""
						  :auto-upload="false"
						  list-type="picture-card"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove2"
						  :on-change="handleChange2"
						  :file-list="fileList2"
						  accept="image/*"
						  multiple>
						  <i class="el-icon-plus"></i>
						 <div slot="tip" class="el-upload__tip" style="color: #f00;">默认第一张图片作为主图，新增的图片可拖动调整顺序</div>
						</el-upload>
						<el-dialog :visible.sync="isPreviewImg" size="tiny"  append-to-body>
						  <img width="100%" :src="previewImageUrl" alt="">
						</el-dialog>
						
					</el-form-item>
	  				<!--<el-form-item label="礼品数量：">
	  					<el-input-number v-model="formData.GrossAmount" :precision="0"
	  						:controls="false" :min="1" style="width: 73px;"></el-input-number>
					       件
					</el-form-item>-->
					<el-form-item label="礼品分类：">
					    <el-select v-model="formData.Type" placeholder="请选择" size="small">
					    	<template v-for="(item,index) in $bus.typeOptions">
					    		<el-option v-if="index !== 0"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
					    	</template>
						    
						</el-select>
					</el-form-item>
					<el-form-item label="礼品价格：">
					    <div class="inlineCont">
					    	<span>原价： <el-input-number v-model="formData.OriginalPrice" :precision="1"
	  						:controls="false" :min="0" style="width: 73px;"></el-input-number>
					    		元</span><span>售价：<el-input-number v-model="formData.CurrentPrice" :precision="1"
	  						:controls="false" :min="0" style="width: 73px;"></el-input-number> 元</span>
					    </div>
					</el-form-item>
					<el-form-item label="礼品描述：" class="giftImgs">
						<el-upload
						  class="upload-demo"
						  action=""
						  :auto-upload="false"
						  list-type="picture-card"
						  :file-list="fileList1"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove1"
						  :on-change="handleChange1"
						  accept="image/*"
						  multiple>
						  <i class="el-icon-plus"></i>
						 <div slot="tip" class="el-upload__tip" style="color: #f00;">新增的图片可拖动调整顺序</div>
						</el-upload>
						<el-dialog :visible.sync="isPreviewImg" size="tiny"  append-to-body>
						  <img width="100%" :src="previewImageUrl" alt="">
						</el-dialog>
						
					</el-form-item>
		  		</el-col>
		  		<!--右侧-->
		  		<el-col :span="12" style="border-top: 1px solid #E5E5E5;padding-top: 20px;padding-left: 20px!important;">
	  				<el-form-item label="抢购条件：">
	  					<div class="condition">
						    <el-checkbox-group v-model="checkList">
							    <el-checkbox label="A">
							    	<span>
							    		<el-input-number v-model="formData.TokenRequired" :precision="0"
	  										:controls="false" :min="0" :disabled="!checkList.includes('A')" style="width: 73px;"></el-input-number>&nbsp;AXP
							    	</span>
		  							<span style="margin-left: 22px;">
		  									数量：<el-input-number v-model="formData.AxpTokenGrossAmount" :precision="0"
		  								:controls="false" :min="0" :disabled="!checkList.includes('A')" style="width: 73px;"></el-input-number>&nbsp;件
		  							</span>
							    </el-checkbox>
							    <el-checkbox label="B" style="margin-left: 0;">
							    	<div style="margin-bottom: 15px;">
							    		  <el-input-number v-model="formData.ExtraFeeRequired" :precision="0"
	  									:controls="false" :min="0" :disabled="!checkList.includes('B')" style="width: 73px;"></el-input-number>&nbsp;元售价
							    	</div>
							    	<span>
							    		<el-input-number v-model="formData.ExpressRequired" :precision="0"
	  									:controls="false" :min="0" :disabled="!checkList.includes('B')" style="width: 73px;"></el-input-number>&nbsp;元邮费
							    	</span>
	  								<span style="margin-left: 8px;">
	  									数量：<el-input-number v-model="formData.ExpressGrossAmount" :precision="0"
	  									:controls="false" :min="0" :disabled="!checkList.includes('B')" style="width: 73px;"></el-input-number>&nbsp;件
	  								</span>
							    </el-checkbox>
							    <el-checkbox label="C">
							    	<span>小程序</span>
	  								<span style="margin-left: 86px;">
	  									数量：<el-input-number v-model="formData.XcxGrossAmount" :precision="0"
	  									:controls="false" :min="0" :disabled="!checkList.includes('C')" style="width: 73px;"></el-input-number>&nbsp;件
	  								</span>
							    </el-checkbox>
							</el-checkbox-group>
					    </div>
					</el-form-item>
					<el-form-item label="抢购时间：">
					    <div class="inlineCont">
					    	<div>开始时间：<span class="block">
								    <el-date-picker
								      v-model="formData.StartDate"
								      type="datetime"
								      default-time="09:00:00"
								      value-format="yyyy-MM-dd HH:mm:ss"
								      placeholder="请选择开始时间">
								    </el-date-picker>
								  </span>
					    	</div>
					    	<div>结束时间：<span class="block">
								    <el-date-picker
								      v-model="formData.EndDate"
								      type="datetime"
								      default-time="09:30:00"
								      value-format="yyyy-MM-dd HH:mm:ss"
								      placeholder="请选择结束时间">
								    </el-date-picker>
								  </span>
					    	</div>
					    </div>
					</el-form-item>
					<el-form-item label="礼品来源：">
					    <div class="inlineCont">
					    	<div>平台名称：<el-input v-model="formData.SourceChannel" style="width: 220px;"></el-input></div>
					    	<div>礼品链接：<el-input v-model="formData.SourceUrl" style="width: 220px;"></el-input></div>
					    </div>
					</el-form-item>
		  		</el-col>
		  		<el-col :span="24" style="margin-top: 30px;text-align: center;margin-left: -45px;">
		  			<el-form-item>
		  				<!--修改礼品-->
					    <el-button v-if="!isAddFlag" type="primary" @click="saveBtn('1')" 
					    	size="medium" style="width: 120px;" :loading="editLoading">保存</el-button>
					    	<!--添加预告-->
					    <el-button v-if="isAddFlag" type="primary" @click="saveBtn('2')" 
					    	size="medium" style="width: 120px;" :loading="editLoading">保存</el-button>
					</el-form-item>
		  		</el-col>
		  	</el-form>
		  	
		  </el-row>
		</el-dialog>
		
		
		
    </div>
</template>

<script>
	import TodayGift from "./components/TodayGift"     //今日礼品
	import BygoneGift from "./components/BygoneGift"   //往日礼品
	import Foreshow from "./components/Foreshow"		//预售
	import PreviewGift from "../../../components/gift/PreviewGift" //预览礼品
	import { createPresent,modifyPresent } from '@/api/gift'
	import { getImgToBase64,dataURLtoFile } from '@/utils/format'
	import Sortable from 'html5sortable'                       //轻量级拖拽插件
	export default {
		components: {
			TodayGift,
			BygoneGift,
			Foreshow,
			PreviewGift,
			//EditGift
		},
		data () {
			return {
				loading: false,
				editLoading: false,
				activeName: 'first',
				dialogPreviewVisible: false, //预览弹窗
				dialogEditVisible: false, //修改弹窗
				isAddFlag: false,  //是添加还是修改
				isPreviewImg: false,   //预览添加的图片
				previewImageUrl: "",
				count1: 0,
				count2: 0,
				formData: {},			  //修改、添加的礼品
				detailInfo: {},           //预览详情
			    
			    fileList1: [],   //礼品描述
				fileList2: [],  //礼品图片
				//param: null,
				checkList: [],
				
			}
			
		},
		computed: {
			tomorrow(){
				let newDate = new Date();
				newDate.setTime(newDate.getTime()+24*60*60*1000);
				return newDate.getFullYear()+"-" + this.formatNum(newDate.getMonth()+1) + "-" + this.formatNum(newDate.getDate());
			}
		},
		watch: {
			checkList: {
				handler: function(newVal,oldVal){
					if(!this.checkList.includes('A')){
						this.formData.IsAxpToken = false;
						this.formData.TokenRequired = 0;
						this.formData.AxpTokenGrossAmount = 0;
					}else{
						this.formData.IsAxpToken = true;
					}
					if(!this.checkList.includes('B')){
						this.formData.IsExpress = false;
						this.formData.ExpressRequired = 0;
						this.formData.ExpressGrossAmount = 0;
						this.formData.ExtraFeeRequired = 0;
					}else{
						this.formData.IsExpress = true;
					}
					if(!this.checkList.includes('C')){
						this.formData.IsXcx = false;
						this.formData.XcxGrossAmount = 0;
					}else{
						this.formData.IsXcx = true;
					}
				},
				deep: true,
			},
		},
		created(){
			
		},
		methods: {
			
			handleClick(tab, event) {
	            //console.log(tab, event);
	        },
	        
	       //月份和date补0
		    formatNum(s) {
		        return s < 10 ? '0' + s: s;
		    },
			
	        /* 预览*/
	        showDetail(val) {
	        	this.dialogPreviewVisible = true;
	        	this.detailInfo = val;
	        	//console.log("预览",this.detailInfo)
	        },
	        
	        /*编辑/添加礼品*/
	        editGift(type,val) {
	        	if(type == "1"){   //修改
	        		this.isAddFlag = false;
	        		//this.formData = val;
	        		this.formData = Object.assign({}, val) ;
	        		this.checkList = [];
	        		if(this.formData.IsAxpToken){
	        			this.checkList.push('A')
	        		}
	        		if(this.formData.IsExpress){
	        			this.checkList.push('B')
	        		}
	        		if(this.formData.IsXcx	){
	        			this.checkList.push('C')
	        		}
	        		let that = this;
	        		/*礼品详细图片*/
	        		that.fileList1 = [];
	        		this.formData.DetailImages.forEach(function(value,index,array){
					    //array[index] == value;    //结果为true
					    that.fileList1[index] = {};
					    that.fileList1[index]['name'] = "";
					    that.fileList1[index]['url'] = value;
					    /* 网络地址图片转换成file文件*/
				        getImgToBase64(value,function(data){
						　　　that.fileList1[index]['raw'] = dataURLtoFile(data,'old');
				        })
					});
					
					/*礼品图片*/
					that.fileList2 = [];
	        		this.formData.BannerImages.forEach(function(value,index,array){
					    //array[index] == value;    //结果为true
					    that.fileList2[index] = {};
					    that.fileList2[index]['name'] = "";
					    that.fileList2[index]['url'] = value;
					    /* 网络地址图片转换成file文件*/
				        getImgToBase64(value,function(data){
						　　　that.fileList2[index]['raw'] = dataURLtoFile(data,'old');
				        })
					});
					
	        	}else if(type == "2"){  //添加
	        		this.isAddFlag = true;
	        		this.checkList = [];
	        		this.formData = {
	        			Name: '',
	        			CurrentPrice: '',
	        			OriginalPrice: '',
	        			UsedAmount: '',
	        			TokenRequired: 0,
	        			ExpressRequired: 0,
	        			AxpTokenGrossAmount: 0,
	        			ExpressGrossAmount: 0,
	        			XcxGrossAmount: 0,
	        			StartDate: this.tomorrow + ' ' + '09:00:00',
	        			EndDate: this.tomorrow + ' ' + '09:30:00',
	        			Level: 1,
	        			SourceChannel: '淘宝',
	        			SourceUrl: '',
	        		};
	        		this.fileList1 = [];   //礼品描述
					this.fileList2 = [];
	        	}
	        	this.dialogEditVisible = true;
	        	//console.log("编辑",this.fileList1)
	        },
	        
	         /*关闭预览*/
	        closeGiftDedail() {
	        	this.dialogPreviewVisible = false;
	        },
	        /*关闭修改*/
	        /*closeEdited() {
	        	this.dialogEditVisible = false;
	        },*/
	       
	       /*保存按钮*/
	        saveBtn(type){
	        	const that = this;
	        	this.count1 = 0;
	        	this.count2 = 0;
	       		let formInfo = new FormData();
				let file='', description='', banner='';
		        for(let x in this.formData){
		          formInfo.append(x,this.formData[x]);
		        }
		        
		        for(let i=0;i<this.fileList1.length;i++){
		          file ='file' + this.count1;
		          description = 'description' + this.count1;
		          this.count1++;
		          formInfo.append(file,this.fileList1[i].raw,description);
		        }
		        
		        for(let i=0;i<this.fileList2.length;i++){
		          file = 'file' + this.count1;
		          this.count1++;
		          banner = 'banner' + this.count2;
		          this.count2++;
		          if(i==0){
		          	formInfo.append(file,this.fileList2[i].raw,'default');
		          }else{
		          	formInfo.append(file,this.fileList2[i].raw,banner);
		          }
		          
		        }
		       	this.editLoading = true;
		       	if(type == "1"){
		       		that.saveEdited(formInfo);
		       	}else if(type == "2"){
		       		that.saveAdd(formInfo);
		       	}
	        },
	       
	        /*提交修改*/
	       saveEdited(formInfo) {
	       		const that = this;
	       		modifyPresent(formInfo).then(res => {
	       			that.editLoading = false;
	       			that.dialogEditVisible = false;
	            	that.$message({
	            	  showClose: true,
			          message: '修改成功',
			          type: 'success',
			          duration: 5*1000
			        });
			        that.$refs.today.presentsInSell(); //重新加载表格
			    }).catch(error => {
			    	that.editLoading = false;
		        })
		       
	       },
	       
	       /*提交添加*/
	       saveAdd(formInfo){
	       	const that = this;
	       	createPresent(formInfo).then(res => {
       			that.editLoading = false;
       			that.dialogEditVisible = false;
            	that.$message({
            	 showClose: true,
		          message: '添加成功',
		          type: 'success',
		          duration: 5*1000
		        });
		        that.$refs.tomorrow.PresentsToSell(); //重新加载表格
		    }).catch(error => {
		    	that.editLoading = false;
	          //console.log(error)
	        })
	       	
	       },
	       
	       //删除上传的图片
			handleRemove1(file, fileList) {
		       this.fileList1 = fileList;
		    },
		    handleRemove2(file, fileList) {
		       this.fileList2 = fileList;
		    },
		    handlePreview(file) {
		        this.previewImageUrl = file.url;
        		this.isPreviewImg = true;
		    },
		    //图片改变时
		    handleChange1(file, fileList) {
		    	this.fileList1 = fileList;
		    	this.drag();
		    },
		    handleChange2(file, fileList) {
		    	this.fileList2 = fileList;
		    	this.drag();
		    },
		    
		    /*拖拽图片*/
		    drag(){
		    	this.$nextTick(() => {
		            Sortable('.el-upload-list--picture-card', {
			            items: '.el-upload-list__item',
			            forcePlaceholderSize: true,
			            placeholderClass: 'my-sortable-placeholder'
		            });
		        });
		    },
		    
		    
		}
		
		
		
		
	}
</script>

<style scoped lang="scss">
	.el-tabs__item{
		padding: 0 40px;
	}
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
		width: 100px;
		display: inline-block;
		vertical-align: top;
	}
	.giftImgs img{
		width: 100px;
	}
	.giftImgs .tip{
		width: 100px;
		text-align: center;
		position: relative;
		top: -12px;
		font-weight: normal;
	}
	
</style>