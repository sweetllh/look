<template>
    <div class="loginContainer">
      <div class="loginForm">
      	<div class="loginTitle">后台管理系统</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" size="small" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" type="password" size="small" @keyup.enter.native="submitForm()"
            	placeholder="请输入密码，区分大小写"></el-input>
          </el-form-item>
          <!--<el-form-item prop="mobileCode">
            <div class="captcha-wrap el-form-item">
              <el-input
                placeholder         = "验证码"
                size                = "small"
                maxlength           = "6"
                v-model             = "ruleForm.mobileCode"
                @keyup.enter.native = "submitForm()"></el-input>
              <div class="captcha-num">
              	<div @click="getCaptchaCode()" class="captcha" v-if="getCodeFlag">获取验证码</div>
                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
              </div>
            </div>
          </el-form-item>-->
          <el-form-item class="login-btn">
            <el-button type="primary" @click="submitForm()" :loading="logining">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
  	import { login } from '@/api/login'
  	import { getToken, setToken, setUserInfo } from '@/utils/auth'
  	import { validateAccount, validatePwd, validateCode } from '@/utils/validate'
    export default {
        name: 'Login',
        data () {
	        return {
	          logining   : false,
	          userInfo   : null,    //用户信息
	          getCodeFlag: false,
	          time       : 60,
	          ruleForm   : {
	            account : '',   //账号
	            password: '',   //密码
	            //mobileCode: '' ,//验证码
	          },
	          rules: {
	            account: [
	              { validator: validateAccount, trigger: 'blur' },
	            ],
	            password: [
	              { validator: validatePwd, trigger: 'blur' }
	            ],
	            /*mobileCode : [
	              { validator: validateCode, trigger: 'blur'}
	            ]*/
	          }
	        }
		 },
	     watch: {
		    /*$route: {
		      handler: function(route) {
		        this.redirect = route.query && route.query.redirect
		      },
		      immediate: true
		    }*/
		  },
	      created(){
	      	
	      },
	      mounted(){
	
	      },
	      
	      methods: {
	      	/*获取验证码*/
	        getCaptchaCode(){
	        	
	        },
	        /*超时记时*/
	        timeOut(time) {
		      var _this = this;
		      setInterval(function() {
		        _this.time = time--;
		        if (_this.time <= 0) {
		          _this.getCodeFlag = true;
		        }
		      }, 1000);
		    },
		    	//登陆按钮
		     submitForm() {
		      	const that = this;
		      	this.$refs.ruleForm.validate(valid => {
			        if (valid) {
			            this.loading = true
				        this.Login(this.ruleForm).then(() => {
				        		this.loading = false
				            this.$router.push({ path: this.redirect ||  '/dashboard' })
				            //this.$router.push({ path: '/dashboard' });
				        }).catch(() => {
				            this.loading = false
				        })
				        
			        } else {
			          console.log('error submit!!')
			          return false
			        }
			    })
		       
		    },
		    //登陆
		    Login(userInfo) {
		      const that = this;
		      const User = userInfo.account.trim();
		      return new Promise((resolve, reject) => {
		        login(User, userInfo.password).then(response => {
		          const data = response.Data;
		          setUserInfo(data);
		          setToken(data.Token);
		          resolve()
		        }).catch(error => {
		          reject(error)
		        })
		      })
		    },  
		    
		    
	    
		  },
		}
</script>
<style scoped>
  .loginContainer{
    position       : relative;
    width          : 100%;
    height         : 100%;
    background     : url(../../assets/bg.png) no-repeat center;
    background-size: cover;
  }
  .loginForm{
    position             : absolute;
    top                  : 50%;
    left                 : 50%;
    -webkit-transform    : translate(-50%,-50%);
    -moz-transform       : translate(-50%,-50%);
    -ms-transform        : translate(-50%,-50%);
    -o-transform         : translate(-50%,-50%);
    transform            : translate(-50%,-50%);
    padding              : 40px 40px 30px;
    width                : 300px;
    background           : #fff;
    -webkit-border-radius: 5px;
    border-radius        : 5px;
    -moz-border-radius   : 5px;
    border               : 1px solid #eaeaea;
    box-shadow           : 0 0 25px #cac6c6;
  }
  .loginTitle{
    text-align   : center;
    font-size    : 20px;
    font-weight  : 600;
    color        : #333;
    margin-bottom: 30px;
  }
  .login-btn{
  	margin-top: 5px;
  }
  .login-btn,.login-btn button{
    width: 100%;
  }

  /*验证码*/
  .captcha-wrap{
    display    : flex;
    align-items: center;
    height     : 30px;
    width      : 100%;
  }
  .captcha-wrap .el-input{
    flex: 1;
  }
  .captcha-num{
    margin-left: 10px;
    height     : 100%;
    width      : 100px;
    text-align : center;
    position   : relative;
  }
  .captcha{
    width        : 100%;
    height       : 100%;
    background   : #3b4356;
    border-radius: 4px;
    color        : #fff;
    cursor       : pointer;
    line-height  : 32px;
  }
  
  .captcha-num span {
	  position     : absolute;
	  left         : 0;
	  top          : 0;
	  width        : 100%;
	  height       : 100%;
	  background   : #efefef;
	  border-radius: 4px;
	  color        : #ccc;
	  line-height  : 32px;
	  font-size    : 12px;
   }

</style>
