import Vue from 'vue';
import { queryExpresses } from '@/api/gift'
const EventBus = new Vue({
  data: {
    msg         : 'Hello world',
    clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
    /*礼品类别*/
    presentTypes: [{
    						value: '0',
    						label: '所有礼物'
    					},{
    						value: '1',
    						label: '免费礼物'
    					},{
    						value: '2',
    						label: '限时抢购礼物'
    					}],
		//礼品分类	        
		typeOptions: [{
								value: ' ',
								label: '全部礼品'
							},{
			          value: 0,
			          label: '服装配饰'
			        },{
			          value: 1,
			          label: '美妆护理'
			        }, {
			          value: 2,
			          label: '手机数码'
			        }, {
			          value: 3,
			          label: '居家室内'
			        }, {
			          value: 4,
			          label: '母婴玩具'
			        },{
			        	value: 5,
			        	label: '生活电器'
			        },{
			        	value: 6,
			        	label: '清洁洗护'
			        }],
			        
		//物流公司
		LogisticsCompanys: [],
		/*预览礼品数据*/	        
		previewJson: {},
		preview    : false,
		arr        : ""
  },
  computed: {
  	
  },
  watch: {
    // 这里为了实现对象引用监听，然后触发change事件，实现状态同步
    msg(val) {
      this.$emit('msg-change', { value: val });
    },
    
    previewJson: {
    	handler(val, oldVal){
	        //但是这两个值打印出来却都是一样的
	    },
	    deep: true
    }
   
  },
  created() {
  	this.expressCompanys()
  },
  
  methods: {
  	expressCompanys(){
  		queryExpresses().then(res => {
  			//console.log(res)
  			this.LogisticsCompanys = res.Data;
  		}).catch(error => {
  			
  		})
  	}
  },
  
});

EventBus.$on('msg-change', (payload) => {
  //console.log(`Msg has changed to ${payload.value}`);
  EventBus.msg = payload.value;
});

export default EventBus;
