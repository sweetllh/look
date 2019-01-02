<template>
    <div id="sidebar-left">
    	<!--background-color= "#eef1f6"-->
      <el-menu
        :collapse="isCollapse"
        :default-active="$route.path"
        @open="handleopen" 
        @close="handleclose" 
        @select="handleselect"
        class="el-menu-vertical-demo"
        unique-opened router>
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :key="item.index"  :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-if="!child.hidden" v-for="child in item.children" 
                	:index="child.path" :key="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
              <template>
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </template>
            </el-menu-item>
        </template>
        
        <!--如果后台传回-->
        <!--<template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.subs">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                            <template slot="title">{{ subItem.title }}</template>
                            <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                {{ threeItem.title }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                    <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                </el-menu-item>
            </template>
        </template>-->
        
      </el-menu>

    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        props: {
        	isCollapse: {
        		type: Boolean,
				default: false
        	}
        },
        data () {
            return {
              	items: [
                    {
                        icon: 'el-icon-ali-shouye1',
                        index: 'dashboard',
                        title: '主页'
                    },
                    {
                        icon: 'el-icon-ali-liwu',
                        index: '3',
                        title: '礼品',
                        subs: [
                            {
                                index: 'manageGift',
                                title: '礼品管理'
                            },
                            {
                                index: 'suspense',
                                title: '待发货',
                            },
                            {
                                index: 'dispatched',
                                title: '已发货'
                            }
                        ]
                    },
                    
                ]
            }
        },
	    computed:{
	      	
	    },
	    methods:{
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
				
			},
	    },
    }
</script>
<style scoped>
	
</style>
