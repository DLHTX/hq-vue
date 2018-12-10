<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  data(){
	return{
	
	}
  },
  created(){

  },
  methods:{
  },
  computed:{
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
