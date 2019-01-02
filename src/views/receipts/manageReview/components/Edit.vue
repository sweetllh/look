<template>
	<el-dialog title="1089条评论" :visible.sync="orComment" @close="closeEdit" center width="860px">
		<el-button type="primary" size="small" class="button1" @click="isPostDialog=true">发布评论</el-button>
	   <el-tabs v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane label="点赞最多" name="first">
	    	<div class="table2">
	    		<el-table :data="tableData"  :show-header="false" style="width: 100%">
			      <el-table-column  prop="date"  label="评论人" width="150" align="left">
			      	<template slot-scope="scope">
			      		<div class="flex">
			      			<img src="../../../../assets/avatar.png"/>
			      			<div>
			      				<p>赖先生</p>
			      				<p>10分钟前</p>
			      			</div>
			      		</div>
				    </template>
			      </el-table-column>
			      <el-table-column  prop="date"  label="评论" min-width="260" align="left">
			      	<template slot-scope="scope">
				       <span>{{ scope.row.a }}</span>
				       <el-button type="text" style="padding-left: 10px;">删除</el-button>
				    </template>
			      </el-table-column>
			      <el-table-column  prop="date"  label="评论" min-width="150" align="right">
			      	<template slot-scope="scope">
				       <span class="add">{{ scope.row.b }}</span>
				       <el-input class="addInput" size="small" type="number" v-model.number="scope.row.c" ></el-input>
				       <el-button class="addButton" type="primary" size="small" 
				        	@click="addNum(scope.row.Id)">增加</el-button>
				    </template>
			      </el-table-column>
			    </el-table>
	    	</div>
	    </el-tab-pane>
	    <el-tab-pane label="最新" name="second">
	    	<div class="table2">
	    		<el-table :data="tableData"  :show-header="false" style="width: 100%">
			      <el-table-column  prop="date"  label="评论人" width="150" align="left">
			      	<template slot-scope="scope">
			      		<div class="flex">
			      			<img src="../../../../assets/avatar.png"/>
			      			<div>
			      				<p>赖先生</p>
			      				<p>10分钟前</p>
			      			</div>
			      		</div>
				    </template>
			      </el-table-column>
			      <el-table-column  prop="date"  label="评论" min-width="260" align="left">
			      	<template slot-scope="scope">
				       <span>{{ scope.row.a }}</span>
				       <el-button type="text" style="padding-left: 10px;">删除</el-button>
				    </template>
			      </el-table-column>
			      <el-table-column  prop="date"  label="评论" min-width="150" align="right">
			      	<template slot-scope="scope">
				       <span class="add">{{ scope.row.b }}</span>
				       <el-input class="addInput" size="small" type="number" v-model.number="scope.row.c" ></el-input>
				       <el-button class="addButton" type="primary" size="small" 
				        	@click="addNum(scope.row)">增加</el-button>
				    </template>
			      </el-table-column>
			    </el-table>
	    	</div>
	    </el-tab-pane>
	  </el-tabs>
	  
	  
	  <el-dialog title="发布评论" :visible.sync="isPostDialog"  center width="500px" append-to-body>
	  		<el-form :model="form" label-width="60px">
			    <el-form-item label="头像：">
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
			    <el-form-item label="昵称：">
			      <el-input v-model="form.name" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="时间：">
			      <el-date-picker style="width: 100%;"
				      v-model="form.time"
				      type="datetime"
				      value-format="yyyy-MM-dd HH:mm:ss"
				      placeholder="请选择评论时间">
				    </el-date-picker>
			    </el-form-item>
			    <el-form-item label="内容：">
			      <el-input v-model="form.content" type="textarea" :row="6"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer" style="text-align: center;">
			    <el-button @click="postComment" type="primary" size="medium">发布</el-button>
			  </div>
	  </el-dialog>
	  
	</el-dialog>
	
</template>

<script>
	import { readBlobAsDataURL } from "@/utils/validate"
	export default{
		props: {
			isComment: {
				type: Boolean,
				default: false
			},
			
		},
		data () {
			return {
				activeName: 'first',
				orComment: this.isComment,
				tableData:[{
					a: "我也好想吃啊我也好想吃啊我也好想吃啊我也好想吃想吃啊",
					b: 69999,
					c: 9,
					Id: 9
				}],
				isPostDialog: false,
				form: {
					avatar: "",
					name: "",
					time: "",
					content: ""
				},
				imgUrl: "",
			}
		},
		watch: {
		    isComment (val) {
		        this.orComment = val;
		    },
		    
		},
		methods: {
			handleClick(tab, event) {
		        console.log(tab, event);
		   },
		   closeEdit(){
		   		this.$emit('closeDialog');
		   },
		   addNum(data){
		   	console.log(data,parseInt(data.c) , parseInt(data.b))
		   	this.$set(this.tableData[0],'b',parseInt(data.c) + parseInt(data.b))
		   },
		   /*上传头像*/
		   handleChange(file, fileList){
		   		const that = this;
		   		that.$set(that.form,'avatar',file.raw);
		   	    readBlobAsDataURL(file.raw,function(dataurl){
		   	    	that.imgUrl = dataurl;
		   	    });
		   		
		   },
		   
		   //发布评论
		   postComment(){
		   	
		   }
		}
	}
</script>

<style scoped lang="scss">
	.button1{
		position: absolute;
		top: 68px;
		left: 210px;
		z-index: 999;
	}
	.flex{
		display: flex;
	}
	.flex img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.flex p{
		margin: 0;
		line-height: 25px;
	}
	.add{
		display: inline-block;
		padding-right: 15px;
	}
	.addInput{
		width: 80px;
		position: relative; 
		top: 4px;
	}
	.addButton{
		position: relative;
		top: -8px;
	}
	
</style>