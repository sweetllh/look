import request from '@/utils/request'
import requestImg from '@/utils/requestImg'


/*礼物列表*/
export function presentList(params){
	return request({
    url: '/Admin/Presents',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
}

/*礼品明细*/
export function presentDetail(Id) {
  return request({
    url: '/Admin/PresentDetail',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
  	  		}
  })
};

/*添加预告礼物*/
export function createPresent(params) {
  return requestImg({
    url: '/Admin/CreatePresent',
    method: 'post',
    data: params
  })
};

/*修改礼物*/
export function modifyPresent(params) {
  return requestImg({
    url: '/Admin/ModifyPresent',
    method: 'post',
    data: params
  })
};

/*审核确认礼物*/
export function checkPresent(Id) {
  return request({
    url: '/Admin/CheckPresent',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
  	  		}
  })
};

/*取消审核礼物*/
export function unCheckPresent(Id) {
  return request({
    url: '/Admin/UnCheckPresent',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
  	  		}
  })
};

/*删除礼品*/
export function deletePresent(Id) {
  return request({
    url: '/Admin/DeletePresent',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
		  }
  })
};

/*往日礼物列表*/
export function presentsHistory(params){
	return request({
    url: '/Admin/PresentsHistory',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};

/*待下单礼物订单列表*/
export function preOrders(params){
	return request({
    url: '/Admin/PreOrders',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};

/*待下单礼品详情*/
export function preOrderDetail(Id) {
  return request({
    url: '/Admin/PreOrderDetail',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
  	  		}
  })
};

/*待发货礼物下单接口*/
export function preOrderCheck(params){
	return request({
    url: '/Admin/PreOrderCheck',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};

/*待发货礼品列表*/
export function toDeliveryOrders(params){
	return request({
    url: '/Admin/ToDeliveryOrders',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};

/*待发货礼物发货接口*/
export function toDeliveryOrderCheck(params){
	return request({
    url: '/Admin/ToDeliveryOrderCheck',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};

/*已完成订单*/
export function completedOrders(params){
	return request({
    url: '/Admin/CompletedOrders',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};


/*已完成订单明细*/
export function completedOrderDetail(ID){
	return request({
    url: '/Admin/CompletedOrderDetail',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					ID
				}
  	  		}
  })
};

/*已完成订单修改物流信息*/
export function completedOrderModify(params){
	return request({
    url: '/Admin/CompletedOrderModify',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
  	  		}
  })
};

/*物流信息*/
export function queryExpresses(){
	return request({
	    url: '/Admin/Expresses',
	    method: 'post',
	    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4"
  	  		}
  })
};



export function tomorrowGift(Id) {
  return request({
    url: '',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
		  }
  })
};
export function deletePresentToSell(Id) {
  return request({
    url: '',
    method: 'post',
    data: {
		  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
		  }
  })
};








