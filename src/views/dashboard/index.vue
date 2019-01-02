<template>
	<div class="dashboard" :style="{height: ($bus.clientHeight - 80)+'px'}">
		<el-row :gutter="60" class="list">
			<el-col :span="8">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-1">
                        <i class="grid-con-icon" style="background: #FF8761;"><img src="../../assets/following.png"/></i>
                        <div class="grid-cont-right">
                        	<router-link to="/main">
                        		<div style="color: #FF8761;">用户量</div>
                        		<div>188</div>
							</router-link>
                        </div>
                    </div>
                </el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                        <i class="grid-con-icon" style="background: #57BDDE;"><img src="../../assets/gift.png"/></i>
                        <div class="grid-cont-right">
                            <router-link  to="/suspense">
                            	<div style="color: #57BDDE;">待发货订单</div>
								<div>188</div>
							</router-link>
                        </div>
                    </div>
                </el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-3">
                        <i class="grid-con-icon" style="background: #6DC7BE;"><img src="../../assets/onShop.png"/></i>
                        <div class="grid-cont-right">
                        	<router-link to="/suspense">
                        		<div style="color: #6DC7BE;">已上架礼品</div>
                        		<div >188</div>
							</router-link>
                        </div>
                    </div>
                </el-card>
			</el-col>
			
		</el-row>
		
		<el-row :gutter="40">
	      <el-col :span="12" class="customerChart">
	      	<el-card shadow="hover">
	      		<div id="chartPie" style=" height:400px;"></div>
            </el-card>
	      </el-col>
	      <el-col :span="12" class="orderChart">
	      </el-col>
	    </el-row>
	</div>
</template>

<script>
	//import echarts from 'echarts'
	//按需引入echarts
	var echarts = require("echarts/lib/echarts");
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');
	require("echarts/lib/chart/pie");
	
	export default {
		name: 'dashboard',
		data() {
			return {
				chartPie: null,
			}
		},
		
		methods: {
			drawPieChart() {
                this.chartPie = echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    title: {
                        text: '客户流量情况',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['已挖出', '剩余未挖出']
                    },
                    color:['#2692EF','#57BDDE'],
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 200, name: '已挖出' },
                                { value: 3100, name: '剩余未挖出' },
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
			
			
		},
		
		mounted() {
			this.drawPieChart();
		},
		updated: function () {
            this.drawPieChart();
        }
	}

</script>

<style scoped>
	.dashboard{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30px 20px;
		background: #e1dfdf;
		height: 100%;
	}
	.list .el-col{
		height: 160px;
		padding: 30px 0;
		box-sizing: border-box;
	}
	a{
		text-decoration: none;
		color: inherit;
	}
	
	.grid-content {
        display: flex;
        align-items: center;
        height: 100px;
        /*height: 100%;*/
    }
    .grid-cont-right {
        flex: 1;
        padding-left: 30px;
        line-height: 28px;
        /*text-align: center;*/
        font-size: 16px;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
</style>