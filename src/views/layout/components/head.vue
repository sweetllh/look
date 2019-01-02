<template>
  <header class="head">
    <div class="logo" :style="{'display': isCollapse ? 'none' :'block'}">爱小票后台管理系统</div>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="getCollapse">
    	<img src="../../../assets/collepse.png"/>
      <!--<i class="el-icon-menu"></i>-->
    </div>
    <breakcrumb></breakcrumb>
    <div class="top-nav">
      <!--全屏显示-->
	    <el-tooltip class="full" effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom" 
	    	@click.native="handleFullScreen($event)">
	      <div>
	        <i class="el-icon-rank"></i>
	      </div>
	    </el-tooltip>
      <!--消息中心-->
	    <el-tooltip class="news" effect="dark" :content="message?`您有${message}条未读消息`:`消息中心`" placement="bottom">
	      <div>
	        <i class="el-icon-bell"></i>
	        <span class="msg" v-if="message"></span>
	      </div>
	    </el-tooltip>
      <!--退出or设置-->
      <!-- 用户头像 -->
      <div class="user-avator"><img src="../../../assets/avatar.png"></div>
	    <el-dropdown placement="bottom">
	      <span class="el-dropdown-link">
           {{userName}} <i class="el-icon-caret-bottom"></i>
        </span>
	      <el-dropdown-menu slot="dropdown">
	        <el-dropdown-item>关于我</el-dropdown-item>
	        <el-dropdown-item>设置</el-dropdown-item>
	        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
	      </el-dropdown-menu>
	    </el-dropdown>


    </div>
  </header>
</template>
<script>
	 import {removeToken,getUserInfo,removeUserInfo } from '@/utils/auth'
	 import breakcrumb from "@/components/breakcrumb"
    export default {
        name      : 'Head',
        components: {
        	breakcrumb
        },
        props: {
        	isCollapse: {
        		type   : Boolean,
        		default: false
        	}
        },
        data () {
            return {
              message   : 1,       //消息
              fullscreen: false,
            }
        },
	      mounted(){
	
	      },
	      computed: {
	        userName(){
	        	const userInfo = getUserInfo();
						if(userInfo){
							return  userInfo.Mobil;
						}
	        }
	      },
	      methods:{
	        getCollapse(){
	        	this.$emit('collapseChange')
	        },
	        
	        // 全屏事件
	        handleFullScreen(ev){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                    	console.log(3)
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                    	console.log(4)
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            
	        //退出登录
					logout () {
						var _this = this;
						this.$confirm('确认退出吗?', '提示', {
							//type: 'warning'
						}).then(() => {
							removeToken();
							removeUserInfo();
							_this.$router.push('/login');
							
						}).catch(() => {
		
						});
					},
	        
	        
	        
	      }
    }
</script>
<style scoped>
	.user-avator{
		margin-right: 10px;
	}
	.user-avator img{
		width         : 40px;
		height        : 40px;
		border-radius : 50%;
		vertical-align: middle;
	}
	.el-dropdown-link{
		font-size  : 14px;
		font-weight: normal;
	}
	.logo{
		width     : 225px;
		text-align: center;
		font-size : 20px;
		background: #2692EF;
		color     : #fff;
	}
	
</style>
