<template>
	<div class="manageReceipt">
  		<div>
  			<el-input size="small" placeholder="请搜索输入内容" prefix-icon="el-icon-search" 
				v-model="searchValue" style="width: 260px;"></el-input>
  			<el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
  			<el-button type="primary" size="small"  
  				@click.native.prevent="isUpload=true"><i class="el-icon-plus"></i>
		 		<span style="padding-right: 5px;">上传小票</span>
		 	</el-button>
		</div>
		<div class="table">
		    <el-table :data="tableData.Details" :height="$bus.clientHeight - 180"
		    	style="width: 100%;" v-loading="isLoading" >
		      <el-table-column label="图片" min-width="80" align="left" header-align="center">
		      	<template slot-scope="scope">
		      		<el-button type="text" @click.native.prevent="previewReceipt(scope.row)">
			        	<img :src="scope.row.Image" width="60"/></el-button>
			    </template>
		      </el-table-column>
		      <el-table-column label="店名" min-width="160" align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.name }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="金额" min-width="100" align="center">
		      	<template slot-scope="scope">
			        <span>￥{{ scope.row.money }}</span>
			    </template>
			  </el-table-column>
		      <el-table-column label="地址" min-width="220" align="center" header-align="center" class-name="Address">
			      	<template slot-scope="scope">
				        <div>{{scope.row.address}}</div>
				    </template>
			  </el-table-column>
		      <el-table-column label="点赞" min-width="100" align="center">
		      	<template slot-scope="scope">
			        <span>{{ scope.row.praise }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="评论" min-width="160" align="center" >
		      	<template slot-scope="scope">
		      		 <router-link to="/ModifyReview/1">{{ scope.row.comments }}</router-link>
			    </template>
		      </el-table-column>
		      <el-table-column label="转发" min-width="100" align="center" >
		      	<template slot-scope="scope">
			        <div>{{ scope.row.forwarding }}</div>
			    </template>
		      </el-table-column>
		      <el-table-column label="权重" min-width="100" align="center" >
		      	<template slot-scope="scope">
			        <span>{{ scope.row.weight }} + {{ scope.row.weight2 }}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="上传时间" min-width="200" align="center" >
		      	<template slot-scope="scope">
			        <span>{{ scope.row.time}}</span>
			    </template>
		      </el-table-column>
		      <el-table-column label="操作" min-width="110" align="center" fixed="right">
		      	<template slot-scope="scope">
			        <el-button @click.native.prevent="editReceipt(scope.row)" type="text" >修改</el-button>
			        <el-button  @click.native.prevent="deleteRow(scope.row.Id)" type="text">删除</el-button>
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
		<detail :formData="detailJson" :isPreview="dialogDetailVisible" @closeDetail = "dialogDetailVisible=false"></detail>
		<edit :formData="detailJson" :isEdit="dialogEditVisible" @closeEdit = "dialogEditVisible = false"></edit>
		
		<!--上传小票-->
		<el-dialog title="上传小票" :visible.sync="isUpload" center width="500px"  @close="$refs['uploadForm'].resetFields();imgUrl=''">
		  <el-form :model="uploadForm" label-width="95px" size="small"  ref="uploadForm">
		  	<el-form-item label="上传小票：" prop="avatar" :rules="[{ required: true, message: '小票不能为空'}]">
		      <el-upload
				  class="avatar-uploader"
				  action=""
				  :on-change="handleChange"
				  :show-file-list="false"
				  :auto-upload="false">
				  <img v-if="imgUrl" :src="imgUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  <div slot="tip" class="el-upload__tip" style="color: #f00;">上传图片后，点击图片可重新上传</div>
			 </el-upload>
		    </el-form-item>
		    <el-form-item label="经度：" prop="lon" :rules="[{ required: true, message: '经度不能为空'},{ type: 'number', message: '经度必须为数字值'}]">
		      <el-input v-model.number="uploadForm.lon" autocomplete="off" ></el-input>
		    </el-form-item>
		    <el-form-item label="纬度：" prop="lat" :rules="[{ required: true, message: '纬度不能为空'},{ type: 'number', message: '纬度必须为数字值'}]">
		       <el-input v-model.number="uploadForm.lat" autocomplete="off" ></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer" style="text-align: center;">
		    <el-button type="primary" @click="uploadReceipt()" size="medium" style="width: 120px;"
		    	:loading="loading">确定</el-button>
		  </div>
		</el-dialog>
		
		
		
		
  	</div>
</template>

<script>
	import { tomorrowGift,deletePresentToSell } from '@/api/gift'
	import Detail from './components/Detail'
	import Edit from './components/Edit'
	import { readBlobAsDataURL } from "@/utils/validate"
	import { creatReceipt } from "@/api/receipt"
	export default {
		components: {
			Detail,
			Edit,
			Comment
		},
		data () {
		 	return {
		 		searchValue: '',
		 		isLoading: false,
		 		tableData: {
		 			CurrentPage: 1,
		 			PageSize: 10,
		 			TotalCount: 1,
		 			TotalPage: 1,
		 			Details: [{
			 					Image: "https://www.linkedsign.cn/AXP/Api/Files/Present?id=b2e62e5c09b0436aae3d71e8228e6e6a",
			 					name: "同仁四季（南山店）",
			 					money: 200,
			 					address: "海岸城保利文化广场2楼保利来觅C6近地铁后海战E出口",
								praise: "200 +9",
								comments: "3200+100",
								forwarding: "500+90",
								weight: 80,
								weight2: 900,
								time: "2018-10-21 15:47:00",
								Id: 1
		 					}
		 					
		 			]
		 		},
		 		currentPage: 1,
		 		pageSize: 10,
		 		detailJson: {},
		 		dialogDetailVisible: false,
		 		dialogEditVisible: false,
		 		loading: false,
		 		isUpload: false,
		 		uploadForm:{
		 			avatar: "",
		 			lon: "",
		 			lat: "",
		 			},
		 		imgUrl: "",
		 	}
		 	
		 },
		 
		 created(){
		 	//this.PresentsToSell();
		 },
		 
		 methods: {
		 	handleSizeChange(val) {
				this.pageSize = val;
				this.presentsInSell();
		        //console.log(`每页 ${val} 条`);
		    },
		    
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.presentsInSell();
		       // console.log(`当前页: ${val}`);
		    },
		    
		    /*上传小票*/
		    uploadReceipt(){
		    	this.$refs['uploadForm'].validate((valid) => {
		          if (valid) {
		            let formInfo = new FormData();
			        for(let x in this.uploadForm){
			          formInfo.append(x,this.uploadForm[x]);
			        }
			        this.loading = true;
			        creatReceipt(formInfo).then(res => {
			        	if(res.Code == '0'){
			        		this.loading = false;
			        		this.isUpload = false;
			        		that.$message({
			            	  showClose: true,
					          message: '上传小票成功',
					          type: 'success',
					          duration: 5*1000
					        });
			        	}
			        }).catch(error => {
			        	this.loading = false;
			        })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
			/*上传小票图片*/
		   handleChange(file, fileList){
		   		const that = this;
		   		that.$set(that.uploadForm,'avatar',file.raw);
		   	    readBlobAsDataURL(file.raw,function(dataurl){
		   	    	that.imgUrl = dataurl;
		   	    });
		   		
		   },
		 	/*小票列表*/
			PresentsToSell(){
				this.isLoading = true;
				let params = {
				        "PageSize": this.pageSize,
				        "Page": this.currentPage
				    }
		       	const that = this;
		       	tomorrowGift(params).then(res => {
	       			that.isLoading = false;
	       			that.tableData = res.Data;
			    }).catch(error => {
		          //console.log(error)
		        })
		       	
			},
		 	
		 	/*预览*/
		 	previewReceipt (val) {
		 		this.detailJson = val;
		 		this.dialogDetailVisible = true;
		 	},
		 	
		 	/*修改*/
		 	editReceipt (val) {
		 		//this.detailJson = val;
		 		this.detailJson = Object.assign({}, val) ;
		 		this.dialogEditVisible = true;
		 	},
		 	
		 	
		 	/*确定删除礼品？*/
		 	deleteRow (val) {
		 		this.$confirm('此操作将删除小票, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	
		        	this.deleteGift(val);
		        	
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		 	},
		 	
		 	/*删除小票*/
		 	deleteGift(id){
		 		let that = this;
		 		deletePresentToSell(id).then(res => {
	       			that.PresentsToSell(); //重新加载表格
	            	that.$message({
	                   message: "删除成功",
	                   type: 'success'
	                });
			    }).catch(error => {
		          //console.log(error)
		        })
		 		
		 	},
		 	
		 	
		 }
	}
</script>

<style scoped lang="scss">
	
</style>