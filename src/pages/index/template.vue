<template>
  <div id="app" v-if='user'>
    <el-container style="height:100%">
        <el-header style="height: 55px;line-height: 55px;">
            <a href="#" class="logo">
                <img src="../../assets/img/logo.png">
                <img src="../../assets/img/logo_text.png">
            </a>
            <ul class="header-ul">
                <li><a href="#"><img src="../../assets/img/alarm.png"><span class="badge">15</span></a></li>
                <li @click='onLogout' v-if='user.xb==="男"'><a href="#"><img src="../../assets/img/head_portrait_boy.png" style="height: 28px;">{{user.xm}}</a></li>
                <li @click='onLogout' v-if='user.xb==="女"'><a href="#"><img src="../../assets/img/head_portrait_gril.png" style="height: 28px;">{{user.xm}}</a></li>
                <li><a href="#"><img src="../../assets/img/switch.png">门店切换</a></li>
            </ul>
        </el-header>
        <el-container>
            <el-aside style="width: 130px;">
                <ul class="menu">
                    <li v-for='(name,index) in menuName' :key="name" @click='changeType(index)' :class='{true:"active"}[menuIndex===index]'><a href="javascript:void(0);">{{name}}</a></li>
                    <!-- <li>宾馆预订</li>
                    <li>消费记录</li> -->
                </ul>
            </el-aside>
            <el-main>
                <Cygl v-if="menuIndex==0"></Cygl>
                <Bgyd v-if="menuIndex==1"></Bgyd>
                <Xfjl v-if="menuIndex==2"></Xfjl>
            </el-main>
        </el-container>
    </el-container>
    <tipModel v-on:showTipModel='newMessage($event)' :class="{true:'tipModelActive'}[showTipModel]"></tipModel>
  </div>
</template>


<script>
import Bgyd from '../bgyd/template.vue';
import Cygl from '../cygl/template.vue';
import Xfjl from '../xfjl/template.vue';
import tipModel from '../../components/tip-model/tip-model.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'index',
  components: {
	  Bgyd,
      Cygl,
      Xfjl,
      tipModel
  },
  data(){
	return{
		menuName:[
			'餐饮管理',
			'宾馆预订',
			'消费记录'
		],
        menuIndex:0,
        showTipModel:false
	}
  },
  created(){
    this.onCheckLogin()
  },
  methods:{
        ...mapActions([
            'getGrxx',
            'checkLogin',
            'logout'
        ]),
        onCheckLogin(){//判断登录状态
            if(!this.isLogin){
                this.$router.push({path: this.$route.query.redirect || '/'})
            }
        },
        changeType(index){
            this.menuIndex = index
        },
        newMessage(data){
            if(this.showTipModel){this.showTipModel = false}else{
                this.showTipModel = data
                console.log(this.showTipModel)
            }
        },
        onLogout(){
            this.logout()
              this.$message({message: '注销成功!',type: 'success'});
            this.$router.push({path: this.$route.query.redirect || '/'})
        }
  },
  computed:{
      ...mapGetters([
          'isLogin',
          'user',
      ])
  }
}
</script>

<style lang="less">
@import "../../assets/common.less";
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
