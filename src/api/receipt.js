import request from '@/utils/request'
import requestImg from '@/utils/requestImg'

/*添加小票*/
export function creatReceipt(params) {
  return requestImg({
    url: '/Receipt/Upload',
    method: 'post',
    data: params
  })
};