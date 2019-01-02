<template>
    <div id="Home">
      <head-top @collapseChange="isCollapse" :isCollapse="collapse"></head-top>
      <div class="wrapper">
        <sidebar :isCollapse="collapse"></sidebar>
          <div class="main" :class="{'content-collapse':collapse}">
            <div class="container" >
              <transition name="move" mode="out-in">
                <!--<keep-alive>-->
                  <router-view></router-view>
                <!--</keep-alive>-->
              </transition>
            </div>
          </div>
        </div>
      </div>
    <!-- </div> -->
</template>

<script>
  import headTop from './components/head.vue'
  import sidebar from './components/sidebar.vue'
    export default {
      name: 'Layout',
      components:{
        headTop,
        sidebar,
      },
      data () {
        return {
            collapse: false,
        }
      },
      computed:{
        
      },
      methods:{
      	isCollapse(){
      		this.collapse = !this.collapse;
      	}
      }
    }
</script>
<style scoped>

</style>
