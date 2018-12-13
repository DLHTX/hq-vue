<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data(){
	return{
        
	}
  },
  mounted(){
      this.checkLogin()
  },
  methods:{
    ...mapActions([
        'getGrxx',
        'getPermissions'
    ]),
    checkLogin(){
        if(localStorage.getItem('token')){
            if(!this.user){
                this.getGrxx()//获取user信息
            }
        }
    }
  },
  computed:{
    ...mapGetters([
        'isLogin',
        'user',
    ]),
  }
}
</script>

<style lang="less">
@import "./assets/common.less";
#app{
    height: 100%;
    position: relative;
    overflow: hidden;
}
.el-main {
    padding: 0;
}
body > .el-container {
    margin-bottom: 40px;
}
.tipModelActive{
    top: 753px!important;
    left: 20px!important;
    transition: all .5s;
}
</style>
