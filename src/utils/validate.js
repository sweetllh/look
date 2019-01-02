/**
 * Created by jiachenpan on 16/11/18.
 */

/*export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}*/
//获取本地文件路径
export function readBlobAsDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);};
    a.readAsDataURL(blob);
}

export const validateAccount = (rule, value, callback) => {
	        /*if (value === '') {
	            callback(new Error('请输入账号'));
	        } else {
		        callback();
	        }*/
	        
	        var phoneReg = /(^1[3-578]\d{9}$)/;
	        var value = value.replace(/\s/, "");
	        if (value === '') {
	           callback(new Error('请输入账号'));
	        } else if(!phoneReg.test(value)){
	            callback(new Error('输入的手机号码格式不正确!'));
	        }else{
		        callback();
	        }
	        
	        
	        
	    };
		    
export const validatePwd = (rule, value, callback) => {
	    	//let pwdReg = /^(?![^a-zA-Z]+$)(?!\D+$)[0-9A-Za-z]{8,16}$/;
	    	let pwdReg =/^\d{6}$/;
            if (value === '') {
               callback(new Error('请输入密码'));
            } else if(!pwdReg.test(value)){
	            //callback(new Error('密码为8-16位数字、字母组合!'));
	            callback(new Error('密码为6位数字!'));
            }else{
		        callback();
            }
            
        };
	        
export const  validateCode = (rule, value, callback) => {
	    	let codeReg = /^\d{6}$/;
            if (value === '') {
               callback(new Error('请输入验证码'));
            } else if(!codeReg.test(value)){
	            callback(new Error('验证码6位数字!'));
            }else{
		        callback();
            }
            
        };
       
export const  validateNumber1 = (rule, value, callback) => {
	    	let codeReg = /^\d+$/;
            if (value === '') {
               callback(new Error('请输入快递单号'));
            } else if(!codeReg.test(value)){
	            callback(new Error('快递单号必须为数字值!'));
            }else{
		        callback();
            }
            
        };

export const  validateNumber2 = (rule, value, callback) => {
	    	let codeReg = /^\d+$/;
            if (value === '') {
               callback(new Error('请输入订单编号'));
            } else if(!codeReg.test(value)){
	            callback(new Error('快递单号必须为数字值!'));
            }else{
		        callback();
            }
            
        };




/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
