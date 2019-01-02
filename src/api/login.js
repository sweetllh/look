import request from '@/utils/request'

export function login(User, PassWord) {
  return request({
    url: '/Admin/Login',
    method: 'post',
    data: {
  	timestamp: "1",
		SecretId: "3",
		Signature: "4",
		Data: { 
	        	User,
	        	PassWord
	        }
  	}
  })
}

/*export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}*/
