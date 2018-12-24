<template>
  <div id="app" @click="clickHover($event)">
    <span class='fq'  :style="styleObject" v-if='showStyle' style="z-index:999;">{{slogan}}</span>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data(){
	return{
        styleObject:{
            'top':null,
            'left':null,
            'opacity': 1,
            'transition':'all .3s',
            'animation': 'myfirst 1s infinite',
            'animation-fill-mode':'forwards'
        },
        showStyle:false,
        isRun:false,
        slogan:null

	}
  },
  mounted(){
      this.checkLogin()
  },
  methods:{
    ...mapActions([
        'getGrxx',
        'getPermissions',
    ]),
    checkLogin(){
        if(localStorage.getItem('token')){
            if(!this.user){
                this.getGrxx()//获取user信息
            }
        }
    },
    clickHover(event){
        if(this.isRun){return}
        this.isRun = true
        let slogans = ['富强','民主','文明','法制','爱国','诚信','友善','敬业']
        let styleFram = ['myfirst','myfirst2','myfirst3','myfirst4']
        let index =   Math.floor(Math.random() * 7);
        let index2 =  Math.floor(Math.random() * 3);
        this.slogan = slogans[index]
        this.showStyle = true
        this.styleObject.top = event.y - 20 + 'px'
        this.styleObject.left = event.x +'px'
        this.styleObject.animation = styleFram[index2] +' ' + '1s' + ' ' +  'infinite'
        setTimeout(res=>{
            this.showStyle = false
            this.isRun = false
        },500)
    }//鼠标点击特效 
  },
  computed:{
    ...mapGetters([
        'isLogin',
        'user',
    ]),
    
  },
  watch:{
    showStyle:()=>{
        // return console.log('aaaa')
    }
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
.fq{
    opacity: 0;
    position: absolute;
    transition:all .3s;
}

@keyframes myfirst{
    0%   {color: #ff4f4f;opacity: 1;}
    100% {color: blue;opacity: 0;transform: translateY(-70px)}
}
@keyframes myfirst2{
    0%   {color: green;opacity: 1;}
    100% {color: blue;opacity: 0;transform: translateY(-70px)}
}
@keyframes myfirst3{
    0%   {color: #4876FF;opacity: 1;}
    100% {color: #EE0000;opacity: 0;transform: translateY(-70px)}
}
@keyframes myfirst4{
    0%   {color: #9400D3 ;opacity: 1;}
    100% {color: #98FB98;opacity: 0;transform: translateY(-70px)}
}
</style>
