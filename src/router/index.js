import Vue from 'vue'
import Router from 'vue-router'

const Login     = resolve => require(['../views/login/index'],resolve);
const NotFound  = resolve => require(['../views/404.vue'],resolve);
const Layout    = resolve => require(['../views/layout/Layout.vue'],resolve);
const Dashboard = resolve => require(['../views/dashboard/index.vue'],resolve);

const ManageGift = resolve => require(['../views/gift/manageGift/index.vue'],resolve);
const Dispatched = resolve => require(['../views/gift/dispatched/index.vue'],resolve);
const Suspense   = resolve => require(['../views/gift/suspense/index.vue'],resolve);

const ManageReceipt = resolve => require(['../views/receipts/manageReceipt/index.vue'],resolve);
const ManageReview  = resolve => require(['../views/receipts/manageReview/index.vue'],resolve);
const ModifyReview  = resolve => require(['../views/receipts/ModifyReview'],resolve);

Vue.use(Router)

let routes = [
    {
        path    : '/',
        hidden  : true,
        redirect: { path: '/login' }
    },
    {
        path     : '/login',
        component: Login,
        name     : '',
        hidden   : true
    },
    {
        path     : '/404',
        component: NotFound,
        name     : '',
        hidden   : true
    },
    {
        path     : '/',
        component: Layout,
        redirect : '/dashboard',
        name     : '',
        leaf     : true,                    //只有一个节点
        iconCls  : 'el-icon-ali-shouye1',   //图标样式class
        children : [
            { path: '/dashboard', component: Dashboard, name: '主页' },
            
        ]
    },
    {
        path     : '/',
        component: Layout,
        redirect : '/manageGift',
        name     : '礼品',
        iconCls  : 'el-icon-ali-liwu',   //图标样式class
        children : [
            { path: '/manageGift', component: ManageGift, name: '礼品管理' },
            { path: '/suspense', component: Suspense, name: '待发货' },
            { path: '/dispatched', component: Dispatched, name: '已发货' },
        ]
    },
    {
        path     : '/',
        component: Layout,
        redirect : '/manageReceipt',
        name     : '小票',
        iconCls  : 'el-icon-tickets',   //图标样式class
        children : [
            { path: '/manageReceipt', component: ManageReceipt, name: '小票管理' },
            { path: '/manageReview', component: ManageReview, name: '评论管理' },
            { path: '/ModifyReview/:id', component: ModifyReview, name: '评论',hidden: true },
            
        ]
    }
    
    
];



export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})
